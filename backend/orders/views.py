from datetime import datetime
from django.db.models import Sum
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework import status, generics
from rest_framework.mixins import DestroyModelMixin, UpdateModelMixin, RetrieveModelMixin, CreateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet
from customers.models import Customer, CustomerAddress
from orders.models import Order, OrderProduct
from orders.serializers import OrderProductSerializer
from orders.serializers import OrderSerializer
from products.models import Product


class RequiredFieldsMixin:
    required_fields = []

    def check_required_fields(self, data):
        missing_params = [
            param for param in self.required_fields if param not in data]
        if missing_params:
            raise serializers.ValidationError(
                f'Missing required parameters: {", ".join(missing_params)}')


class UpdateCart(APIView, DestroyModelMixin, UpdateModelMixin, RetrieveModelMixin, RequiredFieldsMixin):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer
    required_fields = ['token', 'product_id', 'quantity']

    def post(self, request):
        self.check_required_fields(request.data)
        customer = get_object_or_404(Customer, token=request.data['token'])
        product = get_object_or_404(
            Product, pk=request.data['product_id'])

        quantity = int(request.data.get('quantity', 1))
        if product.quantity < quantity:
            return Response(data={'status': False, 'error': f'Product "{product.title}" is out of stock.'},
                            status=status.HTTP_400_BAD_REQUEST)

        order, order_created = Order.objects.get_or_create(
            customer=customer, is_ordered=False)

        product_order, product_order_created = OrderProduct.objects.get_or_create(
            product=product, order=order)

        if quantity == 0:
            self.perform_destroy(product_order)
        else:
            product_order.price = product.price
            if product_order_created:
                product_order.quantity = quantity
            else:
                product_order.quantity += quantity
            self.perform_update(product_order)
        count_items = OrderProduct.objects.filter(order=order).aggregate(
            total_quantity=Sum('quantity'))['total_quantity'] or 0
        response = {
            'status': True,
            'cart_item_count': count_items
        }
        return Response(data=response, status=status.HTTP_200_OK)


class OrderProductList(generics.ListAPIView):
    queryset = OrderProduct.objects.all()
    serializer_class = OrderProductSerializer


class OrderList(generics.ListAPIView):
    serializer_class = OrderProductSerializer

    def get_queryset(self):
        customer = get_object_or_404(
            Customer, token=self.kwargs['customer_token'])
        return OrderProduct.objects.filter(order__customer=customer, order__is_ordered=False)


class OrderFinalize(CreateModelMixin, GenericViewSet, RequiredFieldsMixin):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()
    required_fields = ['token', 'country', 'city', 'post_code', 'address']

    def create(self, request, *args, **kwargs):
        self.check_required_fields(request.data)

        try:
            customer = Customer.objects.get(token=request.data['token'])
        except Customer.DoesNotExist:
            return Response({
                'message': 'Customer not found'
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            order = Order.objects.filter(
                customer=customer, is_ordered=False).latest('id')
        except Order.DoesNotExist:
            return Response({
                'message': 'No pending order found for this customer'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(
            order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        customer.first_name = request.data.get(
            'first_name', customer.first_name)
        customer.last_name = request.data.get('last_name', customer.last_name)
        customer.email = request.data.get('email', customer.email)
        customer.phone = request.data.get('phone', customer.phone)
        customer.save()

        country = self.request.data.get('country')
        city = self.request.data.get('city')
        post_code = self.request.data.get('post_code')
        address = self.request.data.get('address')

        if '' in [country, city, post_code, address]:
            return Response({'error': 'All address fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

        address, _ = CustomerAddress.objects.get_or_create(
            customer=customer,
            country=country,
            city=city,
            post_code=post_code,
            address=address
        )
        order.customer_shipping_address = address
        order.is_ordered = True
        order.time_checkout = datetime.now()
        order.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
