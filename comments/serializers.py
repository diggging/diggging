from rest_framework import serializers

from posts.models import Post
from questions.serializers import AnswerSerializer, QuestionPostSerializer
from users.models import User
from comments.models import Comment
from rest_framework.fields import CurrentUserDefault

class UserSerializer(serializers.ModelSerializer):
    #user_profile_image = serializers.ImageField(use_url=True)
    class Meta:
        model = User
        fields = ["id","user_nickname","user_profile_image"]

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id"]

class CommentSerializer(serializers.ModelSerializer):
    #comments = CommentSerializer(read_only=True, many=True)
    
    class Meta:
        model = Comment
        fields = "__all__"
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        # response['post'] = PostSerializer(instance.post, read_only=True).data
        # response['question'] = QuestionPostSerializer(instance.question, read_only=True).data 
        # response['answer'] = AnswerSerializer(instance.answer, read_only=True).data
        return response


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


