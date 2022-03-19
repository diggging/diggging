from django.contrib import admin
from . import models

# Register your models here.


@admin.register(models.Post)
class PostAdmin(admin.ModelAdmin):
    fields = (
        "user",
        "title",
        "image",
        "desc",
        #"code",
        # "is_public",
        # "is_friend",
        "folder",
        "scrap_num", 
        "helped_num",
    )
    list_display = [
        "pk", 
        "title", 
        "desc", 
        # "is_public", 
        # "is_friend", 
        "get_folders",
        "scrap_num", 
        "helped_num"
    ]
    # list_filter = ("is_public",)

    def short_content(self, Post):
        return Post.content[:20]

    def get_folders(self, obj):
        return "\n".join([f.folder_name for f in obj.folder.all()])


@admin.register(models.Folder)
class FolderAdmin(admin.ModelAdmin):
    #inlines = [PostAdmin]
    #fields = ("id", "folder_name", "posts")
    list_display = [
        "pk", 
        "folder_name", 
        "posts", 
        "folder_user"
    ]
    list_display_links = ["folder_name"]
    

    def posts(self,obj):
        return ",".join([r.title for r in obj.related_posts.all()])

# @admin.register(models.CustomFolder)
# class CustomFolderAdmin(admin.ModelAdmin):
    
#     list_display = ["pk", "name", "custom_folder_posts_count"]
#     list_display_links = ["name"]
