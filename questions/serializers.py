from rest_framework import serializers
from questions.models import QuestionPost, Answer, QuestionFolder 
from users.models import User
from comments.models import Comment
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "user_nickname", "user_level", "user_point", "user_profile_content", "user_profile_image", "email", "user_following"]
class QuestionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionPost
        fields = "__all__"

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionFolder
        fields = ["folder_name", "folder_kind", "folder_user"]

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
    folder = FolderSerializer(read_only=True, many=True)
    comments = C


