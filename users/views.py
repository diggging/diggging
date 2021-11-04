import os
import users
import requests
from django.contrib.auth import authenticate, login, logout

# from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse

# from django.views.generic.base import TemplateView
# from .forms import SignUpForm
from .forms import UserCustomCreationForm, AuthenticationCustomForm
from .models import User, Sand, Alarm, create_auth_token
from posts.models import Folder, Post
from questions.models import QuestionPost, Answer, QuestionFolder
from django.views import View
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password

# 이메일 인증 관련 import
import logging
from django.http import HttpResponse
from django.db.models import Sum

# SMTP 관련 인증
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text
from .tokens import account_activation_token, password_reset_token
from django.contrib import messages

# from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.sites.models import Site
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.http.response import JsonResponse

# api
from rest_framework import generics, permissions
from .serializers import UserSerializer, RegisterSerializer, UserLoginSerializer
from rest_framework.response import Response
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token

# new
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status, mixins
from rest_framework import generics  # generics class-based view 사용할 계획
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import VerifyJSONWebTokenSerializer

# Create your views here.
# ________________________________________________ 회원가입, 로그인, 로그아웃 ________________________________________________
# 회원가입
"""my_site = Site.objects.get(pk=1)
my_site.domain = "diggging.com"
my_site.name = "digging_main"
my_site.save()"""


