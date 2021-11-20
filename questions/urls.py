from django.urls import path
from . import views

app_name = "question"

urlpatterns = [
    # path("", views.question_main, name="question_main"),
    # path("create/", views.question_create, name="question_create"),
    # path("<int:pk>/question_update/", views.question_update, name="question_update"),
    # path("<int:pk>/question_delete/", views.question_delete, name="question_delete"),
    # path(
    #     "<int:user_id>/<int:post_id>/detail",
    #     views.question_post_detail,
    #     name="question_post_detail",
    # ),
    # path(
    #     "<int:question_post_id>/answer_create/",
    #     views.answer_create,
    #     name="answer_create",
    # ),
    # path(
    #     "<int:question_post_id>/<answer_id>/answer_update/",
    #     views.answer_update,
    #     name="answer_update",
    # ),
    # path(
    #     "<int:question_post_id>/<answer_id>/answer_delete",
    #     views.answer_delete,
    #     name="answer_delete",
    # ),
    # path(
    #     "<int:question_post_id>/get_question", views.get_question, name="get_question"
    # ),
    # path(
    #     "<int:question_answer_id>/chosen_answer",
    #     views.chosen_answer,
    #     name="chosen_answer",
    # ),
    # path(
    #     "<int:answer_id>/get_answer_comments",
    #     views.get_answer_comments,
    #     name="get_answer_comments",
    # ),
    # path("like/", views.question_like, name="question_like"),
    # path(
    #     "<int:user_id>/<int:post_id>/scrap/",
    #     views.question_scrap,
    #     name="question_scrap",
    # ),
    # path('<int:pk>/questions_lang_folder/', views.questions_lang_folder, name="questions_lang_folder"),
    # path('<int:pk>/questions_lang_post/', views.questions_lang_post, name="questions_lang_post"),
    # path('<int:pk>/questions_framework_folder/', views.questions_framework_folder, name="questions_framework_folder"),
    # path('<int:pk>/questions_framework_post/', views.questions_framework_post, name="questions_framework_post"),

    path("create/", views.QuestionCreateAPIView.as_view(), name="question_create"),
    path("<int:pk>/detail/", views.QuestionDetailAPIView.as_view(), name="question_detail"),
    path("<int:pk>/update/", views.QuestionUpdateAPIView.as_view(), name="question_update"),
    path("<int:pk>/delete/", views.QuestionDeleteAPIView.as_view(), name="question_delete"),
    path("recent_question_list/", views.RecentQuestionListAPIView.as_view(), name="recent_question_list"),
    path("my_question_list/", views.MyQuestionListAPIView.as_view(), name="my_question_list"),
    path("question_popularity_list", views.QuestionPopularityListAPIView.as_view(), name="question_popularity_list"),
    path("answer_create/", views.AnswerCreateAPIView.as_view(), name="answer_create"),
    path("<int:pk>/answer_detail/", views.AnswerDetailAPIView.as_view(), name="answer_detail"),
    path("<int:pk>/answer_update/", views.AnswerUpdateAPIView.as_view(), name="answer_update"),
    path("<int:pk>/answer_delete/", views.AnswerDeleteAPIView.as_view(), name="answer_delete"),
    path("<int:pk>/like_create/", views.LikeUpDownAPIView.as_view(), name="like_create"), # <int:id> 의 id는 target question id
    path("<int:pk>/select_answer/", views.AnswerSelectAPIView.as_view(), name="select_answer"), #pk는 answer의 pk
]
