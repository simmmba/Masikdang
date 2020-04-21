from rest_framework.decorators import api_view
from .models import User, Store, Review
from .serializers import UserSerializer, StoreSerializer, ReviewSerializer
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
        # parameter
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
        word = request.query_params.get("word", "")
        if subject == "name":
            queryset = Store.objects.filter(store_name__contains=word)
        elif subject == "area":
            queryset = Store.objects.filter(
                Q(area__contains=word) | Q(address__contains=word))
        elif subject == "category":
            queryset = Store.objects.filter(category__contains=word)

        serializer = StoreSerializer(queryset, many=True)
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
            print("혼자옴")

        queryset = Store.objects.all()[:10]
        serializer = StoreSerializer(queryset, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def SurveyType(request):
    print("searchpoll 시작")
    if request.method == 'GET':
        print("get 시작")
        surveyArr = request.data
        if(surveyArr[0] == "혼자"):
            print("혼자옴")

        queryset = Store.objects.all()[:10]
        serializer = StoreSerializer(queryset, many=True)
        return Response(serializer.data)


# Review
# Review 생성
class ReviewPost(APIView):
    '''
    # Review 생성
    # parameter
        body{
            store : Int(11),
            user : Int(11),
            user_nickname : String(30),
            total_score : Double,
            taste_score : Double,
            price_score : Double,
            content : String(3000),
            tag : String(500)
            reg_time : varchar(50)
        }
    '''

    def post(self, request, format=None):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Review 가게별 조회


class ReviewList(APIView):
    '''
    # 가게별 리뷰 조회
    '''

    def get(self, request, store_id, format=None):
        reivews_by_store = Review.objects.filter(store_id=store_id)
        serializer = ReviewSerializer(reivews_by_store, many=True)
        return Response(serializer.data)


class ReviewDetail(APIView):
    # Review 삭제
    # 특정 Review 를 다루는 클래스
    def delete(self, request, review_id, format=None):
        '''
        # 리뷰 삭제
        '''
        # review_id = request.query_params.get("review_id", "")
        review_del = Review.objects.get(id=review_id)
        review_del.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Review 수정
    def put(self, request,review_id, format=None):
        '''
        # 리뷰 수정
        '''
        review_modify = Review.objects.get(id=review_id)
        serializer = ReviewSerializer(review_modify, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 특정 User Review 조회
class ReviewByUser(APIView):
    '''
    # 유저 리뷰 조회
    '''
    # Store 검색을 위한 클래스
    def get(self, request,user_id, format=None):
        reviews_by_user = Review.objects.filter(user_id=user_id)
        serializer = ReviewSerializer(reviews_by_user, many=True)
        return Response(serializer.data)

# 가게 리뷰 사진 조회
class ReviewImgList(APIView):
    '''
    # 가게 리뷰 사진 조회
    '''
    def get(self, request, store_id, format=None):
        reivew_imgs_by_store = Review_img.objects.filter(store_id=store_id)
        serializer = ReviewSerializer(reivew_imgs_by_store, many=True)
        return Response(serializer.data)
