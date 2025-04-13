from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from services.models import Service, Category
from favorites.models import FavoriteService

User = get_user_model()

class FavoriteServiceTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpass123")
        self.category = Category.objects.create(name="Plumbing")
        self.service = Service.objects.create(
            title="Fix kitchen sink",
            description="Leaking pipe under kitchen sink",
            price=50.0,
            category=self.category,
            owner=self.user,
            location="Lagos",
            availability=True,
        )
        self.client.force_authenticate(user=self.user)

    def test_add_service_to_favorites(self):
        response = self.client.post("/api/favorites/add/", {"service_id": self.service.id})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(FavoriteService.objects.filter(user=self.user, service=self.service).exists())

    def test_list_user_favorites(self):
        FavoriteService.objects.create(user=self.user, service=self.service)
        response = self.client.get("/api/favorites/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["service"]["id"], str(self.service.id))

    def test_remove_service_from_favorites(self):
        FavoriteService.objects.create(user=self.user, service=self.service)
        response = self.client.delete("/api/favorites/remove/", {"service_id": self.service.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(FavoriteService.objects.filter(user=self.user, service=self.service).exists())
