from django.urls import path
from .views import ReviewListCreateView, ReviewUpdateDeleteView

urlpatterns = [
    path('services/<int:service_id>/reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
    path('reviews/<int:pk>/', ReviewUpdateDeleteView.as_view(), name='review-update-delete'),
]
