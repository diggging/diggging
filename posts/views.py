from users.models import Alarm, User
from comments.models import Comment
from django.http.response import JsonResponse
from django.core import serializers
from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.http import HttpResponse
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from django.views.decorators.http import require_POST, require_GET


from .models import Post, Folder
from users.models import Sand
from . import models
from .forms import SelectForm, PostForm
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator
from django.db.models import Q

# main 페이지
def main(request):
    # # 모든 전체 글에서 스크랩 순위대로 추천
    # all_posts_scrap = Post.objects.all().order_by("-scrap_num")
    # # 모든 전체 글에서 도움 순위대로 추천
    # all_posts_helped = Post.objects.all().order_by("-helped_num")

    # # 이웃들의 최신 글을 긁어오는 코드
    # me = request.user
    # followings = me.user_following.all()
    # if followings:
    #     all_followings_posts = Post.objects.filter(user=followings[0])
    #     for following in followings[1:]:
    #         following_posts = Post.objects.filter(user=following)
    #         all_followings_posts.union(following_posts)  # queryset append
    #     all_followings_posts = all_followings_posts.order_by("-created")  # 생성 기준으로 listing
    # else:
    #     all_followings_posts = [] ## -> None으로 하면 js에서 오류 뜸

    # # 내 최신 포스트
    # my_recent_post = Post.objects.filter(user=me).order_by("-created")

    # ctx = {
    #     "posts_scrap": all_posts_scrap,  # 스크랩 순
    #     "posts_helped": all_posts_helped,  # helped 순
    #     "user": request.user,  # 나
    #     "followings_posts": all_followings_posts,  # 내가 follow하는 사람들의 최신순 포스트
    #     "my_recent_post": my_recent_post,  # 내 글 최신순
    # }
    return render(request, "posts/post_list.html")

def helped(request):
    return render(request, "posts/post_helped.html")

def follow(request):
    return render(request, "posts/post_follow.html")

def my_recent(request):
    return render(request, "posts/my_recent.html")

#-----------------------------------------------------------------------
def is_ajax(request):
    """
    This utility function is used, as `request.is_ajax()` is deprecated.

    This implements the previous functionality. Note that you need to
    attach this header manually if using fetch.
    """
    return request.META.get("HTTP_X_REQUESTED_WITH") == "XMLHttpRequest"

# main axios
@require_GET
def scrap_axios(request):
    all_posts_scrap = Post.objects.all().order_by("-scrap_num")
    paginator = Paginator(all_posts_scrap, 8)
    page_num = request.GET.get("page")
    posts_scrap = paginator.page(page_num)

    if is_ajax(request):
        return render(request, 'posts/_posts.html', {'posts': posts_scrap})

    return render(request, 'posts/post_list.html', {'posts': posts_scrap})

@require_GET
def helped_axios(request):
    all_posts_helped = Post.objects.all().order_by("-helped_num")
    paginator = Paginator(all_posts_helped, 8)
    page_num = request.GET.get("page")
    posts_helped = paginator.page(page_num)

    if is_ajax(request):
        return render(request, 'posts/_posts.html', {'posts': posts_helped})

    return render(request, 'posts/post_helped.html', {'posts': posts_helped})

@require_GET
def follow_axios(request):
    
    me = request.user
    followings = me.user_following.all()
    if followings:
        all_followings_posts = Post.objects.filter(user=followings[0])
        for following in followings[1:]:
            following_posts = Post.objects.filter(user=following)
            all_followings_posts.union(following_posts)  # queryset append
        all_followings_posts = all_followings_posts.order_by(
            "-created"
        )  # 생성 기준으로 listing
    else:
        all_followings_posts = []
    
    paginator = Paginator(all_followings_posts, 8)
    page_num = request.GET.get("page")
    posts_follow = paginator.page(page_num)

    if is_ajax(request):
        return render(request, 'posts/_posts.html', {'posts': posts_follow})

    return render(request, 'posts/post_list.html', {'posts': posts_follow})

# @csrf_exempt
# def my_recent_axios(request):
#     me = request.user
#     my_recent_post = Post.objects.filter(user=me).order_by("-created")
#     my_recent_post_list = serializers.serialize('json', my_recent_post)

#     return HttpResponse(my_recent_post_list, content_type="text/json-comment-filtered")
@require_GET
def my_recent_axios(request):
    me = request.user
    my_recent_post = Post.objects.filter(user=me).order_by("-created")
    paginator = Paginator(my_recent_post, 8)
    page_num = request.GET.get("page")
    posts_my = paginator.page(page_num)

    if is_ajax(request):
        return render(request, 'posts/_posts.html', {'posts': posts_my})

    return render(request, 'posts/post_list.html', {'posts': posts_my})

