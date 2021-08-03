from django import forms
from django.db.models import fields
from django.db.models.fields import files
from .models import Post


class PostForm(forms.modelForm):
    class Meta:
        model = Post
        fields = {'title', 'problem_solving',
                  'os', 'error_message', 'desc', 'code'}
        # tool 이랑 프레임워크 넣어야함
