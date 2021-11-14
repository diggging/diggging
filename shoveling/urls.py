"""shoveling URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include
from posts import views as posts_views
from django.contrib.auth.decorators import login_required
from django.views.decorators.cache import never_cache
from rest_framework_jwt.views import (
    obtain_jwt_token,
    verify_jwt_token,
    refresh_jwt_token,
)

urlpatterns = [
    path("api/token/", obtain_jwt_token),
    path("api/token/verify/", verify_jwt_token),
    path("api/token/refresh/", refresh_jwt_token),
    path("ckeditor/", include("ckeditor_uploader.urls")),
    path("digg_admin_ging/", admin.site.urls),
    path("posts/", include("posts.urls", namespace="posts")),
    path("users/", include("users.urls", namespace="users")),
    path("comments/", include("comments.urls", namespace="comments")),
    path("accounts/", include("allauth.urls")),
    path("questions/", include("questions.urls")),
    path("", posts_views.Main.as_view(), name="main"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
