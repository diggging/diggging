from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name="users"

urlpatterns = [
    path('signup/', view=views.signup, name="signup"),   # 회원가입하는 페이지
    path('login/', view=views.log_in, name="login"),   # login
    path("logout/", view=views.log_out, name="logout"),  # logout   


    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset_done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password_reset_confirm/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),


    path('<int:pk>/my_page/', view=views.my_page, name="my_page"),   # my page
    path('<int:host_pk>/follow', view=views.follow, name = "follow"),

    path('<int:pk>/account_detail', view=views.account_detail, name = "account_detail"),
    path('<int:pk>/change_nickname/', view=views.change_nickname, name="change_nickname"),
    path('<int:pk>/change_pw/', view=views.change_pw, name="change_pw"),
    path('<int:pk>/change_img/', view=views.change_img, name="change_img"),
] 