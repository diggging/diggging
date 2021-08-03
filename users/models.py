from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.conf import settings
# Create your models here.


class User(AbstractUser):
    user_nickname = models.CharField(
        verbose_name="nickname", max_length=150, blank=True)
    user_level = models.IntegerField(verbose_name="level", default=0)
    user_point = models.IntegerField(verbose_name="point", default=0)
    user_register_datetime = models.DateTimeField(
        verbose_name="date_joined", default=timezone.now)
    user_following = models.ManyToManyField("self", symmetrical=False, blank=True, default=0, related_name ='user_followed')
    #user_followed = models.ManyToManyField("self", symmetrical=False, blank=True, default=0)
    user_profile_content = models.TextField(
        verbose_name="personal description", blank=True)
    user_profile_image = models.ImageField(
        verbose_name="대표 사진", upload_to="images/", blank=True, null=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.username

    # @property
    # def followers_count(self):
    #     return self.user_followed.all().count()

    @property
    def following_count(self):
        return self.user_following.all().count()