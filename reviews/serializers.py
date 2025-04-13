from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Review
        fields = ['id', 'service', 'author', 'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']
