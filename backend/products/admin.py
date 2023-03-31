from django.contrib import admin
from .models import *
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'price', 'old_price',
                    'description', 'quantity', 'brand', 'show_categories', ]
    search_fields = ['title', 'description',
                     'brand__title', ]

    def show_categories(self, obj):
        return '\n'.join([str(a.category) for a in obj.productcategory_set.all()])
    show_categories.short_description = 'Category'


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ['id', 'title']
    search_fields = ['title', ]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'is_active', 'product_count', ]
    search_fields = ['title', ]
    list_filter = ['title', ]

    def product_count(self, obj):
        count = obj.productcategory_set.count()
        print(count)
        url = (
            reverse('admin:products_productcategory_changelist')
            + '?'
            + urlencode({'category__id': f'{obj.id}'})
        )
        return format_html('<a href="{}">{} Products</a>', url, count)
    product_count.short_description = "Number of products"


@admin.register(ProductCategory)
class ProductCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'category']
    search_fields = ['product__title', 'category__title']


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['id', 'review', 'product']
    search_fields = ['review', 'product__title', ]
