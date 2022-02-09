# Django imports
from django.urls import include, path

# DRF Imports
from rest_framework.routers import DefaultRouter

# Import views from Core
from core.views import KeysViewSet


# Instantiate new Router and register routes
router = DefaultRouter()
router.register(r'keys', KeysViewSet, basename='keys')

# Construct URLs list
urlpatterns = [
    path('api/', include(router.urls))
]