#-----------------------------------------------------------------------

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


@login_required
@require_POST
def post_like(request):
    pk = request.POST.get("pk", None)
    post = get_object_or_404(Post, pk=pk)
    user = request.user

    if post.likes_user.filter(id=user.id).exists():
        post.likes_user.remove(user)
        message = "좋아요 취소"
    else:
        post.likes_user.add(user)
        message = "좋아요"

    ctx = {"likes_count": post.count_likes_user(), "message": message}
    return HttpResponse(json.dumps(ctx), content_type="application/json")


@login_required
@require_POST
def post_scrap(request):
    pk = request.POST.get("pk", None)
    post = get_object_or_404(Post, pk=pk)
    user = request.user

    if post.scarps_user.filter(id=user.id).exists():
        post.scarps_user.remove(user)
        message = "퍼가기 취소"
    else:
        post.scarps_user.add(user)
        message = "퍼가기"

    ctx = {"scarps_count": post.count_scarps_user(), "message": message}
    return HttpResponse(json.dumps(ctx), content_type="application/json")


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
            framework = request.POST.get("framework")  # framework 가져옴
            solve = request.POST.get("problem_solving")  # 해결 여부

            lang_folder = Folder.objects.filter(folder_name=language, folder_user=me, folder_kind="language")  # lang folder 가져옴
            frame_folder = Folder.objects.filter(folder_name=framework, folder_user=me, folder_kind="framework")  # frameworkd folder 가져옴

            if lang_folder.exists():
                # 있으면 foriegn key 연결
                existed_folder = Folder.objects.get(folder_name=language, folder_user=me, folder_kind="language")
                posts.folder.add(existed_folder)
            else:
                # 없으면 folder 만들어서
                new_folder = Folder.objects.create(folder_name=language, folder_user=me, folder_kind="language")
                posts.folder.add(new_folder)

            if frame_folder.exists():
                # 있으면 foriegn key 연결
                existed_folder = Folder.objects.get(folder_name=framework, folder_user=me, folder_kind="framework")
                posts.folder.add(existed_folder)
            else:
                # 없으면 folder 만들어서
                new_folder = Folder.objects.create(folder_name=framework, folder_user=me, folder_kind="framework")
                posts.folder.add(new_folder)

            # 해결, 미해결 폴더에 넣기
            if solve == "해결":
                existed_folder = Folder.objects.get(folder_user=me, folder_name=solve, folder_kind="solved")
                posts.folder.add(existed_folder)
            else:
                print(solve)
                print(Folder.objects.get(folder_user=me, folder_name=solve))
                existed_folder = Folder.objects.get(folder_user=me, folder_name=solve, folder_kind="solved")
                posts.folder.add(existed_folder)

            posts.save()
            # 포스팅 시에 sand 추가해주기
            new_sand = Sand.objects.create(user=me, amount=100, reason="삽질 기록 작성")

            # 지수언니가 말한대로 고침!
            return redirect("posts:post_detail", posts.user.id, posts.id)
        
    form = PostForm()
    ctx = {"form": form}
    return render(request, "posts/post_create.html", context=ctx)


