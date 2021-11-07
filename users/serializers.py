from rest_framework import fields, serializers
from rest_framework.exceptions import ValidationError

from .models import User
from django.contrib.auth import authenticate
from rest_framework_jwt.settings import api_settings
from django.contrib.auth import get_user_model
from rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate

JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "user_nickname",
            "email",
            "login_method",
        ]


class RegisterSerializer(RegisterSerializer):

    user_nickname = serializers.CharField()
    email = serializers.EmailField()
    password1 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True)
    #login_method = serializers.ChoiceField(choices=["email", "github"])

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()  # username, password, email이 디폴트
        data_dict["user_nickname"] = self.validated_data.get("user_nickname", "")
        #data_dict["login_method"] = self.validated_data.get("login_method", "")

        return data_dict

    """class Meta:
        model = User
        fields = [
            "username",
            "email",
            "user_nickname",
            "password",
            "password2",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self):
        user = User(
            username=self.validated_data["email"],
            email=self.validated_data["username"],
        )
        password = self.validated_data["password1"]
        password2 = self.validated_data["password2"]

        if password != password2:
            raise serializers.ValidationError({"password": "비밀번호가 일치하지않습니다."})

        user.set_password(password)
        user.save()

        return user"""


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=30)
    password = serializers.CharField(
        style={"input_type": "password"}, max_length=128, write_only=True
    )
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password", None)

        user = authenticate(username=username, password=password)

        if user is None:
            return {"username": "None"}
        try:
            payload = JWT_PAYLOAD_HANDLER(user)
            jwt_token = JWT_ENCODE_HANDLER(payload)
            update_last_login(None, user)

        except User.DoesNotExist:
            raise serializers.ValidationError("User 가 존재하지않습니다.")
        return {"username": user.username, "token": jwt_token}