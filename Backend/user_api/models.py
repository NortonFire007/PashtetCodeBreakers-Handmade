from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    city = models.CharField(max_length=64, default='Київ')
    phone_number = models.CharField(max_length=13)
