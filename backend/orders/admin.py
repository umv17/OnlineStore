from django.contrib import admin
from .models import *
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'time_created', 'time_checkout',
                    'time_delivery', 'customer', 'customer_shipping_address',  'is_ordered', 'count_items', ]
    search_fields = ['order__first_name', 'order__last_name', 'time_created', ]

    def count_items(self, obj):
        count = obj.orderproduct_set.count()
        url = (
            reverse("admin:orders_orderproduct_changelist")
            + "?"
            + urlencode({"order__id": f"{obj.id}"})
        )
        title = 'item' if count == 1 or count == 0 else 'items'
        return format_html('<a href="{}">{} {}</a>', url, count, title)

    count_items.short_description = "Number of Items"


@admin.register(OrderProduct)
class OrderProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'order_id', 'product_id', 'price', 'quantity', ]
    search_fields = ['order_id', 'product_id']
