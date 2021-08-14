from django.contrib import admin
from . import models

# Register your models here.
@admin.register(models.Question_post)
class QuestionPostAdmin(admin.ModelAdmin):
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
        "is_public",
        "is_friend",
        "folder",
        "scrap_num",
        "helped_num",
    )
    list_display = [
        "pk",
        "title",
        "desc",
        "is_public",
        "is_friend",
        "get_folders",
        "scrap_num",
        "helped_num",
        # "sand_point_count",
    ]
    list_filter = ("is_public",)

    def short_content(self, Post):
        return Post.content[:20]

    def get_folders(self, obj):
        return "\n".join([f.folder_name for f in obj.folder.all()])


@admin.register(models.Answer)
class AnswerAdmin(admin.ModelAdmin):
    fields = (
        "user",
        "desc",
    )
    list_display = [
        "user",
        "selection",
        "desc",
    ]
    list_filter = ("selection",)

    def short_content(self, Answer):
        return Answer.content[:20]


@admin.register(models.QuestionFolder)
class QuestionFolder(admin.ModelAdmin):
    list_display = ["pk", "folder_name", "posts", "folder_user"]
    list_display_links = ["folder_name"]

    def posts(self, obj):
        return ",".join([r.title for r in obj.related_posts.all()])
