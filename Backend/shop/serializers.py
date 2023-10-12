from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Product
        fields = ('title', 'price', 'category_id', 'reviews_qty', 'is_favorite', 'user')

# class ProductSerializer(serializers.Serializer)
# title = serializers.CharField(max_length=255)
# created_at = serializers.DateTimeField()
# price = serializers.FloatField()
# is_favorite = serializers.BooleanField()
# reviews_qty = serializers.IntegerField()
# category_name = serializers.CharField()

# def create(self, validated_data):
#     return Product.objects.create(**validated_data)
#
# def update(self, instance, validated_data):
#     instance.title = validated_data.get('title', instance.title)
#     instance.price = validated_data.get('price', instance.price)
#     instance.is_favorite = validated_data.get('is_favorite', instance.is_favorite)
#     instance.reviews_qty = validated_data.get('reviews_qty', instance.reviews_qty)
#     # instance.category_name = validated_data.get('category_name', instance.category_name)
#     instance.save()
#     return instance
