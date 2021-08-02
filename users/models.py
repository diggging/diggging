from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
# Create your models here.


class User(AbstractUser):
    user_mem_email = models.EmailField(
        verbose_name="email", max_length=255, blank=True)
    user_mem_nickname = models.CharField(
        verbose_name="nickname", max_length=150, blank=True)
    user_mem_realname = models.CharField(
        verbose_name="realname", max_length=255, blank=True)
    user_level = models.IntegerField(verbose_name="level", default=0)
    user_point = models.IntegerField(verbose_name="point", default=0)
    user_register_datetime = models.DateTimeField(
        verbose_name="date_joined", default=timezone.now)
    user_profile_content = models.TextField(
        verbose_name="personal description", blank=True)
    user_following = models.ManyToManyField("self", blank=True)
    user_followed = models.ManyToManyField("self", blank=True)
    user_profile_image = models.ImageField(
        verbose_name="대표 사진", upload_to="images/", blank=True, null=True)

    def __str__(self):
        return self.user_mem_nickname

    @property
    def followers_count(self):
        return self.followers.all().count()

    @property
    def following_count(self):
        return self.following.all().count()
