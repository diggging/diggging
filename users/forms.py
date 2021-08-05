from django import forms
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
from django.contrib.auth import get_user, get_user_model
from django.contrib.auth.forms import UserChangeForm

# 회원 가입을 위한 form
class UserCustomCreationForm(UserCreationForm):
    class Meta:
        #model = User
        model = get_user_model()
        fields = ("username","email", "user_nickname", "password1", "password2")

# # 웹 페이지 이용자 회원가입을 위한 form
# class WebUserCreationForm(UserCustomCreationForm):
#     def __init__(self, *args, **kwargs):
#         # important to "pop" added kwarg before call to parent's constructor
#         self.request = kwargs.pop('request')
#         super(UserCustomCreationForm, self).__init__(*args, **kwargs)

#     def save(self, commit=True):
#         user = super(WebUserCreationForm, self).save(commit=False)

#         if commit:
#             user.is_active = False
#             user.save()

#             # Send user activation mail
#             current_site = get_current_site(self.request)
#             subject = (_('Welcome to %s! Please confirm your email') % current_site.name)
#             message = render_to_string('users/user_activate_email.html', {
#                 'user': user,
#                 'domain': current_site.domain,
#                 'uid': urlsafe_base64_encode(force_bytes(user.pk)),
#                 'token': PasswordResetTokenGenerator().make_token(user),
#             })
#             email = EmailMessage(subject, message, to=[user.email])
#             email.send()
        
#         return user
