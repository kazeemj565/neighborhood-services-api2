# Create your views here.
from rest_framework import generics, permissions, status
from .models import Favorite
from .serializers import FavoriteSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from services.models import Service

class FavoriteListCreateView(generics.ListCreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class FavoriteDeleteView(generics.DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)



class FavoriteListView(generics.ListAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)



class AddFavoriteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        service_id = request.data.get('service')

        if not service_id:
            return Response({"detail": "Service ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        service = Service.objects.filter(id=service_id).first()
        if not service:
            return Response({"detail": "Service does not exist."}, status=status.HTTP_404_NOT_FOUND)

        if Favorite.objects.filter(user=request.user, service=service).exists():
            return Response({"detail": "Service already in favorites."}, status=status.HTTP_400_BAD_REQUEST)

        favorite = Favorite.objects.create(user=request.user, service=service)
        serializer = FavoriteSerializer(favorite)

        return Response({
            "message": "Favorite added successfully.",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)



class RemoveFavoriteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk):
        try:
            favorite = Favorite.objects.get(user=request.user, service_id=pk)
            favorite.delete()
            return Response({"detail": "Favorite removed successfully."}, status=status.HTTP_200_OK)
        except Favorite.DoesNotExist:
            return Response({"detail": "Favorite not found."}, status=status.HTTP_404_NOT_FOUND)
