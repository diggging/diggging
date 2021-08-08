from django.urls import path
from . import views

app_name = "question"
urlpatterns = [path("my_view/", views.my_view, name="my_view")]
