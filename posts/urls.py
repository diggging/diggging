from django.urls import path
from . import views

app_name = "posts"
urlpatterns = [
    # path("", views.post_list, name="post_list"),
    path("main/", view=views.main, name="main"),  # main 페이지로 가는 api
    path("main/helped/", views.helped, name="helped"),
    path("main/follow/", views.follow, name="follow"),
    path("main/my_recent/", views.my_recent, name="my_recent"),
    # path("detail/<int:pk>/", views.post_detail, name="post_detail"), (original ver)
    path(
        "<int:user_id>/<int:post_id>/detail", views.post_detail, name="post_detail"
    ),  # 처음 <int:pk> 의 pk: user의 id
    # 두번째 <int:pk> 의 pk: post의 id
    path("create/", views.post_create, name="post_create"),
    path("<int:pk>/update", views.post_update, name="post_update"),
    path("<int:pk>/delete", views.post_delete, name="post_delete"),
    path("search/", views.search, name="search"),
    path("<int:user_id>/<int:post_id>/get_post", view=views.get_post, name="get_post"),
    path("count_like_scrap/", views.count_like_scrap, name="count_like_scrap"),
    path("search_post_axios/", views.search_post_axios, name="search_post_axios"),
    path("search_user_axios/", views.search_user_axios, name="search_user_axios"),

    path("scrap_axios/", views.scrap_axios, name="scrap_axios"),
    path("helped_axios/", views.helped_axios, name="helped_axios"),
    path("follow_axios/", views.follow_axios, name="follow_axios"),
    path("my_recent_axios/", views.my_recent_axios, name="my_recent_axios"),

    # path("folder/", views.make_folder, name="make_folder"),
]
