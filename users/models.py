from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.conf import settings
# Create your models here.


class User(AbstractUser):
    LOGIN_EMAIL = "email"
    LOGIN_GITHUB = "github"

    LOGIN_CHOICES = ((LOGIN_EMAIL, "Email"), (LOGIN_GITHUB, "Github"))
    user_nickname = models.CharField(
        verbose_name="nickname", max_length=8, blank=True)
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
    is_staff = models.BooleanField(verbose_name="staff status", default=False, help_text="Designates whther the user can log into admin site")
    is_active = models.BooleanField(verbose_name="active", default=False) # 이메일 인증 완료되기 전까지 False로 설정
    email = models.EmailField(blank=True, max_length=254, verbose_name='email address', null=False)
    login_method = models.CharField(max_length=50, choices=LOGIN_CHOICES, default=LOGIN_EMAIL)

    def __str__(self):
        return self.username

    # @property
    # def followers_count(self):
    #     return self.user_followed.all().count()

    @property
    def following_count(self):
        return self.user_following.all().count()


class Sand(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField(default=0)
    create_time = models.DateTimeField()
    reason = models.TextField()
