import json
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.views.generic import GenericViewError
from rest_framework.views import APIView
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
from users.models import User
# from .forms import AnswerPostForm, QuestionPostForm
from django.shortcuts import get_object_or_404, render, redirect
from .models import QuestionPost, Answer, QuestionFolder
from users.models import Sand, Alarm
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse  # , JsonResponse
from django.db.models import Sum, query
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.core import serializers
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .permissions import IsNotOwnerOrReadOnly, IsOwnerOrReadOnly, IsQuestionOwnerOrReadOnly
from rest_framework import viewsets, status, generics, mixins
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)
from comments.models import Comment
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes
from rest_framework.pagination import PageNumberPagination

# Create your views here.

# ----------------- Custom Pagenumbersize for Question List -------------------------------
class ListPageNumberPagination(PageNumberPagination):
    page_size = 5
# -----------------------------------------------------------------------------------------

# ----------------- Question CRUD start ---------------------------------
class QuestionCreateAPIView(generics.CreateAPIView):
    queryset = QuestionPost.objects.all()
    serializer_class = QuestionCreateUpdateSerializer
    permission_classes = [IsAuthenticated] # allow only authenticated user

    def perform_create(self, serializer):
        serializer.save(user=self.request.user) # set user field

# class QuestionDelUpdateDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = QuestionPost.objects.all()
#     serializer_class = QuestionDetailSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

#     def get(self, request, *args, **kwargs):
#         permission_classes = [AllowAny]
#         instance = self.get_object()
#         print(instance.hits)
#         instance.hits += 1
#         instance.save()

#         return self.retrieve(request, *args, **kwargs)

    

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

        if big_criteria == "recent":
            queryset = QuestionPost.objects.order_by("-created")
            if small_criteria == "all":
                return queryset
            elif small_criteria == "wait_answer":
                new_queryset = queryset.filter(answer_exist = False)
                return new_queryset
            elif small_criteria == "answer_done":
                new_queryset = queryset.filter(answer_exist=True)
                return new_queryset
        elif big_criteria == "popular":
            queryset = QuestionPost.objects.order_by("-hits")
            if small_criteria == "all":
                return queryset
            elif small_criteria == "wait_answer":
                new_queryset = queryset.filter(answer_exist = False)
                return new_queryset
            elif small_criteria == "answer_done":
                new_queryset = queryset.filter(answer_exist=True)
                return new_queryset
        elif big_criteria == "mine":
            queryset = QuestionPost.objects.filter(user=self.request.user).order_by("-created")
            if small_criteria == "all":
                return queryset
            elif small_criteria == "wait_answer":
                new_queryset = queryset.filter(answer_exist=False)
                return new_queryset
            elif small_criteria == "answer_done":
                new_queryset = queryset.filter(answer_exist=True)
                return new_queryset
        
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
        if question_post.likes_user.filter(id=like_user.id).exists():
            question_post.helped_num -= 1
            if question_post.helped_num < 0:
                question_post.helped_num = 0
            question_post.likes_user.remove(self.request.user)
        else:
            question_post.helped_num += 1
            new_alarm = Alarm.objects.create(user=question_post.user, 
            title = question_post.title,
            alarm_kind = "like", request_user_nickname=self.request.user.user_nickname,
            request_user_profile_image=self.request.user.user_profile_image
            )
            if question_post.helped_num < 0:
                question_post.helped_num = 0
            question_post.likes_user.add(self.request.user)


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

        if answer.selection == True:
            answer.selection = False
        else:
            answer.selection = True

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



























# class QuestionCommentCreateView(generics.ListCreateAPIView):
#     serializer_class = CommentSerializer

#     def get_queryset(self, request):
#         post_details = QuestionPost.objects.get(pk=request.id)
#         return post_details.question_comments.all().order_by("-created")

# class QuestionCommentDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = CommentSerializer
# class QuestionCreateView(generics.ListCreateAPIView):

#     serializer_class = QuestionPostSerializer

#     def get_queryset(self):
#         return QuestionPost.objects.all()

#     def create(self, request, *args, **kwrags):
#         serializer = self.serializer_class(data=request.data, context={'request': request})
#         if serializer.is_valid():
#             instance = serializer.save()

#         new_sand = Sand.objects.create(user=request.user, amount=100, reason="삽질 기록 작성")

