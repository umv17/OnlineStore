from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Customer(models.Model):
    first_name = models.CharField(max_length=30, null=True, blank=True,)
    last_name = models.CharField(max_length=30, null=True, blank=True,)
    email = models.EmailField(unique=False, null=True, blank=True,)
    phone = models.CharField(max_length=20, null=True, blank=True,
                             help_text='Contact phone number')
    time_created = models.DateTimeField(auto_now_add=True)
    token = models.UUIDField(
        max_length=36, editable=False, unique=True, null=False, blank=False,)
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL,)

    class Meta:
        db_table = 'customers'
        verbose_name = 'Customer'
        verbose_name_plural = 'Customers'

    def __str__(self):
        full_name = f'{self.first_name} {self.last_name}'
        full_name = ' '.join(full_name.split())
        return full_name


class CustomerAddress(models.Model):
    city = models.CharField(max_length=100, null=False)
    address = models.CharField(max_length=300, null=False)
    post_code = models.CharField(max_length=20, null=False)
    customer = models.ForeignKey(
        Customer, null=True, blank=True, on_delete=models.CASCADE, related_name='addresses')
    country = models.CharField(
        max_length=100, null=False, default='United States', verbose_name='Country')
    state = models.CharField(max_length=100, null=False, default='')

    class Meta:
        db_table = 'customer_addresses'
        verbose_name = 'Customer address'
        verbose_name_plural = 'Customer addresses'

    def __str__(self):
        return f'{self.city}, {self.address}, {self.post_code}'
