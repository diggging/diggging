from django.db import models
from posts import models as posts_models
from core import models as core_models

# Create your models here.


class Question_post(posts_models.Post):
    sand_point = models.IntegerField(default=0)


class Answer(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="answer_user", on_delete=models.CASCADE
    )
    selection = models.BooleanField(verbose_name="채택", default=False)
    desc = models.TextField(blank=False)
