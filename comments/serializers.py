from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from posts.models import Post
# from questions.serializers import UserSerializer
from users.models import User
from questions.models import QuestionPost
from comments.models import Comment
from rest_framework.fields import CurrentUserDefault, SerializerMethodField
from comments.models import Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "user_nickname", "user_level", "user_point", "user_profile_content", "user_profile_image", "email", "user_following"]

class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "post",
            "text",
            "created",
            "updated",
        ]
        read_only_fields = ["user", "post", "created", "updated"]

class QuestionCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            'user',
            "question",
            "text",
            "created",
            "updated",
        ]
        read_only_fields = ['user', 'question', 'created', 'updated']

class AnswerCommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "answer",
            "text",
            "created",
            "updated"
        ]
        read_only_fields = ["user", 'answer', 'created', 'updated']

class CommentDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

# class UserSerializer(serializers.ModelSerializer):
#     #user_profile_image = serializers.ImageField(use_url=True)
#     class Meta:
#         model = User
#         fields = ["id","user_nickname","user_profile_image"]

# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = ["id"]

# class CommentSerializer(serializers.ModelSerializer):
#     #comments = CommentSerializer(read_only=True, many=True)
    
#     class Meta:
#         model = Comment
#         fields = "__all__"
    
#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user'] = UserSerializer(instance.user, read_only=True).data
#         # response['post'] = PostSerializer(instance.post, read_only=True).data
#         # response['question'] = QuestionPostSerializer(instance.question, read_only=True).data 
#         # response['answer'] = AnswerSerializer(instance.answer, read_only=True).data
#         return response


# class PostDetailSerializer(serializers.ModelSerializer):
#     comments = CommentSerializer(read_only=True, many=True)
#     image = serializers.ImageField(use_url=True)
#     class Meta:
#         model = Post
#         fields = "__all__"
    
#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user'] = UserSerializer(instance.user, read_only=True).data
#         response['folder'] = FolderSerializer(instance.folder, many=True).data
#         response['commnets'] = CommentSerializer(instance.comments, many=True).data
#         return response


