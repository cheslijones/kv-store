import unittest
from unittest.mock import patch

from rest_framework.test import APIRequestFactory

from .views import KeysViewSet


class KeysViewSetTestCase(unittest.TestCase):

    def setUp(self):
        self.json_object = {'key': 'hello', 'value': 'world'}
        self.view = KeysViewSet()

    def test_create(self):
        with patch('core.views.RedisUtil.create') as mocked_create:
            mocked_create.return_value.data = True

            created = self.view.create(self.json_object)