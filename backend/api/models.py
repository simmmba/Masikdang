# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Bhour(models.Model):
    store = models.ForeignKey('Store', models.DO_NOTHING)
    type = models.IntegerField(blank=True, null=True)
    week_type = models.IntegerField(blank=True, null=True)
    mon = models.IntegerField(blank=True, null=True)
    tue = models.IntegerField(blank=True, null=True)
    wed = models.IntegerField(blank=True, null=True)
    thu = models.IntegerField(blank=True, null=True)
    fri = models.IntegerField(blank=True, null=True)
    sat = models.IntegerField(blank=True, null=True)
    sun = models.IntegerField(blank=True, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)
    etc = models.CharField(max_length=100, blank=True, null=True)




class Favorite(models.Model):
    store = models.ForeignKey('Store', models.DO_NOTHING)
    user = models.ForeignKey('User', models.DO_NOTHING)




class Like(models.Model):
    store = models.ForeignKey('Store', models.DO_NOTHING)
    user = models.ForeignKey('User', models.DO_NOTHING)



class Menu(models.Model):
    store = models.ForeignKey('Store', models.DO_NOTHING)
    menu = models.CharField(max_length=45, blank=True, null=True)
    price = models.IntegerField(blank=True, null=True)




class Review(models.Model):
    user = models.ForeignKey('User', models.DO_NOTHING)
    store = models.ForeignKey('Store', models.DO_NOTHING)
    total_score = models.FloatField(blank=True, null=True)
    taste_score = models.FloatField(blank=True, null=True)
    price_score = models.FloatField(blank=True, null=True)
    service_score = models.FloatField(blank=True, null=True)
    content = models.CharField(max_length=500, blank=True, null=True)
    img = models.CharField(max_length=500, blank=True, null=True)
    tag = models.CharField(max_length=45, blank=True, null=True)
    reg_time = models.CharField(max_length=50, blank=True, null=True)




class Store(models.Model):
    id = models.IntegerField(primary_key=True)
    store_name = models.CharField(max_length=50)
    branch = models.CharField(max_length=50, blank=True, null=True)
    area = models.CharField(max_length=50, blank=True, null=True)
    tel = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    category = models.CharField(max_length=200, blank=True, null=True)
    amentity = models.CharField(max_length=100, blank=True, null=True)
    total_score = models.FloatField(blank=True, null=True)
    taste_score = models.FloatField(blank=True, null=True)
    price_score = models.FloatField(blank=True, null=True)
    service_score = models.FloatField(blank=True, null=True)
    purpose = models.CharField(max_length=45, blank=True, null=True)
    mood = models.CharField(max_length=45, blank=True, null=True)


class Tag(models.Model):
    store = models.ForeignKey('Store', models.DO_NOTHING)
    tag = models.CharField(max_length=45, blank=True, null=True)



class User(models.Model):
    provider = models.CharField(max_length=20, blank=True, null=True)
    _id = models.CharField(unique=True, max_length=30, blank=True, null=True)
    nickname = models.CharField(unique=True, max_length=20)
    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)



