from django.shortcuts import render
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Comment
from posts.models import Post
from questions.models import Question_post, Answer
from users.models import Alarm
import json

# Create your views here.

# Comment section
# axios 통신
# create comment
# 삽질 기록 부분 post의 댓글 파트
@csrf_exempt
def comment(request):        #! 이름 바꿈!
    req = json.loads(request.body)
    post_id = req["id"]
    comment_content = req["text"]
    post = Post.objects.get(id=post_id)
    # TODO: comment ajax 문제에서 comment.save()로 바꿔보았습니다. 잘 되는지 확인 부탁드려요
    # post.save() (변경 이종권)
    comment = Comment.objects.create(post=post, text=comment_content, user=request.user)
    comment.save() 

    new_alarm = Alarm.objects.create(user=post.user, reason="내가 남긴 기록"+post.title+'에'+request.user.user_nickname+'님이 댓글을 남겼어요.')
    
    return JsonResponse({
        "id": post_id, 
        "text": comment_content,
        "comment_id": comment.id,
    })


# delete comment
@csrf_exempt
def delete_comment(request):
    req = json.loads(request.body)
    post_id = req["id"]
    comment_id = req["comment_id"]

    if request.method == "POST":
        post = Post.objects.get(id=post_id)
        comment = Comment.objects.get(id=comment_id)
        comment.delete()

    # 추가사항: 코드 개수 출력을 위한 코드
    total_num_comments = post.comments.count()

    return JsonResponse({
        "id": post_id, 
        "comment_id": comment_id,
        "total_num_comments": total_num_comments
    })

#------------------------------------------------------------------------------------------------------------------------------------------------#
# 질문광장 부분 posts의 댓글창에서 댓글 달기 파트
@csrf_exempt
def add_question_comment(request):
    req = json.loads(request.body)
    question_post_id = req["id"]
    question_comment_content = req["text"]

    question_post = Question_post.objects.get(id=question_post_id)
    question_comment = Comment.objects.create(question=question_post, text=question_comment_content, user=request.user)

    # TODO: 삽질 기록 부분 comment 부분과 마찬가지로 잘 작동하는지 봐주세요.
    question_comment.save()

    # 추가사항: 코드 개수 출력을 위한 코드
    total_num_comments = question_post.comments.count()

    new_alarm = Alarm.objects.create(user=question_post.user, reason="내가 남긴 질문"+question_post.title+'에'+request.user.user_nickname+'님이 댓글을 남겼어요.')

    return JsonResponse({
        "question_post_id": question_post_id, 
        "question_comment_content": question_comment_content,
        "total_num_comments": total_num_comments
    })

# 질문광장 부분 posts의 댓글창에서 댓글 삭제 파트
@csrf_exempt
def delete_question_comment(request):
    req = json.loads(request.body)
    question_post_id = req["id"]
    question_comment_id = req["question_comment_id"]
    question_post = Question_post.objects.get(id=question_post_id)
    question_comment = Comment.objects.get(id=question_comment_id)

    question_comment.delete()

    # 추가사항: 코드 개수 출력을 위한 코드
    total_num_comments = question_post.comments.count()

    return JsonResponse({
        "question_post_id":question_post_id,
        "question_comment_id":question_comment_id,
        "total_num_comments": total_num_comments,    
    })

#-------------------------------------------------------------------------------------------------------------------------------------------------
# 답글에 달리는 댓글 부분 
@csrf_exempt
def add_question_comment(request):
    req = json.loads(request.body)
    answer_id = req['id']
    answer_comment_content = req['text']

    answer = Answer.objects.get(id=answer_id)
    answer_comment = Comment.objects.create(answer=answer, text=answer_comment_content, user=request.user)

    answer_comment.save()

    # 추가사항: 코드 개수 출력을 위한 코드
    total_num_comments = answer.comments.count()

    new_alarm = Alarm.objects.create(user=answer.user, reason="내가 남긴 답변"+ answer.title+'에' + request.user.user_nickname+'님이 댓글을 남겼어요.')

    return JsonResponse({
        "answer_id": answer_id,
        "answer_comment_content": answer_comment_content,
        "total_num_comments": total_num_comments,
    })

@csrf_exempt
def delete_question_comment(request):
    req = json.loads(request.body)
    answer_id = req['id']
    answer_comment_id = req["answer_comment_id"]
    answer = Answer.objects.get(id=answer_id)
    answer_comment = Comment.objects.get(id=answer_id)

    answer_comment.delete()

    # 추가사항: 코드 개수 출력을 위한 코드
    total_num_comments = answer.comments.count()

    return JsonResponse({
        'answer_id': answer_id,
        "answer_comment_id": answer_comment_id,
        "total_num_comments": total_num_comments,
    })
#------------------------------------------------------------------------------------------------------------------------------------------------#
# 질문광장 부분 posts detail 내부 댓글 보기 ajax
# TODO: 댓글창 보기 버튼 한번 더 누르면 댓글창 부분이 닫히는 것은 프론트 부분인거 같아서
# 코드를 짜지 않았습니다 
@csrf_exempt
def see_comment(request):
    req = json.loads(request.body)
    question_post_id = req["id"]

    # 프론트에서 넘겨준 question id(질문 포스트 id) 를 가지고 모든 댓글 출력
    question_comments = Question_post.question_comments.filter(id=question_post_id)

    # question_comments 부분 모두 넘겨주는게 question_comments
    # question_comments_num 부분: 댓글 개수 
    return JsonResponse({
        'question_post_id': question_post_id,
        'question_comments': question_comments,
    })


