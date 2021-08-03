from django.contrib import admin
from . import models
# Register your models here.


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['pk', 'title', 'desc']

    def short_content(self, Post):
        return Post.content[:20]


@admin.register(models.Tool)
class ToolAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'desc']
    list_display_links = ['name']

    def short_desc(self, Tool):
        return Tool.desc[:20]
