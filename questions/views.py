import json
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from users.models import User
from .forms import AnswerPostForm, QuestionPostForm
from django.shortcuts import get_object_or_404, render, redirect
from .models import Question_post, Answer, QuestionFolder
from users.models import Sand, Alarm
from django.core import serializers


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
        "str_search": str_search,
        # 내 모래포인트와 질문 관련한 폴더 접근 가능해야해요,,
    }
    return render(request, "questions/main.html", ctx)

#-----------------------------------------------------------------------------------------------------
# 질문 CRUD
def question_create(request):
    if request.method == "POST":
        form = QuestionPostForm(request.POST, request.FILES)
        if form.is_valid():
            posts = form.save(commit=False)
            posts.user = request.user
            posts.save()

            me = posts.user
            language = request.POST.get("language")
            framework = request.POST.get("framework")  # framework 가져옴
            lang_folder = QuestionFolder.objects.filter(folder_name=language, folder_user=me)
            frame_folder = QuestionFolder.objects.filter(folder_name=framework, folder_user=me)  # frameworkd folder 가져옴
            
            if lang_folder.exists():
                existed_folder = QuestionFolder.objects.get(
                    folder_name=language, folder_user=me
                )
                posts.folder.add(existed_folder)

            else:
                new_folder = QuestionFolder.objects.create(
                    folder_name=language, folder_user=me
                )
                posts.folder.add(new_folder)

            if frame_folder.exists():
                # 있으면 foriegn key 연결
                existed_folder = QuestionFolder.objects.get(
                    folder_name=framework, folder_user=me
                )
                posts.folder.add(existed_folder)
            else:
                # 없으면 folder 만들어서
                new_folder = QuestionFolder.objects.create(
                    folder_name=framework, folder_user=me
                )
                posts.folder.add(new_folder)

            posts.save()

            # create 하면 detail 페이지로 넘어가도록 수정
            return redirect("question:question_post_detail", posts.user.id, posts.id)
    else:
        form = QuestionPostForm()
        ctx = {
            "form": form,
        }

        return render(request, "questions/question_create.html", ctx)

def get_answer_comments (request, answer_id):
    answer = Answer.objects.get(pk=answer_id)
    answer_comments = answer.answer_comments.all()
    ctx = {
        "post": answer,
        "comments": answer_comments,
    }
    return render(request, "questions/question_detail.html", ctx)

def question_update(request, pk):
    question_posts = get_object_or_404(Question_post, pk=pk)
    if request.method == "POST":
        form = QuestionPostForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("question:question_post_detail", question_posts.user.id, question_posts.id)
    else:
        form = QuestionPostForm(instance=question_posts)
        ctx = {
            "form": form,
        }
        return render(request, "questions/question_update.html", ctx)

def question_delete(request, pk):
    question_post = Question_post.objects.get(pk=pk)
    question_post.delete()
    return redirect("question:question_main")

#------------------------------------------------------------------------------------------------------------------
def question_post_detail(request, user_id, post_id):
    post_details = Question_post.objects.get(pk=post_id)
    me = get_object_or_404(User, pk=user_id)
    folder = post_details.folder.get(
        folder_name=post_details.language, folder_user=post_details.user
    )
    # comments = post_details.comments.all() comments는 ajax로 따로 띄워준다고 해서 지웠습니다
    # post_answers: 질문 포스트에 해당 되는 답변들
    post_answers = post_details.answers.all().order_by("-created")
    # question_comments 역참조
    comments = post_details.question_comments.all()
    # answer_comments = [answer.answer_comments for answer in post_answers]
    ctx = {
        "post": post_details,
        "host": me,
        "folder": folder,
        "post_answers": post_answers,
        "comments": comments,
    }
    return render(request, "questions/question_detail.html", ctx)

#-------------------------------------------------------------------------------------------------------------------------------------------------------
# 질문 답변 작성 폼 관련 함수
def answer_create(request, question_post_id):
    question = Question_post.objects.get(pk=question_post_id)
    if request.method == "POST":
        form = AnswerPostForm(request.POST, request.FILES)
        if form.is_valid():
            answers = form.save(commit=False)
            answers.user = request.user
            answers.question = question
            question_host = question.user
            answers.save()
            # 질문에 답변이 달렸다는 알람 넣어주기
            new_alarm = Alarm.objects.create(user=question_host, reason="내가 남긴 질문"+question.title+"에 답변이 달렸어요. 확인해보세요!")
            return redirect("question:question_post_detail", question_host.id, question_post_id)
    else:
        form = AnswerPostForm()
        ctx = {
            'form': form,
        }
        return render(request, 'questions/answer_create.html', ctx)

# 질문 답변 업데이트
def answer_update(request, question_post_id, answer_id):
    question_post = get_object_or_404(Question_post, pk= question_post_id)
    answer = get_object_or_404(Answer, pk=answer_id)
    if request.method == "POST":
        form = AnswerPostForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("question:question_post_detail", question_post.user.id, question_post_id)
        else:
            form = AnswerPostForm(instance=answer)
            ctx = {
                "form":form
            }
            return render(request, "questions/answer_update.html", ctx)

