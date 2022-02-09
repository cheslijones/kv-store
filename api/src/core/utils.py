# Django imports
from django.conf import settings

# Redis imports
import redis


class RedisUtil:
    """
    Instantiates the Redis object and sets the connection params.
    """

    def __init__(self):
        self.redis_instance = redis.StrictRedis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT
        )

    def create(self, data):
        """
        Creates the key/value pair from request body.
        """
        return self.redis_instance.set(data['key'], data['value'])

    def destroy(self, key):
        """
        Destroys a single pair from a URI key param.
        """
        result = self.redis_instance.delete(key)
        return 'Key deleted.' if result > 0 else 'Key not found.'

    def retrieve(self, key):
        """
        Retreives a single pair from a URI key param.
        """
        value = self.redis_instance.get(key)
        return value.decode('UTF-8') if value else 'Key not found.'
