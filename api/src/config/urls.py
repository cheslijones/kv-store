# Django imports
from django.urls import include, path

# DRF Imports
from rest_framework.routers import DefaultRouter

# Import views from Core
from core.views import APIViewSet


# Instantiate new Router and register routes
router = DefaultRouter()
router.register(r'api', APIViewSet, basename='api')

# Construct URLs list
urlpatterns = [
    path('', include(router.urls))
]
