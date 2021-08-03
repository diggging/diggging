from django.db import models
from django.db.models.fields import BooleanField, CharField
from django.db.models.fields.related import ForeignKey
from django.urls import reverse
from users.models import User
from core import models as core_models
# Create your models here.


class Post(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="user", on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    problem_solving = models.BooleanField(default=False)
    os_choices = (
        ('window', 'window'),
        ('linux', 'linux'),
        ('ubuntu', 'ubuntu'),
        ('macos', 'macos'),
    )
    os = models.CharField(max_length=10, choices=os_choices)
    error_message = models.TextField(blank=True)
    image = models.ImageField(verbose_name="게시물 사진",
                              upload_to="images/posts", blank=True, null=True)
    desc = models.TextField(blank=True)
    code = models.TextField(blank=True)
    # tools 랑 folder연결해주어야함.
