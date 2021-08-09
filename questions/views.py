from users.models import User
from .forms import QuestionPostForm
from django.shortcuts import get_object_or_404, render, redirect
from .models import Question_post, Answer, QuestionFolder

# Create your views here.


def question_main(request):
    posts = Question_post.objects.all()
    selected_answer_posts = []
    for post in posts:
        if post.answer_selection_count() > 0:
            selected_answer_posts.append(post)
        elif post.answers.count() == 0:
            selected_answer_posts.append(post)
    languages = [langs[0] for langs in Question_post.language_choices]
    search = request.POST.getlist("answers[]")
    print(search)
    ctx = {
        "selected_answer_posts": selected_answer_posts,
        "posts": posts, 
        "language": languages,
    }
    return render(request, "questions/main.html", ctx)


def question_create(request):
    if request.method == "POST":
        form = QuestionPostForm(request.POST, request.FILES)
        if form.is_valid():
            posts = form.save(commit=False)

            posts.user = request.user

            posts.save()

            me = posts.user
            language = request.POST.get("language")
            folder = QuestionFolder.objects.filter(folder_name=language, folder_user=me)

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

            return redirect("question:question_main")
    else:
        form = QuestionPostForm()
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
