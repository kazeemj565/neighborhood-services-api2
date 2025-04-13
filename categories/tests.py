from django.test import TestCase, Client
from django.contrib.auth.models import User
from services.models import Category

class CategoryTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin = User.objects.create_superuser(username="admin", password="adminpass", email="admin@example.com")
        self.user = User.objects.create_user(username="user", password="userpass")

    def test_list_categories(self):
        Category.objects.create(name="Cleaning")
        Category.objects.create(name="Tutoring")

        response = self.client.get("/api/categories/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 2)

    def test_create_category_as_admin(self):
        self.client.login(username="admin", password="adminpass")
        response = self.client.post("/api/categories/", {"name": "Gardening"})
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Category.objects.filter(name="Gardening").exists())

    def test_create_category_as_non_admin(self):
        self.client.login(username="user", password="userpass")
        response = self.client.post("/api/categories/", {"name": "Unauthorized"})
        self.assertEqual(response.status_code, 403)
