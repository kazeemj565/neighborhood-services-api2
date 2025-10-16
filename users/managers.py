# user/managers.py
from django.contrib.auth.models import UserManager as DefaultUserManager

class ActiveUserManager(DefaultUserManager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)
