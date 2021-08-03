from django.urls import path
from . import views

app_name="users"

urlpatterns = [
    path('signup/', view=views.signup, name="signup"),   # 회원가입하는 페이지
    path('login/', view=views.log_in, name="login"),   # login
    path("logout/", views.log_out, name="logout"),  # logout   
    path('/<int:pk>/my_page/', view=views.my_page, name="my_page"),   # my page
] 