from django import forms
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
            'is_public': forms.RadioSelect(choices=[(True, '전체공개'), (False, '비공개')])
        }

class SelectForm(forms.Form):
    field = forms.ChoiceField(choices=Post.language_choices)
    field2 = forms.ChoiceField(choices=Post.os_choices)
    field3 = forms.ChoiceField(choices=Post.problem_choices)
    field4 = forms.ChoiceField(choices=Post.framework_choices)