def post_update(request, pk):
    # 눈물나는 update.......................
    # 수정히기 -> 폴더 바뀌면 폴더 바꿔야함
    # 원래 있던 폴더에 글이 하나밖에 없었다면 폴더가 삭제 되어야함(하지만 해결 미해결은 아님)
    # 으아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
    post = get_object_or_404(Post, pk=pk)
    origin_lang_fol = post.folder.get(folder_kind="language")
    origin_frame_fol = post.folder.get(folder_kind="framework")
    origin_solve_fol = post.folder.get(folder_kind="solved")
    print(origin_lang_fol)
    print(origin_frame_fol)
    print(origin_solve_fol)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            form.save()
            new_lang = request.POST.get("language")
            new_frame = request.POST.get("framework")
            new_solve = request.POST.get("problem_solving")
            print(new_lang)
            print(new_frame)
            print(new_solve)

            # lang 폴더가 달라진다면?
            if new_lang != origin_lang_fol.folder_name:
                # 1. post와 폴더의 관계 끊기
                origin_lang_fol.related_posts.remove(post)
                # 2. post와 새로운 폴더와의 연결
                # 이미 있는 폴더면 걍 넣어주고 아니면 생성후 넣어줌
                lang_folder = Folder.objects.filter(folder_name=new_lang, folder_user=post.user, folder_kind="language")
                if lang_folder.exists():
                    # 있으면 foriegn key 연결
                    existed_folder = Folder.objects.get(folder_name=new_lang, folder_user=post.user, folder_kind="language")
                    post.folder.add(existed_folder)
                else:
                # 없으면 folder 만들어서
                    new_folder = Folder.objects.create(folder_name=new_lang, folder_user=post.user, folder_kind="language")
                    post.folder.add(new_folder)
                # 원래 폴더에 더이상 연결된 post가 없다면? 폴더삭제 / 있다면? 냅두기
                print(origin_lang_fol.related_posts.all())
                if not origin_lang_fol.related_posts.all():
                    origin_lang_fol.delete()

            # framework
            if new_frame != origin_frame_fol.folder_name:
                origin_frame_fol.related_posts.remove(post)
                frame_folder = Folder.objects.filter(folder_name=new_frame, folder_user=post.user, folder_kind="framework")
                if frame_folder.exists():
                    existed_folder = Folder.objects.get(folder_name=new_frame, folder_user=post.user, folder_kind="framework")
                    post.folder.add(existed_folder)
                else:
                    new_folder = Folder.objects.create(folder_name=new_frame, folder_user=post.user, folder_kind="framework")
                    post.folder.add(new_folder)
                if not origin_frame_fol.related_posts.all():
                    origin_frame_fol.delete()
            
            # solve
            if new_solve != origin_solve_fol.folder_name:
                origin_solve_fol.related_posts.remove(post)    # 지우고
                solve_folder = Folder.objects.get(folder_name=new_solve, folder_user=post.user, folder_kind="solved")
                post.folder.add(solve_folder)

            post.save()
            return redirect("posts:main") #수정
    else:
        form = PostForm(instance=post)
        ctx = {
            "form": form,
        }
        return render(request, "posts/post_update.html", ctx)


def post_delete(request, pk):
    posts = Post.objects.get(pk=pk)
    posts.delete()
    return redirect("posts:main")


# def search(request):
#     language = request.POST.get("post")
#     framework = request.POST.get("framework")  # frmae work 현주가 추가
#     post = request.POST.get("post", "")
#     select_languages = request.POST.get("field")
#     print(select_languages)
#     select_os = request.POST.get("field2")
#     select_solve = request.POST.get("field3")
#     select_framwork = request.POST.get("field4")
#     free_post = Post.objects.filter(language=language).order_by("-id")
#     frame_post = Post.objects.filter(framework=framework).order_by("-id")
#     form = SelectForm()
#     ctx = {
#         "free_post": free_post,
#         "post": post,
#         "form": form,
#         "frame_post": frame_post,
#     }
#     return render(request, "posts/search.html", ctx)

## search input ajax
@csrf_exempt
def search_input(request):
    if request.method == "POST":
        search_str = json.loads(request.body).get("text")

        post = Post.objects.filter(
            title__icontains=search_str) | Post.objects.filter(
            desc__icontains=search_str)

        data = post.values()
        return JsonResponse(list(data), safe=False)

## search select ajax
@csrf_exempt
def search_select(request):
    if request.method == "POST":

        language = json.loads(request.body).get("language")
        os = json.loads(request.body).get("os")
        framework = json.loads(request.body).get("framework")
        problem_solving = json.loads(request.body).get("problem_solving")

        lang_filter = Post.objects.filter(language__exact=language)
        os_filter = Post.objects.filter(os__exact=os)
        frame_filter = Post.objects.filter(framework__exact=framework)
        problem_filter = Post.objects.filter(problem_solving__exact=problem_solving)

        ##전체 선택
        fields = Post._meta.get_fields()
        lang_fields = Post._meta.get_field('language')
        os_fields = Post._meta.get_field('os')
        frameword_fields = Post._meta.get_field('framework')
        problem_fields = Post._meta.get_field('problem_solving')


        result = Post.objects.none()

        if lang_filter.exists():
            result = lang_filter

        if os_filter.exists() and result.exists():
            result = result & os_filter
        elif os_filter.exists():
            result = os_filter
        else:
            result = result

        if frame_filter.exists() and result.exists():
            result = result & frame_filter
        elif frame_filter.exists():
            result = frame_filter
        else:
            result = result

        if problem_filter.exists() and result.exists():
            result = result & problem_filter
        elif problem_filter.exists():
            result = problem_filter
        else:
            result = result

        data = result.values()

    return JsonResponse(list(data), safe=False)

def search(request):
    posts = Post.objects.all()

    form = SelectForm()
    ctx = {
            'posts': posts,
            'form': form,
        }
    return render(request, "posts/search.html", ctx)

#post data 보내주기
@csrf_exempt
def search_post_axios(request):
    post = Post.objects.all()
    post_list = serializers.serialize('json', post)

    return HttpResponse(post_list, content_type="text/json-comment-filtered")

