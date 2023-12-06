from django.db import models
from django.utils import timezone
from versatileimagefield.fields import VersatileImageField

from user_api.models import CustomUser


class Category(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=timezone.now)
    bg_image = models.ImageField(upload_to='category_images')

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=1024)
    created_at = models.DateTimeField(default=timezone.now)
    price = models.IntegerField(default=0)
    price_zsu = models.IntegerField(default=0)
    reviews_qty = models.IntegerField(default=0)
    image = VersatileImageField(upload_to='product_images/main_images')
    rating = models.FloatField(default=0)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, verbose_name='Пользователь', on_delete=models.CASCADE)

    def update_rating(self):
        product_comments = ProductComment.objects.filter(product=self.pk)

        if product_comments:
            total_grade = sum(comment.grade for comment in product_comments)
            average_rating = round(total_grade / len(product_comments), 1)
            self.rating = average_rating
            self.save()

    def __str__(self):
        return self.title


class Favourites(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.product.title


class ProductComment(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    title = models.TextField(max_length=1024)
    grade = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class ProfileComment(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    title = models.TextField(max_length=1024)
    grade = models.IntegerField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class ProductImage(models.Model):
    title = models.CharField(max_length=64)
    image = VersatileImageField(upload_to='product_images')
    product = models.ForeignKey('Product', on_delete=models.CASCADE)
