from rest_framework import routers
from .views import CustomerCreate, CustomerViewSet, CustomerAddressViewSet, CustomerOrder, GetAuthCustomer
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r'create', CustomerCreate, basename='customercreate')
router.register(r'list', CustomerViewSet, basename='customerslist')
router.register(r'address/list', CustomerAddressViewSet,
                basename='customeraddresslist')
router.register(r'myorders', CustomerOrder, basename='customerorder')
router.register(r'registration', CustomerCreate,
                basename='customerregistration')
router.register(r'getuser', GetAuthCustomer, basename='customergetuser')


urlpatterns = [
    path('', include(router.urls)),
]
