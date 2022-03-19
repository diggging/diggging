from django.urls import path
from . import views

app_name = "users"

urlpatterns = [
    path("api/Signup/", views.Registration.as_view(), name="Signup"),
    path("api/userinfo/", views.LoadUserView.as_view(), name="userinfo"),
    path("api/Logout/", views.LogoutView.as_view(), name="Logout"),
    path(
        "activate/<slug:uidb64>/<slug:token>/",
        views.UserActivate.as_view(),
        name="activate",
    ),
    path(
        "password_reset_API/",
        view=views.Password_resetAPI.as_view(),
        name="password_reset_API",
    ),
    path(
        "request-reset-email/",
        view=views.RequestPasswordResetEmail.as_view(),
        name="request-reset-email",
    ),
    # ------ 바꾸어야할것들----------------
    # my_page
    path("<int:pk>/my_page/", view=views.my_page, name="my_page"),  # my page
    path("<int:host_pk>/follow", view=views.follow, name="follow"),
    path("<int:pk>/account_detail", view=views.account_detail, name="account_detail"),
    path("<int:pk>/change_desc/", view=views.ChangeDesc.as_view(), name="change_desc"),
    path(
        "<int:pk>/change_nickname/",
        view=views.ChangeNicknameApi.as_view(),
        name="change_nickname",
    ),
    path(
        "<int:pk>/change_pw/", view=views.ChangepasswordView.as_view(), name="change_pw"
    ),
    path("<int:pk>/change_img/", view=views.ChangeImgView.as_view(), name="change_img"),
    # github login
    path("login/github", views.github_login, name="github_login"),
    path("login/github/callback", views.github_callback, name="github_callback"),
    path("<int:pk>/alarm/", views.AlarmAPI.as_view(), name="alarm"),
    path("alarm/<int:pk>/", views.UpdateAlarmAPIView.as_view(), name="alarm_update"),
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
    # new url
    # path('password-reset/<uidb64>/<token>', view = views.PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
    # path('password-reset-complete', view = views.SetNewPasswordAPIView.as_view(), name='password-reset-complete')
]
