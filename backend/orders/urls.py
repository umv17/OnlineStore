from django.urls import path
from .views import *

urlpatterns = [
    path('all/', OrderList.as_view(), name='orderlist'),
    path('cart/update/',
         UpdateCart.as_view(), name='updatecart'),
    path('cart/list/<slug:customer_token>/',
         OrderList.as_view(), name='customer_orderlist'),
    path('finalize/', OrderFinalize.as_view(
        {'put': 'update'}), name='orderfinalize'),

]
