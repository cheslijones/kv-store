# Third party imports
from rest_framework import viewsets
from rest_framework.response import Response

# Croner imports
from .serializers import APISerializer

# Import Redis
from .utils import RedisUtil


class APIViewSet(viewsets.ViewSet):
    """
    GET         /api/           Returns a list of key/value
    RETRIEVE    /api/<:key>     Returns specific value from key
    POST        /api/           Creates a new key/value
    DELETE      /api/<:key>     Deletes a specific key
    """
    serializer_class = APISerializer

    def __init__(self, *args, **kwargs):
        """
        """
        self.redis_util = RedisUtil()

    def create(self, reuqest):
        """
        """
        return Response(self.redis_util.create())

    def destroy(self, request, pk=None):
        """
        """
        pass

    def list(self, request):
        """
        """
        return Response(self.redis_util.list())

    def retrieve(self, request, pk=None):
        """
        """
        pass




