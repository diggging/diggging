from django.contrib import admin
from .models import User

# Register your models here.


@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    fields = ("username", "password", "last_login", "email", "user_nickname",
              "user_profile_content", "user_profile_image",)
    list_display = ("username", "user_nickname",
                    "user_level", "user_point", "followers_count", "following_count",)
