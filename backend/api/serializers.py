from .models import Store,User
from rest_framework import serializers


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        # fields = [
        #     "id",
        #     "store_name",
        #     "branch",
        #     "area",
        #     "tel",
        #     "address",
        #     "latitude",
        #     "longitude",
        #     "category_list",
        # ]
        fields='__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


