from django.db import models
from posts import models as posts_models

# Create your models here.


class Post(posts_models.Post):
    pass


class Answer(models.Modle):
    user = models.ForeignKey(
        "users.User", related_name="user", on_delete=models.CASCADE
    )
    selection = models.BooleanField(verbose_name="채택", default=True)
    desc = models.TextField(blank=False)
