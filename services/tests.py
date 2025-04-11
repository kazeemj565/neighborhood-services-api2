
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.urls import reverse
from users.models import User
from services.models import Service, Category


class ServiceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        
        # Create a user for authentication
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='password123')

        # Create a category
        self.category = Category.objects.create(name="Plumbing")

        # Authentication
        self.client.login(username='testuser', password='password123')

        # Service URL
        self.service_list_url = reverse('service-list')
        self.service_detail_url = lambda id: reverse('service-detail', args=[id])

        # Sample service data
        self.service_data = {
            'title': 'Plumbing Service',
            'description': 'Fix leaks and plumbing issues.',
            'price': '100.00',
            'category': self.category.id,
            'location': 'Location 1',
            'availability': True
        }

    def test_create_service(self):
        # Test creating a new service
        response = self.client.post(self.service_list_url, self.service_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['title'], self.service_data['title'])
        self.assertEqual(response.data['price'], self.service_data['price'])

    def test_get_service_list(self):
        # Test fetching all services
        self.client.post(self.service_list_url, self.service_data, format='json')
        response = self.client.get(self.service_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_service_detail(self):
        # Create a service first
        service = Service.objects.create(
            title='Electrician Service',
            description='Fix electrical issues.',
            price='150.00',
            category=self.category,
            owner=self.user,
            location='Location 2',
            availability=True
        )

        response = self.client.get(self.service_detail_url(service.id))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], service.title)

    def test_update_service(self):
        # Create a service first
        service = Service.objects.create(
            title='Plumbing Service',
            description='Fix leaks',
            price='100.00',
            category=self.category,
            owner=self.user,
            location='Location 1',
            availability=True
        )

        update_data = {
            'title': 'Updated Plumbing Service',
            'description': 'Fix leaks and drain issues.',
            'price': '120.00',
            'category': self.category.id,
            'location': 'Location 2',
            'availability': True
        }

        response = self.client.put(self.service_detail_url(service.id), update_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], update_data['title'])

    def test_delete_service(self):
        # Create a service first
        service = Service.objects.create(
            title='Plumbing Service',
            description='Fix leaks',
            price='100.00',
            category=self.category,
            owner=self.user,
            location='Location 1',
            availability=True
        )

        response = self.client.delete(self.service_detail_url(service.id))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Service.objects.count(), 0)
