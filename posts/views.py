from django.shortcuts import render, redirect
from django.urls import reverse
from . import models
from .models import Post, Folder, CustomFolder
from .forms import PostForm
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def post_list(request):
    posts = Post.objects.all()
    ctx = {
        "posts": posts
    }
    return render(request, 'posts/post_list.html', ctx)

def save_custom_list(request, post_pk):
    post = models.Post.objects.get_or_none(pk = post_pk)
    if post is not None:
        the_list, _ = models.CustomFolder.objects.get_or_create(
            user = request.user, name=CustomFolder.name
        )
        the_list.posts.add(post)
    return redirect(reverse("posts:custom_folder_detail", kwrags={"pk": post_pk}))