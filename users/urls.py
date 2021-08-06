from django.conf.urls import url
from django.urls import path
from . import views

app_name="users"

urlpatterns = [
    # path('signup/', view=views.signup, name="signup"),   # 회원가입하는 페이지
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        views.activate, name='activate'),
    path('login/', view=views.log_in, name="login"),   # login
    path("logout/", views.log_out, name="logout"),  # logout   

    path('<int:pk>/my_page/', view=views.my_page, name="my_page"),   # my page
    path('<int:host_pk>/follow', view=views.follow, name = "follow"),

    path('<int:pk>/account_detail', view=views.account_detail, name = "account_detail"),
    path('change_nickname/', view=views.change_nickname, name="change_nickname"),
    path('change_pw/', view=views.change_pw, name="change_pw"),
] 

# url(
#         r'^register/$',
#         UserCreateView.as_view(),
#         name='register'
#     ),
#     url(
#         r'^register/done/$',
#         UserCreateDoneTemplateView.as_view(),
#         name='register-done'
#     ),
#     url(
#         r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
#         UserActivateView.as_view(),
#         name='activate'
#     )