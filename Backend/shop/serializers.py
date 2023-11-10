from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer

from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    image = VersatileImageFieldSerializer(
        sizes=[
            ('main_size', 'thumbnail__500x500'),
        ]
    )

    class Meta:
        model = ProductImage
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    images = ProductImageSerializer(source='productimage_set', many=True)

    class Meta:
        model = Product
        fields = ['title', 'description', 'image', 'images', 'price', 'category_id', 'user']
