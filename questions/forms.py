from django import forms
from .models import Answer, Question_post
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class QuestionPostForm(forms.ModelForm):
    image = forms.ImageField(required=False, widget=forms.FileInput)
    class Meta:
        model = Question_post
        fields = {
            "title",
            "os",
            "framework",
            "language",
            "error_message",
            "image",
            "desc",
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

class AnswerPostForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = {
            "title",
            "desc",
        }
        widgets = {
            "title": forms.TextInput(
                attrs={"class": "title_input", "placeholder": "제목을 입력하세요."}
            ),
            "desc": forms.CharField(widget=CKEditorUploadingWidget()),
        }
