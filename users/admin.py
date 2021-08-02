from django.contrib import admin
from .models import User

# Register your models here.


@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    fields = ("username", "password", "last_login", "email", "user_mem_nickname", "user_mem_realname",
              "user_profile_content", "user_profile_image",)
    list_display = ("username", "user_mem_nickname", "user_mem_realname",
                    "user_level", "user_point", )

    # def count_user_following(self, obj):
    #     return obj.user_following.count()

    # def count_user_followed(self, obj):
    #     return obj.user