@permission_classes([AllowAny])
class Registration(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid(raise_exception=True):
            return Response({"message": "이미 존재함"}, status=status.HTTP_409_CONFLICT)

        serializer.is_valid(raise_exception=True)
        user = serializer.save(request)
        user.is_active = False
        user.save()
        # request 필요 -> 오류 발생
        return Response(
            {
                # get_serializer_context: serializer에 포함되어야 할 어떠한 정보의 context를 딕셔너리 형태로 리턴
                # 디폴트 정보 context는 request, view, format
                "user": UserSerializer(user, context=self.get_serializer_context()).data
            },
            status=status.HTTP_201_CREATED,
        )


# @csrf_exempt
# def signup(request):
#     if request.method == "POST":
#         user_form = UserCustomCreationForm(request.POST)
#         if user_form.is_valid():
#             user = user_form.save(commit=False)
#             user.is_active = False
#             user.save()
#             current_site = get_current_site(request)
#             message = render_to_string(
#                 "users/user_activate_email.html",
#                 {
#                     "user": user,
#                     "domain": current_site.domain,
#                     "uid": urlsafe_base64_encode(force_bytes(user.pk)),
#                     "token": account_activation_token.make_token(user),
#                 },
#             )
#             # sending mail to future user
#             mail_subject = "Activate your blog account."
#             to_email = user_form.cleaned_data.get("email")
#             email = EmailMessage(mail_subject, message, to=[to_email])
#             email.send()

#             # user가 생기자마자 바로 해결, 미해결 폴더 만들기
#             # return HttpResponse('Please confirm your email address to complete the registration') -> 이메일 인증 성공 확인 가능 메세지

#             return redirect("users:login")
#     else:
#         user_form = UserCustomCreationForm()

#     ctx = {"signup_form": user_form}
#     return render(request, "users/signup.html", context=ctx)


# 이메일 인증 후 계정 활성화
def activate(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        login(request, user, backend="django.contrib.auth.backends.ModelBackend")
        return redirect("posts:main")
    else:
        return HttpResponse("Activation link is invalid!")


# 로그인
@permission_classes([AllowAny])
class UserLoginSerializer(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_vaild(raise_exception=True):
            return Response(
                {"message": "Request Body Error"}, status=status.HTTP_409_CONFLICT
            )

        serializer.is_vaild(raise_exception=True)
        user = serializer.vaildated_data


"""@csrf_exempt
def log_in(request):
    context = {}
    if request.method == "POST":
        form = AuthenticationCustomForm(request, request.POST)
        if form.is_valid():
            # login(request, form.get_uer())
            login(
                request,
                form.get_user(),
                backend="django.contrib.auth.backends.ModelBackend",
            )  # 추가
            user = form.get_user()
            return redirect("posts:main")

    else:
        form = AuthenticationCustomForm()
    ctx = {"form": form}
    return render(request, template_name="users/login.html", context=ctx)
"""

# 로그아웃
@login_required
def log_out(request):
    logout(request)
    return redirect("users:login")


# 비밀번호를 모르겠을때, email을 작성하는 부분
def password_reset(request):
    # email 받으면
    if request.method == "POST":
        email = request.POST.get("email")
        username = request.POST.get("username")
        # email 이 존재하는 이메일인지 확인
        if User.objects.filter(email=email, username=username).exists():
            # 있으면 메일 보내기
            user = User.objects.get(email=email, username=username)
            current_site = get_current_site(request)
            message = render_to_string(
                "users/password_reset_email.html",
                {
                    "user": user,
                    #'domain': current_site.domain,
                    #'domain': my_site.domain,
                    "uid": urlsafe_base64_encode(force_bytes(user.pk)),
                    "token": password_reset_token.make_token(user),
                },
            )
            # sending mail to future user
            mail_subject = "Change your Password."
            email = EmailMessage(mail_subject, message, to=[email])
            email.send()
            return HttpResponse(
                '<div style="font-size: 40px; width: 100%; height:100%; display:flex; text-align:center; '
                'justify-content: center; align-items: center;">'
                "입력하신 이메일<span>로 인증 링크가 전송되었습니다.</span>"
                "</div>"
            )
        else:
            # 없으면 없는 메일ㅇ이라고 하고 다시 redirect
            return redirect("users:password_reset")
    else:
        return render(request, template_name="users/password_reset.html")


# 이메일 인증
def password_reset_email(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    # 잘 넘어오면
    if user is not None and password_reset_token.check_token(user, token):
        ctx = {
            "user": user,
        }
        return redirect("users:password_reset_form", user.id)
    else:
        ctx = {"user": user}
        return render(request, template_name="password_email_fail.html", context=ctx)


def password_reset_form(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == "POST":
        new_password = request.POST.get("password1")
        password_confirm = request.POST.get("password2")
        if new_password == password_confirm and len(new_password) >= 8:
            user.set_password(new_password)
            user.save()
            login(request, user, backend="django.contrib.auth.backends.ModelBackend")
            return redirect("users:login")
    ctx = {"user": user}
    return render(request, template_name="users/password_reset_form.html", context=ctx)


# _______________________________________________social login____________________________________________
# github login
def github_login(request):
    client_id = os.environ.get("GITHUB_ID")
    redirect_uri = "https://diggging.com/users/login/github/callback"
    return redirect(
        f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=read:user"
    )


def github_callback(request):
    try:
        client_id = os.environ.get("GITHUB_ID")
        client_secret = os.environ.get("GITHUB_SECRET")
        code = request.GET.get("code", None)
        if code is not None:
            token_request = requests.post(
                f"https://github.com/login/oauth/access_token?client_id={client_id}&client_secret={client_secret}&code={code}",
                headers={"Accept": "application/json"},
            )
            token_json = token_request.json()
            error = token_json.get("error", None)
            if error is not None:
                raise Exception("Can't get access token")
            else:
                access_token = token_json.get("access_token")
                profile_request = requests.get(
                    "https://api.github.com/user",
                    headers={
                        "Authorization": f"token {access_token}",
                        "Accept": "application/json",
                    },
                )
                profile_json = profile_request.json()
                user_name = profile_json.get("login", None)
                if user_name is not None:
                    # email = profile_json.get("email")
                    try:
                        user = User.objects.get(username=user_name)
                        if user.login_method != User.LOGIN_GITHUB:
                            raise Exception(f"Please log in with: {user.login_method}")
                    except User.DoesNotExist:
                        user = User.objects.create(
                            username=user_name,
                            user_nickname=user_name,
                            login_method=User.LOGIN_GITHUB,
                        )
                        user.set_unusable_password()
                        user.save()
                    login(
                        request,
                        user,
                        backend="django.contrib.auth.backends.ModelBackend",
                    )
                    ctx = {"user": user}
                    return redirect("posts:main")
                else:
                    raise Exception("Can't get your profile")
        else:
            raise Exception("Can't get code")
    except Exception as e:
        messages.error(request, e)
        return redirect(reverse("users:login"))


# ________________________________________________ mypage ________________________________________________
# my page
def my_page(request, pk):
    # 왼쪽 상단 - host의 상태를 위한 변수들
    host = get_object_or_404(User, pk=pk)
    host_following = host.user_following.all()
    host_follower = host.user_followed.all()

    # 폴더 보여주기위한 변수
    language_folders = Folder.objects.filter(folder_user=host, folder_kind="language")
    framework_folders = Folder.objects.filter(folder_user=host, folder_kind="framework")
    solve_folders = Folder.objects.filter(folder_user=host, folder_kind="solved")

    # 질문 모음
    my_questions = QuestionPost.objects.filter(user=host)
    questions_language_folder = QuestionFolder.objects.filter(
        folder_user=host, folder_kind="language"
    )
    questions_framework_folder = QuestionFolder.objects.filter(
        folder_user=host, folder_kind="framework"
    )

    # 최근에 남긴 질문
    my_recent_questions = QuestionPost.objects.filter(user=host).order_by("-created")
    # 지수가 필요해서 넣었음
    my_recent_logs = Post.objects.filter(user=host).order_by("-created")

    # 모래
    my_sand = Sand.objects.filter(user=host).order_by("-id")
    my_sand_sum = my_sand.aggregate(Sum("amount"))
    sands = serializers.serialize("json", my_sand)
    if my_sand_sum["amount__sum"] == None:
        my_sand_sum = 0
    else:
        if int(my_sand_sum["amount__sum"]) < 2000:
            host.user_level = 0
        elif int(my_sand_sum["amount__sum"]) < 7000:
            host.user_level = 1
        elif int(my_sand_sum["amount__sum"]) < 18000:
            host.user_level = 2
        else:
            host.user_level = 3

    ctx = {
        # 왼쪽 상단을 위한 변수
        "host": host,
        "host_follower": host_follower,
        "host_following": host_following,
        "language_folders": language_folders,
        "framework_folders": framework_folders,
        "solve_folders": solve_folders,
        "questions_language_folder": questions_language_folder,
        "questions_framework_folder": questions_framework_folder,
        #'my_questions': my_questions,
        "my_recent_questions": my_recent_questions,
        "my_recent_logs": my_recent_logs,
        "my_all_sands": my_sand,  # sand 모든 object list
        "my_sand_sum": my_sand_sum,  # 현재까지 sand 총합
        "sands": sands,
    }
    return render(request, template_name="users/my_page.html", context=ctx)


def my_posts(request, host_id):
    # 왼쪽 상단 - host의 상태를 위한 변수들
    host = get_object_or_404(User, pk=host_id)
    host_following = host.user_following.all()
    host_follower = host.user_followed.all()

    # 폴더 보여주기위한 변수
    language_folders = Folder.objects.filter(folder_user=host, folder_kind="language")
    framework_folders = Folder.objects.filter(folder_user=host, folder_kind="framework")
    solve_folders = Folder.objects.filter(folder_user=host, folder_kind="solved")

    # 질문 모음
    my_questions = QuestionPost.objects.filter(user=host)
    """questions_language_folder = QuestionFolder.objects.filter(
        folder_user=host, folder_kind="language"
    )
    questions_framework_folder = QuestionFolder.objects.filter(
        folder_user=host, folder_kind="framework"
    )"""

    # 최근에 남긴 질문
    my_recent_questions = QuestionPost.objects.filter(user=host).order_by("-created")
    # 지수가 필요해서 넣었음
    my_recent_logs = Post.objects.filter(user=host).order_by("-created")

    # 모래
    my_sand = Sand.objects.filter(user=host).order_by("-id")
    my_sand_sum = my_sand.aggregate(Sum("amount"))
    sands = serializers.serialize("json", my_sand)
    if my_sand_sum["amount__sum"] == None:
        my_sand_sum = 0
    else:
        if int(my_sand_sum["amount__sum"]) < 2000:
            host.user_level = 0
        elif int(my_sand_sum["amount__sum"]) < 7000:
            host.user_level = 1
        elif int(my_sand_sum["amount__sum"]) < 18000:
            host.user_level = 2
        else:
            host.user_level = 3

    ctx = {
        # 왼쪽 상단을 위한 변수
        "host": host,
        "host_follower": host_follower,
        "host_following": host_following,
        #'my_questions': my_questions,
        "my_recent_questions": my_recent_questions,
        "my_recent_logs": my_recent_logs,
        "my_all_sands": my_sand,  # sand 모든 object list
        "my_sand_sum": my_sand_sum,  # 현재까지 sand 총합
        "sands": sands,
    }
    return render(request, template_name="users/my_posts.html", context=ctx)


def my_questions(request, host_id):
    # 왼쪽 상단 - host의 상태를 위한 변수들
    host = get_object_or_404(User, pk=host_id)
    host_following = host.user_following.all()
    host_follower = host.user_followed.all()

    # 폴더 보여주기위한 변수

    # 질문 모음
    my_questions = QuestionPost.objects.filter(user=host)

    # 최근에 남긴 질문
    my_recent_questions = QuestionPost.objects.filter(user=host).order_by("-created")
    # 지수가 필요해서 넣었음
    my_recent_logs = Post.objects.filter(user=host).order_by("-created")

    # 모래
    my_sand = Sand.objects.filter(user=host).order_by("-id")
    my_sand_sum = my_sand.aggregate(Sum("amount"))
    sands = serializers.serialize("json", my_sand)
    if my_sand_sum["amount__sum"] == None:
        my_sand_sum = 0
    else:
        if int(my_sand_sum["amount__sum"]) < 2000:
            host.user_level = 0
        elif int(my_sand_sum["amount__sum"]) < 7000:
            host.user_level = 1
        elif int(my_sand_sum["amount__sum"]) < 18000:
            host.user_level = 2
        else:
            host.user_level = 3

    ctx = {
        # 왼쪽 상단을 위한 변수
        "host": host,
        "host_follower": host_follower,
        "host_following": host_following,
        #'my_questions': my_questions,
        "my_recent_questions": my_recent_questions,
        "my_recent_logs": my_recent_logs,
        "my_all_sands": my_sand,  # sand 모든 object list
        "my_sand_sum": my_sand_sum,  # 현재까지 sand 총합
        "sands": sands,
    }
    return render(request, template_name="users/my_questions.html", context=ctx)


def my_answers(request, host_id):
    # 왼쪽 상단 - host의 상태를 위한 변수들
    host = get_object_or_404(User, pk=host_id)
    host_following = host.user_following.all()
    host_follower = host.user_followed.all()

    # 질문 모음
    my_questions = QuestionPost.objects.filter(user=host)

    # 최근에 남긴 질문
    my_recent_questions = QuestionPost.objects.filter(user=host).order_by("-created")
    # 지수가 필요해서 넣었음
    my_recent_logs = Post.objects.filter(user=host).order_by("-created")

    # 모래
    my_sand = Sand.objects.filter(user=host).order_by("-id")
    my_sand_sum = my_sand.aggregate(Sum("amount"))
    if my_sand_sum["amount__sum"] == None:
        my_sand_sum = 0
    else:
        if int(my_sand_sum["amount__sum"]) < 2000:
            host.user_level = 0
        elif int(my_sand_sum["amount__sum"]) < 7000:
            host.user_level = 1
        elif int(my_sand_sum["amount__sum"]) < 18000:
            host.user_level = 2
        else:
            host.user_level = 3

    ctx = {
        # 왼쪽 상단을 위한 변수
        "host": host,
        "host_follower": host_follower,
        "host_following": host_following,
        #'my_questions': my_questions,
        "my_recent_questions": my_recent_questions,
        "my_recent_logs": my_recent_logs,
        "my_all_sands": my_sand,  # sand 모든 object list
        "my_sand_sum": my_sand_sum,  # 현재까지 sand 총합
    }
    return render(request, template_name="users/my_answers.html", context=ctx)


# -----삽질 기록모음, mypage
@csrf_exempt
def lang_folder(request, pk):
    host = get_object_or_404(User, pk=pk)
    folder = Folder.objects.filter(folder_user=host, folder_kind="language")
    data = folder.values()

    return JsonResponse(list(data), safe=False)


@csrf_exempt
def solved_folder(request, pk):
    host = get_object_or_404(User, pk=pk)
    folder = Folder.objects.filter(folder_user=host, folder_kind="solved")
    data = folder.values()

    return JsonResponse(list(data), safe=False)


@csrf_exempt
def framework_folder(request, pk):
    host = get_object_or_404(User, pk=pk)
    folder = Folder.objects.filter(folder_user=host, folder_kind="framework")
    data = folder.values()

    return JsonResponse(list(data), safe=False)


##folder post
@csrf_exempt
def lang_folder_posts(request, pk):
    folder = Folder.objects.get(pk=pk)
    posts = Post.objects.filter(folder=folder)
    data = posts.values()

    # comment, user정보를 보내줘야 할거 같음
    # 내정보 받아오기
    # user = User.objects.filter(pk=folder.folder_user.id)
    # user_data = serializers.serialize('json', user)

    # comments = []
    # for post in posts:
    #     comments.append(post.comments.all())
    # comments_data = serializers.serialize('json',comments)

    # questions user
    # a = User.objects.get(pk=question_post.user.id)
    # question_comments 개수

    # ctx = {
    #     'data': data,
    #     'user': user_data,
    #     'comments': comments_data,
    # }

    return JsonResponse(list(data), safe=False)


@csrf_exempt
def solved_folder_posts(request, pk):
    folder = Folder.objects.get(pk=pk)
    posts = Post.objects.filter(folder=folder)
    data = posts.values()

    return JsonResponse(list(data), safe=False)


@csrf_exempt
def framework_folder_posts(request, pk):
    folder = Folder.objects.get(pk=pk)
    posts = Post.objects.filter(folder=folder)
    data = posts.values()

    return JsonResponse(list(data), safe=False)


# ---------질문 모음
@csrf_exempt
def questions_lang_folder(request, pk):
    host = get_object_or_404(User, pk=pk)
    folder = QuestionFolder.objects.filter(folder_user=host, folder_kind="language")
    data = folder.values()

    return JsonResponse(list(data), safe=False)


def questions_lang_post(request, pk):
    folder = QuestionFolder.objects.get(pk=pk)
    posts = QuestionPost.objects.filter(question_folder=folder)
    data = posts.values()
    return JsonResponse(list(data), safe=False)


def questions_framework_folder(request, pk):
    host = get_object_or_404(User, pk=pk)
    folder = QuestionFolder.objects.filter(folder_user=host, folder_kind="framework")
    data = folder.values()

    return JsonResponse(list(data), safe=False)


def questions_framework_post(request, pk):
    folder = QuestionFolder.objects.get(pk=pk)
    posts = QuestionPost.objects.filter(question_folder=folder)
    data = posts.values()

    return JsonResponse(list(data), safe=False)


# 한번 누르면 follow, 두번 누르면 unfollow
def follow(request, host_pk):
    # 여기서 오는 pk는 내가 follow하려는 사람의 pk임
    # TODO post 상황과 get 상황 나눠야함!!!
    me = request.user
    host = get_object_or_404(User, pk=host_pk)

    if me.user_following.filter(pk=host_pk).exists():
        # 삭제
        me.user_following.remove(host)
        host.user_followed.remove(me)
    else:
        # 나의 following에 pk 추가
        me.user_following.add(host)
        # host의 follower에 나 추가
        host.user_followed.add(me)
        host_alarm = Alarm.objects.create(
            user=host, reason=me.user_nickname + " 님이 나를 팔로우합니다."
        )

    return redirect("users:my_page", host_pk)


def account_detail(request, pk):
    host = get_object_or_404(User, pk=pk)
    # 모래
    my_sand = Sand.objects.filter(user=host).order_by("-id")
    my_sand_sum = my_sand.aggregate(Sum("amount"))
    sands = serializers.serialize("json", my_sand)
    if my_sand_sum["amount__sum"] == None:
        my_sand_sum = 0
    else:
        if int(my_sand_sum["amount__sum"]) < 2000:
            host.user_level = 0
        elif int(my_sand_sum["amount__sum"]) < 7000:
            host.user_level = 1
        elif int(my_sand_sum["amount__sum"]) < 18000:
            host.user_level = 2
        else:
            host.user_level = 3
    ctx = {
        "host": host,
        "my_all_sands": my_sand,  # sand 모든 object list
        "my_sand_sum": my_sand_sum,  # 현재까지 sand 총합
    }
    return render(request, template_name="users/account_detail.html", context=ctx)


def change_desc(request, pk):
    context = {}
    user = get_object_or_404(User, pk=pk)
    if request.method == "POST":
        new_desc = request.POST.get("new_desc")
        user.user_profile_content = new_desc
        user.save()
        return redirect("users:account_detail", user.id)
    return redirect("users:account_detail", user.id)


def change_nickname(request, pk):
    context = {}
    if request.method == "POST":
        new_nickname = request.POST.get("new_nickname")
        user = get_object_or_404(
            User, pk=pk
        )  # 내 계정 고치기는 페이지가 host = 접속한 사람이여야만 보이게 해야함! (front)
        if User.objects.filter(user_nickname=new_nickname):
            context.update({"error": "이미 존재하는 별명입니다."})

        else:
            user.user_nickname = new_nickname
            user.save()
            return redirect("users:account_detail", user.id)
    return redirect("users:account_detail", user.id)


def change_pw(request, pk):
    context = {}
    if request.method == "POST":
        current_password = request.POST.get("origin_password")
        user = get_object_or_404(User, pk=pk)
        if check_password(current_password, user.password):
            new_password = request.POST.get("password1")
            password_confirm = request.POST.get("password2")
            if new_password == password_confirm and len(new_password) >= 8:
                user.set_password(new_password)
                user.save()
                # backend 인자 추가
                login(
                    request, user, backend="django.contrib.auth.backends.ModelBackend"
                )
                return redirect("users:login")
            else:
                context.update({"error": "새로운 비밀번호를 다시 확인해주세요."})
    else:
        context.update({"error": "현재 비밀번호가 일치하지 않습니다."})

    return redirect("users:login")


def change_img(request, pk):
    user = get_object_or_404(User, pk=pk)
    if request.method == "POST":
        new_img = request.FILES.get("new_img", None)
        if new_img:
            # 원래 이미지 삭제
            if user.user_profile_image != "../static/image/profile_img.jpg":
                user.user_profile_image.delete()
            # 새이미지로 바꿈
            user.user_profile_image = new_img
            user.save()
    return redirect("users:account_detail", user.id)


# ________________________________________________ alarm ________________________________________________
@csrf_exempt
def alarm(request, pk):
    me = User.objects.get(id=pk)  # 누구의 alarm인지
    my_alarm = Alarm.objects.filter(user=me)  # 주인의 alarm 모두 가져오기
    my_alarm = my_alarm.order_by("-id")
    not_check_alarm = my_alarm.filter(is_checked=False)  # 그중 False인애들 가져와서
    for alarm in not_check_alarm:
        alarm.is_checked = True
        alarm.save()

    data = serializers.serialize("json", my_alarm)

    return JsonResponse(
        {
            "data": data,
        }
    )
