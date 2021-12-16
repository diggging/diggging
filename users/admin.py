from django.contrib import admin

# from django.contrib.auth.admin import UserAdmin
from .models import Alarm, Sand, User

# Register your models here.


@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    fields = (
        "username",
        "password",
        "last_login",
        "email",
        "user_nickname",
        "profile_content",
        "user_profile_image",
        "user_following",
        "login_method",
        "is_active",
    )
    list_display = (
        "username",
        "user_nickname",
        "user_level",
        "user_point",
        "following_count",
        "id",
        "is_active",
        "login_method",
    )


@admin.register(Alarm)
class CustomAlarmAdmin(admin.ModelAdmin):
    fields = ("user", "reason", "is_checked")


@admin.register(Sand)
class CustomSandAdmin(admin.ModelAdmin):
    fields = ("user", "reason", "amount")
    list_display = ("pk", "user", "reason", "amount", "created")
