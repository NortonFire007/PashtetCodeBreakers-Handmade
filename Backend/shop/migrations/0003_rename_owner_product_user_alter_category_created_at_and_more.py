# Generated by Django 4.2.5 on 2023-10-12 11:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_product_owner_alter_category_created_at_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='owner',
            new_name='user',
        ),
        migrations.AlterField(
            model_name='category',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 12, 11, 50, 14, 225728, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='comment',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 12, 11, 50, 14, 225728, tzinfo=datetime.timezone.utc)),
        ),
        migrations.AlterField(
            model_name='product',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2023, 10, 12, 11, 50, 14, 225728, tzinfo=datetime.timezone.utc)),
        ),
    ]
