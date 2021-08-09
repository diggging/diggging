from django.urls import path
from . import views

app_name = "question"
urlpatterns = [
    path("", views.question_main, name="question_main"),
    path("create/", views.question_create, name="question_create"),
    path("search_question/", views.search_question, name="search_question"),
    path(
        "<int:user_id>/<int:post_id>/detail",
        views.question_post_detail,
        name="question_post_detail",
    ),
]
