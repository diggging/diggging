from django.shortcuts import get_object_or_404
from django.db.models import Q
from rest_framework.views import APIView
from questions.models import QuestionPost
from .models import Post
from posts.serializers import (
    LikeSerializer,
    PostCreateUpdateSerializer,
    PostListSerializer,
    PostDetailSerializer,
    QuestionThumbnailSerializer,
    SearchSerializer,
)
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from questions.permissions import (
    IsNotOwnerOrReadOnly, 
    IsOwnerOrReadOnly, 
    IsPostOwnerOrReadOnly
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

@permission_classes([AllowAny])
class QuestionSearchView(APIView):
    def get(self, request):
        question_query = QuestionPost.objects.all()
        serializer = QuestionThumbnailSerializer(question_query, many=True)
        return Response(serializer.data)
    def post(self, request):
        query = request.data
        serializer = SearchSerializer(query)
        print(serializer.data)
        return Response(serializer.data)
        #return redirect("posts:search_quest_result", serializer.data['query'])


@permission_classes([AllowAny])
class QuestionSearchResultView(APIView):
    def get(self, request, *args, **kwargs):
        key_word = kwargs.get('query')
        question_query = QuestionPost.objects.filter(Q(title__icontains=key_word)|Q(desc__icontains = key_word))
        serializer = QuestionThumbnailSerializer(question_query, many=True)
        return Response(serializer.data)

