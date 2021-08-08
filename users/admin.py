from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.


@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    fields = ("username", "password", "last_login", "email", "user_nickname",
              "user_profile_content", "user_profile_image", "user_following", "login_method")
    list_display = ("username", "user_nickname",
                    "user_level", "user_point",  "following_count","id", "is_active", "login_method")
