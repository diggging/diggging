from django import forms
from django.db.models import fields
from .models import User
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user, get_user_model
from django.contrib.auth.forms import UserChangeForm

# 회원 가입을 위한 form
class UserCustomCreationForm(UserCreationForm):
    class Meta:
        #model = User
        model = get_user_model()
        fields = ("username","email", "user_nickname", "password1", "password2")

# 웹 페이지 이용자 회원가입을 위한 form
class WebUserCreationForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        