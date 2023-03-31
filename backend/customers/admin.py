from django.contrib import admin
from .models import *
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email',
                    'phone', 'time_created', 'token', 'user', 'count_orders']
    search_fields = ['first_name', 'last_name', ]
    list_display_links = ['id', 'first_name', 'last_name', ]
    list_filter = ['first_name', 'last_name', 'user', 'email', ]

    def count_orders(self, obj):
        count = obj.order_set.count()
        url = (
            reverse('admin:orders_order_changelist')
            + '?'
            + urlencode({'customer__id': f'{obj.id}'})
        )
        return format_html('<a href="{}">{} Orders</a>', url, count)

    count_orders.short_description = 'Number of orders'


@admin.register(CustomerAddress)
class CustomerAddressAdmin(admin.ModelAdmin):
    list_display = ['city', 'address', 'post_code', 'customer', ]
    search_fields = ['city', 'address', 'post_code', ]
