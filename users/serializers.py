from rest_framework import fields, serializers
from rest_framework.exceptions import ValidationError

from .models import User
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "user_profile_image",
            "user_nickname ",
            "user_point",
            "user_following",
            "user_followed",
            "email",
            "user_level",
            "user_profile_content",
        )


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "user_nickname",
            "password1",
            "password2",
        )
        extra_kwargs = {"password1": {"write_only": True}}

    def create(self, validated_data):

        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["user_nickname"],
            validated_data["password1"],
            validated_data["password2"],
        )

        return user
