from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    service = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'service', 'user', 'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['id', 'service', 'user', 'created_at', 'updated_at']
