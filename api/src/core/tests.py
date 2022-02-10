import unittest
from unittest.mock import patch
from urllib.request import Request

from core.views import KeysViewSet


class KeysViewSetTestCase(unittest.TestCase):

    def setUp(self):
        self.valid_obj = {'key': 'hello', 'value': 'world'}
        self.invalid_obj = {'key': 'hello'}
        self.view = KeysViewSet()

    def test_create(self):
        with patch('core.views.RedisUtil.create') as mocked_create:
            mocked_create.return_value = True
            request_valid = Request(self.valid_obj)
            response_valid = self.view.create(request_valid)
            mocked_create.assert_called_with(self.valid_obj)
            self.assertEqual(response_valid.data['created'], True)
            self.assertEqual(response_valid.status_code, 201)

            request_invalid = Request(self.invalid_obj)
            response_invalid = self.view.create(request_invalid)
            self.assertIn('This field is required.', response_invalid.data['value'])
            self.assertEqual(response_invalid.status_code, 400)

    def test_destroy(self):
        with patch('core.views.RedisUtil.destroy') as mocked_destroy:
            mocked_destroy.return_value = 1

            response = self.view.destroy(request=None, pk='hello')
            mocked_destroy.assert_called_with('hello')
            self.assertEqual(response.data['destroyed'], 1)

            response = self.view.destroy(request=None, pk='')
            mocked_destroy.assert_called_with('')
            self.assertIn('This field may not be blank.', response.data['key'])
            self.assertEqual(response.status_code, 400)

    def test_retrieve(self):
        with patch('core.views.RedisUtil.retrieve') as mocked_retrieve:
            mocked_retrieve.return_value = 'world'

            response = self.view.retrieve(request=None, pk='hello')
            mocked_retrieve.assert_called_with('hello')
            self.assertEqual(response.data, self.valid_obj)

            response = self.view.retrieve(request=None, pk='')
            mocked_retrieve.assert_called_with('')
            self.assertIn('This field may not be blank.', response.data['key'])
            self.assertEqual(response.status_code, 400)

class Request:
    def __init__(self, data):
        self.data = data