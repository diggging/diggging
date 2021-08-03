from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .models import Post, Folder, CustomFolder
from . import models
from .forms import PostForm
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def post_list(request):
    posts = Post.objects.all()
    if request.is_public == False:
        return redirect()  # 비공개 게시물을 클릭했을때 나오는 html
    else:
        ctx = {"posts": posts}
        return render(request, "post/post_list.html", ctx)


def post_detail(request, pk):
    details = Post.objects.get(pk=pk)
    # 댓글기능도 끌어와야함.
    ctx = {
        "details": details
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


def post_update(request, pk):
    posts = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.POST, instance=posts)
        if form.is_valid():
            form.save()
            return redirect("post:post_detail", pk)
    else:
        form = PostForm(instance=posts)
        ctx = {
            "form": form,
        }
        return render(request, """'html 넣어주세요'""", ctx)


def post_delete(request, pk):
    posts = Post.objects.get(pk=pk)
    posts.delete()
    return redirect("""'url 넣어주세요'""")


def save_custom_list(request, post_pk):
    post = models.Post.objects.get_or_none(pk=post_pk)
    if post is not None:
        the_list, _ = models.CustomFolder.objects.get_or_create(
            user=request.user, name=CustomFolder.name
        )
        the_list.posts.add(post)
    return redirect(reverse("posts:custom_folder_detail", kwrags={"pk": post_pk}))