#         return Response(serializer.data)

    
    # queryset = QuestionPost.objects.all()
    # serializer_class = QuestionPostSerializer
    # pagination_class = None 

    # def create(self, request, *args, **kwargs):
    #     serializer = self.serializer_class(data=request.data, context={'request': self.request})
    #     if serializer.is_valid():
    #         instance = serializer.save()
        
    #     me = request.user

    #     # 포스팅 시에 sand 추가해주기
    #     new_sand = Sand.objects.create(user=me, amount = 100, reason="삽질 기록 작성")

    #     return Response(serializer.data)

# class QuestionDetailGetView(generics.RetrieveUpdateDestroyAPIView):
#     # comment 보내주기
#     authentication_classes = [BasicAuthentication, SessionAuthentication]
#     permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
#     # queryset = QuestionPost.objects.all()
#     # TODO: fix needed.
#     serializer_class = QuestionPostSerializer

#     def get_queryset(self):
#         #TODO: self.request.id 
#         return QuestionPost.objects.get(pk=self.request.id)

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object() # 해당 오브젝트 가져옴. (pk 영향X)
        
#         instance.save()

#         serializer = self.serializer_class(instance, data = request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()

#         return Response(serializer.data)
    
#     def delete(self, request, *args, **kwargs):
#         instance = self.get_object()

#         return Response(status = status.HTTP_200_OK)

# refactoring 전
# @login_required
# def question_main(request):
#     # 질문 최신순으로 정렬
#     question_posts = Question_post.objects.all().order_by("-created")
#     #  모든 전체질문에서 스크랩 순위대로 추천
#     all_question_scrap = Question_post.objects.all().order_by("-scrap_num")
#     # 모든 전체 질문에서 도움 순위대로 추천
#     all_posts_helped = Question_post.objects.all().order_by("-helped_num")
    
#     not_selected_questions = Question_post.objects.filter(is_selected=False)
    
#     ##개수 제한
#     if len(not_selected_questions) > 20:
#         not_selected_questions = not_selected_questions[:20]
        
#     languages = [langs[0] for langs in Question_post.language_choices]
#     search = request.POST.getlist("answers[]")
#     str_search = "".join(search)
#     answer = Answer.objects.filter(user=request.user)

#     # 지수가 필요해서 넣은 것 : 질문 관련 폴더
#     # 질문 모음
#     my_questions = Question_post.objects.filter(user=request.user)
#     questions_language_folder = QuestionFolder.objects.filter(
#         folder_user=request.user, folder_kind="language"
#     )
#     questions_framework_folder = QuestionFolder.objects.filter(
#         folder_user=request.user, folder_kind="framework"
#     )

#     # 최근에 남긴 질문
#     my_recent_questions = Question_post.objects.filter(user=request.user).order_by(
#         "-created"
#     )

#     question_folder = QuestionFolder.objects.filter(folder_user=request.user)

#     # 지수가 필요해서 넣은 것 : 모래 포인트
#     my_sand = Sand.objects.filter(user=request.user)
#     my_sand_sum = my_sand.aggregate(Sum("amount"))
#     print(my_sand_sum)
#     if my_sand_sum["amount__sum"] == None:
#         my_sand_sum = 0
#     else:
#         if int(my_sand_sum["amount__sum"]) < 2000:
#             request.user.user_level = 0
#         elif int(my_sand_sum["amount__sum"]) < 7000:
#             request.user.user_level = 1
#         elif int(my_sand_sum["amount__sum"]) < 18000:
#             request.user.user_level = 2
#         else:
#             request.user.user_level = 3
#     ctx = {
#         "not_selected_questions": not_selected_questions,
#         "posts": question_posts,
#         "language": languages,
#         "str_search": str_search,
#         "answer": answer,
#         # 내 모래포인트와 질문 관련한 폴더 접근 가능해야해요,,
#         "my_all_sands": my_sand,  # sand 모든 object list
#         "my_sand_sum": my_sand_sum,  # 현재까지 sand 총합
#         #  질문 관련한 폴더 접근 가능해야해요,, -> 헸습니다. 현주
#         "question_folder": question_folder,
#     }
#     return render(request, "questions/main.html", ctx)

# refactoring 후


# -----------------------------------------------------------------------------------------------------
# 질문 CRUD
# def question_create(request):
#     if request.method == "POST":
#         form = QuestionPostForm(request.POST, request.FILES)
#         if form.is_valid():
#             posts = form.save(commit=False)
#             posts.user = request.user
#             posts.save()

