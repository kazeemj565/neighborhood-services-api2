# favorites/urls.py
from django.urls import path
from .views import FavoriteListCreateView, FavoriteDeleteView
# from .views import FavoriteListView, AddFavoriteView, RemoveFavoriteView, FavoriteListCreateView, FavoriteDeleteView

urlpatterns = [
    # path('favorites/', FavoriteListView.as_view(), name='favorite-list'),
    # path('favorites/add/', AddFavoriteView.as_view(), name='add-favorite'),
    # path('favorites/remove/', RemoveFavoriteView.as_view(), name='remove-favorite'),
    path('favorites/', FavoriteListCreateView.as_view(), name='favorites-list-create'),
    path('favorites/<int:pk>/delete/', FavoriteDeleteView.as_view(), name='favorites-delete'),
    # path('favorites/<int:pk>/remove/', RemoveFavoriteView.as_view(), name='favorites-remove'),
]

