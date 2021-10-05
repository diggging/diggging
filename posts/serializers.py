from rest_framework import fields, serializers

from posts.models import Post
from users.models import User
from comments.models import Comment
from posts.models import Folder
from rest_framework.fields import CurrentUserDefault

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","user_nickname","user_level","user_point","user_profile_content","user_profile_image","email","user_following"]

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ["folder_name","folder_kind","folder_user"]

class PostDetailSerializer(serializers.ModelSerializer):
    folder = FolderSerializer(read_only=True, many=True)
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Post
        fields = "__all__"
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        response['folder'] = FolderSerializer(instance.folder, many=True).data
        return response

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"