#             me = posts.user
#             language = request.POST.get("language")
#             framework = request.POST.get("framework")  # framework 가져옴
#             lang_folder = QuestionFolder.objects.filter(
#                 folder_name=language, folder_user=me, folder_kind="language"
#             )
#             frame_folder = QuestionFolder.objects.filter(
#                 folder_name=framework, folder_user=me, folder_kind="framework"
#             )  # frameworkd folder 가져옴

#             if lang_folder.exists():
#                 existed_folder = QuestionFolder.objects.get(
#                     folder_name=language, folder_user=me, folder_kind="language"
#                 )
#                 posts.question_folder.add(existed_folder)
#             else:
#                 new_folder = QuestionFolder.objects.create(
#                     folder_name=language, folder_user=me, folder_kind="language"
#                 )
#                 posts.question_folder.add(new_folder)

#             if frame_folder.exists():
#                 # 있으면 foriegn key 연결
#                 existed_folder = QuestionFolder.objects.get(
#                     folder_name=framework, folder_user=me, folder_kind="framework"
#                 )
#                 posts.question_folder.add(existed_folder)
#             else:
#                 # 없으면 folder 만들어서
#                 new_folder = QuestionFolder.objects.create(
#                     folder_name=framework, folder_user=me, folder_kind="framework"
#                 )
#                 posts.question_folder.add(new_folder)

#             posts.save()

#             # create 하면 detail 페이지로 넘어가도록 수정
#             return redirect("question:question_post_detail", posts.user.id, posts.id)
#     else:
#         form = QuestionPostForm()
#         ctx = {
#             "form": form,
#         }

#         return render(request, "questions/question_create.html", ctx)


# def get_answer_comments(request, answer_id):
#     answer = Answer.objects.get(pk=answer_id)
#     answer_comments = answer.answer_comments.all()

#     ctx = {
#         "post": answer,
#         "comments": answer_comments,
#     }
#     return render(request, "questions/question_detail.html", ctx)


# def question_update(request, pk):
#     question_post = get_object_or_404(Question_post, pk=pk)
#     origin_lang_fol = question_post.question_folder.get(folder_user=question_post.user, folder_kind="language")
#     origin_frame_fol = question_post.question_folder.get(folder_user=question_post.user, folder_kind="framework")
#     if request.method == "POST":
#         form = QuestionPostForm(request.POST, request.FILES, instance=question_post)
#         if form.is_valid():
#             form.save()
#             new_lang = request.POST.get("language")
#             new_frame = request.POST.get("framework")

#             # lang 폴더가 달라진다면?
#             if new_lang != origin_lang_fol.folder_name:
#                 # 1. post와 폴더의 관계 끊기
#                 origin_lang_fol.question_folder.remove(question_post)
#                 # 2. post와 새로운 폴더와의 연결
#                 # 이미 있는 폴더면 걍 넣어주고 아니면 생성후 넣어줌
#                 lang_folder = QuestionFolder.objects.filter(
#                     folder_name=new_lang,
#                     folder_user=question_post.user,
#                     folder_kind="language",
#                 )
#                 if lang_folder.exists():
#                     # 있으면 foriegn key 연결
#                     existed_folder = QuestionFolder.objects.get(
#                         folder_name=new_lang,
#                         folder_user=question_post.user,
#                         folder_kind="language",
#                     )
#                     question_post.question_folder.add(existed_folder)
#                 else:
#                     # 없으면 folder 만들어서
#                     new_folder = QuestionFolder.objects.create(
#                         folder_name=new_lang,
#                         folder_user=question_post.user,
#                         folder_kind="language",
#                     )
#                     question_post.question_folder.add(new_folder)
#                 # 원래 폴더에 더이상 연결된 post가 없다면? 폴더삭제 / 있다면? 냅두기
#                 if not origin_lang_fol.question_folder.all():
#                     origin_lang_fol.delete()

#             # framework
#             if new_frame != origin_frame_fol.folder_name:
#                 origin_frame_fol.question_folder.remove(question_post)
#                 frame_folder = QuestionFolder.objects.filter(
#                     folder_name=new_frame,
#                     folder_user=question_post.user,
#                     folder_kind="framework",
#                 )
#                 if frame_folder.exists():
#                     existed_folder = QuestionFolder.objects.get(
#                         folder_name=new_frame,
#                         folder_user=question_post.user,
#                         folder_kind="framework",
#                     )
#                     question_post.question_folder.add(existed_folder)
#                 else:
#                     new_folder = QuestionFolder.objects.create(
#                         folder_name=new_frame,
#                         folder_user=question_post.user,
#                         folder_kind="framework",
#                     )
#                     question_post.question_folder.add(new_folder)
#                 if not origin_frame_fol.question_folder.all():
#                     origin_frame_fol.delete()

