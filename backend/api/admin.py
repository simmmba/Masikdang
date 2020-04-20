from django.contrib import admin

# Register your models here.

from .models import Store,User

admin.site.register(Store)
admin.site.register(User)