
from rest_framework import fields, serializers
from rest_framework.relations import PrimaryKeyRelatedField
from posts.models import Post, Folder 
from questions.models import QuestionPost
from users.models import User
# from comments.models import Comment
from comments.serializers import PostCommentSerializer
from posts.models import Folder
from rest_framework.fields import CurrentUserDefault, IntegerField
from taggit_serializer.serializers import TagList, TagListSerializerField, TaggitSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "user_nickname",
            "user_level",
            "user_point",
            "user_profile_content",
            "user_profile_image",
            "email",
            "user_following"
        ]

# ------------- Post Folder Serializer ----------------------------------
class FolderSerializer(serializers.ModelSerializer):
    folder_name = serializers.StringRelatedField()

    class Meta:
        model = Folder
        fields = ["folder_name", "folder_user"]
# ------------------------------------------------------------------------

# --------------- Post Serializer ------------------------------------------
class PostCreateUpdateSerializer(TaggitSerializer, serializers.ModelSerializer):
    post_tags = TagListSerializerField(allow_null = True)
    user = serializers.StringRelatedField()

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "image",
            "title",
            "desc",
            "folder",
            "post_tags",
        ]

    def __init__(self, *args, **kwargs):
        super(PostCreateUpdateSerializer, self).__init__(*args, **kwargs)
        user = self.context['request'].user
        self.fields['folder'] = serializers.ManyRelatedField(child_relation = PrimaryKeyRelatedField(queryset = Folder.objects.filter(folder_user = user), required=False), required=False)

class PostDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_comments = PostCommentSerializer(many=True, read_only=True)
    post_tags = TagListSerializerField(allow_null=True)
    comment_count = IntegerField(source='post_comments.count', read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "title",
            "image",
            "desc",
            "scrap_num",
            "helped_num",
            "post_comments",
            "comment_count",
            "post_tags",
            "created",
            "updated",
            "hits"
        ]
        read_only_fields = ["hits",]

class PostListSerializer(TaggitSerializer, serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    post_tags = TagListSerializerField(allow_null=True)
    comment_count = serializers.IntegerField(source='post_comments.count', read_only=True)
    
    class Meta:
        model=Post
        fields = [
            "id",
            "user",
            "title",
            "desc",
            "scrap_num",
            "helped_num",
            "post_tags",
            "created",
            "updated",
            "comment_count",
            "hits",
        ]

# ----------------------------------------------------------------------------------

# ----------------------- Like Serailizer ------------------------------------------
class LikeSerializer(serializers.ModelSerializer):
    target_post = serializers.IntegerField(source='pk', read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "target_post",
            "helped_num",
        ]
        read_only_fields = ["id", "target_post", "helped_num"]
# ----------------------------------------------------------------------------------
class QuestionThumbnailSerializer(serializers.ModelSerializer):
    question_tags = TagListSerializerField(allow_null=True)
    class Meta:
        model = QuestionPost
        fields = "__all__"
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        return response

class SearchSerializer(serializers.Serializer):
    query = serializers.CharField(max_length=200)

#----------------------------------------------------------------------------------
# class PostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Post
#         fields = "__all__"

# class FolderSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Folder
#         fields = ["folder_name", "folder_user"]

# class CommentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Comment
#         fields = "__all__"
    
#     def to_representation(self, instance):
#         response = super().to_representation(instance)
#         response['user'] = UserSerializer(instance.user, read_only=True).data
#         return response

# class FilteredFolderSerializer(serializers.ListSerializer):
    
#     def to_representation(self, data):
#         data = data.filter(user=self.context['request'].user)#, edition__hide=False)
#         return super(FilteredFolderSerializer, self).to_representation(data)

# class FolderSerializer2(serializers.ModelSerializer):
    
#     class Meta:
#         list_serializer_class = FilteredFolderSerializer
#         model = Folder



# class PostDetailSerializer(serializers.ModelSerializer):
#     #folder = serializers.SerializerMethodField()
#     #folder = serializers.ChoiceField(choices=Folder.objects.filter(folder_user=user))
#     comments = CommentSerializer(read_only=True, many=True)
#     image = serializers.ImageField(allow_empty_file=True, use_url=True)
#     class Meta:
#         model = Post
#         fields = "__all__"
        #fields = ["user","title","image","desc","code","folder","comments","is_public","is_friend","scrap_num","helped_num","likes_user","scarps_user"]
    # def get_folder(self, obj):
    #     qs = Folder.objects.filter(folder_user="hj")
    #     serializer = FolderSerializer(instance=qs, many=True)
    #     return serializer.data

    # def to_representation(self, instance):
    #     response = super().to_representation(instance)
    #     response['user'] = UserSerializer(instance.user, read_only=True).data
    #     response['folder'] = FolderSerializer(instance.folder, many=True).data
    #     #response['folder'] = serializers.SerializerMethodField("get_folder")#FolderSerializer(instance.folder, many=True, queryset=Folder.objects.get_queryset(folder_user=self.request.user)).data
    #     response['post_comments'] = CommentSerializer(instance.post_comments, many=True).data
    #     return response

    # def __init__(self, *args, **kwargs):
    #     super(PostDetailSerializer, self).__init__(*args, **kwargs)
    #    # user = self.context['request'].user
    #     #self.fields['folder'].queryset = serializers.Field(Folder.objects.filter(folder_user=user))
    #    # self.fields['folder'] = serializers.ManyRelatedField(child_relation=PrimaryKeyRelatedField(queryset= Folder.objects.filter(folder_user=user), required=False), required=False)#Folder.objects.filter(folder_user=user)

