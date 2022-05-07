from typing import Union, List

from django.db.models import QuerySet, Q

from core.base_service import BaseService
from dtos.users import *
from users.models import User
from users.serializers import FindIdSerializer


class FindIdService(BaseService):
    model = User

    def __init__(self, queryset: QuerySet = None):
        super().__init__(queryset)
