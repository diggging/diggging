import os
import requests
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic.base import TemplateView
#from .forms import SignUpForm
from .forms import UserCustomCreationForm
from .models import User
from django.views import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm, PasswordResetForm
from django.contrib.auth.hashers import check_password
from django.contrib.auth.views import PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView
import os
# 이메일 인증 관련 import
import logging
from django.http import HttpResponse

# SMTP 관련 인증
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from .tokens import account_activation_token, password_reset_token
from django.urls import reverse_lazy
from django.contrib import messages
from django.contrib.sites.models import Site

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
            # return HttpResponse('Please confirm your email address to complete the registration') -> 이메일 인증 성공 확인 가능 메세지
            return redirect('users:login')
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
        if form.is_valid() :
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

# 비밀번호 찾기
# class UserPasswordResetView(PasswordResetView):
#     template_name = 'password_reset.html'
#     success_url = reverse_lazy('password_reset_done')
#     form_class = PasswordResetForm

#     # 존재하는 이메일인지 확인하기
#     def form_valid(self, form):
#         if User.objects.filter(email=self.request.POST.get("email")).exists():
#             return super().form_valid(form)
#         else:
#             return render(self.request, 'password_reset_done_fail.html')

# class UserPasswordResetDoneView(PasswordResetDoneView):
#     template_name = 'password_reset_done.html' #템플릿을 변경하려면 이와같은 형식으로 입력


# 비밀번호를 모르겠을때, email을 작성하는 부분
def password_reset(request):
    # email 받으면
    if request.method == 'POST':
        email  = request.POST.get("email")
        user = request.user
        # email 이 존재하는 이메일인지 확인
        if User.objects.filter(email = email).exists():
            #있으면 메일 보내기
            
            my_site = Site.objects.get(pk=1)
            my_site.domain = '127.0.0:8000'
            my_site.name = "digging_main"
            my_site.save()
            current_site = get_current_site(request)
            print(current_site)
            message = render_to_string('users/password_reset_email.html', {
                'user': user,
                #'domain': current_site.domain,
                'domain': my_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': password_reset_token.make_token(user),
            })
            # sending mail to future user
            mail_subject = 'Change your Password.'
            email = EmailMessage(mail_subject, message, to=[email])
            email.send()
            return HttpResponse(
                '<div style="font-size: 40px; width: 100%; height:100%; display:flex; text-align:center; '
                'justify-content: center; align-items: center;">'
                '입력하신 이메일<span>로 인증 링크가 전송되었습니다.</span>'
                '</div>'
            )
        else:
            # 없으면 없는 메일ㅇ이라고 하고 다시 redirect
            return redirect('users:password_reset')
    else:
        return render(request, template_name="users/password_reset.html")


# 이메일 인증
def password_reset_email(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    # 잘 넘어오면
    if user is not None and password_reset_token.check_token(user, token):
        ctx={
            'user': user,
        }
        return redirect('users:password_reset_form', user.id)
    else:
        return HttpResponse('Activation link is invalid!')

def password_reset_form(request, pk):
    context = {}
    if request.method == "POST":
        user = get_object_or_404(User,pk=pk)
        new_password = request.POST.get("password1")
        password_confirm = request.POST.get("password2")
        if new_password == password_confirm:
            user.set_password(new_password)
            user.save()
            login(request, user)
            return redirect('users:login')
        else:
            context.update({'error':"새로운 비밀번호를 다시 확인해주세요."})
    else:
        context.update({'error':"현재 비밀번호가 일치하지 않습니다."})
    
    return redirect('users:login')

# _______________________________________________social login____________________________________________
# github login
def github_login(request):
    client_id = os.environ.get("GITHUB_ID")
    redirect_uri = "http://127.0.0.1:8000/user/login/github/callback"
    return redirect(f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=read:user")

def github_callback(request):
    try:
        client_id = os.environ.get("GITHUB_ID")
        client_secret = os.environ.get("GITHUB_SECRET")
        code = request.GET.get("code", None)
        if code is not None:
            result = requests.post(f"https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}",
            headers = {"Accept": "application/json"}
            )
            result_json = result.json()
            error = result_json.get("error", None)
            if error is not None:
                raise Exception()
            else:
                access_token = result_json.get("access_token")
                profile_request = requests.get("https://api.github.com/user", 
                headers={
                    "Authorization": f"token {access_token}",
                    "Accept": "application/json",
                })
                
                profile_json = profile_request.json()
                username = profile_json.get("login", None)
                if username is not None:
                    name = profile_json.get("name")
                    email = profile_json.get("email")
                    try:
                        user = User.objects.get(email=email)
                        if user.login_method != User.LOGIN_GITHUB:
                            raise Exception()
                    except User.DoesNotExist:
                        user = User.objects.create(username=name, email=email, user_nickname=name, login_method=User.LOGIN_GITHUB,)
                        user.set_unusable_password()
                        user.save()
                    login(request, user)
                    return redirect('users:my_page', user.pk)
                else:
                    raise Exception()
        else:
            raise Exception()
    
    except Exception:
        return redirect("user:login")
    

# ________________________________________________ mypage ________________________________________________
# my page
def my_page(request, pk):
    host = get_object_or_404(User,pk=pk)
    host_following = host.user_following.all()
    host_follower = host.user_followed.all()
    ctx = {
        'host': host,
        'host_follower' : host_follower,
        'host_following' : host_following,
    }

    return render(request, template_name="users/my_page.html", context=ctx)

# 한번 누르면 follow, 두번 누르면 unfollow
def follow(request, host_pk):
    # 여기서 오는 pk는 내가 follow하려는 사람의 pk임
    # TODO post 상황과 get 상황 나눠야함!!!
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
    host = get_object_or_404(User,pk=pk)
    ctx={
        'host':host,
    }
    return render(request, template_name = "users/account_detail.html", context= ctx)

def change_nickname(request, pk):
    context = {}
    if request.method == "POST":
        new_nickname = request.POST.get("new_nickname")
        user = get_object_or_404(User,pk=pk)     # 내 계정 고치기는 페이지가 host = 접속한 사람이여야만 보이게 해야함! (front)
        if User.objects.filter(user_nickname=new_nickname):
            context.update({'error':"이미 존재하는 별명입니다."})
        
        else:
            user.user_nickname=new_nickname
            user.save()
            return redirect('users:account_detail', user.id)
    return redirect('users:account_detail', user.id)

def change_pw(request, pk):
    context = {}
    if request.method == "POST":
        current_password = request.POST.get("origin_password")
        user = get_object_or_404(User,pk=pk)
        if check_password(current_password, user.password):
            new_password = request.POST.get("password1")
            password_confirm = request.POST.get("password2")
            if new_password == password_confirm:
                user.set_password(new_password)
                user.save()
                login(request, user)
                return redirect('users:login')
            else:
                context.update({'error':"새로운 비밀번호를 다시 확인해주세요."})
    else:
        context.update({'error':"현재 비밀번호가 일치하지 않습니다."})
    
    return redirect('users:login')

def change_img(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == "POST":
        new_img = request.FILES.get("new_img",None)
        if new_img:
            # 원래 이미지 삭제
            user.user_profile_image.delete()
            # 새이미지로 바꿈
            user.user_profile_image = new_img
            user.save()
    return redirect('users:account_detail', user.id)


# ________________________________________________ point ________________________________________________
# def sand_create(request):