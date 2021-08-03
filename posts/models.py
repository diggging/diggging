from django.db import models
from django.db.models.fields import BooleanField, CharField
from django.db.models.fields.related import ForeignKey
from django.urls import reverse
from users.models import User
from core import models as core_models
from tagging.fields import TagField
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
    dev_tool = models.ForeignKey(
        'Tool', on_delete=models.CASCADE, blank=False, verbose_name="예상 개발툴")
    os = models.CharField(max_length=10, choices=os_choices, blank=False)
    error_message = models.TextField(blank=True)
    image = models.ImageField(verbose_name="게시물 사진",
                              upload_to="images/posts", blank=True, null=True)
    desc = models.TextField(blank=False)
    code = models.TextField(blank=True)

    tag = TagField(blank=False)
    folder = models.ForeignKey("Folder", related_name="related_posts", on_delete=models.SET_NULL, null=True)
    custom_folder = models.ForeignKey("CustomFolder", related_name="custom_selected_posts", on_delete=models.SET_NULL, null=True)


class Tool(core_models.TimeStampModel):
    name = models.CharField(verbose_name="이름", max_length=40, default='')
    kind = models.CharField(verbose_name="종류", max_length=30, default='')
    desc = models.TextField(verbose_name="개발툴 설명", blank=True)

    def __str__(self):
        return self.name

class Folder(core_models.TimeStampModel):

    def name(self):
        return self.related_posts.tag
    
    def post_count(self):
        return self.related_posts.count()
    post_count.short_description = "number of posts saved"

class CustomFolder(Folder):
    name = CharField(max_length=150, blank=False)

    def __str__(self):
        return self.name

    def custom_folder_posts_count(self):
        return self.custom_selected_posts.count()
    custom_folder_posts_count.short_description = "number of posts saved"