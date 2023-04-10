from django.utils.decorators import method_decorator
from .serializers import CustomerSerializer, CustomerAddressSerializer, CustomerOrderSerializer
from .models import Customer, CustomerAddress
from rest_framework.response import Response
from .middleware import RequestLoggingMiddleware
from .mixins import CustomGenericViewSet, CustomCreateUpdateAPIView
from django.shortcuts import get_object_or_404
from orders.models import Order
from rest_framework import status


class CustomerCreate(CustomCreateUpdateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

    @method_decorator(RequestLoggingMiddleware)
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(
            data=request.data, context={'request': request})

        if serializer.is_valid():
            customer = serializer.save()
            if request.resolver_match.url_name == 'customercreate-list':
                response_data = {'status': True,
                                 'customer_token': str(customer.token)}
            else:
                response_data = serializer.data
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerViewSet(CustomGenericViewSet):
    serializer_class = CustomerSerializer

    def get_queryset(self):
        return Customer.objects.filter(user=self.request.user)


class CustomerAddressViewSet(CustomGenericViewSet):
    serializer_class = CustomerAddressSerializer

    def get_queryset(self):
        return CustomerAddress.objects.filter(customer__user=self.request.user)

    def perform_create(self, serializer):
        customer = get_object_or_404(Customer, user=self.request.user)
        serializer.save(customer=customer)


class CustomerOrder(CustomGenericViewSet):
    serializer_class = CustomerOrderSerializer

    def get_queryset(self):
        return Order.objects.filter(customer__user=self.request.user)


class GetAuthCustomer(CustomGenericViewSet):
    serializer_class = CustomerSerializer

    def get_object(self):
        customer = get_object_or_404(Customer, user=self.request.user)
        return customer
