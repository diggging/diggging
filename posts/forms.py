from django import forms
from django.db.models import fields
from django.db.models.fields import files
from .models import Post


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = {
            "user",
            "title",
            "problem_solving",
            "os",
            "language",
            "error_message",
            "image",
            "desc",
        }


class PostSearchForm(forms.Form):
    search_word = forms.CharField(label="Search Word")