# 질문 답변 삭제
def answer_delete(request, question_post_id, answer_id):
    question_post = Question_post.objects.get(pk=question_post_id)
    answer = Answer.objects.get(pk=answer_id)
    answer.delete()
    return redirect("question:question_post_detail", question_post.user.id, question_post_id)


#----------------------------------------------------------------------------------------------------------
# 질문 기록 퍼오기
def get_question(request, question_post_id):
    question_post = get_object_or_404(Question_post, pk=question_post_id)
    target_language = question_post.language
    target_framework = question_post.framework  # 어떤 framework인지 - 프레임워크 생성용
    me = request.user

    lang_folder = QuestionFolder.objects.filter(folder_name=target_language, folder_user=me)
    frame_folder = QuestionFolder.objects.filter(folder_name=target_framework, folder_user=me)

    if lang_folder.exists():
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
        question_post.folder.add(new_folder)
    question_post.save()

    # framework 동일
    if frame_folder.exists():
        # 그 폴더에 포스트 그냥 추가하기
        folder = QuestionFolder.objects.get(
            folder_name=target_framework, folder_user=me
        )  # query set은 object가 아니므로 object 다시 가져옴
        folder.related_posts.add(question_post)  # add 는 저장 x 명시적 저장 필요
        folder.save()
    # 없으면
    else:
        # 폴더를 생성한 뒤, 거기에 추가하기
        new_folder = QuestionFolder.objects.create(
            folder_name=target_framework, folder_user=me
        )  # create - 자동저장
        question_post.folder.add(new_folder)
    question_post.save()

    # 퍼가기 할 때 sand 생성하기 - host꺼 생성해줘야함
    new_sand = Sand.objects.create(user=question_post.user, amount=50, reason=me.user_nickname+"님의 내 질문 퍼가기")
    new_alarm = Alarm.objects.create(user=question_post.user, reason=request.user.user_nickname+" 님이 내 질문 " + question_post.title + "을 퍼갔어요.")

    return redirect("question:question_post_detail", me.id, question_post_id)

# 질문 채택 관련 함수 (모달에서 사용자가 채택 or 채택 해제에 동의했을때 사용)
def chosen_answer(request, question_answer_id):
    is_answer_chosen = Answer.objects.get(pk=question_answer_id)
    questioin = is_answer_chosen.question
    if request.method == "POST":
        # 채택 여부가 거짓이면 True로 바꿔주고 False이면 True로 바꿔줌.
        if is_answer_chosen.selection:
            is_answer_chosen.selection = False
        else:   # 채택이 안된 경우 된걸로 바꿔줌
            is_answer_chosen.selection = True
            new_sand1 = Sand.objects.create(user=is_answer_chosen.user, amount=300, reason="내 답변 채택")
            new_sand2 = Sand.objects.create(user=questioin.user, amount=50, reason="내 질문의 답변 채택")

            new_alarm = Alarm.objects.create(user=is_answer_chosen.user, reason="질문 " + questioin.title + " 에 남긴 답변이 채택되었어요.")

        ctx = {
            'is_answer_chosen': is_answer_chosen
        }

        # 선택 후에는 다시 question detail 페이지로 돌아감.
        return render(request, 'questions/question_detail.html', ctx)
    # TODO: 의문점? else가 필요한가?
    return redirect('questions:question_detail', is_answer_chosen.question.id)

#--------------------------------------------------------------------------------------------------
# 도움이 되었어요, 스크랩 개수 count 하기 위한 axios
@csrf_exempt
def count_like_scrap_question(request):
    req = json.loads(request.body)
    question_post_id = req["id"]
    button_type = req["type"]
    question_post = Question_post.objects.get(id=question_post_id)
    question_host = question_post.user
    me = request.user
    if button_type == "like":
        question_post.helped_num += 1
        new_sand = Sand.objects.create(user=question_host, amount=20, reason="도움이 되었어요") # 이거 하는지 안하는지 모름
        new_alarm = Alarm.objects.create(user=question_host, reason="내가 남긴 질문 "+question_post.title+"이 "+me.user_nickname+" 님께 도움이 되었어요.")
    
    elif button_type == "퍼오기":
        question_post.scrap_num += 1
    question_post.save()

    return JsonResponse({"id": question_post_id, "type": button_type})

# 내가 남긴 답변 목록 ajax
@csrf_exempt
def answer_ajax(request):
    req = json.loads(request.body)
    user_id = req["id"]
    users = User.objects.get(id=user_id)
    answer = list(Answer.objects.filter().values().order_by("-created"))
    user = User.objects.all()
    user_list = serializers.serialize('json', user)
    print(answer)

    ctx = {
        "answer": answer,
        "user": user_list
    }
    return JsonResponse(ctx, safe=False)
