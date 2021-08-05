from django.urls import path
from . import views

app_name = "Comments"
urlpatterns = [path("comment/", views.comment, name="comment")]
