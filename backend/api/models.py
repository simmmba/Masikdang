from django.utils import timezone
from django.db import models


class Store(models.Model):
    id = models.AutoField(primary_key=True)
    store_name = models.CharField(max_length=50)
    branch = models.CharField(max_length=50, null=True)
    area = models.CharField(max_length=50, null=True)
    tel = models.CharField(max_length=20, null=True)
    address = models.CharField(max_length=200, null=True)
    latitude = models.FloatField(max_length=10, null=True)
    longitude = models.FloatField(max_length=10, null=True)
    category = models.CharField(max_length=200, null=True)

    @property
    def category_list(self):
        return self.category.split("|") if self.category else []


class Review(models.Model):
    id = models.IntegerField(primary_key=True)
    store = models.IntegerField(null=True)
    user = models.IntegerField(null=True)
    score = models.IntegerField(null=True)
    content = models.CharField(max_length=500, null=True)
    reg_time = models.CharField(max_length=200, null=True)


# class Menu(models.Model):
#     store = models.IntegerField(max_length=50)
#     menu = models.CharField(max_length=20, null=True)
#     price = models.IntegerField(max_length=50, null=True)

class User(models.Model):
    id = models.AutoField(primary_key=True)
    provider = models.CharField(null=True,max_length=20)
    api_id = models.CharField(unique=True,null=True,max_length=30)
    nickname = models.CharField(unique=True,max_length=20)
    age = models.IntegerField(null=True)
    gender = models.CharField(null=True,max_length=10)