#user data 보내주기
@csrf_exempt
def search_user_axios(request):
    user = User.objects.all()
    user_list = serializers.serialize('json', user)
    return HttpResponse(user_list, content_type="text/json-comment-filtered")

# 삽질 기록 퍼오기
def get_post(request, user_id, post_id):
    post = get_object_or_404(Post, pk=post_id)  # 어떤 post인지 가져오기
    target_language = post.language  # 어떤 language인지 - 폴더 생성용
    target_framework = post.framework  # 어떤 framework인지 - 프레임워크 생성용
    me = request.user  # 누구의 폴더를 만들것인지
    post_host = User.objects.get(id=user_id)

    # get: object-없는걸 가져오면 오류 , filter: queryset- 없어도 빈 queryset 오류 x
    lang_folder = Folder.objects.filter(folder_name=target_language, folder_user=me, folder_kind="language")
    frame_folder = Folder.objects.filter(folder_name=target_framework, folder_user=me, folder_kind="framework")

    # 만약 나, language로 된 폴더 있으면
    if lang_folder.exists():
        # 그 폴더에 포스트 그냥 추가하기
        folder = Folder.objects.get(
            folder_name=target_language, folder_user=me, folder_kind="language"
        )  # query set은 object가 아니므로 object 다시 가져옴
        folder.related_posts.add(post)  # add 는 저장 x 명시적 저장 필요
        folder.save()
    # 없으면
    else:
        # 폴더를 생성한 뒤, 거기에 추가하기
        new_folder = Folder.objects.create(
            folder_name=target_language, folder_user=me, folder_kind="language"
        )  # create - 자동저장
        post.folder.add(new_folder)
    post.save()

    # framework 동일
    if frame_folder.exists():
        # 그 폴더에 포스트 그냥 추가하기
        folder = Folder.objects.get(
            folder_name=target_framework, folder_user=me, folder_kind="framework"
        )  # query set은 object가 아니므로 object 다시 가져옴
        folder.related_posts.add(post)  # add 는 저장 x 명시적 저장 필요
        folder.save()
    # 없으면
    else:
        # 폴더를 생성한 뒤, 거기에 추가하기
        new_folder = Folder.objects.create(
            folder_name=target_framework, folder_user=me, folder_kind="framework"
        )  # create - 자동저장
        post.folder.add(new_folder)
    post.save()

    # 퍼가기 할 때 sand 생성하기 - host꺼 생성해줘야함
    new_sand = Sand.objects.create(
        user=post.user, amount=50, reason=me.user_nickname + "님의 내 기록 퍼가기"
    )

    # 퍼가기 -> host 에게 alarm감
    new_alarm = Alarm.objects.create(
        user=post_host, reason=me.user_nickname + "님이 내 기록 " + post.title + "을 퍼갔어요."
    )
    # url: 저장 후 post_detail 페이지에 남아있음.
    return redirect("posts:post_detail", user_id, post_id)


# @login_required
# def like(request, post_pk):
#     #특정 게시물에 대한 정보
#     post = get_object_or_404(Post, pk = post_pk)
#     user = request.user
#     if user in post.like


# 도움이 되었어요, 스크랩 개수 count 하기 위한 axios
"""@csrf_exempt
def count_like_scrap(request):
    # json 문자열을 json.loads를 통해서 json 형태에서 파이썬 객체 형태로 parsing
    # front 단에서 request.body를 통해서 넘어와야 하는 것들
    # 1) 'id' (post의 id값)
    # 2) 'type' (button이 도움이 되었어요 버튼인지 스크랩 개수 버튼인지의 여부)
    req = json.loads(request.body)
    post_id = req["id"]
    button_type = req["type"]

    post = Post.objects.get(id=post_id)
    post_host = post.user
    me = request.user
    # 만약에 button type이 도움이 되었어요 버튼이면 도움이 되었어요 개수 + 1
    # 만약에 button type이 퍼오기이라면 스크랩 개수 + 1
    if button_type == "like":
        post.helped_num += 1
        new_sand = Sand.objects.create(user=post_host, amount=20, reason="도움이 되었어요") # 도움이 되었어요 누르면 sand 추가
        new_alarm = Alarm.objects.create(user=post_host, reason="내가 남긴 기록 "+post.title+"이 "+me.user_nickname+" 님께 도움이 되었어요.")
    elif button_type == "퍼오기":
        post.scrap_num += 1

    post.save()

    # TODO: 굳이 JsonResponse 필요한가? (프론트엔드 단에서는 도움이 되었어요 or 스크랩 개수가 표현이 되지 않는 듯)
    # if 전달할 내용이 없다면 Httpresponse로 가도 됨.
    return JsonResponse({"id": post_id, "type": button_type})"""
