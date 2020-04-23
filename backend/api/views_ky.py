from .models import User, Store, Review, Review_img, Tag, Menu, Bhour, Amenity
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


class StoreSearch(APIView):
    # Store 검색을 위한 클래스
    '''
    # Store 검색
    '''

    def get(self, request, word, format=None):
        word = word.split(" ")

        used = set()
        tag_list = set()
        tag = Tag.objects.all()
        for w in word:
            for t in tag:
                if w in t.tag:
                    tag_list.add(t.store_id)
                    used.add(w)

        amenity_list = set()
        amenity = Amenity.objects.all()
        for w in word:
            for a in amenity:
                if w in a.amenity:
                    amenity_list.add(a.store_id)
                    used.add(w)

        tmp_list = list(tag_list | amenity_list)
        store1 = Store.objects.all().filter(id__in=tmp_list)

        for w in set(word) - set(used):
            store1 = store1.filter((
                Q(area__contains=w) | Q(address__contains=w)
                | Q(store_name__contains=w) | Q(category__contains=w)))

        store2 = Store.objects.all()
        for w in word:
            store2 = store2.filter((
                Q(area__contains=w) | Q(address__contains=w)
                | Q(store_name__contains=w) | Q(category__contains=w)))

        serializer = StoreSerializer(store1 | store2, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def SurveyType(request):
    if request.method == 'GET':
        print("get 시작")
        surveyArr = request.query_params.get("data", "")
        print(surveyArr)
        food_table = [["불고기", "간장게장", "닭볶음탕", "비빔밥", "잡채"],
                      ["스테이크", "감바스", "로스티드 터키", "시저샐러드", "햄버거"],
                      ["탕수육", "유산슬", "깐풍기", "어향가지", "잡탕밥"],
                      ["규카츠", "초밥", "오야꼬동", "야채고로케", "라멘"],
                      ["분짜", "푸팟뽕커리", "탄두리치킨", "월남쌈", "반미"],
                      ["순대", "어묵", "닭꼬치", "야채튀김", "김밥"],
                      ]

        adjective_table = ["레시피보고 만든", "엄마가 만들어 준", "둘이 먹다 셋이 죽는", "또 먹고 싶은",
                           "지옥에서 온", "눈물 젖은", "심혈을 기울여 만든", "죽기 전에 마지막으로 먹고 싶은",
                           "먹다 남긴", "줘도 안먹는", "실수로 소금을 쏟은", "까맣게 타버린",
                           "어쩌다 이렇게 된", "수줍게 선보인 나의", "혀 끝을 휘감는", "장인이 만든"]

        taste_table = ["쓴 맛 나는 ", "싱거운", "기름진", "촉촉한",
                       "짠", "달달한", "매콤한", "떫은",
                       "고소한", "새콤한", "칼칼한", "오묘한",
                       "맛없는", "맛있는", "눅눅한", "바삭한"]

        food = food_table[int(surveyArr[1])][int(surveyArr[4])]
        adjective = adjective_table[int(surveyArr[5:9], 2)]

        index = ""+ str(format(int(surveyArr[0]), 'b'))+ str(format(int(surveyArr[2]), 'b'))+ str(format(int(surveyArr[3]), 'b'))
        index = int(index, 2)
        taste = taste_table[index]

        ret = [adjective, taste, food]
        print(ret)
        return Response(ret)
