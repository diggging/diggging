from users.models import Alarm
# customize django taggit comma_splitter
def comma_splitter(tag_string):
    return [t.strip().lower() for t in tag_string.split('#') if t.strip()]

def comma_joiner(tags):
    return '# '.join(t.name for t in tags)

# ---------- utils for Question and Post -----------------
def listing(self, model, big_criteria, small_criteria="all"):
    if big_criteria == "recent":
        queryset = model.objects.order_by("-created")
        if small_criteria == "all":
            return queryset
        elif small_criteria == "wait_answer":
            new_queryset = queryset.filter(answer_exist = False)
            return new_queryset
        elif small_criteria == "answer_done":
            new_queryset = queryset.filter(answer_exist=True)
            return new_queryset
    elif big_criteria == "popular":
        queryset = model.objects.order_by("-hits")
        if small_criteria == "all":
            return queryset
        elif small_criteria == "wait_answer":
            new_queryset = queryset.filter(answer_exist = False)
            return new_queryset
        elif small_criteria == "answer_done":
            new_queryset = queryset.filter(answer_exist=True)
            return new_queryset
    elif big_criteria == "mine":
        queryset = model.objects.filter(user=self.request.user).order_by("-created")
        if small_criteria == "all":
            return queryset
        elif small_criteria == "wait_answer":
            new_queryset = queryset.filter(answer_exist=False)
            return new_queryset
        elif small_criteria == "answer_done":
            new_queryset = queryset.filter(answer_exist=True)
            return new_queryset

def like(self, object, like_user):
        if object.likes_user.filter(id=like_user.id).exists():
            object.helped_num -= 1
            if object.helped_num < 0:
                object.helped_num = 0
            object.likes_user.remove(self.request.user)
        else:
            object.helped_num += 1
            new_alarm = Alarm.objects.create(user=object.user, 
            title = object.title,
            alarm_kind="like", request_user_nickname=self.request.user.user_nickname,
            request_user_profile_image=self.request.user.user_profile_image)
            if object.helped_num < 0:
                object.helped_num = 0
            object.likes_user.add(self.request.user)

