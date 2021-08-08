from users.models import User
from comments.models import Comment
from django.http.response import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from .models import Post, Folder
from . import models
from .forms import selectForm, PostForm
import json

# Create your views here.

# main 페이지
def main(request):
    # 모든 전체 글에서 스크랩 순위대로 추천
    all_posts_scrap = Post.objects.all().order_by("-scrap_num")
    # 모든 전체 글에서 도움 순위대로 추천
    all_posts_helped = Post.objects.all().order_by("-helped_num")

    ctx = {
        "posts_scrap": all_posts_scrap,
        "posts_helped": all_posts_helped,
    }

    return render(request, template_name="posts/main.html", context=ctx)


# 프론트에서 해당 포스트 id 넘겨주면
def post_detail(request, user_id, post_id):
    post_details = Post.objects.get(pk=post_id)
    me = get_object_or_404(User, pk=user_id)
    folder = post_details.folder.get(
        folder_name=post_details.language, folder_user=post_details.user
    )
    comments = post_details.comments.all()
    # 댓글기능도 끌어와야함.
    ctx = {
        "post": post_details,
        "host": me,
        "folder": folder,
        "comments": comments,
    }
    # html added by 종권
    return render(request, "posts/post_detail.html", ctx)


def post_create(request):
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            posts = form.save(commit=False)

            posts.user = request.user

            posts.save()

            # 폴더 분류해주기
            me = posts.user  # folder 주인 가져오기
            language = request.POST.get("language")  # language 가져옴
            folder = Folder.objects.filter(folder_name=language, folder_user=me)

            if folder:
                # 있으면 foriegn key 연결
                existed_folder = Folder.objects.get(
                    folder_name=language, folder_user=me
                )
                posts.folder.add(existed_folder)
            else:
                # 없으면 folder 만들어서
                new_folder = Folder.objects.create(folder_name=language, folder_user=me)
                posts.folder.add(new_folder)

            posts.save()

            return redirect("posts:main")
    else:
        form = PostForm()
        ctx = {
            "form": form,
        }

        return render(request, "posts/post_create.html", context=ctx)


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

    language = request.POST.get("post")
    free_post = Post.objects.all().order_by("-id")
    post = request.POST.get("post", "")
    form = selectForm()

    free_post = free_post.filter(language=language)
    ctx = {
        "free_post": free_post,
        "post": post,
        "form": form,
    }
    return render(request, "posts/search.html", ctx)


# 삽질 기록 퍼오기
def get_post(request, user_id, post_id):
    # attach action in frontend
    # how to attach action
    # ex> <... href="{% url '...' ... %}?action=remove">
    #                     or
    #     <... href={% url '...' ... %}?action=add">
    # action = request.GET.get("action", None)
    # post = Post.objects.get(pk=post_pk)

    # if action == "add":
    #     # 폴더가 이미 존재시에 해당 폴더에 포스트 추가
    #     if folder:
    #         existing_folder = Folder.objects.get(folder_name=target_language)
    #         existing_folder.add(post)
    #         existing_folder.save()
    #     else:
    #         # 없으면 folder 형성
    #         new_folder = Folder.objects.create(folder_name=target_language)
    #         post.folder = new_folder
    #         new_folder.save()
    # elif action == "remove":
    #     folder.delete(post)

    post = get_object_or_404(Post, pk=post_id)
    target_language = post.language
    me = request.user

    # get: object-없는걸 가져오면 오류 , filter: queryset- 없어도 빈 queryset 오류 x
    folder = Folder.objects.filter(folder_name=target_language, folder_user=me)

    # 만약 나, language로 된 폴더 있으면
    if folder:
        # 그 폴더에 포스트 그냥 추가하기
        folder = Folder.objects.get(
            folder_name=target_language, folder_user=me
        )  # query set은 object가 아니므로 object 다시 가져옴
        folder.related_posts.add(post)  # add 는 저장 x 명시적 저장 필요
        folder.save()
    # 없으면
    else:
        # 폴더를 생성한 뒤, 거기에 추가하기
        new_folder = Folder.objects.create(
            folder_name=target_language, folder_user=me
        )  # create - 자동저장
        post.folder.add(new_folder)
    post.save()

    # url: 저장 후 post_detail 페이지에 남아있음.
    return redirect("posts:post_detail", user_id, post_id)


# 도움이 되었어요, 스크랩 개수 count 하기 위한 axios
def count_like_scrap(request):
    # json 문자열을 json.loads를 통해서 json 형태에서 파이썬 객체 형태로 parsing
    # front 단에서 request.body를 통해서 넘어와야 하는 것들
    # 1) 'id' (post의 id값)
    # 2) 'type' (button이 도움이 되었어요 버튼인지 스크랩 개수 버튼인지의 여부)
    req = json.loads(request.body)
    post_id = req["id"]
    button_type = req["type"]

    post = get_object_or_404(id=post_id)

    # 만약에 button type이 도움이 되었어요 버튼이면 도움이 되었어요 개수 + 1
    # 만약에 button type이 퍼오기이라면 스크랩 개수 + 1
    if button_type == "도움이 되었어요":
        post.helped_num += 1
    elif button_type == "퍼오기":
        post.scrap_num += 1

    post.save()

    # TODO: 굳이 JsonResponse 필요한가? (프론트엔드 단에서는 도움이 되었어요 or 스크랩 개수가 표현이 되지 않는 듯)
    # if 전달할 내용이 없다면 Httpresponse로 가도 됨.
    return JsonResponse({"id": post_id, "type": button_type})
