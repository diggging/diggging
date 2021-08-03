from django import forms
from django.db.models import fields
from django.db.models.fields import files
from .models import Post, Tool


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = {'title', 'problem_solving',
                  'os', 'error_message', 'image', 'dev_tool', 'desc'}


class ToolForm(forms.ModelForm):
    class Meta:
        model = Tool
        fields = '__all__'
