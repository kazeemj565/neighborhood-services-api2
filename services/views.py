from django.shortcuts import render

from rest_framework import generics, permissions
from .models import Service
from .serializers import ServiceSerializer
from .permissions import IsOwnerOrReadOnly

from rest_framework.generics import ListAPIView
from rest_framework.permissions import AllowAny
from django.db.models import Q


class ServiceListCreateView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ServiceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]


class ServiceSearchAPIView(ListAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        query = self.request.query_params.get("query", "")
        return Service.objects.filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(location__icontains=query)
        )

class ServiceFilterAPIView(ListAPIView):
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Service.objects.all()
        category_id = self.request.query_params.get("category_id")
        location = self.request.query_params.get("location")

        if category_id:
            queryset = queryset.filter(category_id=category_id)
        if location:
            queryset = queryset.filter(location__icontains=location)

        return queryset
