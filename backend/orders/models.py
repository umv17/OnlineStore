from django.db import models
from customers.models import Customer, CustomerAddress
from products.models import Product


class Order(models.Model):
    time_created = models.DateTimeField(auto_now_add=True,)
    time_checkout = models.DateTimeField(null=True, blank=True, )
    time_delivery = models.DateTimeField(null=True, blank=True, )
    customer = models.ForeignKey(
        Customer, null=True, blank=True,  on_delete=models.SET_NULL)
    customer_shipping_address = models.ForeignKey(
        CustomerAddress, null=True, blank=True, on_delete=models.SET_NULL, related_name='orders')
    is_ordered = models.BooleanField(verbose_name='Is Ordered', default=False)

    class Meta:
        db_table = 'orders'
        verbose_name = 'Order'
        verbose_name_plural = 'Orders'

    def __str__(self):
        return f'{self.time_created}'

    def get_products(self):
        return self.orderproduct_set.select_related('product').all()


class OrderProduct(models.Model):
    order = models.ForeignKey(
        Order, null=True, blank=True, on_delete=models.SET_NULL)
    product = models.ForeignKey(
        Product, null=True, blank=True, on_delete=models.SET_NULL)
    price = models.DecimalField(
        default=0, max_digits=9, decimal_places=2, null=False, blank=False,)
    quantity = models.PositiveIntegerField(default=0,)

    class Meta:
        db_table = 'orders_products'
        verbose_name = 'Order product'
        verbose_name_plural = 'Orders products'

    def __str__(self):
        return f'{self.order}-{self.product}'
