from django.urls import path
from . import views
from .views import ServiceListCreateView, ServiceDetailView, ServiceSearchAPIView

urlpatterns = [
    path('services/', ServiceListCreateView.as_view(), name='service-list-create'),
    path('services/<int:pk>/', ServiceDetailView.as_view(), name='service-detail'),
    path('search/', ServiceSearchAPIView.as_view(), name='service-search'),
    path('filter/', views.ServiceFilterAPIView.as_view(), name='service-filter'),

]