#             return redirect(
#                 "question:question_post_detail", question_post.user.id, question_post.id
#             )
#     else:
#         form = QuestionPostForm(instance=question_post)
#         ctx = {
#             "form": form,
#         }
#         return render(request, "questions/question_update.html", ctx)


# def question_delete(request, pk):
#     question_post = Question_post.objects.get(pk=pk)

#     lang_folder = QuestionFolder.objects.get(
#         folder_user=question_post.user,
#         question_folder=question_post,
#         folder_kind="language",
#     )
#     frame_folder = QuestionFolder.objects.get(
#         folder_user=question_post.user,
#         question_folder=question_post,
#         folder_kind="framework",
#     )

#     question_post.delete()

#     if not lang_folder.question_folder.exists():
#         lang_folder.delete()

#     if not frame_folder.question_folder.exists():
#         frame_folder.delete()

#     return redirect("question:question_main")


# # ------------------------------------------------------------------------------------------------------------------
# def question_post_detail(request, user_id, post_id):
#     post_details = Question_post.objects.get(pk=post_id)
#     me = get_object_or_404(User, pk=user_id)

#     folder = post_details.question_folder.get(
#         folder_name=post_details.language, folder_user=post_details.user
#     )
#     # comments = post_details.comments.all() comments는 ajax로 따로 띄워준다고 해서 지웠습니다
#     # post_answers: 질문 포스트에 해당 되는 답변들
#     post_answers = post_details.answers.all().order_by("-created")
#     answers = serializers.serialize('json', post_answers)
    
#     # question_comments 역참조
#     comments = post_details.question_comments.all()
#     # answer_comments = [answer.answer_comments for answer in post_answers]
#     ctx = {
#         "post": post_details,
#         "host": me,
#         "folder": folder,
#         "post_answers": post_answers,
#         "comments": comments,
#         "user_id": user_id,
#         "post_id": post_id,
#         "answers": answers,
#     }
#     return render(request, "questions/question_detail.html", ctx)


# # -------------------------------------------------------------------------------------------------------------------------------------------------------
# # 질문 답변 작성 폼 관련 함수
# @login_required(login_url='/users/login/')
# def answer_create(request, question_post_id):
#     question = Question_post.objects.get(pk=question_post_id)
#     if request.method == "POST":
#         form = AnswerPostForm(request.POST, request.FILES)
#         if form.is_valid():
#             answers = form.save(commit=False)
#             answers.user = request.user
#             answers.question = question
#             question_host = question.user
#             answers.save()
#             question_host = question.user

#             # 질문에 답변이 달렸다는 알람 넣어주기
#             new_alarm = Alarm.objects.create(
#                 user=question_host,
#                 reason="내가 남긴 질문" + question.title + "에 답변이 달렸어요. 확인해보세요!",
#             )
#             return redirect(
#                 "question:question_post_detail", question_host.id, question_post_id
#             )
#     else:
#         form = AnswerPostForm()
#         ctx = {
#             "form": form,
#         }
#         return render(request, "questions/answer_create.html", ctx)


# # 질문 답변 업데이트
# def answer_update(request, question_post_id, answer_id):
#     question_post = get_object_or_404(Question_post, pk=question_post_id)
#     answer = get_object_or_404(Answer, pk=answer_id)
#     if request.method == "POST":
#         form = AnswerPostForm(request.POST, request.FILES, instance=answer)
#         if form.is_valid():
#             form.save()
#             return redirect(
#                 "question:question_post_detail", question_post.user.id, question_post_id
#             )
#     else:
#         form = AnswerPostForm(instance=answer)
#         ctx = {"form": form}
#         return render(request, "questions/answer_update.html", ctx)


# # 질문 답변 삭제
# def answer_delete(request, question_post_id, answer_id):
#     question_post = Question_post.objects.get(pk=question_post_id)
#     answer = Answer.objects.get(pk=answer_id)
#     answer.delete()
#     return redirect(
#         "question:question_post_detail", question_post.user.id, question_post_id
#     )


