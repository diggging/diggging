from django.shortcuts import render
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Comment
from posts.models import Post
import json


# Create your views here.

# Comment section
# axios 통신
# create comment
@csrf_exempt
def comment(request):        #! 이름 바꿈!
    req = json.loads(request.body)
    post_id = req["id"]
    post = Post.objects.get(id=post_id)

    text = req["text"]
    comment = Comment.objects.create(post=post, text=text, user=request.user)
    comment.save()

    return JsonResponse({"id": post_id, "text": text, "comment_id":comment.id})


# delete comment
@csrf_exempt
def delete_comment(request):
    req = json.loads(request.body)
    post_id = req["id"]
    comment_id = req["comment_id"]

    if request.method == "POST":
        comment = Comment.objects.get(id=comment_id)
        comment.delete()

    return JsonResponse({"id": post_id, "comment_id": comment_id})
