from django.conf.urls import url
from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

app_name="users"

urlpatterns = [
    url(r'^signup/$', views.signup, name='signup'),
    path('activate/<slug:uidb64>/<slug:token>/', views.activate, name="activate"),
    path('login/', view=views.log_in, name="login"),   # login
    path("logout/", view=views.log_out, name="logout"),  # logout   


    #path('password_reset/', auth_views.PasswordResetView.as_view(), name="password_reset"),
    #path('password_reset_done/', views.UserPasswordResetDoneView.as_view(), name="password_reset_done"),
    # path('password_reset_confirm/<uuid:uidb64>/<slug:token>/', auth_views.PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    # path('password_reset_complete/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    #path('password_reset/', views.MyPasswordResetView.as_view(), name='password_reset'),
    #path('password_reset_confirm/<uidb64>/<token>/', views.MyPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    #path('password_reset_done/', views.MyPasswordResetDoneView.as_view(), name='password_reset_done'),
    path('password_reset/', view=views.password_reset, name='password_reset'),
    path('password_reset_email/<slug:uidb64>/<slug:token>/', views.activate, name="password_reset_email"),
    path('<int:pk>/password_reset_form/', view=views.password_reset_form, name="password_reset_form")

    path('<int:pk>/my_page/', view=views.my_page, name="my_page"),   # my page
    path('<int:host_pk>/follow', view=views.follow, name = "follow"),

    path('<int:pk>/account_detail', view=views.account_detail, name = "account_detail"),
    path('<int:pk>/change_nickname/', view=views.change_nickname, name="change_nickname"),
    path('<int:pk>/change_pw/', view=views.change_pw, name="change_pw"),
    path('<int:pk>/change_img/', view=views.change_img, name="change_img"),
    #github login
    path('login/github', views.github_login, name="github_login"),
    path('login/github/callback', views.github_callback, name="github_callback"),
] 