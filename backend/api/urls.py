from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter
from .models import User, Store, Review, Review_img, Tag, Menu, Bhour, Image_upload

from api import views, views_tmp ,views_sy, views_ky


router = DefaultRouter(trailing_slash=False)

# router.register(r"stores", views.StoreViewSet, basename="stores")
# router.register(r"users", views.UserViewSet, basename="users")

urlpatterns = [
    # 유저 URL
    path("user", views.UserPost.as_view(), name="user"),
    path("user/list", views.UserList.as_view(), name="users"),
    path("user/<api_id>", views.UserDetail.as_view(), name="user"),
    path("user/join_check/<provider>/<api_id>", views.UserJoinCheck.as_view(), name="join_check"),
    path("user/dup_check/<nickname>", views.NickDuplicateCheck.as_view(), name="dup_check"),
    
    # 스토어 URL
    path("store", views.StorePost.as_view(), name="store"),
    path("store/<store_id>", views.StoreDetail.as_view(), name="store"),
    path("store/search/<subject>/<word>", views.StoreSearch.as_view(), name="search"),
    path("store/search/<word>", views_ky.StoreSearch.as_view(), name="search"),
    path("store/list", views.StoreList.as_view(), name="stores"),
    
    # 설문 URL
    path("survey/search", views.SurveySearch, name="surevey_search"),
    path("survey/type", views_ky.SurveyType, name="surevey_type"),

    # 알고리즘
    path("filter/user", views_sy.filteringByUser, name = "filter_user"),
    path("filter/type", views_sy.filteringByType, name = "filter_type"),
    path("similar",views_sy.similarStore, name = "similar_store"),
    
    # 리뷰 URL
    path("review", views.ReviewPost.as_view(), name="review_post"),
    path("review/<store_id>", views.ReviewList.as_view(), name="review_store"),
    path("review/<review_id>/", views.ReviewDetail.as_view(), name="review_detail"),
    path("review/user/<user_id>", views.ReviewByUser.as_view(), name="review_user"),
    path("review/img/<review_id>", views.ReviewImgList.as_view(), name="review_user"),

    # 파일 업로드 URL
    path("upload/<review_id>", views.upload_image, name="upload_image"),

]
