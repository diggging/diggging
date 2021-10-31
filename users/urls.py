from django.conf.urls import url
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name = "users"

urlpatterns = [
    path("api/register/", view=views.registerAPI.as_view(), name="register"),
    # url(r'^signup/$', views.signup, name='signup'),
    path("activate/<slug:uidb64>/<slug:token>/", views.activate, name="activate"),
    # path("api/login/", views.LoginAPI.as_view(), name="login"),
    # path("login/", view=views.log_in, name="login"),  # login
    # path("logout/", view=views.log_out, name="logout"),  # logout
    # path('password_reset/', auth_views.PasswordResetView.as_view(), name="password_reset"),
    # path('password_reset_done/', views.UserPasswordResetDoneView.as_view(), name="password_reset_done"),
    # path('password_reset_confirm/<uuid:uidb64>/<slug:token>/', auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    # path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    # path('password_reset/', views.MyPasswordResetView.as_view(), name='password_reset'),
    # path('password_reset_confirm/<uidb64>/<token>/', views.MyPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # path('password_reset_done/', views.MyPasswordResetDoneView.as_view(), name='password_reset_done'),
    path("password_reset/", view=views.password_reset, name="password_reset"),
    path(
        "password_reset_email/<slug:uidb64>/<slug:token>/",
        views.password_reset_email,
        name="password_reset_email",
    ),
    path(
        "<int:pk>/password_reset_form/",
        view=views.password_reset_form,
        name="password_reset_form",
    ),
    # my_page
    path("<int:pk>/my_page/", view=views.my_page, name="my_page"),  # my page
    path("<int:host_pk>/follow", view=views.follow, name="follow"),
    path("<int:pk>/account_detail", view=views.account_detail, name="account_detail"),
    path("<int:pk>/change_desc/", view=views.change_desc, name="change_desc"),
    path(
        "<int:pk>/change_nickname/", view=views.change_nickname, name="change_nickname"
    ),
    path("<int:pk>/change_pw/", view=views.change_pw, name="change_pw"),
    path("<int:pk>/change_img/", view=views.change_img, name="change_img"),
    # github login
    path("login/github", views.github_login, name="github_login"),
    path("login/github/callback", views.github_callback, name="github_callback"),
    path("<int:pk>/alarm/", view=views.alarm, name="alarm"),
    # 삽질기록모음 ajax
    path("<int:pk>/lang_folder/", views.lang_folder, name="lang_folder"),
    path("<int:pk>/solved_folder/", views.solved_folder, name="solved_folder"),
    path("<int:pk>/framework_folder/", views.framework_folder, name="framework_folder"),
    path(
        "<int:pk>/lang_folder_posts/", views.lang_folder_posts, name="lang_folder_posts"
    ),
    path(
        "<int:pk>/solved_folder_posts/",
        views.solved_folder_posts,
        name="solved_folder_posts",
    ),
    path(
        "<int:pk>/framework_folder_posts/",
        views.framework_folder_posts,
        name="framework_folder_posts",
    ),
    # 질문모음 ajax
    path(
        "<int:pk>/questions_lang_folder/",
        views.questions_lang_folder,
        name="questions_lang_folder",
    ),
    path(
        "<int:pk>/questions_lang_post/",
        views.questions_lang_post,
        name="questions_lang_post",
    ),
    path(
        "<int:pk>/questions_framework_folder/",
        views.questions_framework_folder,
        name="questions_framework_folder",
    ),
    path(
        "<int:pk>/questions_framework_post/",
        views.questions_framework_post,
        name="questions_framework_post",
    ),
    # my page
    path("<int:host_id>/my_page/my_posts", view=views.my_posts, name="my_posts"),
    path(
        "<int:host_id>/my_page/my_questions",
        view=views.my_questions,
        name="my_questions",
    ),
    # path('dashboard/', view=views.index, name="dashboard"),
]
