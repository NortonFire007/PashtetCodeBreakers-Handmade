from django.db import models
from django.utils import timezone
from user_api.models import CustomUser
from versatileimagefield.fields import VersatileImageField


class Category(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=1024)
    created_at = models.DateTimeField(default=timezone.now)
    price = models.IntegerField()
    reviews_qty = models.IntegerField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, verbose_name='Пользователь', on_delete=models.CASCADE)
    image = VersatileImageField(upload_to='product_images/main_images')

    def __str__(self):
        return self.title


class Favourites(models.Model):
    is_favourite = models.BooleanField(default=False)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class ViewedProduct(models.Model):
    viewed_at = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Comment(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    title = models.TextField(max_length=1024)
    grade = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return self.grade


class ProductImage(models.Model):
    title = models.CharField(max_length=64)
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
    image = VersatileImageField(upload_to='product_images')
