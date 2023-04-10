from products.models import Product
from customers.models import Customer
import pytest
from django.urls import reverse
from orders.models import Order, OrderProduct
from rest_framework.test import APIClient
from django.db.models import Sum

pytestmark = pytest.mark.django_db(transaction=True)


@pytest.fixture
def api_client():
    return APIClient()


def test_update_cart(db, api_client):
    customer = Customer.objects.first()
    product = Product.objects.first()

    url = reverse('updatecart')

    data = {
        'token': customer.token,
        'product_id': product.id,
        'quantity': 12
    }
    data_excessive_quantity = {
        'token': customer.token,
        'product_id': product.id,
        'quantity': 120000
    }

    data_no_fields = {
        'token': customer.token,
        'quantity': 1
    }

    initial_item_count = OrderProduct.objects.filter(order__customer=customer).aggregate(
        total_quantity=Sum('quantity'))['total_quantity'] or 0
    response = api_client.post(url, data=data)
    response_excessive_quantity = api_client.post(
        url, data=data_excessive_quantity)
    response_no_fields = api_client.post(url, data=data_no_fields)
    total_sum = (initial_item_count + 12)
    assert response.status_code == 200
    assert response_excessive_quantity.status_code == 400
    assert response_no_fields.status_code == 400
    assert response.data['status'] == True
    assert response.data['cart_item_count'] == total_sum


def test_order_list(db, api_client):
    customer = Customer.objects.first()
    url = reverse('customer_orderlist', kwargs={
                  'customer_token': customer.token})
    response = api_client.get(url)
    assert response.status_code == 200


def test_order_finalize(db, api_client):
    customer = Customer.objects.first()
    product = Product.objects.first()
    url = reverse('orderfinalize')
    order = Order.objects.create(customer=customer, is_ordered=False)
    OrderProduct.objects.create(
        product=product, order=order, price=product.price, quantity=1)
    data = {
        'token': customer.token,
        'country': 'Test Country',
        'city': 'Test City',
        'post_code': '12345',
        'address': 'Test Address'
    }
    response = api_client.put(url, data=data)
    assert response.status_code == 200
    assert response.data['is_ordered'] == True
