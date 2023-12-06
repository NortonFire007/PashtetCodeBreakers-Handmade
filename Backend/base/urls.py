"""
URL configuration for base project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenVerifyView, TokenRefreshView, TokenObtainPairView
from user_api.views import reg_view, logout_view
from shop.views import ProductApiList, ProductApiUpdate, ProductApiDestroy, ProductCommentCreateView, index, \
    add_product, item, CategoryViewSet, paginate_data, categories, register, login, favourite, FavouritesApiList, \
    seller_page, userEdit, search
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('', index, name='home'),
    path('login', login, name='login'),
    path('favorite', favourite, name='favourite'),
    path('editprofile', userEdit, name='edituser'),
    path('register', register, name='register'),
    path('user/<int:user_id>/', seller_page, name='seller_page'),
    path('api/v1/cat', CategoryViewSet.as_view({'get': 'list'}), name='cat'),
    path('search/', search, name='search'),
    path('add_product', add_product, name='add_product'),
    path('admin/', admin.site.urls),
    path('cat/<int:cat_id>/', categories, name='categories'),
    path('item/<int:product_id>/', item, name='item_detail'),
    path('api/v1/comments/', ProductCommentCreateView.as_view(), name='product_comment_create'),
    path('api/v1/product/favorites', FavouritesApiList.as_view(), name='favourite'),
    path('api/v1/', login, name='home'),
    path('api/v1/product/', ProductApiList.as_view()),
    path('api/v1/product/<int:pk>/', ProductApiUpdate.as_view()),
    path('api/v1/product_delete/<int:pk>/', ProductApiDestroy.as_view()),
    path('api/v1/auth/reg/', reg_view),
    path('api/v1/auth/log/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/logout/', logout_view),
    path('api/v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/paginated-data/', paginate_data, name='paginated_data'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
