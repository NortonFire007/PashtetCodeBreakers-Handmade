# Generated by Django 4.2.5 on 2023-11-11 09:02

from django.db import migrations
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0005_alter_customuser_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='profile_img',
            field=versatileimagefield.fields.VersatileImageField(default='', upload_to='user_profile_img'),
            preserve_default=False,
        ),
    ]
