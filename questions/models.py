from django.db import models
from posts import models as posts_models

# Create your models here.


class Question_post(posts_models.Post):
    sand_point = models.IntegerField(default=0)


class Answer(models.Modle):
    user = models.ForeignKey(
        "users.User", related_name="user", on_delete=models.CASCADE
    )
    selection = models.BooleanField(verbose_name="채택", default=False)
    desc = models.TextField(blank=False)
