from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
#from .forms import SignUpForm
from .forms import UserCustomCreationForm
from .models import User
from django.views import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm

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


# ________________________________________________ mypage ________________________________________________
# my page
def my_page(request):
    return render(request, template_name="users/my_page.html")



