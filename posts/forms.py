from django import forms
from django.db.models import fields
from django.db.models.fields import BooleanField, files
from django.forms.widgets import RadioSelect
from .models import Post
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = {
            "title",
            "problem_solving",
            "os",
            "language",
            "framework",    # frame work 용 절대 지우지마 
            "error_message",
            "image",
            "desc",
            "tag",
            "is_public",
            "is_friend",
        }
        widgets = {
            "title": forms.TextInput(
                attrs={"class": "title_input", "placeholder": "제목을 입력하세요."}
            ),
            "error_message": forms.TextInput(
                attrs={"class": "title_input", "placeholder": "발견한 에러메시지를 기록하세요."},
            ),
            "desc": forms.CharField(widget=CKEditorUploadingWidget()),
        }

class SelectForm(forms.Form):
    field = forms.ChoiceField(choices=Post.language_choices)
    field2 = forms.ChoiceField(choices=Post.os_choices)
    field3 = forms.ChoiceField(choices=Post.problem_choices)
    field4 = forms.ChoiceField(choices=Post.framework_choices)

class SearchForm(forms.Form):
    search_text = forms.CharField(label='검색어를 입력해주세요')
