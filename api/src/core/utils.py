# Django imports
from django.conf import settings

# Redis imports
import redis


class RedisUtil:
    """
    """
    def __init__(self):
        self.redis_instance = redis.StrictRedis(
            host=settings.REDIS_HOST,
            port=settings.REDIS_PORT
        )

    def create(self):
        """
        
        """
        return self.redis_instance.set('test_key', 'test_value')

    def destroy(self):
        """
        
        """
        pass

    def list(self):
        """
        Returns a list of all 
        """
        return self.redis_instance.keys('*')

    def retrieve(self):
        """
        
        """
        pass



