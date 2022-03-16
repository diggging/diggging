from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    message = 'You must be the owner of this object'

    def has_object_permission(self, request, view, obj):
        # my_safe_method = ['PUT'] # only allow update
        if request.method in permissions.SAFE_METHODS:
            return True
        # if request.method in my_safe_method:
        #     return True

        return obj.user == request.user

class IsNotOwnerOrReadOnly(permissions.BasePermission):
    message = 'You must not be the owner of this object'

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.user != request.user

class IsQuestionOwnerOrReadOnly(permissions.BasePermission):
    message = 'You must be owner of the QuestionPost to select Answer'

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True 
        
        return obj.question.user == request.user

class IsPostOwnerOrReadOnly(permissions.BasePermission):
    message = 'You must be owner of the Post object'

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.post.user == request.user