from django.shortcuts import get_object_or_404
from questions.serializers import (
    AnswerCreateUpdateSerializer,
    AnswerDetailSerializer,
    QuestionDetailSerializer,
    QuestionFolderSerializer,
    QuestionListSerializer,
    QuestionCreateUpdateSerializer,
    LikeSerializer,
    AnswerSelectSerializer,
)
from .models import (
    QuestionPost, 
    Answer, 
    QuestionFolder,
)
from users.models import (
    Sand, 
    Alarm,
)
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import (
    IsNotOwnerOrReadOnly, 
    IsOwnerOrReadOnly, 
    IsQuestionOwnerOrReadOnly,
)
from rest_framework import generics
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from comments.models import Comment
from rest_framework.permissions import (
    IsAuthenticated, 
    AllowAny,
)
from rest_framework.pagination import PageNumberPagination
from shoveling.utils import (
    listing, 
    like,
)

# Create your views here.

# ----------------------- Custom Pagenumbersize for Question List --------------------------------
class ListPageNumberPagination(PageNumberPagination):
    page_size = 5
# ------------------------------------------------------------------------------------------------

# ----------------- Question CRUD start ---------------------------------
class QuestionCreateAPIView(generics.CreateAPIView):
    queryset = QuestionPost.objects.all()
    serializer_class = QuestionCreateUpdateSerializer
    permission_classes = [IsAuthenticated] # allow only authenticated user

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # set user field

class QuestionDetailAPIView(generics.RetrieveAPIView):
    queryset = QuestionPost.objects.all()
    serializer_class = QuestionDetailSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        print(instance.hits)
        instance.hits += 1
        instance.save()

        return self.retrieve(request, *args, **kwargs)

# use RetrieveUpdateAPIView to prefill form
class QuestionUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = QuestionPost.objects.all()
    serializer_class = QuestionCreateUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    # def perform_update(self, serializer):
    #     serializer.save(user=self.request.user) # update user
class QuestionDeleteAPIView(generics.DestroyAPIView):
    queryset = QuestionPost.objects.all()
    serializer_class = QuestionDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

#---------------------------- Question CRUD end -----------------------

#---------------------------- Question List start ---------------------
class QuestionListAPIView(generics.ListAPIView):
    serializer_class = QuestionListSerializer
    pagination_class = ListPageNumberPagination

    def get_queryset(self):
        big_criteria = self.request.query_params.get('big_criteria')
        small_criteria = self.request.query_params.get('small_criteria')

        listing(self, QuestionPost, big_criteria, small_criteria)
        
        # if small_criteria == "all":
        #     if big_criteria == "recent":
        #         queryset = QuestionPost.objects.order_by("-created")
        #         return queryset
        #     elif big_criteria == "popular":
        #         queryset = QuestionPost.objects.order_by("-hits")
        #         return queryset
        #     elif big_criteria == "mine":
        #         queryset = QuestionPost.objects.filter(user=self.request.user).order_by("-created")
        #         return queryset
        # elif small_criteria == "wait_answer":
        #     queryset = QuestionPost.objects.filter(answer_exist = False).order_by("-created")
        # elif small_criteria == "answer_done":
        #     queryset = QuestionPost.objects.filter(answer_exist=True).order_by("-created")

# -------------------------- Question List end -------------------------------

# -------------------------- Answer CRUD -------------------------------------
class AnswerCreateAPIView(generics.ListCreateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        pk = self.request.query_params.get('question_id')
        question = get_object_or_404(QuestionPost, pk=pk)
        question.answer_exist = True
        new_alarm = Alarm.objects.create(
                user=question.user,
                title = self.request.data.get('title'),
                alarm_kind = "answer", desc = self.request.data.get('desc'),
                request_user_nickname=self.request.user.user_nickname,
                request_user_profile_image=self.request.user.user_profile_image
            )
        question.save()
        serializer.save(user=self.request.user, question=question)

class AnswerDetailAPIView(generics.RetrieveAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerDetailSerializer

class AnswerUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerCreateUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class AnswerDeleteAPIView(generics.RetrieveDestroyAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# -----------------------------------------------------------------------------

# -------------------- Like +1, -1 -------------------------------------------
class LikeUpDownAPIView(generics.RetrieveUpdateAPIView):
    queryset = QuestionPost.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsNotOwnerOrReadOnly]

    def perform_update(self, serializer, *args, **kwargs):
        question_post = get_object_or_404(QuestionPost, pk=self.kwargs['pk'])
        like_user = self.request.user
        # owner = instance.user
        like(self, question_post, like_user)
        question_post.save()
        serializer.save(helped_num=question_post.helped_num)
# -------------------------------------------------------------------------------

# ----------------------- 답변 채택  ----------------------------------------------
class AnswerSelectAPIView(generics.RetrieveUpdateAPIView):
    queryset = Answer.objects.all()
    serializer_class = AnswerSelectSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsQuestionOwnerOrReadOnly]

    def perform_update(self, serializer, *args, **kwargs):
        answer = get_object_or_404(Answer, pk=self.kwargs['pk'])
        question = QuestionPost.objects.get(id = answer.question.id)
        answers = question.answers.all()

        if question.is_selected == True:
            flag = 0
            for answer_ind in answers:
                if answer_ind.selection == True:
                    flag = answer_ind.id
            if flag == answer.id:
                answer.selection = False
                question.is_selected = False
        else:
            answer.selection = True
            question.is_selected = True
        
        question.save()

        new_alarm = Alarm.objects.create(user=answer.user, 
        title = answer.question.title,
        alarm_kind = "answer_select", desc = answer.desc,
        request_user_nickname=self.request.user.user_nickname,
        request_user_profile_image=self.request.user.user_profile_image)
        answer.save()
        serializer.save(selection = answer.selection)

# ---------------------------------------------------------------------------------

# ------------------------ 스크랩 -------------------------------------------------
# class AddQuestiontoFolderAPIView(generics.RetrieveUpdateAPIView):
#     serializer_class = QuestionFolderSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]

#     def get_queryset(self):
#         folder_owner = self.request.user
#         folders = QuestionFolder.objects.filter(folder_user = folder_owner)

#         return folders

#     def perform_update(self, serializer):
#         pk = self.request.query_params.get('question_id')
#         current_question = QuestionPost.objects.get(pk=pk)
