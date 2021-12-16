from rest_framework import fields, serializers
from posts.models import Folder
from questions.models import QuestionPost, Answer, QuestionFolder
from users.models import User
from comments.models import Comment
from comments.serializers import QuestionCommentSerializer, AnswerCommentSerializer
from rest_framework.fields import CurrentUserDefault, SerializerMethodField
from rest_framework.relations import PrimaryKeyRelatedField
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "user_nickname", "user_level", "user_point", "user_profile_content", "user_profile_image", "email", "user_following"]

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = ["user", "text"]
#         read_only_fields = ["user"]

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user'] = UserSerializer(instance.user, read_only=True).data
#         return response 

# --------------- Answer Serializer ------------------------------------

class AnswerCreateUpdateSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Answer
        fields = [
            "user",
            "title",
            "question",
            "desc",
        ]
        read_only_fields = ["user", "question"]
class AnswerDetailSerializer(serializers.ModelSerializer):

    answer_comments = AnswerCommentSerializer(many=True, read_only=True)
    answer_comment_count = serializers.IntegerField(source='answer_comments.count', read_only=True)
    # answer_comments = serializers.SerializerMethodField()
    class Meta:
        model = Answer
        fields = ["id", "user", "title", "question","selection", "desc", "answer_comments", "answer_comment_count"]
        read_only_fields = ["user", "title", "question", "selection", "desc", "created", "updated"]

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        return response

    # def get_answer_comments(self, obj):
    #     ac_q = Answer.answer_comments.filter(id=obj.id)
    #     answer_comments = CommentSerializer(ac_q, many=True).data
    #     return answer_comments

# ------------- Answer Serializer end -----------------------------------

# ------------- QuestionFolder serializer -------------------------------
class QuestionFolderSerializer(serializers.ModelSerializer):
    folder_name = serializers.StringRelatedField()
    class Meta:
        model = QuestionFolder
        fields = ["folder_name", "folder_user"]

# ------------------------------------------------------------------------

# ------------- Question Serializer --------------------------------------
class QuestionCreateUpdateSerializer(TaggitSerializer, serializers.ModelSerializer):
    question_tags = TagListSerializerField(allow_null=True)
    user = serializers.StringRelatedField()
    class Meta:
        model = QuestionPost 
        fields = [
            "id",
            "user",
            "title",
            "desc",
            "question_folder",
            "question_tags",
        ]
    def __init__(self, *args, **kwargs):
        super(QuestionCreateUpdateSerializer, self).__init__(*args, **kwargs)
        user = self.context['request'].user
        self.fields['question_folder'] = serializers.ManyRelatedField(child_relation=PrimaryKeyRelatedField(queryset = QuestionFolder.objects.filter(folder_user=user), required = False), required=False)
class QuestionDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    question_comments = QuestionCommentSerializer(many=True, read_only=True)
    answers = AnswerDetailSerializer(many=True, read_only=True)
    # question_comments = serializers.SerializerMethodField()
    # answers = serializers.SerializerMethodField()
    question_tags = TagListSerializerField(allow_null=True)
    comment_count = serializers.IntegerField(source='question_comments.count', read_only=True)
    class Meta:
        model = QuestionPost
        fields = [
            "id",
            "user",
            "title",
            "desc",
            "scrap_num",
            "helped_num",
            "question_comments",
            "comment_count",
            "answers",
            "question_tags",
            "created",
            "updated",
            "hits",
            "answer_exist"
        ]
        read_only_fields = ["hits",]
    # def get_question_comments(self, obj):
    #     qc_q = QuestionPost.question_comments.filter(id=obj.id)
    #     question_comments = CommentSerializer(qc_q, many=True).data
    #     return question_comments 
    
    # def get_answers(self, obj):
    #     a_q = QuestionPost.answers.filter(id=obj.id)
    #     question_answers = CommentSerializer(a_q, many=True).data
    #     return question_answers
class QuestionListSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    # large_criteria = serializers.IntegerField(allow_null=True)
    # small_criteria = serializers.IntegerField(allow_null=True)
    question_tags = TagListSerializerField(allow_null=True)
    comment_count = serializers.IntegerField(source='question_comments.count', read_only=True)
    answer_count = serializers.IntegerField(source='answers.count', read_only=True)
    class Meta:
        model = QuestionPost
        fields = [
            "id",
            "user",
            "title",
            "desc",
            "scrap_num",
            "helped_num",
            "question_tags",
            "created",
            "updated",
            "comment_count",
            "answer_count",
            "hits",
            # "big_criteria",
            # "small_criteria",
        ]
    
    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation['likes_user_count'] = instance.likes_user.count()
    #     representation['scrap_user_count'] = instance.scarps_user.count()

# --------------------- Like Serializer --------------------------------
class LikeSerializer(serializers.ModelSerializer):
    target_question = serializers.IntegerField(source='pk', read_only=True)

    class Meta:
        model = QuestionPost
        fields = [
            "id",
            "target_question",
            "helped_num",
        ]
        read_only_fields = ["id", "target_question", "helped_num"]

# ------------------------------------------------------------------------

# ----------------------- Answer Select Serializer -----------------------
class AnswerSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = [
            "id",
            "selection",
        ]
        read_only_field = ['id', 'selection']



























# ----------- initial QuestionPostSerializer-----------------------------------------

# class QuestionPostSerializer(TaggitSerializer, serializers.ModelSerializer):
#     question_comments = CommentSerializer(many=True, read_only=True)
#     answers = AnswerSerializer(many=True, read_only=True)
#     question_tags = TagListSerializerField(allow_null=True)
#     # user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
#     class Meta:
#         model = QuestionPost
#         fields = "__all__"
#         read_only_fields = ["scrap_num", "helped_num", "likes_user", "scarps_user"]

#     def to_representation(self, instance):
#         # response = super().to_representation(instance)
#         # response['questionfolder'] = QuestionFolderSerializer(instance.question_folder).data
#         # return response 
#         representation = super().to_representation(instance)
#         # representation['user'] = UserSerializer(instance.user).data
#         representation['likes_user_count'] = instance.likes_user.count()
#         representation['scrap_user_count'] = instance.scarps_user.count()

#         return representation 
        
#     def __init__(self, *args, **kwargs):
#         super(QuestionPostSerializer, self).__init__(*args, **kwargs)
#         user = self.context['request'].user
#         self.fields['question_folder'] = serializers.ManyRelatedField(child_relation=PrimaryKeyRelatedField(queryset = QuestionFolder.objects.filter(folder_user=user), required = False), required=False) 
#         # self.fields['user'] = serializers.ManyRelatedField(child_relation=PrimaryKeyRelatedField(queryset = QuestionPost.objects.filter(id=user.id)))


# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = "__all__"

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user'] = UserSerializer(instance.user, read_only=True).data
#         return response

# class QuestionDetailSerializer(serializers.ModelSerializer):
#     # question_folder = QuestionFolderSerializer(read_only=True, many=True)  
#     # question_comments = CommentSerializer(read_only=True, many=True)
#     answers = AnswerSerializer(read_only = True, many=True)
#     answer_comments = CommentSerializer(read_only=True, many=True)

#     class Meta:
#         model = QuestionPost
#         fields = "__all__"
#         read_only_fields = ["scrap_num", "helped_num", "likes_user", "scarps_user"]

#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user'] = UserSerializer(instance.user, read_only=True).data
#         response['question_folder'] = QuestionFolderSerializer(instance.question_folder, many=True).data
#         response['question_comments'] = CommentSerializer(instance.question_comments, many=True).data
#         # response['answers'] = AnswerSerializer(instance.answer, many=True)
#         # response['answer_comments'] = CommentSerializer(instance.answer_comments, many=True).data
#         return response
    
#     def __init__(self, *args, **kwargs):
#         super(QuestionDetailSerializer, self).__init__(*args, **kwargs)
#         user = self.context['request'].user
#         # self.fields['question_folder'] = serializers.ChoiceField(choices=QuestionFolder.objects.filter(folder_user=user))
#         self.fields['question_folder'] = serializers.ManyRelatedField(child_relation = PrimaryKeyRelatedField(queryset=QuestionFolder.objects.filter(folder_user = user), required=False), required = False)