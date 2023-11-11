from django.db import models
from django.contrib.auth.models import AbstractUser
from versatileimagefield.fields import VersatileImageField


class CustomUser(AbstractUser):
    city = models.CharField(max_length=64, default='Київ')
    phone_number = models.CharField(max_length=13)
    profile_img = VersatileImageField(upload_to='user_profile_img')
