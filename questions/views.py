from django.shortcuts import render, redirect
from .models import Question_post, Answer

# Create your views here.


def question_main(request):
    pass


def my_view(request):
    if request.method == "POST":
        selected = request.POST.getlist("selected")
        print(selected)

    return "question:my_view"


# def search_question(reqeust):
#   posts = Post.objects.all()
#
# 내가 관심이있는 언어 -
