from django.shortcuts import render
from .models import Post
from .forms import PostForm
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def post_list(request):
    posts = Post.objects.all()
    ctx = {
        "posts": posts
    }
    return render(request, 'posts/post_list.html', ctx)
