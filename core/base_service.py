from django.db.models import QuerySet, Model


class BaseService:
    model: Model = None

    def __init__(self, queryset: QuerySet = None):
        if queryset is None:
            queryset = self.get_queryset()
        self.queryset: QuerySet = queryset

    def get_queryset(self) -> QuerySet:
        if self.model is None:
            raise Exception("you have to set default model.")
        return self.model.objects.all()
