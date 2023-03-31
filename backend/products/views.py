from rest_framework import filters
from .filters import ProductFilter
from .serializers import *
from .models import Brand, Category, Product
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .pagination import ProductPagination


class ProductList(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    filter_backends = (DjangoFilterBackend, filters.SearchFilter,)
    search_fields = ('title', 'brand__title')
    ordering_fields = ('title', 'price')
    filterset_class = ProductFilter
    pagination_class = ProductPagination

    def get_serializer_class(self):
        if self.action == 'list':
            return ProductListSerializer
        return ProductSerializer


class CategoryList(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer


class BrandList(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
