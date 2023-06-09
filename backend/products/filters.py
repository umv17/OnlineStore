import django_filters
from .models import Product
# , ProductCategory


class ProductFilter(django_filters.rest_framework.FilterSet):
    min_price = django_filters.NumberFilter(
        field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(
        field_name='price', lookup_expr='lte')
    brand = django_filters.CharFilter(
        field_name='brand__title', lookup_expr='contains')
    title = django_filters.CharFilter(
        field_name='title', lookup_expr='contains')
    brand_id = django_filters.NumberFilter(
        field_name='brand_id', lookup_expr='exact')
    category_id = django_filters.NumberFilter(
        field_name='productcategory__category__id', lookup_expr='exact')

    class Meta:
        model = Product
        fields = ('min_price', 'max_price', 'brand',
                  'title', 'brand_id', 'category_id')
