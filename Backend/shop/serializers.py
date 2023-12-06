from rest_framework import serializers
from versatileimagefield.serializers import VersatileImageFieldSerializer
from django.db import models
from .models import Product, ProductImage, Category, Favourites, ProductComment


class ProductImageSerializer(serializers.ModelSerializer):
    # image: list[str] = models.CharField()

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
    images = ProductImageSerializer(source='productimage_set', many=True, read_only=True)

    class Meta:
        model = Product
        fields = ('title', 'description', 'image', 'images', 'price', 'price_zsu', 'category', 'user')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title')


class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourites
        fields = ['product', 'user']


class ProductCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductComment
        fields = ['title', 'grade', 'product', 'user']

    def create(self, validated_data):
        product_comment = super().create(validated_data)
        product = product_comment.product
        product.reviews_qty += 1
        product.update_rating()
        return product_comment
