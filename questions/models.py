from django.db import models
from posts import models as posts_models
from core import models as core_models

# Create your models here.


class Question_post(posts_models.Post):
    sand_point = models.IntegerField(default=0)

    def sand_point_count(self):
        return self.sand_point.count()
    sand_point_count.short_description = "current sand point"


class Answer(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="answer_user", on_delete=models.CASCADE
    )
    selection = models.BooleanField(verbose_name="채택", default=False)
    desc = models.TextField(blank=False)

class QuestionFolder(posts_models.Folder):
    pass