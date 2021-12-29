from django.db import models
from core import models as core_models

# Create your models here.
class Comment(core_models.TimeStampModel):
    user = models.ForeignKey("users.User", on_delete=models.CASCADE, related_name="comments")

    post = models.ForeignKey("posts.Post", on_delete=models.CASCADE, related_name="post_comments", blank=True, null=True,)
    question = models.ForeignKey("questions.QuestionPost",on_delete=models.CASCADE,related_name="question_comments",blank=True,null=True)
    answer = models.ForeignKey("questions.Answer",on_delete=models.CASCADE,related_name="answer_comments",blank=True,null=True,)
    
    text = models.TextField()

    def __str__(self):
        return f"{self.id} {self.text}"

    # comment는 항상 최신순으로 올 수 있도록 Meta 클래스 통해서 설정해두었습니다.
    # class Meta:
    #     ordering = ("-created",)
