from rest_framework import fields, serializers
from questions.models import QuestionPost, Answer, QuestionFolder
from users.models import User
from comments.models import Comment
from rest_framework.fields import CurrentUserDefault

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "user_nickname", "user_level", "user_point", "user_profile_content", "user_profile_image", "email", "user_following"]

class QuestionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionPost
        fields = "__all__"

class QuestionFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionFolder
        fields = ["folder_name", "folder_user"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        return response

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        return response

class QuestionDetailSerializer(serializers.ModelSerializer):
    question_folder = QuestionFolderSerializer(read_only=True, many=True)  
    question_comments = CommentSerializer(read_only=True, many=True)
    answer = AnswerSerializer(read_only = True, many=True)
    answer_comments = CommentSerializer(read_only=True, many=True)
    image = serializers.ImageField(use_url = True)

    class Meta:
        model = QuestionPost
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        response['questionfolder'] = QuestionFolderSerializer(instance.question_folder, many=True).data
        response['questioncomments'] = CommentSerializer(instance.question_comments, many=True).data
        response['answer'] = AnswerSerializer(instance.answer, many=True)
        response['answercomments'] = CommentSerializer(instance.answer_comments, many=True).data
        return response