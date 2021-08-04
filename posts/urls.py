from django.urls import path
from . import views

app_name = "posts"
urlpatterns = [
    path("", views.post_list, name="post_list"),
    path("detail<int:pk>/", views.post_detail, name="post_detail"),
    path("create/", views.post_create, name="post_create"),
    path("<int:pk>/update", views.post_update, name="post_update"),
    path("<int:pk>/delete", views.post_delete, name="post_delete"),
    path("search/", views.search, name="search"),
    # path("folder/", views.make_folder, name="make_folder"),
]
