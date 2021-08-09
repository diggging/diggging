from users.models import User
from posts.forms import PostForm
from django.shortcuts import get_object_or_404, render, redirect
from .models import Question_post, Answer, QuestionFolder

# Create your views here.


def question_main(request):
    posts = Question_post.objects.all()
    ctx = {"posts": posts}
    return render(request, "questions/main.html", ctx)


def question_create(request):
    if request.method == "POST":
        form = PostForm(request.POST, request.FILES)
        if form.is_vaild():
            posts = form.save(commit=False)

            posts.user = request.user

            posts.save()

            me = posts.user
            language = request.POST.get("language")
            folder = QuestionFolder.object.filter(folder_name=language, folder_user=me)

            if folder:

                existed_folder = QuestionFolder.objects.get(
                    folder_name=language, folder_user=me
                )
                posts.folder.add(existed_folder)

            else:

                new_folder = QuestionFolder.objects.create(
                    folder_name=language, folder_user=me
                )
                posts.folder.add(new_folder)

            posts.save()

            return redirect("question:main")
    else:
        form = PostForm()
        ctx = {
            "form": form,
        }

        return render(request, "questions/question_create.html", ctx)


def question_post_detail(requst, user_id, post_id):
    post_details = Question_post.objects.get(pk=post_id)
    me = get_object_or_404(User, pk=user_id)
    folder = post_details.folder.get(
        folder_name=post_details.language, folder_user=post_details.user
    )
    comments = post_details.comments.all()
    ctx = {
        "post": post_details,
        "host": me,
        "folder": folder,
        "comments": comments,
    }
    return render(requst, "question/quesiton_detail.html", ctx)


def search_question(request):  # 선택해서 정보 넘겨주는거
    search = request.POST.getlist("answers[]")
    print(search)  # 정보 잘 넘어갔는지 확인하기 위해서 print 찍어놓은거임
    return render(request, "questions/search_question.html")


# 내가 관심이있는 언어 -
