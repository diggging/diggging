from django.urls import path, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

app_name = "posts"

urlpatterns = [
    #path("main/", view=views.main, name="main"),  # main 페이지로 가는 api
    path("main/", views.Main.as_view(), name="main"),
    # path("main/helped/", views.helped, name="helped"),
    # path("main/follow/", views.follow, name="follow"),
    # path("main/my_recent/", views.my_recent, name="my_recent"),

    # post detail crud
    path("create/", views.post_create, name="post_create"),
    path("<int:pk>/detail", views.PostDetailGetView.as_view(), name="post_detail"),
    #path("<int:pk>/update", views.PostDetailUpdateView.as_view(), name="post_update"),
    #path("<int:pk>/delete", views.PostDetailDeleteView.as_view(), name="post_delete"),
    
    
    path("search/", views.search, name="search"),
    # path("search_quest/", views.search_quest, name="search_quest"),
    
    # path("<int:user_id>/<int:post_id>/get_post", view=views.get_post, name="get_post"),
    # path("scrap_axios/", views.scrap_axios, name="scrap_axios"),
    # path("helped_axios/", views.helped_axios, name="helped_axios"),
    # path("follow_axios/", views.follow_axios, name="follow_axios"),
    # path("my_recent_axios/", views.my_recent_axios, name="my_recent_axios"),
    path("like/", views.post_like, name="post_like"),
    path("<int:user_id>/<int:post_id>/scrap/", views.post_scrap, name="post_scrap"),
    # # 서비스 소개 페이지
    # path("service_view/", views.service_view, name="service_view"),
    ]

# urlpatterns = format_suffix_patterns(urlpatterns)