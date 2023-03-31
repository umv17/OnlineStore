from rest_framework import serializers
from .models import Customer, CustomerAddress
from orders.models import Order, OrderProduct
from django.contrib.auth import get_user_model
import uuid

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'password',
                  'first_name', 'last_name', 'email')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ('id', 'city', 'address', 'post_code')


class OrderProductSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(
        source='product.title', read_only=True)

    class Meta:
        model = OrderProduct
        fields = ('product_id', 'order_id', 'price',
                  'quantity', 'product_title')


class CustomerOrderSerializer(serializers.ModelSerializer):
    customer = serializers.StringRelatedField()
    customer_shipping_address = serializers.StringRelatedField()
    products = OrderProductSerializer(
        many=True, source='get_products', read_only=True)

    class Meta:
        model = Order
        fields = ('id', 'time_created', 'time_checkout', 'time_delivery',
                  'customer', 'customer_shipping_address', 'is_ordered', 'products')


class CustomerSerializer(serializers.ModelSerializer):
    # user = UserSerializer(read_only=True)
    # user = serializers.StringRelatedField(read_only=True)
    username = serializers.ReadOnlyField(source='user.username')
    addresses = CustomerAddressSerializer(many=True, read_only=True)

    class Meta:
        model = Customer
        # fields = ('id', 'first_name', 'last_name', 'email',
        #           'phone', 'time_created', 'token', 'user', 'addresses', 'username')
        fields = ('id', 'first_name', 'last_name',
                  'email', 'username', 'addresses')

    def to_internal_value(self, data):
        internal_data = super().to_internal_value(data)
        if data.get('username') and data.get('password'):
            user_data = {
                'username': data.get('username'),
                'password': data.get('password'),
                'first_name': data.get('first_name'),
                'last_name': data.get('last_name'),
                'email': data.get('email')
            }
            internal_data['user'] = user_data
        internal_data['token'] = uuid.uuid4()
        return internal_data

    def create(self, validated_data):
        user_data = validated_data.pop('user', {})
        if user_data.get('username'):
            user_serializer = UserSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()
                validated_data['user'] = user
            else:
                raise serializers.ValidationError(user_serializer.errors)
        return super().create(validated_data)
