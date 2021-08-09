from django import forms
from django.forms.utils import ErrorList
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail.message import EmailMessage
from django.db.models import fields
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import User
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user, get_user_model, authenticate
from django.contrib.auth.forms import UserChangeForm
from django.utils.text import capfirst
import re

# 회원 가입을 위한 form
class UserCustomCreationForm(UserCreationForm):
    #placeholder
    username= forms.CharField(widget=forms.TextInput
                        (attrs={'placeholder':'사용할 아이디를 입력해 주세요'}))
    email = forms.CharField(widget=forms.TextInput
                        (attrs={'placeholder': '사용할 이메일을 입력해 주세요'}))
    user_nickname = forms.CharField(widget=forms.TextInput
                        (attrs={'placeholder': '사용할 닉네임을 입력해주세요(최대8자)'}))
    password1 = forms.CharField(widget=forms.PasswordInput
                        (attrs={'placeholder': '사용할 비밀번호를 입력해주세요'}))
    password2 = forms.CharField(widget=forms.PasswordInput
                        (attrs={'placeholder': '비밀번호를 재입력해주세요'}))

    #eror_messages custom
    error_messages = {
        'existed_id': '이미 존재하는 아이디 입니다.',
        'existed_username': '이미 존재하는 닉네임입니다.',
        'discorded_password': '비밀번호가 불일치 합니다.',
        'password_format_error': '6자 이상 입력해 주세요.',
        'email_format_error': '이메일 형식이 잘못됐습니다.'
    }

    class Meta:
        #model = User
        model = get_user_model()
        fields = ("username","email", "user_nickname", "password1", "password2")
    
    # 이미 존재하는 아이디 검사
    def clean_username(self):
        input_username = self.cleaned_data.get("username")
        if User.objects.filter(username=input_username):
            raise forms.ValidationError(
                self.error_messages['existed_id'],
                code='existed_id'
            )
        return input_username

    # 이미 존재하는 아이디 검사
    def clean_email(self):
        valided_email = re.compile('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
        input_email = self.cleaned_data.get("email")
        if input_email and valided_email.match(input_email) == False:
            raise forms.ValidationError(
                self.error_messages['email_format_error'],
                code='email_format_error'
            )
        return input_email
    
    #이미 존재하는 닉네임 검사
    def clean_user_nickname(self):
        input_nickname = self.cleaned_data.get("user_nickname")
        if User.objects.filter(user_nickname=input_nickname):
            raise forms.ValidationError(
                self.error_messages['existed_username'],
                code='existed_username'
            )
        return input_nickname

    # password1 != password2 검사
    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                self.error_messages['discorded_password'],
                code='discorded_password',
            )
        #비밀번호 format검사
        if password1 and password2 and password1 == password2:
            if len(str(password1)) < 6 and len(str(password2)) < 6:
                raise forms.ValidationError(
                    self.error_messages['password_format_error'],
                    code='password_format_error',
                )
        return password2

#로그인 custom
class AuthenticationCustomForm(AuthenticationForm):

    username= forms.CharField(widget=forms.TextInput
                        (attrs={'placeholder':'아이디를 입력해 주세요'}))
    password = forms.CharField(widget=forms.PasswordInput
                        (attrs={'placeholder': '비밀번호를 입력해주세요'}))

    error_messages = {
        'invalid_login': "로그인을 다시 확인해주세요",
        'inactive': "이메일 인증을 확인해주세요.",
    }

    #아이디, 비밀번호 검증
    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            self.user_cache = authenticate(username=username, password=password)
            if self.user_cache is None:
                raise forms.ValidationError(
                    self.error_messages['invalid_login'],
                    code='invalid_login',
                    params={'username': self.username_field.verbose_name},
                )
            else:
                self.confirm_login_allowed(self.user_cache)

        return self.cleaned_data

    #이메일 검증
    def confirm_login_allowed(self, user):

        if not user.is_active:
            raise forms.ValidationError(
                self.error_messages['inactive'],
                code='inactive',
            )   