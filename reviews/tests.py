from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.urls import reverse
from services.models import Service
from reviews.models import Review
from categories.models import Category
from rest_framework import status
import json

User = get_user_model()

class ReviewTestCase(TestCase):

    def setUp(self):
        self.client = Client()
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.other_user = User.objects.create_user(username="otheruser", password="otherpass")

        self.category = Category.objects.create(name="Plumbing")
        self.service = Service.objects.create(
            title="Fix tap",
            description="Tap leaking",
            price=2000,
            category=self.category,
            owner=self.user,
            location="Abuja",
            availability=True
        )

        self.review_url = reverse("review-list-create", kwargs={"service_id": self.service.id})
        self.login_url = reverse("token_obtain_pair")

        # login and get JWT token
        res = self.client.post(self.login_url, data={"username": "testuser", "password": "testpass"}, content_type="application/json")
        self.token = res.json().get("access")
        self.auth_headers = {"HTTP_AUTHORIZATION": f"Bearer {self.token}"}

    def test_create_review(self):
        data = {
            "rating": 4,
            "comment": "Great service!"
        }
        response = self.client.post(self.review_url, data=json.dumps(data), content_type="application/json", **self.auth_headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Review.objects.count(), 1)

    def test_unauthenticated_review_create(self):
        data = {
            "rating": 5,
            "comment": "No login!"
        }
        response = self.client.post(self.review_url, data=json.dumps(data), content_type="application/json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_review_by_author(self):
        review = Review.objects.create(service=self.service, user=self.user, rating=4, comment="Nice")
        url = reverse("review-update-delete", kwargs={"pk": review.id})
        data = {"rating": 3, "comment": "Edited!"}
        response = self.client.put(url, data=json.dumps(data), content_type="application/json", **self.auth_headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Review.objects.first().comment, "Edited!")

    def test_update_review_by_non_author(self):
        review = Review.objects.create(service=self.service, user=self.user, rating=4, comment="Nice")
        # login as other user
        res = self.client.post(self.login_url, data={"username": "otheruser", "password": "otherpass"}, content_type="application/json")
        token = res.json().get("access")
        headers = {"HTTP_AUTHORIZATION": f"Bearer {token}"}

        url = reverse("review-update-delete", kwargs={"pk": review.id})
        data = {"rating": 2, "comment": "I should not be able to do this"}
        response = self.client.put(url, data=json.dumps(data), content_type="application/json", **headers)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_delete_review_by_author(self):
        review = Review.objects.create(service=self.service, user=self.user, rating=4, comment="Nice")
        url = reverse("review-update-delete", kwargs={"pk": review.id})
        response = self.client.delete(url, **self.auth_headers)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Review.objects.count(), 0)

    def test_review_list(self):
        Review.objects.create(service=self.service, user=self.user, rating=4, comment="One")
        Review.objects.create(service=self.service, user=self.user, rating=3, comment="Two")
        response = self.client.get(self.review_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 2)
