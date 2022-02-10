# Third party imports
from rest_framework import status, viewsets
from rest_framework.response import Response

# Croner imports
from .serializers import KeysSerializer

# Import Redis
from .utils import RedisUtil


class KeysViewSet(viewsets.ViewSet):
    """
    METHOD      URI                 DESCRIPTION    
    GET         /api/keys/<:key>/   Returns specific value from key
    POST        /api/keys/          Creates a new key/value
    DELETE      /api/keys/<:key>/   Deletes a specific key
    """

    def __init__(self, *args, **kwargs):
        """
        Instantiate the RedisUtil object.
        """
        self.redis_util = RedisUtil()

    def create(self, request):
        """
        Creates a key/pair in the Redis store.
        """
        # Serialize the request body
        serializer = KeysSerializer(data=request.data)

        # If valid, create the key/value in Redis; if not send error message
        if serializer.is_valid():
            response = self.redis_util.create(serializer.data)
            return Response(
                {'created': response},
                status=status.HTTP_201_CREATED
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def destroy(self, request, pk=None):
        """
        Destroys a single record from Redis using pk from the URI which is the key.
        """
        # Get value from key in URI
        results = self.redis_util.destroy(pk)

        # Serialzie and validate response object
        serializer = KeysSerializer(data={'key': pk, 'value': results})

        # If valid, respond with object; if not respond with error message
        if serializer.is_valid():
            return Response(
                {'destroyed': results}, 
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

    def retrieve(self, request, pk=None):
        """
        Retrieves a single record from Redis using pk from the URI which is the key.
        """

        # Get value from key in URI
        results = self.redis_util.retrieve(pk)

        # Serialzie and validate response object
        serializer = KeysSerializer(data={'key': pk, 'value': results})

        # If valid, respond with object; if not respond with error message
        if serializer.is_valid():
            return Response(serializer.data)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
