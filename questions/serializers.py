from rest_framework import fields, serializers
from posts.models import Folder
from questions.models import QuestionPost, Answer, QuestionFolder
# from comments.serializers import CommentSerializer
from users.models import User
from comments.models import Comment
from rest_framework.fields import CurrentUserDefault
from rest_framework.relations import PrimaryKeyRelatedField
from taggit_serializer.serializers import TagListSerializerField, TaggitSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "user_nickname", "user_level", "user_point", "user_profile_content", "user_profile_image", "email", "user_following"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["user", "text"]
        read_only_fields = ["user"]

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        return response 
class AnswerSerializer(serializers.ModelSerializer):

    answer_comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Answer
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, read_only=True).data
        return response

class QuestionFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionFolder
        fields = ["folder_name", "folder_user"]
class QuestionPostSerializer(TaggitSerializer, serializers.ModelSerializer):
    question_comments = CommentSerializer(many=True, read_only=True)
    answers = AnswerSerializer(many=True, read_only=True)
    question_tags = TagListSerializerField(allow_null=True)
    class Meta:
        model = QuestionPost
        fields = "__all__"
        read_only_fields = ["scrap_num", "helped_num", "likes_user", "scarps_user"]

    def to_representation(self, instance):
        # response = super().to_representation(instance)
        # response['questionfolder'] = QuestionFolderSerializer(instance.question_folder).data
        # return response 
        representation = super().to_representation(instance)
        representation['likes_user_count'] = instance.likes_user.count()
        representation['scrap_user_count'] = instance.scarps_user.count()

        return representation 
        
    # def __init__(self, *args, **kwargs):
    #     super(QuestionPostSerializer, self).__init__(*args, **kwargs)
    #     user = self.context['request'].user
    #     self.fields['question_folder'] = serializers.ManyRelatedField(child_relation=PrimaryKeyRelatedField(queryset = QuestionFolder.objects.filter(folder_user=user), required = False), required=False) 


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