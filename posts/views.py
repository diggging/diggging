from posts import serializers
from users.models import Alarm, User
from django.shortcuts import render, redirect, HttpResponse, get_object_or_404
from django.http import HttpResponse
from django.views.decorators.http import require_POST, require_GET
from .models import Post, Folder
from users.models import Sand
#from .forms import PostForm
import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator
from questions.models import QuestionPost

from rest_framework.views import APIView
from posts.serializers import PostSerializer, UserSerializer, PostDetailSerializer
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status, generics, mixins
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly

# main 페이지
# def main(request):
#     me = request.user   
#     return render(request, "posts/post_scrap.html", {"user":me})

class Main(APIView):
    def get(self, request, format=None, **kwargs):
        me = request.user
        posts = Post.objects.all()

        me_serializer = UserSerializer(me)
        posts_serializer = PostSerializer(posts, many=True)

        return Response({"me": me_serializer.data, "all_posts":posts_serializer.data})


def helped(request):
    me = request.user 
    return render(request, "posts/post_helped.html", {"user":me})


def follow(request):
    me = request.user 
    return render(request, "posts/post_follow.html", {"user":me})


def my_recent(request):
    me = request.user 
    return render(request, "posts/my_recent.html", {"user":me})

# -----------------------------------------------------------------------
def is_ajax(request):
    return request.META.get("HTTP_X_REQUESTED_WITH") == "XMLHttpRequest"

# main axios
@require_GET
def scrap_axios(request):
    me = request.user    
    posts = QuestionPost.objects.all() ##질문만 받아오기
    all_posts_scrap = Post.objects.all().order_by("-scrap_num")

    post = Post.objects.filter()

    paginator = Paginator(all_posts_scrap, 10)
    page_num = request.GET.get("page")
    posts_scrap = paginator.page(page_num)

    if is_ajax(request):
        return render(request, 'posts/_posts.html', {'posts': posts_scrap, "user":me})
        # return JsonResponse(ctx, safe=False)
    return render(request, 'posts/post_scrap.html', {'posts': posts_scrap, "user":me})

@require_GET
def helped_axios(request):
    me = request.user
    all_posts_helped = Post.objects.all().order_by("-helped_num")
    paginator = Paginator(all_posts_helped, 10)
    page_num = request.GET.get("page")
    posts_helped = paginator.page(page_num)

    if is_ajax(request):
        return render(request, 'posts/_posts.html', {'posts': posts_helped, "user":me})
    return render(request, 'posts/post_helped.html', {'posts': posts_helped , "user":me})

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

    paginator = Paginator(all_followings_posts, 10)
    page_num = request.GET.get("page")
    posts_follow = paginator.page(page_num)

    if is_ajax(request):
        return render(request, "posts/_posts.html", {"posts": posts_follow})

    return render(request, "posts/post_scrap.html", {"posts": posts_follow})


@require_GET
def my_recent_axios(request):
    me = request.user
    my_recent_post = Post.objects.filter(user=me).order_by("-created")
    paginator = Paginator(my_recent_post, 10)
    page_num = request.GET.get("page")
    posts_my = paginator.page(page_num)

    if is_ajax(request):
        return render(request, "posts/_posts.html", {"posts": posts_my})

    return render(request, "posts/post_scrap.html", {"posts": posts_my})


# -----------------------------------------------------------------------

# 프론트에서 해당 포스트 id 넘겨주면


# def post_detail(request, user_id, post_id):
#     post_details = Post.objects.get(pk=post_id)
#     me = get_object_or_404(User, pk=user_id)
#     folder = post_details.folder.get(
#         folder_name=post_details.language, folder_user=post_details.user
#     )
#     comments = post_details.comments.all().order_by('created')

#     ctx = {
#         "post": post_details,
#         "folder": folder,
#         "comments": comments,
#         "user_id": user_id,
#         "post_id": post_id,
#     }
#     # html added by 종권
#     return render(request, "posts/post_detail.html", ctx)

# class PostDetail(APIView):
#     def get(self, request, format=None, **kwargs):
#         post = Post.objects.get(pk=self.kwargs['post_id'])
#         serializer = PostDetailSerializer(post)
#         return Response(serializer.data)
    
