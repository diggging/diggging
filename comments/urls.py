from django.urls import path
from . import views

app_name = "Comments"
urlpatterns = [
    # path("add_post_comment/", views.comment, name="add_post_comment"),
    # path("delete_post_comment/", views.delete_comment, name="delete_post_comment"),
    # path("add_question_comment/", views.add_question_comment, name="add_question_comment"),
    # path("delete_question_comment/", views.delete_question_comment, name="delete_question_comment"),
    # path("add_answer_comment/", views.add_answer_comment, name="add_answer_comment"),
    # path("delete_answer_comment/", views.delete_answer_comment, name="delete_answer_comment"),
    path("list_create_comment/", views.CommentCreateView.as_view(), name="list_create_comment"),
    path("<int:pk>/retrieve_update_destroy_comment/", views.CommentGetView.as_view(), name="retrieve_update_destroy_comment"),
]