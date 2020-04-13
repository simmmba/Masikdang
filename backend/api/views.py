from .models import User
from .serializers import UserSerializer
from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

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


class UserList(APIView):
    # User List 를 다루는 클래스

    # list 생성
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
        if serializer.is_valid() :
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
        user = User.objects.get(api_id = api_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=['get'], url_path='dup_check')
    def duplicate_check(self, request, format=None):
        user = User.objects.get(pk=id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserJoinCheck(APIView):
    # User 회원가입 여부를 확인하는 클래스
    # User 조회
    def get(self, request, format=None):
        api_id = request.query_params.get("api_id", "")
        provider = request.query_params.get("provider", "")
        is_exist = User.objects.filter(api_id=api_id ,provider=provider ).count()

        if is_exist == 0 :
            return Response('NO')
        else :
            return Response('YES')
class NickDuplicateCheck(APIView):
    # User nickname 중복 여부를 확인하는 클래스
    def get(self, request, format=None):
        nickname = request.query_params.get("nickname", "")
        is_exist = User.objects.filter(nickname=nickname).count()

        if is_exist == 0 :
            return Response('NO')
        else :
            return Response('YES')
