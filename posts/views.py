from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .models import Post, Folder, CustomFolder
from . import models
from .forms import PostForm
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def post_list(request):
    posts = Post.objects.all()
    ctx = {"posts": posts}
    return render(request, "posts/post_list.html", ctx)


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

            # 폴더 분류해주기
            language = request.POST.get("language")  # language 가져옴
            print(language)
            print(type(language))
            folder = Folder.objects.filter(folder_name=language)

            if folder:
                print(
                    "___________________ 있음 __________________________________________________________________"
                )
                # 있으면 foriegn key 연결
                existed_folder = Folder.objects.get(folder_name=language)
                posts.folder = existed_folder
                posts.save()
            else:
                # 없으면 folder 만들어서
                print(
                    "___________________ 없슴 __________________________________________________________________"
                )
                new_folder = Folder.objects.create(folder_name=language)
                posts.folder = new_folder
                posts.save()

            return redirect("posts:post_list")
    else:
        form = PostForm()
        ctx = {
            "form": form,
        }

        return render(request, template_name="posts/post_create.html", context=ctx)


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


def search(request):
    context = dict()
    language = request.POST.get("language")
    free_post = Post.objects.filter(title="title").order_by("-id")
    post = request.POST.get("post", "")
    if post:
        free_post = free_post.filter(language=language)
        context["free_post"] = free_post
        context["post"] = post
        return render(request, "posts/search.html", context)
    else:
        return render(request, "posts/search.html")


# def make_folder(request):
#     folder = Post.objects.filter(request.language)
#     ctx = {
#         "folder":folder
#     }
#     return render(request, "posts/base.html",ctx)

# 삽질 기록 퍼오기
def get_post(request, post_pk):
    # attach action in frontend
    # how to attach action
    # ex> <... href="{% url '...' ... %}?action=remove">
    #                     or
    #     <... href={% url '...' ... %}?action=add">
    action = request.GET.get("action", None)
    # post = Post.objects.get(pk=post_pk)
    post = get_object_or_404(Post, pk=post_pk)
    print(post)
    target_language = post.language
    folder = Folder.objects.filter(folder_name=target_language)

    if action == "add":
        # 폴더가 이미 존재시에 해당 폴더에 포스트 추가
        if folder:
            existing_folder = Folder.objects.get(folder_name=target_language)
            existing_folder.add(post)
            existing_folder.save()
        else:
            # 없으면 folder 형성
            new_folder = Folder.objects.create(folder_name=target_language)
            post.folder = new_folder
            new_folder.save()
    elif action == "remove":
        folder.delete(post)

    # url: 저장 후 post_detail 페이지에 남아있음.
    return render(request, template_name="posts/post_detail.html")
