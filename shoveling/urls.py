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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import include
from posts import views as posts_views

urlpatterns = [
    path("ckeditor/", include("ckeditor_uploader.urls")),
    path("admin/", admin.site.urls),
    path("posts/", include("posts.urls", namespace="posts")),
    path("users/", include("users.urls", namespace="users")),
    path("comments/", include("comments.urls", namespace="comments")),
    path("accounts/", include("allauth.urls")),
    path("questions/", include("questions.urls")),
    path('', posts_views.main , name='main'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
