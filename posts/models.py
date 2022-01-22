from django.db import models
from core import models as core_models
from ckeditor_uploader.fields import RichTextUploadingField
from django.conf import settings
from taggit.managers import TaggableManager

# Create your models here
class Post(core_models.TimeStampModel):
    user = models.ForeignKey("users.User", related_name="user", on_delete=models.CASCADE)
    title = models.CharField(verbose_name="제목", max_length=200)

    image = models.ImageField(verbose_name="게시물 사진", upload_to="images/posts", blank=True, null=True, default='../static/image/default_image.PNG')
    desc = models.TextField(verbose_name="설명", blank=False)

    folder = models.ManyToManyField(
        "Folder",
        related_name="related_posts",
        blank=True
    )
    # is_public = models.BooleanField(verbose_name="전체공개", default=True)  # 해당코드 false로 변경시 비공개
    # is_friend = models.BooleanField(verbose_name="이웃공개", default=False)  # 나를 팔로잉 하는 사람.
    scrap_num = models.IntegerField(default=0)
    helped_num = models.IntegerField(default=0)
    likes_user = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="likes_user"
    )
    scarps_user = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="scarps_user"
    )
    post_tags = TaggableManager(blank = True)
    hits = models.PositiveIntegerField(verbose_name="조회수", default=0)
    class Meta:
        ordering = ('-created',)

    def count_likes_user(self):
        return self.likes_user.count()

    def count_scarps_user(self):
        return self.scarps_user.count()

class Folder(core_models.TimeStampModel):
    folder_name = models.CharField(max_length=100)
    folder_user = models.ForeignKey("users.User", related_name="folder_user", on_delete=models.CASCADE)

    def __str__(self):
        return self.folder_name
