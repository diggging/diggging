from django import forms
from django.db.models import fields
from .models import User
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import get_user_model

# class SignUpForm(forms.ModelForm):
#     password2 = forms.CharField(
#         label='Password confirmation', widget=forms.PasswordInput)
#     class Meta:
#         model = User
#         fields = ("username","email", "user_nickname", "password", "password2")

#     def clean(self):
#         password = self.cleaned_data.get('password')
#         password2 = self.cleaned_data.get("password2")
#         if password and password2 and password != password2:
#             raise forms.ValidationError("Passwords don't match")
#         return password
    

# 회원 가입을 위한 form
class UserCustomCreationForm(UserCreationForm):
    class Meta:
        #model = User
        model = get_user_model()
        fields = ("username","email", "user_nickname", "password1", "password2")



# class LoginForm(forms.Form):
#     username = forms.CharField(max_length=200)
#     password = forms.CharField(widget=forms.PasswordInput)

#     def clean(self):
#         username = self.cleaned_data.get('username')
#         password = self.cleaned_data.get('password')
#         try:
#             user = User.objects.get(username=username)
#             if user.check_password(password):
#                 return self.cleaned_data
#             else:
#                 raise forms.ValidationError('비밀번호를 잘못 입력하셨습니다.')
#         except User.DoesNotExist:
#             raise forms.ValidationError('사용자가 존재하지 않습니다.')