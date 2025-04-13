# favorites/urls.py

from django.urls import path
from .views import FavoriteListView, AddFavoriteView, RemoveFavoriteView, FavoriteListCreateView, FavoriteDeleteView

urlpatterns = [
    path('', FavoriteListView.as_view(), name='favorite-list'),
    path('add/', AddFavoriteView.as_view(), name='add-favorite'),
    path('remove/', RemoveFavoriteView.as_view(), name='remove-favorite'),
    path('', FavoriteListCreateView.as_view(), name='favorites-list-create'),
    path('<int:pk>/delete/', FavoriteDeleteView.as_view(), name='favorites-delete'),
]


