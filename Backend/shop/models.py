from django.db import models
from django.utils.timezone import now
from user_api.models import CustomUser


class Category(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=now())

    def __str__(self):
        return self.title


class Comment(models.Model):
    created_at = models.DateTimeField(default=now())
    title = models.CharField(max_length=1024)
    grade = models.IntegerField()

    def __str__(self):
        return self.grade


class Product(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(default=now())
    price = models.FloatField()
    is_favorite = models.BooleanField(default=False)
    reviews_qty = models.IntegerField(default=0)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(CustomUser, verbose_name='Пользователь', on_delete=models.CASCADE)

    # comment

    def __str__(self):
        return self.title
