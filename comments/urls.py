from django.urls import path
from . import views

app_name = "Comments"
urlpatterns = [
    path("comment/", views.comment, name="comment"),
    path("delete_comment/", views.delete_comment, name="delete_comment"),
]
