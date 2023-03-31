import warnings
import pytest
from django.conf import settings
from customers.models import Customer, CustomerAddress
from orders.models import *
from products.models import *
from django.core.management import call_command
from django.core.files.uploadedfile import SimpleUploadedFile

settings.USE_L10N = False
warnings.filterwarnings(action='ignore')


@pytest.fixture
def db(request, django_db_setup, django_db_blocker):
    django_db_blocker.unblock()
    call_command(
        'loaddata',
        'tests/fixtures/customers.json',
        'tests/fixtures/brands.json',
        'tests/fixtures/categories.json',
        'tests/fixtures/customeraddress.json',
        'tests/fixtures/products.json',
        'tests/fixtures/productreviews.json',
        'tests/fixtures/orders.json',
        'tests/fixtures/orderproducts.json',
        verbosity=0)
    photo_content = b'file_content'
    photo_name = 'nike-test.jpg'
    photo = SimpleUploadedFile(
        photo_name, photo_content, content_type='image/jpeg')
    Product.objects.create(
        title='Nike Air Zoom Pegasus 38',
        price=120,
        old_price=0,
        quantity=1000,
        brand_id=1,
        description='The Nike Air Zoom Pegasus 38 is a reliable and comfortable running shoe.',
        photo=photo
    )


@pytest.fixture
def myfixture(db):
    assert Customer.objects.count() > 0
    assert Brand.objects.count() > 0
    assert Category.objects.count() > 0
    assert CustomerAddress.objects.count() > 0
    assert ProductReview.objects.count() > 0
    assert Product.objects.count() > 0
    assert Order.objects.count() > 0
    assert OrderProduct.objects.count() > 0