# # ----------------------------------------------------------------------------------------------------------
# # 질문 기록 퍼오기
# def get_question(request, question_post_id):
#     print("넘어감?")
#     question_post = get_object_or_404(Question_post, pk=question_post_id)
#     target_language = question_post.language
#     target_framework = question_post.framework  # 어떤 framework인지 - 프레임워크 생성용
#     me = request.user

#     lang_folder = QuestionFolder.objects.filter(
#         folder_name=target_language, folder_user=me, folder_kind="language"
#     )
#     frame_folder = QuestionFolder.objects.filter(
#         folder_name=target_framework, folder_user=me, folder_kind="framework"
#     )

#     if lang_folder.exists():
#         folder = QuestionFolder.objects.get(
#             folder_name=target_language, folder_user=me, folder_kind="language"
#         )
#         folder.question_folder.add(question_post)
#         folder.save()
#     else:
#         new_folder = QuestionFolder.objects.create(
#             folder_name=target_language, folder_user=me, folder_kind="language"
#         )
#         question_post.folder.add(new_folder)
#     question_post.save()

#     # framework 동일
#     if frame_folder.exists():
#         # 그 폴더에 포스트 그냥 추가하기
#         folder = QuestionFolder.objects.get(
#             folder_name=target_framework, folder_user=me, folder_kind="framework"
#         )  # query set은 object가 아니므로 object 다시 가져옴
#         folder.question_folder.add(question_post)  # add 는 저장 x 명시적 저장 필요
#         folder.save()
#     # 없으면
#     else:
#         # 폴더를 생성한 뒤, 거기에 추가하기
#         new_folder = QuestionFolder.objects.create(
#             folder_name=target_framework, folder_user=me, folder_kind="framework"
#         )  # create - 자동저장
#         question_post.folder.add(new_folder)
#     question_post.save()

#     # 퍼가기 할 때 sand 생성하기 - host꺼 생성해줘야함
#     new_sand = Sand.objects.create(
#         user=question_post.user, amount=50, reason=me.user_nickname + "님의 내 질문 퍼가기"
#     )
#     new_alarm = Alarm.objects.create(
#         user=question_post.user,
#         reason=request.user.user_nickname
#         + " 님이 내 질문 "
#         + question_post.title
#         + "을 퍼갔어요.",
#     )

#     return redirect("question:question_post_detail", me.id, question_post_id)


# # 질문 채택 관련 함수 (모달에서 사용자가 채택 or 채택 해제에 동의했을때 사용)
# def chosen_answer(request, question_answer_id):
#     is_answer_chosen = Answer.objects.get(pk=question_answer_id)
#     question = is_answer_chosen.question
#     question.is_selected = True
#     # if request.method == "POST": #채택할래? 예
#     is_answer_chosen.selection = True
#     question.save()
#     is_answer_chosen.save()
#     new_sand1 = Sand.objects.create(
#         user=is_answer_chosen.user, amount=300, reason="내 답변 채택"
#     )
#     new_sand2 = Sand.objects.create(user=question.user, amount=50, reason="내 질문의 답변 채택")
#     new_alarm = Alarm.objects.create(
#         user=is_answer_chosen.user, reason="질문 " + question.title + " 에 남긴 답변이 채택되었어요."
#     )

#     ctx = {"is_answer_chosen": is_answer_chosen}

#     # 선택 후에는 다시 question detail 페이지로 돌아감.
#     # return render(request, 'questions/question_detail.html', ctx)
#     # TODO: 의문점? else가 필요한가? 안필요할듯
#     return redirect(
#         "question:question_post_detail",
#         is_answer_chosen.question.user.id,
#         is_answer_chosen.question.id,
#     )


# # question like
# @login_required
# @require_POST
# def question_like(request):
#     pk = request.POST.get("pk", None)
#     post = get_object_or_404(Question_post, pk=pk)
#     user = request.user
#     if post.likes_user.filter(id=user.id).exists():
#         post.likes_user.remove(user)
#         message = "좋아요 취소"
#     else:
#         post.likes_user.add(user)
#         message = "좋아요"
#         new_alarm = Alarm.objects.create(user=post.user, reason="내가 남긴 질문 \""+ post.title + "\" 이 " + user.user_nickname + "님께 도움이 되었어요.")
#         new_sand = Sand.objects.create(user=post.user, amount=20, reason="도움이 되었어요")
#     ctx = {"likes_count": post.count_likes_user(), "message": message}
#     return HttpResponse(json.dumps(ctx), content_type="application/json")


