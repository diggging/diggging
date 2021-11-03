
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
        fields = ["folder_name", "folder_user"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        return response

# class FilteredFolderSerializer(serializers.ListSerializer):
    
#     def to_representation(self, data):
#         data = data.filter(user=self.context['request'].user)#, edition__hide=False)
#         return super(FilteredFolderSerializer, self).to_representation(data)

# class FolderSerializer2(serializers.ModelSerializer):
    
#     class Meta:
#         list_serializer_class = FilteredFolderSerializer
#         model = Folder



class PostDetailSerializer(serializers.ModelSerializer):
    #folder = serializers.SerializerMethodField("get_folder")
    comments = CommentSerializer(read_only=True, many=True)
    image = serializers.ImageField(use_url=True)
    class Meta:
        model = Post
        fields = "__all__"
        #fields = ["user","title","image","desc","code","folder","comments","is_public","is_friend","scrap_num","helped_num","likes_user","scarps_user"]
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        response['folder'] = FolderSerializer(instance.folder, many=True).data
        #response['folder'] = serializers.SerializerMethodField("get_folder")#FolderSerializer(instance.folder, many=True, queryset=Folder.objects.get_queryset(folder_user=self.request.user)).data
        response['post_comments'] = CommentSerializer(instance.post_comments, many=True).data
        return response

    def __init__(self, *args, **kwargs):
        super(PostDetailSerializer, self).__init__(*args, **kwargs)
        user = self.context['request'].user
        self.fields['folder'] = serializers.ChoiceField(choices=Folder.objects.filter(folder_user=user))
    # def get_folder(self):
    #     qs = Folder.objects.filter(folder_user="hj")
    #     serializer = FolderSerializer(instance=qs, many=True, read_only=False)
    #     return serializer.data


