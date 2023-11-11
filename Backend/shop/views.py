from django.shortcuts import render
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser

from user_api.models import CustomUser
from .models import Product, Category
from .serializers import ProductSerializer
from .permissions import IsAdminOrReadOnly, IsOwnerOrReadOnly


def index(request):
    products = Product.objects.all().order_by('-created_at')[:4]
    return render(request, 'shop/index.html', {'products': products})


def add_product(request):
    return render(request, 'shop/addproduct.html')


def item(request, product_id):
    product = Product.objects.get(id=product_id)
    user = CustomUser.objects.get(id=product.user.id)
    return render(request, 'shop/item.html', {'product': product, 'user': user})


class ProductApiList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        queryset = Product.objects.all()й
        name = self.request.query_params.get('title')
        if name:
            queryset = queryset.filter(title__icontains=name)
        return queryset


class ProductApiUpdate(generics.RetrieveUpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsOwnerOrReadOnly,)


class ProductApiDestroy(generics.RetrieveDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = (IsOwnerOrReadOnly,)