#     def put(self, request,post_id, format=None):
#         post = Post.objects.get(pk=post_id)
#         serializer = PostDetailSerializer(post, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# class PostDetail(mixins.RetrieveModelMixin,
#                      mixins.UpdateModelMixin,
#                      mixins.DestroyModelMixin,
#                      generics.GenericAPIView):
#     queryset = Post.objects.all()
#     serializer_class = PostDetailSerializer

#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

#     def patch(self, request, *args, **kwargs):
#         return self.partial_update(request, *args, **kwargs)

#------------------------------------------------------- post detail -------------------------------------------------------
class PostCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
 
    def create(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()

        me = request.user  # folder 주인 가져오기
        language = request.data.get("language")  # language 가져옴
        framework = request.data.get("framework")  # framework 가져옴
        solve = request.data.get("problem_solving")  # 해결 여부

        lang_folder = Folder.objects.filter(
            folder_name=language, folder_user=me, folder_kind="language"
        )  # lang folder 가져옴
        frame_folder = Folder.objects.filter(
            folder_name=framework, folder_user=me, folder_kind="framework"
        )  # frameworkd folder 가져옴

        if lang_folder.exists():
            # 있으면 foriegn key 연결
            existed_folder = Folder.objects.get(
                folder_name=language, folder_user=me, folder_kind="language"
            )
            instance.folder.add(existed_folder)
        else:
            # 없으면 folder 만들어서
            new_folder = Folder.objects.create(
                folder_name=language, folder_user=me, folder_kind="language"
            )
            instance.folder.add(new_folder)

        if frame_folder.exists():
            # 있으면 foriegn key 연결
            existed_folder = Folder.objects.get(
                folder_name=framework, folder_user=me, folder_kind="framework"
            )
            instance.folder.add(existed_folder)
        else:
            # 없으면 folder 만들어서
            new_folder = Folder.objects.create(
                folder_name=framework, folder_user=me, folder_kind="framework"
            )
            instance.folder.add(new_folder)

        # 해결, 미해결 폴더에 넣기
        if solve == "해결":
            existed_folder = Folder.objects.get(
                folder_user=me, folder_name=solve, folder_kind="solved"
            )
            instance.folder.add(existed_folder)

        else:
            existed_folder = Folder.objects.get(
                folder_user=me, folder_name=solve, folder_kind="solved"
            )
            instance.folder.add(existed_folder)

        # 포스팅 시에 sand 추가해주기
        new_sand = Sand.objects.create(user=me, amount=100, reason="삽질 기록 작성")

        

        return Response(serializer.data)


# def post_create(request):
#     if request.method == "POST":
#         form = PostForm(request.POST, request.FILES)
#         if form.is_valid():
#             posts = form.save(commit=False)
#             posts.user = request.user
#             posts.save()

#             # 폴더 분류해주기
#             me = posts.user  # folder 주인 가져오기
#             language = request.POST.get("language")  # language 가져옴
#             framework = request.POST.get("framework")  # framework 가져옴
#             solve = request.POST.get("problem_solving")  # 해결 여부

#             lang_folder = Folder.objects.filter(
#                 folder_name=language, folder_user=me, folder_kind="language"
#             )  # lang folder 가져옴
#             frame_folder = Folder.objects.filter(
#                 folder_name=framework, folder_user=me, folder_kind="framework"
#             )  # frameworkd folder 가져옴

#             if lang_folder.exists():
#                 # 있으면 foriegn key 연결
#                 existed_folder = Folder.objects.get(
#                     folder_name=language, folder_user=me, folder_kind="language"
#                 )
#                 posts.folder.add(existed_folder)
#             else:
#                 # 없으면 folder 만들어서
#                 new_folder = Folder.objects.create(
#                     folder_name=language, folder_user=me, folder_kind="language"
#                 )
#                 posts.folder.add(new_folder)

#             if frame_folder.exists():
#                 # 있으면 foriegn key 연결
#                 existed_folder = Folder.objects.get(
#                     folder_name=framework, folder_user=me, folder_kind="framework"
#                 )
#                 posts.folder.add(existed_folder)
#             else:
#                 # 없으면 folder 만들어서
#                 new_folder = Folder.objects.create(
#                     folder_name=framework, folder_user=me, folder_kind="framework"
#                 )
#                 posts.folder.add(new_folder)

#             # 해결, 미해결 폴더에 넣기
#             if solve == "해결":
#                 existed_folder = Folder.objects.get(
#                     folder_user=me, folder_name=solve, folder_kind="solved"
#                 )
#                 posts.folder.add(existed_folder)

#             else:
#                 existed_folder = Folder.objects.get(
#                     folder_user=me, folder_name=solve, folder_kind="solved"
#                 )
#                 posts.folder.add(existed_folder)

#             posts.save()
#             # 포스팅 시에 sand 추가해주기
#             new_sand = Sand.objects.create(user=me, amount=100, reason="삽질 기록 작성")

#             # 지수언니가 말한대로 고침!
#             return redirect("posts:post_detail", posts.user.id, posts.id)

#     form = PostForm()
#     ctx = {"form": form}
#     return render(request, "posts/post_create.html", context=ctx)



class PostDetailGetView(generics.RetrieveUpdateDestroyAPIView):
    #comment 보내주기
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly] # 로그인한, 쓴사람만 수정 가능
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()    # 해당 오브젝트 가져옴. pk신경쓸 필요 없음
        origin_lang_fol = instance.folder.get(folder_user=request.user, folder_kind="language")
        origin_frame_fol = instance.folder.get(folder_user=request.user, folder_kind="framework")
        origin_solve_fol = instance.folder.get(folder_user=request.user, folder_kind="solved")

        new_lang = request.data.get("language")
        new_frame = request.data.get("framework")
        new_solve = request.data.get("problem_solving")

        if new_lang != origin_lang_fol.folder_name:
                origin_lang_fol.related_posts.remove(instance)
                lang_folder = Folder.objects.filter(
                    folder_name=new_lang, folder_user=instance.user, folder_kind="language"
                )
                if lang_folder.exists():
                    existed_folder = Folder.objects.get(
                        folder_name=new_lang,
                        folder_user=instance.user,
                        folder_kind="language",
                    )
                    instance.folder.add(existed_folder)
                else:
                    new_folder = Folder.objects.create(
                        folder_name=new_lang,
                        folder_user=instance.user,
                        folder_kind="language",
                    )
                    instance.folder.add(new_folder)
                
                if not origin_lang_fol.related_posts.all():
                    origin_lang_fol.delete()

        if new_frame != origin_frame_fol.folder_name:
            origin_frame_fol.related_posts.remove(instance)
            frame_folder = Folder.objects.filter(
                folder_name=new_frame,
                folder_user=instance.user,
                folder_kind="framework",
            )
            if frame_folder.exists():
                existed_folder = Folder.objects.get(
                    folder_name=new_frame,
                    folder_user=instance.user,
                    folder_kind="framework",
                )
                instance.folder.add(existed_folder)
            else:
                new_folder = Folder.objects.create(
                    folder_name=new_frame,
                    folder_user=instance.user,
                    folder_kind="framework",
                )
                instance.folder.add(new_folder)
            if not origin_frame_fol.related_posts.all():
                origin_frame_fol.delete()

        if new_solve != origin_solve_fol.folder_name:
            origin_solve_fol.related_posts.remove(instance)
            solve_folder = Folder.objects.get(
                folder_name=new_solve, folder_user=instance.user, folder_kind="solved"
            )
            instance.folder.add(solve_folder)

        instance.save()

        serializer = self.serializer_class(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()

        lang_folder = Folder.objects.get(folder_user=instance.user, related_posts=instance, folder_kind="language")
        frame_folder = Folder.objects.get(folder_user=instance.user, related_posts=instance, folder_kind="framework")
        
        instance.delete()

        if not lang_folder.related_posts.exists():
            lang_folder.delete()

        if not frame_folder.related_posts.exists():
            frame_folder.delete()
        return Response(status=status.HTTP_200_OK)

# class PostDetailUpdateView(generics.UpdateAPIView):
#     authentication_classes = [BasicAuthentication, SessionAuthentication]
#     permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly] # 로그인한, 쓴사람만 수정 가능
#     queryset = Post.objects.all()
#     serializer_class = PostDetailSerializer
#     lookup_field = 'pk'

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         #instance.name = request.data.get("name")
#         #instance.save()

#         #serializer = self.get_serializer(instance, partial=True)
#         serializer = self.serializer_class(instance, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()

#         return Response(serializer.data)

# class PostDetailDeleteView(generics.DestroyAPIView):
#     authentication_classes = [BasicAuthentication, SessionAuthentication]
#     permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly] # 로그인한, 쓴사람만 수정 가능
#     queryset = Post.objects.all()
#     serializer_class = PostDetailSerializer
#     # 2. 수정하면 폴더 변경되어야함

# def post_update(request, pk):
    #     # 눈물나는 update.......................
#     # 수정히기 -> 폴더 바뀌면 폴더 바꿔야함
#     # 원래 있던 폴더에 글이 하나밖에 없었다면 폴더가 삭제 되어야함(하지만 해결 미해결은 아님)
#     # 으아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ
#     post = get_object_or_404(Post, pk=pk)
#     origin_lang_fol = post.folder.get(folder_user=request.user, folder_kind="language")
#     origin_frame_fol = post.folder.get(folder_user=request.user, folder_kind="framework")
#     origin_solve_fol = post.folder.get(folder_user=request.user, folder_kind="solved")
#     if request.method == "POST":
#         form = PostForm(request.POST, request.FILES, instance=post)
#         if form.is_valid():
#             form.save()
#             new_lang = request.POST.get("language")
#             new_frame = request.POST.get("framework")
#             new_solve = request.POST.get("problem_solving")

#             # lang 폴더가 달라진다면?
#             if new_lang != origin_lang_fol.folder_name:
#                 # 1. post와 폴더의 관계 끊기
#                 origin_lang_fol.related_posts.remove(post)
#                 # 2. post와 새로운 폴더와의 연결
#                 # 이미 있는 폴더면 걍 넣어주고 아니면 생성후 넣어줌
#                 lang_folder = Folder.objects.filter(
#                     folder_name=new_lang, folder_user=post.user, folder_kind="language"
#                 )
#                 if lang_folder.exists():
#                     # 있으면 foriegn key 연결
#                     existed_folder = Folder.objects.get(
#                         folder_name=new_lang,
#                         folder_user=post.user,
#                         folder_kind="language",
#                     )
#                     post.folder.add(existed_folder)
#                 else:
#                     # 없으면 folder 만들어서
#                     new_folder = Folder.objects.create(
#                         folder_name=new_lang,
#                         folder_user=post.user,
#                         folder_kind="language",
#                     )
#                     post.folder.add(new_folder)
#                 # 원래 폴더에 더이상 연결된 post가 없다면? 폴더삭제 / 있다면? 냅두기
#                 print(origin_lang_fol.related_posts.all())
#                 if not origin_lang_fol.related_posts.all():
#                     origin_lang_fol.delete()

#             # framework
#             if new_frame != origin_frame_fol.folder_name:
#                 origin_frame_fol.related_posts.remove(post)
#                 frame_folder = Folder.objects.filter(
#                     folder_name=new_frame,
#                     folder_user=post.user,
#                     folder_kind="framework",
#                 )
#                 if frame_folder.exists():
#                     existed_folder = Folder.objects.get(
#                         folder_name=new_frame,
#                         folder_user=post.user,
#                         folder_kind="framework",
#                     )
#                     post.folder.add(existed_folder)
#                 else:
#                     new_folder = Folder.objects.create(
#                         folder_name=new_frame,
#                         folder_user=post.user,
#                         folder_kind="framework",
#                     )
#                     post.folder.add(new_folder)
#                 if not origin_frame_fol.related_posts.all():
#                     origin_frame_fol.delete()

#             # solve
#             if new_solve != origin_solve_fol.folder_name:
#                 origin_solve_fol.related_posts.remove(post)  # 지우고
#                 solve_folder = Folder.objects.get(
#                     folder_name=new_solve, folder_user=post.user, folder_kind="solved"
#                 )
#                 post.folder.add(solve_folder)

#             post.save()
#             return redirect("posts:main")  # 수정
#     else:
#         form = PostForm(instance=post)
#         ctx = {
#             "form": form,
#         }
#         return render(request, "posts/post_update.html", ctx)


# def post_delete(request, pk):
#     post = Post.objects.get(pk=pk)

#     # post가 들어있던 폴더를 보고 비어져있으면 지움
#     lang_folder = Folder.objects.get(
#         folder_user=post.user, related_posts=post, folder_kind="language"
#     )
#     frame_folder = Folder.objects.get(
#         folder_user=post.user, related_posts=post, folder_kind="framework"
#     )

#     post.delete()

#     if not lang_folder.related_posts.exists():
#         lang_folder.delete()

#     if not frame_folder.related_posts.exists():
#         frame_folder.delete()

#     return redirect("posts:main")

def search(request):
    posts = Post.objects.all()
    q = request.POST.get('q',"")

    if q:
        posts = posts.filter(title__icontains=q) | posts.filter(desc__icontains=q) | posts.filter(language__icontains=q) | posts.filter(os__icontains=q) | posts.filter(problem_solving__icontains=q) | posts.filter(framework__icontains=q) 

        return render(request, 'posts/search.html',{'posts': posts, 'q':q })

    else:    
        return render(request, "posts/search.html")


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
        new_alarm = Alarm.objects.create(user=post.user, reason="내가 남긴 기록 \""+ post.title + "\" 이 " + user.user_nickname + "님께 도움이 되었어요.")
        new_sand = Sand.objects.create(user=post.user, amount=20, reason="도움이 되었어요")
    post.helped_num = post.count_likes_user()
    post.save()
    ctx = {"likes_count": post.count_likes_user(), "message": message}
    return HttpResponse(json.dumps(ctx), content_type="application/json")


@login_required
@require_POST
def post_scrap(request, user_id, post_id):
    post = get_object_or_404(Post, pk=post_id)  # 어떤 post인지 가져오기
    target_language = post.language  # 어떤 language인지 - 폴더 생성용
    target_framework = post.framework  # 어떤 framework인지 - 프레임워크 생성용
    me = request.user  # 누구의 폴더를 만들것인지
    post_host = User.objects.get(id=user_id)

    # get: object-없는걸 가져오면 오류 , filter: queryset- 없어도 빈 queryset 오류 x
    lang_folder = Folder.objects.filter(
        folder_name=target_language, folder_user=me, folder_kind="language"
    )
    frame_folder = Folder.objects.filter(
        folder_name=target_framework, folder_user=me, folder_kind="framework"
    )

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

    # url: 저장 후 post_detail 페이지에 남아있음.
    pk = request.POST.get("pk", None)
    post = get_object_or_404(Post, pk=pk)
    user = request.user

    if post.scarps_user.filter(id=user.id).exists():
        post.scarps_user.remove(user)
        message = "퍼가기 취소"
    else:
        post.scarps_user.add(user)
        message = "퍼가기"
        # 퍼가기 할 때 sand 생성하기 - host꺼 생성해줘야함
        new_sand = Sand.objects.create(user=post.user, amount=50, reason=me.user_nickname + "님의 내 기록 퍼가기")

        # 퍼가기 -> host 에게 alarm감
        new_alarm = Alarm.objects.create(user=post_host, reason=me.user_nickname + "님이 내 기록 " + post.title + "을 퍼갔어요.")

    post.scrap_num = post.count_scarps_user()
    post.save()

    ctx = {"scarps_count": post.count_scarps_user(), "message": message}
    return HttpResponse(json.dumps(ctx), content_type="application/json")


def search_quest(request):
    questions = QuestionPost.objects.all() ##질문만 받아오기
    p = request.POST.get('p',"")

    if p:
        questions = questions.filter(title__icontains=p) | questions.filter(desc__icontains=p) | questions.filter(language__icontains=p) | questions.filter(os__icontains=p) | questions.filter(framework__icontains=p) 

        return render(request, 'posts/search_quest.html',{'posts': questions, 'p':p })

    else:
        return render(request, "posts/search_quest.html")

#---------------------------------------------------------

# 삽질 기록 퍼오기
def get_post(request, user_id, post_id):
    post = get_object_or_404(Post, pk=post_id)  # 어떤 post인지 가져오기
    target_language = post.language  # 어떤 language인지 - 폴더 생성용
    target_framework = post.framework  # 어떤 framework인지 - 프레임워크 생성용
    me = request.user  # 누구의 폴더를 만들것인지
    post_host = User.objects.get(id=user_id)

    # get: object-없는걸 가져오면 오류 , filter: queryset- 없어도 빈 queryset 오류 x
    lang_folder = Folder.objects.filter(
        folder_name=target_language, folder_user=me, folder_kind="language"
    )
    frame_folder = Folder.objects.filter(
        folder_name=target_framework, folder_user=me, folder_kind="framework"
    )

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

# 서비스 소개 페이지
def service_view(request):
    return render(request, "posts/our_service.html")