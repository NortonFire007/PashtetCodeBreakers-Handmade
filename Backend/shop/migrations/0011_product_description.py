# Generated by Django 4.2.5 on 2023-11-02 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0010_alter_product_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='description',
            field=models.TextField(default='', max_length=1024),
            preserve_default=False,
        ),
    ]