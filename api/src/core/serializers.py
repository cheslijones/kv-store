# DRF imports
from rest_framework import serializers


class KeysSerializer(serializers.Serializer):
    """
    Serializers the incoming key/value pair and makesure
    that both values are being supplied.
    """
    key = serializers.CharField(required=True)
    value = serializers.CharField(required=True)