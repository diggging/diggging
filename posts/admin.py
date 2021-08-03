from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'content']

    def short_content(self, Post):
        return Post.content[:20]
