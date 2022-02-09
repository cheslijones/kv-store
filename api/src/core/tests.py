import unittest
from django.test import TestCase

from .utils import RedisUtil
from .views import KeysViewSet

class RedisUtilTestCase(unittest.TestCase):
    def setUp(self):
        self.redis_util = RedisUtil()

    def test_create(self):
        pass

    def test_destroy(self):
        pass

    def test_retrieve(self):
        pass

    def tearDown(self):
        del self.redis_util

class KeysViewSetTestCase(unittest.TestCase):
    def setUp(self):
        self.redis_util = RedisUtil()

    def test_create(self):
        pass

    def test_destroy(self):
        pass

    def test_retrieve(self):
        pass

    def tearDown(self):
        del self.redis_util