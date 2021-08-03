from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    fields = (
        "user",
        "title",
        "problem_solving",
        "language",
        "os",
        "error_message",
        "image",
        "desc",
        "code",
        "tag",
        "is_public",
        "is_friend",
    )
    list_display = ["pk", "title", "desc", "is_public", "is_friend"]
    list_filter = ("is_public",)

    def short_content(self, Post):
        return Post.content[:20]


@admin.register(models.Folder)
class FolderAdmin(admin.ModelAdmin):
    list_display = ["pk", "name", "post_count"]
    list_display_links = ["name"]


@admin.register(models.CustomFolder)
class CustomFolderAdmin(admin.ModelAdmin):
    list_display = ["pk", "name", "custom_folder_posts_count"]
    list_display_links = ["name"]
