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
    path("<int:question_post_id>/get_question", views.get_question, name="get_question"),
    path("<int:question_post_id>/chosen_answer", views.chosen_answer, name="chosen_answer"),
    path("answer_ajax/", views.answer_ajax, name="answer_ajax"),
]