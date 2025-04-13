from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsAuthorOrReadOnly
from services.models import Service

class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        service_id = self.kwargs['service_id']
        return Review.objects.filter(service_id=service_id)

    def perform_create(self, serializer):
        service_id = self.kwargs['service_id']
        serializer.save(author=self.request.user, service_id=service_id)

class ReviewUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
