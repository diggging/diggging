from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.views import APIView
from questions.models import QuestionPost
from .models import (
    Post,
    Folder,
)
from posts.serializers import (
    FolderListSerializer,
    LikeSerializer,
    PostCreateUpdateSerializer,
    PostListSerializer,
    PostDetailSerializer,
    QuestionThumbnailSerializer,
    ScrapSerializer,
    SearchSerializer,
    FolderCreateUpdateSerializer,
    FolderDetailSerializer,
)
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from questions.permissions import (
    IsNotOwnerOrReadOnly, 
    IsOwnerOrReadOnly, 
    IsPostOwnerOrReadOnly
)
from .permissions import (
    IsFolderOwnerOrReadOnly,
)
from rest_framework.decorators import permission_classes
from rest_framework.permissions import (
    IsAuthenticated, 
    AllowAny
)
from rest_framework.pagination import PageNumberPagination
from shoveling.utils import (
    listing, 
    like,
)
from bs4 import BeautifulSoup

class ListPageNumberPagination(PageNumberPagination):
    page_size = 5

# ------------------- Post CRUD ----------------------
class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.hits += 1
        instance.save()

        return self.retrieve(request, *args, **kwargs)

class PostUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostCreateUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

class PostDeleteAPIView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

# --------------- Post CRUD end ------------------------------------

# --------------- Post List start ----------------------------------
class PostListAPIView(generics.ListAPIView):
    serializer_class = PostListSerializer
    pagination_class = ListPageNumberPagination

    def get_queryset(self):
        big_criteria = self.request.query_params.get('big_criteria')

        queryset = listing(self, Post, big_criteria)
        return queryset

# ------------------ Like up, down ---------------------------------
class LikeUpDownAPIView(generics.RetrieveUpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsNotOwnerOrReadOnly]

    def perform_update(self, serializer, *args, **kwargs):
        post = get_object_or_404(Post, pk=self.kwargs['pk'])
        like_user = self.request.user 
        like(self, post, like_user)
        post.save()
        serializer.save(helped_num = post.helped_num)
# ------------------------------------------------------------------

# ---------------- Folder CRUD -------------------------------------
class FolderCreateAPIView(generics.CreateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(folder_user = self.request.user)

class FolderDetailAPIView(generics.RetrieveAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderDetailSerializer

class FolderUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderCreateUpdateSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsFolderOwnerOrReadOnly]
class FolderDeleteAPIView(generics.DestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderDetailSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsFolderOwnerOrReadOnly]

class FolderListAPIView(generics.ListAPIView):
    serializer_class = FolderListSerializer
    pagination_class = ListPageNumberPagination

    def get_queryset(self):
        user = self.request.user
        queryset = Folder.objects.filter(folder_user=user)
        return queryset

# --------------------------------------------------------------------------------

# --------------------------------- Scrap ----------------------------------------
class ScrapCreateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Folder.objects.all()
    serializer_class = ScrapSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

# -----------------------------------------------------------------------------

@permission_classes([AllowAny])
class QuestionSearchView(APIView):
    def get(self, request):
        question_query = QuestionPost.objects.all()
        serializer = QuestionThumbnailSerializer(question_query, many=True)
        return Response(serializer.data)

    def post(self, request):
        query = request.data
        serializer = SearchSerializer(query)
        return Response(serializer.data)


@permission_classes([AllowAny])
class QuestionSearchResultView(APIView):
    pagination_class = ListPageNumberPagination
    
    def get(self, request, *args, **kwargs):
        key_word = kwargs.get("query")
        question_query = QuestionPost.objects.filter(
            Q(title__icontains=key_word) | Q(desc__icontains=key_word)
        )
        
        clean_querys = clean_html(question_query, key_word)
        
        serializer = QuestionThumbnailSerializer(clean_querys, many=True)
        return Response(serializer.data)

# html tag 삭제
def clean_html(querys, key_word):
    rm_pk = []
    for query in querys:
        desc = query.desc
        print(desc)
        cleantext = BeautifulSoup(desc, "lxml").text
        print(cleantext)
        query.desc = cleantext
        if key_word not in cleantext:
            rm_pk.append(query.pk)
    print(rm_pk)
    for pk in rm_pk:
        querys.filter(pk=pk).delete()
    
    return querys