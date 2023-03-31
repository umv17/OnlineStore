from rest_framework import routers

from .views import ProductList, CategoryList, BrandList

router = routers.DefaultRouter()
router.register(r'all', ProductList, basename='productall')
router.register(r'get', ProductList, basename='productdetail')
router.register(r'category/list', CategoryList, basename='сategorylist')
router.register(r'brands/all', BrandList, basename='brandsall')

urlpatterns = router.urls
