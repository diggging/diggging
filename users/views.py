from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect, get_object_or_404
#from .forms import SignUpForm
from .forms import UserCustomCreationForm
from .models import User
from django.views import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm, PasswordChangeForm, Password
from django.contrib.auth.hashers import check_password
import os

# Create your views here.
# ________________________________________________ 회원가입, 로그인, 로그아웃 ________________________________________________
# 회원가입
def signup(request):
    #if request.user.is_authenticated:
    #    return redirect('users:my_page')
    if request.method == "POST":
        user_form = UserCustomCreationForm(request.POST)
        if user_form.is_valid():
            user = user_form.save()
            return redirect('users:login')
    else:
        user_form = UserCustomCreationForm()
    ctx={'signup_form' : user_form}
    return render(request, template_name="users/signup.html", context=ctx)

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

# 비밀번호 재설정 기능
#class MyPasswordResetView(PasswordResetView):



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