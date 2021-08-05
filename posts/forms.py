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
            "user",
            "title",
            "problem_solving",
            "os",
            "language",
            "error_message",
            "image",
            "desc",
        }

        widgets = {
                    'user': forms.Select(),

                    'title': forms.TextInput(
                        attrs={'style': 'width: 100%', 'placeholder': '제목을 입력하세요.'}
                    ),

                    'problem_solving': forms.Select(),

                    'language': forms.Select(),

                    'error_message': forms.TextInput(
                        attrs={'sytle': 'width: 100%', 'placeholder': '발견한 에러메시지를 기록하세요.'},
                    ),

                    'desc': forms.CharField(widget=CKEditorUploadingWidget()),
                }


