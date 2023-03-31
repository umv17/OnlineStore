from django.contrib.sites.shortcuts import get_current_site
from rest_framework import serializers
from .models import Brand, Category, Product, ProductCategory, ProductReview
from django.contrib.sites.shortcuts import get_current_site


class PhotoField(serializers.RelatedField):
    def to_representation(self, value):
        request = self.context.get('request')
        current_site = get_current_site(request)
        server_address = f'{request.scheme}://{current_site.domain}'
        return value.url if value else server_address + '/media/images/noimages.jpg'


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ('id', 'title')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title', 'is_active')


class ProductReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductReview
        fields = ('id', 'product', 'review')


class ProductSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(many=False, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    photo = PhotoField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'price', 'old_price',
                  'quantity', 'brand', 'description', 'photo', 'reviews')


class ProductListSerializer(serializers.ModelSerializer):
    brand = BrandSerializer()
    photo = PhotoField(read_only=True)

    class Meta:
        model = Product
        fields = ('id', 'title', 'price', 'old_price',
                  'quantity', 'brand', 'photo',)


class ProductCategorySerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    category = CategorySerializer()

    class Meta:
        model = ProductCategory
        fields = ('id', 'product', 'category')
