from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import Review
from .serializers import ReviewSerializer
from .permissions import IsAuthorOrReadOnly
from services.models import Service
from django.shortcuts import get_object_or_404
from rest_framework.response import Response


class ReviewListCreateView(generics.ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_queryset(self):
        service_id = self.kwargs['service_id']
        return Review.objects.filter(service_id=service_id)

    def perform_create(self, serializer):
        service_id = self.kwargs['service_id']
        service = get_object_or_404(Service, id=service_id)
        serializer.save(user=self.request.user, service=service)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return Response({
            "message": "Review created successfully.",
            "data": response.data
        }, status=status.HTTP_201_CREATED)


class ReviewUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    # # In your view (not for production!)
    # permission_classes = [permissions.AllowAny]

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        return Response({
            "message": "Review updated successfully.",
            "data": response.data
        }, status=status.HTTP_200_OK)
    
    def destroy(self, request, *args, **kwargs):
        super().destroy(request, *args, **kwargs)
        return Response({
            "message": "Review deleted successfully."
        }, status=status.HTTP_204_NO_CONTENT)
