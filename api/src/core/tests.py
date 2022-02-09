import unittest
from unittest.mock import patch

from .utils import RedisUtil
from .views import KeysViewSet

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

# class RedisUtilTestCase(unittest.TestCase):
#     def setUp(self):
#         self.redis_util = RedisUtil()

#     def test_create(self):
#         with patch('utils.redis.StrictRedis.set') as mocked_set:
#             mocked_set.return_value
#         # self.redis_util.create({'key': 'hello', 'value': 'world'})
#         # self.assertEqual(self.redis_util.retrieve('hello'), 'world')

#     # def test_destroy(self):
#     #     self.redis_util.create({'key': 'hello', 'value': 'world'})
#     #     self.assertEqual(self.redis_util.destroy('hello'), 1)

#     # def test_retrieve(self):
#     #     self.redis_util.create({'key': 'hello', 'value': 'world'})
#     #     self.assertEqual(self.redis_util.retrieve('hello'), 'world')

#     def tearDown(self):
#         del self.redis_util

