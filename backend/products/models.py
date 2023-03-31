from django.db import models
from django.conf import settings
from django.db import models


class BaseModel(models.Model):
    title = models.CharField(max_length=200, blank=False, null=False,)

    class Meta:
        abstract = True

    def __str__(self):
        return self.title


class Brand(BaseModel):

    class Meta:
        db_table = 'brands'
        verbose_name = 'Brand'
        verbose_name_plural = 'Brands'


class Category(BaseModel):
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'categories'
        verbose_name = 'Сategory'
        verbose_name_plural = 'Categories'


class Product(BaseModel):
    price = models.DecimalField(
        default=0, max_digits=9, decimal_places=2, blank=False, null=False, )
    old_price = models.DecimalField(
        default=0, max_digits=9, decimal_places=2, blank=False, null=False, )
    quantity = models.IntegerField(default=0, blank=False, null=False,)
    brand = models.ForeignKey(
        Brand, blank=True, null=True, on_delete=models.SET_NULL)
    description = models.TextField(max_length=2000,)
    photo = models.ImageField(
        upload_to='media/',
        verbose_name='Picture',
        blank=True,
        null=True
    )

    def __str__(self):
        return f'{self.id} - {self.title}'

    class Meta:
        ordering = ['id']
        db_table = 'products'
        verbose_name = 'Product'
        verbose_name_plural = 'Products'


class ProductCategory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    category = models.ForeignKey(
        Category, related_name='category_products', on_delete=models.CASCADE)

    class Meta:
        db_table = 'products_categories'
        verbose_name = 'Product category'
        verbose_name_plural = 'Products categories'

    def __str__(self):
        return f'{self.product}'


class ProductReview(models.Model):
    product = models.ForeignKey(
        Product, blank=True, null=True,  on_delete=models.SET_NULL, related_name='reviews')
    review = models.TextField(max_length=2000,)

    class Meta:
        db_table = 'products_reviews'
        verbose_name = 'Product review'
        verbose_name_plural = 'Products reviews'

    def __str__(self):
        return self.review
