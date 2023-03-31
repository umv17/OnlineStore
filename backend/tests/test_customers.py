import pytest
from django.urls import reverse
from rest_framework import status
from customers.models import Customer, CustomerAddress
from orders.models import Order
from customers.serializers import CustomerSerializer
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
import uuid
import jwt


pytestmark = pytest.mark.django_db(transaction=True)

User = get_user_model()


@pytest.fixture
def user():
    test_user = User.objects.create_user(
        username='test_user',
        password='test_password',
        first_name='Test',
        last_name='Testovich',
        email='TestTestovich@gmail.com'
    )
    access_token = uuid.uuid4()
    Customer.objects.create(
        user=test_user,
        first_name=test_user.first_name,
        last_name=test_user.last_name,
        email=test_user.email,
        token=access_token
    )
    return test_user


@pytest.fixture
def api_client(user):
    client = APIClient()
    client.force_authenticate(user)
    payload = {
        'username': user.username,
        'id': user.id,
    }
    token = jwt.encode(payload, 'secret', algorithm='HS256')
    client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
    return client


@pytest.fixture
def orders(user):
    customer = Customer.objects.get(user=user)
    order = Order.objects.create(
        customer=customer,
        customer_shipping_address=None,
        is_ordered=False,
    )
    return [order]


@pytest.fixture
def unauthenticated_client():
    client = APIClient()
    return client


def test_create_user(unauthenticated_client):
    url = reverse('customercore:customercreate-list')
    data = {
        'first_name': 'Test',
        'last_name': 'Testov',
        'email': 'Test.Testov@gmail.com'
    }
    response = unauthenticated_client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert 'customer_token' in response.data
    customer_token = response.data['customer_token']
    assert customer_token is not None
    created_customer = Customer.objects.get(token=customer_token)
    assert created_customer is not None
    assert created_customer.first_name == 'Test'
    assert created_customer.last_name == 'Testov'
    assert created_customer.email == 'Test.Testov@gmail.com'


def test_registration_user(unauthenticated_client):
    url = reverse('customercore:customerregistration-list')
    data = {
        'username': 'new_user',
        'password': 'new_password',
        'first_name': 'Test',
        'last_name': 'Testov',
        'email': 'testtestov@gmail.com'
    }
    response = unauthenticated_client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert 'id' in response.data
    # pytest.set_trace()
    customer_id = response.data['id']
    assert customer_id is not None

    created_customer = Customer.objects.get(id=customer_id)
    assert created_customer is not None
    assert created_customer.user.username == 'new_user'
    assert created_customer.user.email == 'testtestov@gmail.com'
    assert created_customer.user.first_name == 'Test'
    assert created_customer.user.last_name == 'Testov'


def test_create_customer_address(api_client, user):
    url = reverse('customercore:customeraddresslist-list')
    data = {
        'city': 'Apex',
        'address': '123 Salem Street',
        'post_code': '10001'
    }
    response = api_client.post(url, data)
    assert response.status_code == status.HTTP_201_CREATED
    assert 'id' in response.data
    address_id = response.data['id']
    assert address_id is not None
    address = CustomerAddress.objects.filter(customer__user=user).first()
    assert address is not None
    assert address.city == data['city']
    assert address.address == data['address']
    assert address.post_code == data['post_code']


def test_list_customers(api_client, user):
    url = reverse('customercore:customerslist-list') + f'?user={user.id}'
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.data, list)
    assert len(response.data) == Customer.objects.filter(user=user).count()
    serializer = CustomerSerializer(
        Customer.objects.filter(user=user), many=True)
    assert response.data == serializer.data


def test_get_customer_orders(api_client, user, orders):
    url = reverse('customercore:customerorder-list')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert isinstance(response.data, list)
    customer = Customer.objects.get(user=user)
    orders1 = Order.objects.filter(customer=customer)
    assert len(response.data) == len(orders1)
