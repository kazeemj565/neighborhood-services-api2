# from django.contrib.auth.models import AbstractUser
# from django.db import models
# import uuid

# class User(AbstractUser):
#     user_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
#     is_service_provider = models.BooleanField(default=False)

#     def __str__(self):
#         return self.username



# user/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    user_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    is_service_provider = models.BooleanField(default=False)
    
    # Additional profile fields
    gender_choices = [('male', 'Male'), ('female', 'Female'), ('other', 'Other')]
    gender = models.CharField(max_length=10, choices=gender_choices, null=True, blank=True)
    religion = models.CharField(max_length=50, null=True, blank=True)
    language = models.CharField(max_length=50, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
