from django.urls import path
from . import views

app_name = "question"
urlpatterns = [
    path("", views.question_main, name="question_main"),
]
