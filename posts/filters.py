import django_filters
from .models import Post
from django import forms


class TutorialFilter(django_filters.FilterSet):
    
    class Meta:
        model = Post
        fields = {
                    'language'  : ['exact'],
                    'problem_solving': ['exact'],
                    'os': ['exact'],
                    'framework': ['exact'],
        }
