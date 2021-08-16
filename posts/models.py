from django.db import models
from django.db.models.fields import BooleanField, CharField
from django.db.models.fields.related import ForeignKey
from django.urls import reverse
from users.models import User
from core import models as core_models
from tagging.fields import TagField
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
from django.conf import settings

# Create your models here
class Post(core_models.PostParent):
    folder = models.ManyToManyField("Folder",related_name="related_posts",blank=True)

class Folder(core_models.FolderParent):
    pass
