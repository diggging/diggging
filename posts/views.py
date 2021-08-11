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

    # 이웃들의 최신 글을 긁어오는 코드
    me = request.user
    followings = me.user_following.all()
    if followings:
        all_followings_posts = Post.objects.filter(user=followings[0])
        for following in followings[1:]:
            following_posts = Post.objects.filter(user=following)
            all_followings_posts.union(following_posts)     # queryset append
        all_followings_posts = all_followings_posts.order_by("-created")    # 생성 기준으로 listing
    else:
        all_followings_posts = None
    # 내 최신 포스트
    my_recent_post = Post.objects.filter(user=me).order_by("-created")

    ctx = {
        "posts_scrap": all_posts_scrap,     # 스크랩 순
        "posts_helped": all_posts_helped,   # helped 순
        "user": request.user,               # 나
        "followings_posts":all_followings_posts,    # 내가 follow하는 사람들의 최신순 포스트
        "my_recent_post":my_recent_post,    # 내 글 최신순
    }

    return render(request, "posts/post_list.html", context=ctx)


# 프론트에서 해당 포스트 id 넘겨주면
def post_detail(request, user_id, post_id):
    post_details = Post.objects.get(pk=post_id)
    me = get_object_or_404(User, pk=user_id)
    folder = post_details.folder.get(
        folder_name=post_details.language, folder_user=post_details.user
    )
    comments = post_details.comments.all()
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
            framework = request.POST.get("framework")   # framework 가져옴
            lang_folder = Folder.objects.filter(folder_name=language, folder_user=me)   # lang folder 가져옴
            frame_folder = Folder.objects.filter(folder_name=framework, folder_user=me)    # frameworkd folder 가져옴
            if lang_folder.exists():
                # 있으면 foriegn key 연결
                existed_folder = Folder.objects.get(
                    folder_name=language, folder_user=me
                )
                posts.folder.add(existed_folder)
            else:
                # 없으면 folder 만들어서
                new_folder = Folder.objects.create(folder_name=language, folder_user=me)
                posts.folder.add(new_folder)

            if frame_folder.exists():
                # 있으면 foriegn key 연결
                existed_folder = Folder.objects.get(
                    folder_name=framework, folder_user=me
                )
                posts.folder.add(existed_folder)
            else:
                # 없으면 folder 만들어서
                new_folder = Folder.objects.create(folder_name=framework, folder_user=me)
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
    framework = request.POST.get("framework")   # frmae work 현주가 추가
    free_post = Post.objects.all().order_by("-id")
    post = request.POST.get("post", "")
    form = selectForm()

    free_post = free_post.filter(language=language)
    frame_post = Post.objects.filter(framework=framework).order_by("-id")
    ctx = {
        "free_post": free_post,
        "post": post,
        "form": form,
        "frame_post" : frame_post
    }
    return render(request, "posts/search.html", ctx)


# 삽질 기록 퍼오기
def get_post(request, user_id, post_id):
    post = get_object_or_404(Post, pk=post_id)  # 어떤 post인지 가져오기
    target_language = post.language # 어떤 language인지 - 폴더 생성용
    target_framework = post.framework   # 어떤 framework인지 - 프레임워크 생성용
    me = request.user   # 누구의 폴더를 만들것인지

    # get: object-없는걸 가져오면 오류 , filter: queryset- 없어도 빈 queryset 오류 x
    lang_folder = Folder.objects.filter(folder_name=target_language, folder_user=me)
    frame_folder = Folder.objects.filter(folder_name=target_framework, folder_user=me)

    # 만약 나, language로 된 폴더 있으면
    if lang_folder.exists():
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

    # framework 동일
    if frame_folder.exists():
        # 그 폴더에 포스트 그냥 추가하기
        folder = Folder.objects.get(
            folder_name=target_framework, folder_user=me
        )  # query set은 object가 아니므로 object 다시 가져옴
        folder.related_posts.add(post)  # add 는 저장 x 명시적 저장 필요
        folder.save()
    # 없으면
    else:
        # 폴더를 생성한 뒤, 거기에 추가하기
        new_folder = Folder.objects.create(
            folder_name=target_framework, folder_user=me
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
