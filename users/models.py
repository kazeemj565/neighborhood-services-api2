from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    user_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    is_service_provider = models.BooleanField(default=False)

    def __str__(self):
        return self.username
