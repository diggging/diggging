from django.db import models
import core
from posts import models as posts_models
from core import models as core_models
from tagging.fields import TagField
from ckeditor_uploader.fields import RichTextUploadingField

# Create your models here.


class Question_post(core_models.PostParent):
    question_folder = models.ManyToManyField("QuestionFolder",related_name="question_folder", blank=True)

    def answer_selection_count(self):
        answer_selection_count = 0
        for answer_selected in self.answers.all():
            if answer_selected:
                answer_selection_count += 1

        return answer_selection_count

class Answer(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="answer_user", on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name="제목", max_length=50)
    question = models.ForeignKey("questions.Question_post", related_name="answers", on_delete=models.CASCADE)
    selection = models.BooleanField(verbose_name="채택", default=False)
    desc = RichTextUploadingField(verbose_name="설명", blank=False, config_name="default")
    code = RichTextUploadingField(verbose_name="코드", blank=True, config_name="default")

class QuestionFolder(core_models.FolderParent):
    pass