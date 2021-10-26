from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.conf import settings
from core import models as core_model
import os
from django_resized import ResizedImageField
from posts.models import Folder

# Create your models here.


class User(AbstractUser):
    LOGIN_EMAIL = "email"
    LOGIN_GITHUB = "github"

    LOGIN_CHOICES = ((LOGIN_EMAIL, "Email"), (LOGIN_GITHUB, "Github"))
    user_nickname = models.CharField(
        verbose_name="nickname", max_length=8, blank=True, default="익명"
    )
    user_level = models.IntegerField(verbose_name="level", default=0)
    user_point = models.IntegerField(verbose_name="point", default=0)
    user_register_datetime = models.DateTimeField(
        verbose_name="date_joined", default=timezone.now
    )
    user_following = models.ManyToManyField(
        "self", symmetrical=False, blank=True, default=[0], related_name="user_followed"
    )
    # user_followed = models.ManyToManyField("self", symmetrical=False, blank=True, default=0)
    user_profile_content = models.TextField(
        verbose_name="personal description", blank=True
    )
    user_profile_image = ResizedImageField(
        size=[50, 50],
        quality=75,
        verbose_name="대표 사진",
        upload_to="images/",
        blank=True,
        null=True,
        default="../static/image/profile_img.jpg",
    )
    is_staff = models.BooleanField(
        verbose_name="staff status",
        default=False,
        help_text="Designates whther the user can log into admin site",
    )
    is_active = models.BooleanField(
        verbose_name="active", default=True
    )  # 이메일 인증 완료되기 전까지 False로 설정
    email = models.EmailField(
        blank=True, max_length=254, verbose_name="email address", null=False
    )
    login_method = models.CharField(
        max_length=50, choices=LOGIN_CHOICES, default=LOGIN_EMAIL
    )

    def __str__(self):
        return self.username

    # @property
    # def followers_count(self):
    #     return self.user_followed.all().count()

    @property
    def following_count(self):
        return self.user_following.all().count()

    def delete(self, *args, **kargs):
        if self.upload_files:
            os.remove(os.path.join(settings.MEDIA_ROOT, self.upload_files.path))
        super(User, self).delete(*args, **kargs)

    def save(self, *args, **kwargs):
        # if self.pk is None:  # create
        super().save(*args, **kwargs)  # Call the "real" save() method.
        # 스크랩 폴더.
        scrap = Folder.objects.filter(folder_name="스크랩 모음", folder_user=self)
        if not scrap.exists():
            Folder.objects.create(folder_user=self, folder_name="스크랩 모음")


class Sand(core_model.TimeStampModel):
    user = models.ForeignKey(User, related_name="sand", on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    reason = models.CharField(max_length=50)

    def __str__(self):
        return self.reason


class Alarm(core_model.TimeStampModel):
    user = models.ForeignKey(User, related_name="alarm", on_delete=models.CASCADE)
    reason = models.TextField(verbose_name="reason", blank=True)
    is_checked = models.BooleanField(verbose_name="확인 여부", default=False)

    def __str__(self):
        return self.reason
