from django.db import models
from core import models as core_models
from tagging.fields import TagField

# Create your models here.
class Question(core_models.TimeStampModel):
    user = models.ForeignKey(
        "users.User", related_name="user", on_delete=models.CASCADE)
    title = models.CharField(max_length=50, blank=False)
    problem_solving = models.BooleanField(default=False)
    os_choices = (
        ('window', 'window'),
        ('linux', 'linux'),
        ('ubuntu', 'ubuntu'),
        ('macos', 'macos'),
    )
    dev_tool = models.ForeignKey(
        'Tool', on_delete=models.CASCADE, blank=False, verbose_name="예상 개발툴")
    os = models.CharField(max_length=10, choices=os_choices, blank=False)
    error_message = models.TextField(blank=True)
    image = models.ImageField(verbose_name="게시물 사진",
                              upload_to="images/posts", blank=True, null=True)
    desc = models.TextField(blank=False)
    code = models.TextField(blank=True)

    tag = TagField(blank=False)
    image = models.ImageField(verbose_name="게시물 사진",
                              upload_to="images/posts", blank=True, null=True)
    desc = models.TextField(blank=False)
    code = models.TextField(blank=True)

class Tool(core_models.TimeStampModel):
    name = models.CharField(verbose_name="이름", max_length=40, default='')
    kind = models.CharField(verbose_name="종류", max_length=30, default='')
    desc = models.TextField(verbose_name="개발툴 설명", blank=True)

    def __str__(self):
        return self.name

class Answer(core_models.TimeStampModel):
    user = models.ForeignKey("users.User", related_name="answers", on_delete=models.CASCADE)
    question = models.ForeignKey("Question", related_name="answers", on_delete=models.CASCADE)
    is_selected = models.BooleanField(default=False) #답변 채택 여부
    image = models.ImageField(verbose_name="게시물 사진",
                              upload_to="images/posts", blank=True, null=True) # 사진
    content = models.TextField() # 답변 글
    code = models.TextField() # 코드 들어갈 부분
    