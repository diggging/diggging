from django.db import models
from core import models as core_models
from ckeditor_uploader.fields import RichTextUploadingField
from django.conf import settings
from taggit.managers import TaggableManager

# Create your models here.
class QuestionPost(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="question_user", on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name="제목", max_length=200)
    desc = models.TextField(verbose_name="설명", blank=False)
    # code = models.TextField(verbose_name="코드", blank=True)

    question_folder = models.ManyToManyField(
        "QuestionFolder",
        related_name="question_folder",
        blank=True,
    )

    # is_public = models.BooleanField(
    #     verbose_name="전체공개", default=True
    # )  # 해당코드 false로 변경시 비공개

    # is_friend = models.BooleanField(verbose_name="이웃공개", default=False)  # 나를 팔로잉 하는 사람.

    scrap_num = models.IntegerField(default=0)
    helped_num = models.IntegerField(default=0)
    likes_user = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="question_likes_user",
    )
    scarps_user = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        blank=True,
        related_name="question_scarps_user",
    )
    is_selected = models.BooleanField(default=False)

    # taggit 기능 추가
    question_tags = TaggableManager(blank = True)
    hits = models.PositiveIntegerField(verbose_name="조회수", default=0)
    answer_exist = models.BooleanField(verbose_name="답변존재여부", default=False)

class Answer(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="answer_user", on_delete=models.CASCADE
    )
    title = models.CharField(verbose_name="제목", max_length=200)
    question = models.ForeignKey(
        "questions.QuestionPost", related_name="answers", on_delete=models.CASCADE
    )
    selection = models.BooleanField(verbose_name="채택", default=False)
    # desc = RichTextUploadingField(verbose_name="설명", blank=False, config_name="default")
    # code = RichTextUploadingField(verbose_name="코드", blank=True, config_name="default")
    desc = models.TextField(verbose_name="설명", blank=False)
    # code = models.TextField(verbose_name="코드", blank=True)

    # objects = models.Manager()


class QuestionFolder(core_models.TimeStampModel):
    folder_name = models.CharField(max_length=100)
    folder_user = models.ForeignKey(
        "users.User", related_name="question_folder_user", on_delete=models.CASCADE
    )
    # kind_choices = (
    #     ("framework", "framework"),
    #     ("language", "language"),
    #     ("solved", "solved"),
    # )
    # folder_kind = models.CharField(verbose_name="폴더 종류", max_length=10, choices=kind_choices, blank=False)

    def __str__(self):
        return self.folder_name
