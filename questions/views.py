from users.models import User
from .forms import AnswerPostForm, QuestionPostForm
from django.shortcuts import get_object_or_404, render, redirect
from .models import Question_post, Answer, QuestionFolder

# Create your views here.


def question_main(request):
    # 질문 최신순으로 정렬
    posts = Question_post.objects.all().order_by("-created")
    # 답변 채택 안되거나 답변이 아직 달리지 않은 질문들을 모아두는 list
    selected_answer_posts = []
    for post in posts:
        # Question_Post에 정의된 answer_selection_count() 함수 이용하여 개수 파악
        if post.answer_selection_count() > 0:
            selected_answer_posts.append(post)
        elif post.answers.count() == 0:
            selected_answer_posts.append(post)
    languages = [langs[0] for langs in Question_post.language_choices]
    search = request.POST.getlist("answers[]")
    print(search)
    str_search = "".join(search)
    ctx = {
        "selected_answer_posts": selected_answer_posts,
        "posts": posts, 
        "language": languages,
        "str_search": str_search
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


def question_post_detail(request, user_id, post_id):
    post_details = Question_post.objects.get(pk=post_id)
    me = get_object_or_404(User, pk=user_id)
    folder = post_details.folder.get(
        folder_name=post_details.language, folder_user=post_details.user
    )
    # comments = post_details.comments.all() comments는 ajax로 따로 띄워준다고 해서 지웠습니다
    # post_answers: 질문 포스트에 해당 되는 답변들
    post_answers = post_details.answers.all()
    ctx = {
        "post": post_details,
        "host": me,
        "folder": folder,
        "post_answers": post_answers
    }
    return render(request, "questions/question_detail.html", ctx)

# 질문 답변 작성 폼 관련 함수
def answer_create(request, question_post_id):
    if request.method == "POST":
        form = AnswerPostForm(request.POST, request.FILES)
        if form.is_valid():
            answers = form.save(commit=False)
            answers.user = request.user
            answers.save()
            question_host = Question_post.objects.get(pk=question_post_id).user.id
            return redirect("question:question_post_detail", question_host, question_post_id)
    else:
        form = AnswerPostForm()
        ctx = {
            'form': form,
        }
        return render(request, 'questions/question_create.html', ctx)

#----------------------------------------------------------------------------------------------------------
# 질문 기록 퍼오기
def get_question(request, question_post_id):
    question_post = get_object_or_404(Question_post, pk=question_post_id)
    target_language = question_post.language
    me = request.user

    folder = QuestionFolder.objects.filter(folder_name=target_language, folder_user=me)

    if folder:
        folder = QuestionFolder.objects.get(
            folder_name = target_language,
            folder_user = me,
        )
        folder.related_posts.add(question_post)
        folder.save()
    else:
        new_folder = QuestionFolder.objects.create(
            folder_name = target_language,
            folder_user = me
        )
        question_post.add(new_folder)
    question_post.save()

    return redirect("question:question_post_detail", me.id, question_post_id)

# 질문 채택 관련 함수 (모달에서 사용자가 채택 or 채택 해제에 동의했을때 사용)
def chosen_answer(request, question_answer_id):
    if request.method == "POST":
        is_answer_chosen = Answer.objects.get(pk=question_answer_id)
        # 채택 여부가 거짓이면 True로 바꿔주고 False이면 True로 바꿔줌.
        if is_answer_chosen.selection:
            is_answer_chosen.selection = False
        else:
            is_answer_chosen.selection = True

        ctx = {
            'is_answer_chosen': is_answer_chosen
        }

        # 선택 후에는 다시 question detail 페이지로 돌아감.
        return render(request, 'questions/question_detail.html', ctx)

    # TODO: 의문점? else가 필요한가?
