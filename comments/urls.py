from django.urls import path
from . import views

app_name = "Comments"
urlpatterns = [
    path("comment/", views.comment, name="comment"),
    path("delete_comment/", views.delete_comment, name="delete_comment"),
    path("add_question_comment/", views.add_question_comment, name="add_question_comment"),
    path("delete_question_comment/", views.delete_question_comment, name="delete_question_comment")
]
