from rest_framework import fields, serializers

from posts.models import Post
from users.models import User
from comments.models import Comment
from posts.models import Folder
from rest_framework.fields import CurrentUserDefault

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = "__all__"

class PostDetailSerializer(serializers.Serializer):
    folder = FolderSerializer(many=True)
    comment = CommentSerializer(many=True)
    post = PostSerializer()
