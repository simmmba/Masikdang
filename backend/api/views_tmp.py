from .models import User, Store, Review, Review_img, Tag, Menu, Bhour
from .serializers import UserSerializer, StoreSerializer, ReviewSerializer, ReviewImgSerializer, TagSerializer, MenuSerializer, BhourSerializer
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.db.models import Q
from django.db.models import Avg
from django.db.models import Subquery
from django.db.models import functions


from rest_framework.decorators import api_view


from api import models, serializers
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

import json


class SmallPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


class StoreViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.StoreSerializer
    pagination_class = SmallPagination

    def get_queryset(self):
        name = self.request.query_params.get("name", "")
        queryset = (
            models.Store.objects.all().filter(store_name__contains=name).order_by("id")
        )
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        # name = self.request.query_params.get("name", "")
        queryset = models.User.objects.all().order_by("id")
        return queryset

    @action(detail=True, methods=['get'], url_path='test')
    def create_user(self, request, *args, **kwargs):
        serializer_class = serializers.UserSerializer
        queryset = models.User.objects.all().order_by("id")
        result = serializer_class(queryset, many=True)
        print(result.data)
        return Response(result.data)


class StoreDetailTest(APIView):
    # 특정 User 를 다루는 클래스

    # Store 조회
    def get(self, request,store_id, format=None):
        '''
        # Store 조회
        '''
        store = Store.objects.get(id=store_id)
        serializer = StoreSerializer(store)

        # 메뉴, 태그, 업무시간, 평점, 사진
        result = serializer.data
        menu = MenuSerializer(Menu.objects.filter(store_id=store_id), many=True).data
        result['menu'] = menu
        
        average = Review.objects.filter(store_id = store_id).aggregate(Avg('total_score'))['total_score__avg']
        result['avg_score'] = average
        
        tags = Tag.objects.filter(store_id = store_id).values_list('tag',flat=True)
        result['tags'] = tags

        bhour = BhourSerializer(Bhour.objects.filter(store_id=store_id), many=True).data
        result['bhour'] = bhour
        
        review_imgs = Review_img.objects.filter(review_id__store_id=store_id).values_list('img',flat=True)[:10]
        result['review_img'] = review_imgs
        return Response(result)