# @login_required
# @require_POST
# def question_scrap(request, user_id, post_id):
#     question_post = get_object_or_404(Question_post, pk=post_id)
#     target_language = question_post.language
#     target_framework = question_post.framework  # 어떤 framework인지 - 프레임워크 생성용
#     me = request.user

#     lang_folder = QuestionFolder.objects.filter(
#         folder_name=target_language, folder_user=me, folder_kind="language"
#     )
#     frame_folder = QuestionFolder.objects.filter(
#         folder_name=target_framework, folder_user=me, folder_kind="framework"
#     )

#     if lang_folder.exists():
#         folder = QuestionFolder.objects.get(
#             folder_name=target_language, folder_user=me, folder_kind="language"
#         )
#         folder.question_folder.add(question_post)
#         folder.save()
#     else:
#         new_folder = QuestionFolder.objects.create(
#             folder_name=target_language, folder_user=me, folder_kind="language"
#         )
#         question_post.question_folder.add(new_folder)
#     question_post.save()

#     # framework 동일
#     if frame_folder.exists():
#         # 그 폴더에 포스트 그냥 추가하기
#         folder = QuestionFolder.objects.get(
#             folder_name=target_framework, folder_user=me, folder_kind="framework"
#         )  # query set은 object가 아니므로 object 다시 가져옴
#         folder.question_folder.add(question_post)  # add 는 저장 x 명시적 저장 필요
#         folder.save()
#     # 없으면
#     else:
#         # 폴더를 생성한 뒤, 거기에 추가하기
#         new_folder = QuestionFolder.objects.create(
#             folder_name=target_framework, folder_user=me, folder_kind="framework"
#         )  # create - 자동저장
#         question_post.question_folder.add(new_folder)
#     question_post.save()

#     pk = request.POST.get("pk", None)
#     post = get_object_or_404(Question_post, pk=pk)
#     user = request.user
#     if post.scarps_user.filter(id=user.id).exists():
#         post.scarps_user.remove(user)
#         message = "퍼가기 취소"
#     else:
#         post.scarps_user.add(user)
#         message = "퍼가기"
#         # 퍼가기 할 때 sand 생성하기 - host꺼 생성해줘야함
#         new_sand = Sand.objects.create(user=question_post.user, amount=50, reason=me.user_nickname + "님의 내 질문 퍼가기")
#         new_alarm = Alarm.objects.create(user=question_post.user,reason=request.user.user_nickname+ " 님이 내 질문 "+ question_post.title+ "을 퍼갔어요.")


#     post.scrap_num = post.count_scarps_user()
#     post.save()
#     ctx = {"scarps_count": post.count_scarps_user(), "message": message}
#     return HttpResponse(json.dumps(ctx), content_type="application/json")

# #---------------질문광장 질문 모음
# @csrf_exempt
# def questions_lang_folder(request, pk):
#     host = get_object_or_404(User, pk=pk)
#     folder = QuestionFolder.objects.filter(folder_user=host, folder_kind="language")
#     data = folder.values()

#     return JsonResponse(list(data), safe=False)

# @csrf_exempt
# def questions_lang_post(request, pk):
#     folder = QuestionFolder.objects.get(pk=pk)
#     posts = Question_post.objects.filter(question_folder=folder)

#     user_list = [] 
#     for post in posts: 
#         user_list.append(post.user.user_nickname)
    
#     data = posts.values()

#     ctx = {
#         'user': user_list,
#         'data': list(data)
#     }

#     return JsonResponse(ctx, safe=False)

# @csrf_exempt
# def questions_framework_folder(request, pk):
#     host = get_object_or_404(User, pk=pk)
#     folder = QuestionFolder.objects.filter(folder_user=host, folder_kind="framework")
#     data = folder.values()
    
#     return JsonResponse(list(data), safe=False)

# @csrf_exempt
# def questions_framework_post(request, pk):
#     folder = QuestionFolder.objects.get(pk=pk)
#     posts = Question_post.objects.filter(question_folder=folder)
#     user_list = [] 
#     for post in posts: 
#         user_list.append(post.user.user_nickname)
    
#     data = posts.values()

#     ctx = {
#         'user': user_list,
#         'data': list(data)
#     }

#     return JsonResponse(ctx, safe=False)

# ------------------------- Question API Refactoring view --------------------------------------------------

# ------------------------- Question Detail ----------------------------------------------------------------

