import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from products.pagination import ProductPagination
from products.models import *
import os


@pytest.fixture
def api_client_product():
    return APIClient()


@pytest.fixture
def api_client_category():
    return APIClient()


@pytest.fixture
def api_client_brand():
    return APIClient()


pytestmark = pytest.mark.django_db(transaction=True)


def test_get_product_list_returns_correct_data_for_first_page(db, api_client_product):
    page_size = ProductPagination.page_size
    url = reverse('productall-list') + f'?page=1&page_size={page_size}'
    response = api_client_product.get(url)
    assert response.status_code == 200
    response_data = response.data
    assert len(response_data['result']) == page_size
    assert response_data['links'][
        'next'] == f'http://testserver{reverse("productall-list")}?page=2&page_size={page_size}'
    assert response_data['page'] == 1
    assert response_data['pages'] == (
        Product.objects.count() - 1) // page_size + 1
    assert response_data['count'] == Product.objects.count()
    for product_data in response_data['result']:
        assert set(product_data.keys()) == {
            'id', 'old_price', 'quantity', 'brand', 'title', 'photo', 'price'}
        product = Product.objects.get(pk=product_data['id'])
        assert product_data['title'] == product.title
        assert product_data['brand']['title'] == product.brand.title
        assert product_data['price'] == str(product.price)
        assert product_data['old_price'] == str(product.old_price)
        assert product_data['quantity'] == product.quantity


def test_get_product_list_returns_correct_data_for_second_page(db, api_client_product):
    page_size = ProductPagination.page_size
    url = reverse('productall-list') + '?page=2'
    response = api_client_product.get(url)
    assert response.status_code == 200
    response_data = response.data
    assert len(response_data['result']) == min(
        page_size, response_data['count'] - page_size)
    assert response_data['links']['next'] is None
    assert response_data['links'][
        'previous'] == f'http://testserver{reverse("productall-list")}'
    assert response_data['page'] == 2
    assert response_data['pages'] == (
        Product.objects.count() - 1) // page_size + 1
    assert response_data['count'] == Product.objects.count()
    for product_data in response_data['result']:
        assert set(product_data.keys()) == {
            'id', 'old_price', 'quantity', 'brand', 'title', 'photo', 'price'}
        product = Product.objects.get(pk=product_data['id'])
        assert product_data['title'] == product.title
        assert product_data['brand']['title'] == product.brand.title
        assert product_data['price'] == str(product.price)
        assert product_data['old_price'] == str(product.old_price)
        assert product_data['quantity'] == product.quantity


def test_productdetail_returns_correct_data_for_all_products(db, api_client_product):
    products = Product.objects.all()
    # pytest.set_trace()
    for product in products:
        url = reverse('productdetail-detail', kwargs={'pk': product.id})
        response = api_client_product.get(url)
        assert response.status_code == 200
        response_data = response.data
        assert response_data['id'] == product.id
        assert response_data['title'] == product.title
        assert response_data['price'] == str(product.price)
        assert response_data['old_price'] == str(product.old_price)
        assert response_data['quantity'] == product.quantity
        assert response_data['brand']['title'] == product.brand.title
        assert response_data['description'] == product.description
        s3_endpoint_url = os.getenv('AWS_S3_ENDPOINT_URL')
        if not product.photo:
            assert response_data['photo'] in 'http://testserver/media/images/noimages.jpg'
        else:
            assert response_data['photo'].startswith(
                s3_endpoint_url + 'tests/media/nike-test.jpg')


def test_category_list(db, api_client_category):
    url = reverse('сategorylist-list')
    response = api_client_category.get(url)
    assert response.status_code == 200
    assert len(response.data) == Category.objects.filter(
        is_active=True).count()
    categories = Category.objects.filter(
        is_active=True).values('id', 'title', 'is_active')
    assert response.data == list(categories)
    assert len(response.data) == Category.objects.filter(
        is_active=True).count()


def test_brand_list(db, api_client_brand):
    url = reverse('brandsall-list')
    response = api_client_brand.get(url)
    assert response.status_code == 200
    assert len(response.data) == Brand.objects.count()
    brands = Brand.objects.values('id', 'title')
    assert response.data == list(brands)
    assert len(response.data) == Brand.objects.count()
