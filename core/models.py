from django.db import models
from users import models as user_models

# Create your models here.


class TimeStampModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Alarm(TimeStampModel):
    user = models.ForeignKey(user_models.User, related_name="alarm", on_delete=models.CASCADE)
    reason = models.CharField(verbose_name="nickname", max_length=50, blank=True)
    is_checked = models.BooleanField(verbose_name="확인 여부", default=False)
