from django.urls import path
from . import views

app_name = "question"

urlpatterns = [
    path("create/", views.QuestionCreateAPIView.as_view(), name="question_create"),
    path("<int:pk>/detail/", views.QuestionDetailAPIView.as_view(), name="question_detail"),
    path("<int:pk>/update/", views.QuestionUpdateAPIView.as_view(), name="question_update"),
    path("<int:pk>/delete/", views.QuestionDeleteAPIView.as_view(), name="question_delete"),
    # path("<int:pk>/", views.QuestionDetailAPIView.as_view(), name="question_detail"),
    # path("<int:pk>/", views.QuestionUpdateAPIView.as_view(), name="question_update"),
    # path("<int:pk>/", views.QuestionDeleteAPIView.as_view(), name="question_delete"), 
    path("question_list/", views.QuestionListAPIView.as_view(), name="question_list"),
    path("answer_create/", views.AnswerCreateAPIView.as_view(), name="answer_create"),
    path("<int:pk>/answer_detail/", views.AnswerDetailAPIView.as_view(), name="answer_detail"),
    path("<int:pk>/answer_update/", views.AnswerUpdateAPIView.as_view(), name="answer_update"),
    path("<int:pk>/answer_delete/", views.AnswerDeleteAPIView.as_view(), name="answer_delete"),
    path("<int:pk>/like_create/", views.LikeUpDownAPIView.as_view(), name="like_create"), # <int:id> 의 id는 target question id
    path("<int:pk>/select_answer/", views.AnswerSelectAPIView.as_view(), name="select_answer"), #pk는 answer의 pk
]
