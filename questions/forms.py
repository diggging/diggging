from django import forms
from .models import Answer, QuestionPost
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class QuestionPostForm(forms.ModelForm):
    image = forms.ImageField(required=False, widget=forms.FileInput)

    class Meta:
        model = QuestionPost
        fields = {
            "title",
            # "os",
            # "framework",
            # "language",
            # "error_message",
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


# 답변도 질문과 비솟한 폼에서 작업할 수 있도록 질문폼 상속
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
