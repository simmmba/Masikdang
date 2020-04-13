from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Store,User

admin.site.register(Store)
admin.site.register(User)
