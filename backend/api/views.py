from rest_framework.decorators import api_view
from django.db.models import functions
from django.db.models import Subquery
from .models import User, Store, Review, Bhour, Menu, Tag
from .serializers import UserSerializer, StoreSerializer, ReviewSerializer, BHourSerializer, MenuSerializer
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

from api import models, serializers
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action


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

# Store


class StoreList(APIView):
    # Store list 생성

    def post(self, request, format=None):
        '''
        # Store List 생성
        '''
        serializer = StoreSerializer(data=request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # Store list 조회
    def get(self, request, format=None):
        '''
        # Store List 조회
        '''
        queryset = Store.objects.all()
        serializer = StoreSerializer(queryset, many=True)
        return Response(serializer.data)


class StoreDetail(APIView):
    # 특정 User 를 다루는 클래스
    # Store 생성
    def post(self, request, format=None):
        '''
        # Store 생성
        ## parameter
            body{
                store_name : String(50),
                branch : String(50),
                area : String(50),
                tel : String(50),
                address : String(200),
                latitude : Float(10),
                longitude : Float(10),
                category : String(200)
            }
        ---
        ## Response
            성공
            status : 201,
            실패
            status : 400,
        '''
        serializer = StoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # Store 조회
    def get(self, request, format=None):

        store_id = request.query_params.get("store_id", "")
        store = Store.objects.get(id=store_id)
        serializer = StoreSerializer(store)
        return Response(serializer.data)
    # Store 삭제

    def delete(self, request, format=None):
        store_id = request.query_params.get("store_id", "")
        store = Store.objects.get(id=store_id)
        store.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class StoreSearch(APIView):
    # Store 검색을 위한 클래스
    def get(self, request, format=None):
        subject = request.query_params.get("subject", "")
        word = request.query_params.get("word", "").split(" ")
        print(type(word))
        print(word)
        store = Store.objects.all()
        tag = Tag.objects.all()
        print(type(store))
        for w in word:
            print(w)
            store = store.filter((
                Q(area__contains=w) | Q(address__contains=w) | Q(store_name__contains=w)))

        # if subject == "name":
        #     queryset = Store.objects.filter(store_name__contains=word)
        # elif subject == "area":
        #     queryset = Store.objects.filter(
        #         Q(area__contains=word) | Q(address__contains=word))
        # elif subject == "category":
        #     queryset = Store.objects.filter(category__contains=word)
        serializer = StoreSerializer(store, many=True)
        return Response(serializer.data)

# User


class UserList(APIView):
    # User List 를 다루는 클래스
    # list 생성
    """
    user list 생성
    parameter : 
    body {

    }
    """

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    # list 조회
    def get(self, request, format=None):
        name = request.query_params.get("id", "")
        print(name)
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class UserDetail(APIView):
    # 특정 User 를 다루는 클래스

    # User 생성
    def post(self, request, format=None):
        # print(request.data)
        # print(request.data['user_id'])
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # User 조회

    def get(self, request, format=None):
        api_id = request.query_params.get("api_id", "")
        user = User.objects.get(api_id=api_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    # User 삭제

    def delete(self, request, format=None):
        api_id = request.query_params.get("api_id", "")
        user = User.objects.get(api_id=api_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # @action(detail=True, methods=['get'], url_path='dup_check')
    # def duplicate_check(self, request, format=None):
    #     user = User.objects.get(pk=id)
    #     serializer = UserSerializer(user)
    #     return Response(serializer.data)


class UserJoinCheck(APIView):
    # User 회원가입 여부를 확인하는 클래스
    # User 조회
    def get(self, request, format=None):
        api_id = request.query_params.get("api_id", "")
        provider = request.query_params.get("provider", "")
        is_exist = User.objects.filter(
            api_id=api_id, provider=provider).count()

        if is_exist == 0:
            return Response('NO')
        else:
            return Response('YES')


class NickDuplicateCheck(APIView):
    # User nickname 중복 여부를 확인하는 클래스
    def get(self, request, format=None):
        nickname = request.query_params.get("nickname", "")
        is_exist = User.objects.filter(nickname=nickname).count()

        if is_exist == 0:
            return Response('NO')
        else:
            return Response('YES')


# 음식 뭐먹을지 서베이 끝났을 때
@api_view(['GET', 'POST'])
def SurveySearch(request):
    print("searchpoll 시작")
    if request.method == 'GET':
        print("get 시작")
        surveyArr = request.data
        if(surveyArr[0] == "혼자"):
            survey01 = Review.objects.filter(
                content__contains="혼밥").only('store').all()
        else:
            survey01 = Review.objects.filter(Q(content__contains="단체") | Q(
                content__contains="회식")).only('store').all()

        if(surveyArr[1] == "여자"):
            survey02 = Review.objects.filter(
                id__in=survey01, tag__contains="여자").only('store').all()
        else:
            survey02 = survey01

        if(surveyArr[3] == "간식"):
            survey03 = Store.objects.filter(
                id__in=survey02, category__contains="카페").only('store').all()
        else:
            survey03 = survey02

        survey05 = Store.objects.filter(
            address__contains=surveyArr[5], id__in=survey03).only('store').all()

        queryset = Store.objects.filter(id__in=survey05)
        serializer = StoreSerializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def SurveyType(request):
    if request.method == 'GET':
        print("get 시작")
        surveyArr = request.query_params.get("data", "")
        print(surveyArr)
        food_table = [["불고기", "홍어삼합", "닭볶음탕", "비빔밥", "잡채"],
                      ["탕수육", "유산슬", "깐풍기", "토마토달걀볶음밥", "잡탕밥"],
                      ["스테이크", "감바스", "로스티드 터키", "어니언 스프", "햄버거"],
                      ["규카츠", "초밥", "오야꼬동", "야채고로케", "라멘"],
                      ["순대", "어묵", "닭꼬치", "야채튀김", "김밥"],
                      ["분짜", "푸팟뽕커리", "탄두리치킨", "월남쌈", "반미"]
                      ]
        adjective_table = ["레시피보고 만든", "엄마가 만들어 준", "둘이 먹다 셋이 죽는", "또 먹고 싶은",
                           "지옥에서 온", "눈물 젖은", "심혈을 기울여 만든", "죽기전에 마지막으로 먹고 싶은",
                           "먹다 남긴", "줘도 안먹는", "실수로 소금을 쏟은", "까맣게 타버린",
                           "어쩌다 이렇게 된", "수줍게 선보인 나의", "혀 끝을 휘감는", "장인이 만든"]
        taste_table = ["쓴", "싱거운", "기름진", "촉촉한",
                       "짠", "달달한", "매콤한", "떫은",
                       "고소한", "새콤한", "칼칼한", "묘한",
                       "맛없는", "맛있는", "눅눅한", "바삭바삭한"]

        food = food_table[int(surveyArr[0])][int(surveyArr[1])]
        adjective = adjective_table[int(surveyArr[2:6], 2)]

        index = ""
        for i in range(6, 9):
            index = index + str(format(int(surveyArr[i]), 'b'))
        index = int(index, 2)
        taste = taste_table[index]

        ret = [adjective, taste, food]
        print(ret)
        return Response(ret)
