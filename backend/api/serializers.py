from .models import Store,User,Review,Bhour, Menu
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

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class BHourSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bhour
        fields = '__all__'

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = '__all__'