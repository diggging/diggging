from django.shortcuts import render, redirect, get_object_or_404
from .models import Post
from .forms import PostForm
from django.views.decorators.csrf import csrf_exempt
# Create your views here.


def post_list(request):
    posts = Post.objects.all()
    ctx = {
        "posts": posts
    }
    return render(request, """'html 넣어주세요'""", ctx)


def post_detail(request, pk):
    posts = Post.objects.get(pk=pk)
    # 댓글기능도 끌어와야함.
    ctx = {
        "posts": posts
        # 여기에도 댓글 넣어주어야함.
    }
    return render(request, """'html 넣어주세요'""", ctx)


def post_create(request):
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            posts = form.save()
            posts.save()
            return redirect("""'url 넣어주세요'""")
    else:
        form = PostForm()
        ctx = {
            "form": form,
        }

        return render(request, """'html 넣어주세요'""", ctx)


def post_delete(request, pk):
    posts = Post.objects.get(pk=pk)
    posts.delete()
    return redirect("""'url 넣어주세요'""")
