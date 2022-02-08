# DRF imports
from rest_framework import serializers


class APISerializer(serializers.Serializer):
    """
    
    """
    key = serializers.CharField(max_length=100)
    value = serializers.CharField(max_length=100)