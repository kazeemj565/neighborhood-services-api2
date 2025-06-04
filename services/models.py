# Create your models here.
from django.db import models
from django.conf import settings
from categories.models import Category
# class Category(models.Model):
#     name = models.CharField(max_length=100)

#     def __str__(self):
#         return self.name

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='services')
    location = models.CharField(max_length=255)
    availability = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
