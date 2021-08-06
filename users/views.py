from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import TemplateView
#from .forms import SignUpForm
from .forms import UserCustomCreationForm
from .models import User
from django.views import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.hashers import check_password
# 이메일 인증 관련 import
import logging
from django.http import HttpResponse

# SMTP 관련 인증
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from .tokens import account_activation_token

# Create your views here.
# ________________________________________________ 회원가입, 로그인, 로그아웃 ________________________________________________
# # 회원가입
# def signup(request):
#     #if request.user.is_authenticated:
#     #    return redirect('users:my_page')
#     if request.method == "POST":
#         user_form = UserCustomCreationForm(request.POST)
#         if user_form.is_valid():
#             user = user_form.save()
#             return redirect('users:login')
#     else:
#         user_form = UserCustomCreationForm()
#     ctx={'signup_form' : user_form}
#     return render(request, template_name="users/signup.html", context=ctx)

# 회원가입
def signup(request):
    #if request.user.is_authenticated:
    #    return redirect('users:my_page')
    if request.method == "POST":
        user_form = UserCustomCreationForm(request.POST)
        if user_form.is_valid():
            user = user_form.save(commit=False)
            user.is_active = False
            user.save()
            current_site = get_current_site(request)
            message = render_to_string('users/user_activate_email.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': account_activation_token.make_token(user),
            })
            # sending mail to future user
            mail_subject = 'Activate your blog account.'
            to_email = user_form.cleaned_data.get('email')
            email = EmailMessage(mail_subject, message, to=[to_email])
            email.send()
            return HttpResponse('Please confirm your email address to complete the registration')
    else:
        user_form = UserCustomCreationForm()
    ctx={'signup_form' : user_form}
    return render(request, template_name="users/signup.html", context=ctx)
    
# 이메일 인증 후 계정 활성화
def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user)
        return HttpResponse('Thank you for your email confirmation. Now you can login your account')
    else:
        return HttpResponse('Activation link is invalid!')

# 로그인
def log_in(request):
    if request.method == "POST":
        form = AuthenticationForm(request, request.POST)
        if form.is_valid():
            login(request, form.get_user())
            user = form.get_user()
            return redirect('users:my_page', user.pk)
        else:
            print("_________________________________ 외않되 __________________________________________")
    else:
        form = AuthenticationForm()
    ctx = {'form' : form}
    return render(request, template_name="users/login.html", context=ctx)


# 로그아웃
@login_required    
def log_out(request):
    logout(request)
    return redirect('user:login')


# ________________________________________________ mypage ________________________________________________
# my page
def my_page(request, pk):
    host = get_object_or_404(User,pk=pk)
    host_following = host.user_following.all()
    host_follower = host.user_followed.all()
    print(host_follower)
    ctx = {
        'host': host,
        'host_follower' : host_follower,
        'host_following' : host_following,
    }

    return render(request, template_name="users/my_page.html", context=ctx)

# 한번 누르면 follow, 두번 누르면 unfollow
def follow(request, host_pk):
    # 여기서 오는 pk는 내가 follow하려는 사람의 pk임
    me = request.user
    host = get_object_or_404(User,pk=host_pk)

    if me.user_following.filter(pk=host_pk).exists():
        # 삭제
        me.user_following.remove(host)
        host.user_followed.remove(me)
    else:
        # 나의 following에 pk 추가
        me.user_following.add(host)

        # host의 follower에 나 추가
        host.user_followed.add(me)
    
    return redirect('users:my_page', host_pk)


def account_detail(request, pk):
    return render(request, template_name = "users/account_detail.html")

def change_nickname(request):
    context = {}
    if request.method == "POST":
        new_nickname = request.POST.get("new_nickname")
        user = request.user
        if User.objects.filter(user_nickname=new_nickname):
            context.update({'error':"이미 존재하는 별명입니다."})
        
        else:
            user.user_nickname=new_nickname
            user.save()
            return redirect('users:account_detail', user.id)
    return redirect('users:account_detail', user.id)

def change_pw(request):
    context = {}
    if request.method == "POST":
        current_password = request.POST.get("origin_password")
        user = request.user
        if check_password(current_password, user.password):
            new_password = request.POST.get("password1")
            password_confirm = request.POST.get("password2")
            if new_password == password_confirm:
                user.set_password(new_password)
                user.save()
                login(request, request.user)
                return redirect('users:login')
            else:
                context.update({'error':"새로운 비밀번호를 다시 확인해주세요."})
    else:
        context.update({'error':"현재 비밀번호가 일치하지 않습니다."})
    
    return redirect('users:login')


# ________________________________________________ point ________________________________________________
# def sand_create(request):