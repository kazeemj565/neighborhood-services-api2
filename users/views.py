from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken



class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class ProfileView(APIView):
    serializer_class = RegisterSerializer
    permission_classes = [IsAuthenticated]

    # def get(self, request):
    #     user = request.user
    #     return Response({
    #         'username': user.username,
    #         'email': user.email,
    #     })
    def get_object(self):
        return self.request.user
    

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()  # requires blacklisting enabled
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
