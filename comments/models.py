from django.db import models
from core import models as core_models

# Create your models here.
class Comment(core_models.TimeStampModel):
    post = models.ForeignKey(
        "posts.Post", on_delete=models.CASCADE, related_name="comments"
    )
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="comments"
    )
    text = models.TextField()

    def __str__(self):
        return f"{self.id} {self.text}"


class Question_comment(core_models.TimeStampModel):
    question = models.ForeignKey(
        "questions.Question_post",
        on_delete=models.CASCADE,
        related_name="question_comments",
    )
    user = models.ForeignKey(
        "users.User", on_delete=models.CASCADE, related_name="question_comments"
    )