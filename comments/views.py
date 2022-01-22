# new view
from .models import Comment
from questions.models import (
    QuestionPost, 
    Answer,
)
from comments.serializers import (
    CommentDetailSerializer, 
    QuestionCommentSerializer, 
    AnswerCommentSerializer,
)
from questions.permissions import IsOwnerOrReadOnly
from rest_framework.permissions import(
    IsAuthenticated,
    IsAuthenticatedOrReadOnly
)
from rest_framework import generics
from users.models import Alarm

# ------------- Question comment create, update -----------------------
class QuestionCommentCreateAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = QuestionCommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        pk = self.request.query_params.get('question_id')
        question = QuestionPost.objects.get(pk=pk)
        new_alarm = Alarm.objects.create(user=question.user, title=question.title,
        alarm_kind = "comment", desc = self.request.data.get('text'),
        request_user_nickname=self.request.user.user_nickname,
        request_user_profile_image=self.request.user.user_profile_image)
        serializer.save(user=self.request.user, question=question)

class QuestionCommentUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = QuestionCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# ---------------------------------------------------------------------

# ------------- Answer comment create, update -----------------------
class AnswerCommentCreateAPIView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = AnswerCommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        pk = self.request.query_params.get('answer_id')
        answer = Answer.objects.get(pk=pk)
        new_alarm = Alarm.objects.create(user=answer.user, title=answer.title, 
        desc = self.request.data.get('text'), alarm_kind="comment",
        request_user_nickname=self.request.user.user_nickname,
        request_user_profile_image = self.request.user.user_profile_image)
        serializer.save(user=self.request.user, answer=answer)

class AnswerCommentUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = AnswerCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# ---------------------------------------------------------------------

# ------------- comment general delete --------------------------------
class CommentDeleteAPIView(generics.RetrieveDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# --------------------------------------------------------------------
