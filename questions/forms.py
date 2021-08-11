from django import forms
from .models import Answer, Question_post
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class QuestionPostForm(forms.ModelForm):
    class Meta:
        model = Question_post
        fields = {
            "title",
            "problem_solving",
            "os",
            "framework",
            "language",
            "error_message",
            "image",
            "desc",
            "tag",
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

# 답변도 질문과 같은 폼에서 작업할 수 있도록 질문폼 상속
class AnswerPostForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = '__all__'
        # {
        #     "user",
        #     "question",
        #     "selection",
        #     "desc",
        # }
    
