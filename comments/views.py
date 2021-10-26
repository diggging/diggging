#from django.shortcuts import render
from .models import Comment
from posts.models import Post
from users.models import User
from comments import serializers
from django.core import serializers
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from questions.models import QuestionPost, Answer
from users.models import Alarm

import json


from rest_framework.views import APIView
from comments.serializers import PostSerializer, UserSerializer, CommentSerializer
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status, generics, mixins
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
#from .permissions import IsOwnerOrReadOnly
# Create your views here.
# Comment section
# axios 통신
# create comment
# 삽질 기록 부분 post의 댓글 파트

# @csrf_exempt
# def comment(request):        #! 이름 바꿈!
#     req = json.loads(request.body)
#     post_id = req["id"]
#     comment_content = req["text"]
#     print(req)
#     post = Post.objects.get(id=post_id)
#     # TODO: comment ajax 문제에서 comment.save()로 바꿔보았습니다. 잘 되는지 확인 부탁드려요
#     comment = Comment.objects.create(post=post, text=comment_content, user=request.user)
#     comment.save() 
#     new_alarm = Alarm.objects.create(user=post.user, reason="내가 남긴 기록 \""+post.title+'\" 에 '+request.user.user_nickname+' 님이 댓글을 남겼어요.')
#     #댓글을 단 유저의 정보를 담았음!
#     user = User.objects.filter(id=comment.user.id)
#     data = serializers.serialize('json', user)
#     total_num_comments = post.comments.count()

#     return JsonResponse({
#         "id": post_id, 
#         "text": comment_content,
#         "comment_id": comment.id,
#         "comment_date": comment.created,
#         "count" : total_num_comments,
#         "user": data,
#     })

class CommentCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # def create(self, request, *args, **kwargs):
    #     serializer = self.serializer_class(data=request.data)
    #     if serializer.is_valid():
    #         instance = serializer.save()

class CommentGetView(generics.RetrieveUpdateDestroyAPIView):
    #comment 보내주기
    #authentication_classes = [BasicAuthentication, SessionAuthentication]
    #permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly] # 로그인한, 쓴사람만 수정 가능
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

# delete comment
# @csrf_exempt
# def delete_comment(request):
#     req = json.loads(request.body)
#     post_id = req["id"]
#     comment_id = req["comment_id"]
#     if request.method == "POST":
#         post = Post.objects.get(id=post_id)
#         comment = Comment.objects.get(id=comment_id)
#         comment.delete()
#     return JsonResponse({
#         "id": post_id, 
#         "comment_id": comment_id,
#     })
# #------------------------------------------------------------------------------------------------------------------------------------------------#
# # 질문광장 부분 posts의 댓글창에서 댓글 달기 파트
# @csrf_exempt
# def add_question_comment(request):
#     req = json.loads(request.body)
#     post_id = req["id"]
#     comment_content = req["text"]
#     post = QuestionPost.objects.get(id=post_id)
#     comment = Comment.objects.create(question=post, text=comment_content, user=request.user)
#     comment.save()
#     total_num_comments = post.question_comments.count()
#     # TODO: 삽질 기록 부분 comment 부분과 마찬가지로 잘 작동하는지 봐주세요.
#     new_alarm = Alarm.objects.create(user=post.user, reason="내가 남긴 질문 \""+post.title+'\" 에 '+request.user.user_nickname+' 님이 댓글을 남겼어요.')

#     #댓글을 단 유저의 정보를 담았음!
#     user = User.objects.filter(id=comment.user.id)
#     data = serializers.serialize('json', user)

#     return JsonResponse({
#         "id": post_id, 
#         "text": comment_content,
#         "comment_id": comment.id,
#         "comment_date": comment.created,
#         # "count" : total_num_comments,
#         "user": data,
#     })


# # 질문광장 부분 posts의 댓글창에서 댓글 삭제 파트
# @csrf_exempt
# def delete_question_comment(request):
#     req = json.loads(request.body)
#     post_id = req["id"]
#     comment_id = req["comment_id"]
        
#     post = QuestionPost.objects.get(id=post_id)
#     comment = Comment.objects.get(id=comment_id)
#     comment.delete()
#     total_num_comments = post.question_comments.count()
    
#     return JsonResponse({
#         "id": post_id, 
#         "comment_id": comment_id,
#         "count" : total_num_comments,
#     })
# #-------------------------------------------------------------------------------------------------------------------------------------------------
# # 답글에 달리는 댓글 부분 
# @csrf_exempt
# def add_answer_comment(request):
#     req = json.loads(request.body)
#     answer_id = req['id']
#     answer_comment_content = req['text']
#     answer = Answer.objects.get(id=answer_id)
#     answer_comment = Comment.objects.create(answer=answer, text=answer_comment_content, user=request.user)
#     answer_comment.save()
#     new_alarm = Alarm.objects.create(user=answer.user, reason="내가 남긴 답변 \""+ answer.title+'\" 에 ' + request.user.user_nickname+' 님이 댓글을 남겼어요.')

#     user = User.objects.filter(id=answer_comment.user.id)
#     data = serializers.serialize('json', user)

#     return JsonResponse({
#         "id": answer_id,
#         "text": answer_comment_content,
#         "comment_id": answer_comment.id,
#         "comment_date": answer_comment.created,
#         "user": data,
#     })
    
# @csrf_exempt
# def delete_answer_comment(request):
#     req = json.loads(request.body)
#     answer_id = req['id']
#     answer_comment_id = req["comment_id"]
#     answer = Answer.objects.get(id=answer_id)
#     answer_comment = Comment.objects.get(id=answer_comment_id)
#     answer_comment.delete()
#     return JsonResponse({
#         'id': answer_id,
#         "comment_id": answer_comment_id,
#     })
# #------------------------------------------------------------------------------------------------------------------------------------------------#
# # 질문광장 부분 posts detail 내부 댓글 보기 ajax
# # TODO: 댓글창 보기 버튼 한번 더 누르면 댓글창 부분이 닫히는 것은 프론트 부분인거 같아서
# # 코드를 짜지 않았습니다 
# @csrf_exempt
# def see_comment(request):
#     req = json.loads(request.body)
#     question_post_id = req["id"]
#     # 프론트에서 넘겨준 question id(질문 포스트 id) 를 가지고 모든 댓글 출력
#     question_comments = QuestionPost.question_comments.filter(id=question_post_id)
#     # question_comments 부분 모두 넘겨주는게 question_comments
#     # question_comments_num 부분: 댓글 개수 
#     return JsonResponse({
#         'question_post_id': question_post_id,
#         'question_comments': question_comments,
#     })
