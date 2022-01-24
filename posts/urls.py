from django.urls import path
from . import views

app_name = "posts"

urlpatterns = [
    path("create/", views.PostCreateAPIView.as_view(), name="post-create"),
    path("<int:pk>/post-detail/", views.PostDetailAPIView.as_view(), name="post-detail"),
    path("<int:pk>/post-update/", views.PostUpdateAPIView.as_view(), name="post-update"),
    path("<int:pk>/post-delete/", views.PostDeleteAPIView.as_view(), name="post-delete"),
    path("post-list/", views.PostListAPIView.as_view(), name="post-list"),
    path("<int:pk>/post-like", views.LikeUpDownAPIView.as_view(), name="post-like"),
    path("search_quest/", views.QuestionSearchView.as_view(), name="search_quest"),
    path("search_quest_result/<str:query>", views.QuestionSearchResultView.as_view(), name="search_quest_result"),
    ]

# urlpatterns = format_suffix_patterns(urlpatterns)