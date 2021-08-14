from django.urls import path
from . import views

app_name = "question"

urlpatterns = [
    path("", views.question_main, name="question_main"),
    path("create/", views.question_create, name="question_create"),
    path("<int:pk>/update", views.question_update, name="question_update"),
    path("<int:pk>/delete", views.question_delete, name="question_delete"),
    path(
        "<int:user_id>/<int:post_id>/detail",
        views.question_post_detail,
        name="question_post_detail",
    ),
    path("<int:question_post_id>/answer_create/", views.answer_create, name="answer_create"),
    path("<int:question_post_id>/<answer_id>/answer_update/", views.answer_update, name="answer_update"),
    path("<int:question_post_id>/<answer_id>/answer_delete", views.answer_delete, name="answer_delete"),
    path("<int:question_post_id>/get_question", views.get_question, name="get_question"),
    path("<int:question_post_id>/chosen_answer", views.chosen_answer, name="chosen_answer"),
    path("count_like_scrap/", views.count_like_scrap_question, name="count_like_scrap"),
    path("<int:answer_id>/get_answer_comments", views.get_answer_comments, name="get_answer_comments"),
    path("answer_ajax/", views.answer_ajax, name="answer_ajax"),
]