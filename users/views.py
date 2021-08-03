from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect, get_object_or_404
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
