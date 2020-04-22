from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter
from api import views


router = DefaultRouter(trailing_slash=False)
# router.register(r"stores", views.StoreViewSet, basename="stores")
# router.register(r"users", views.UserViewSet, basename="users")

urlpatterns = [
    url(r"user/list", views.UserList.as_view(), name="users"),
    url(r"user/detail", views.UserDetail.as_view(), name="user"),
    url(r"user/join_check", views.UserJoinCheck.as_view(), name="join_check"),
    url(r"user/dup_check", views.NickDuplicateCheck.as_view(), name="dup_check"),
    
    url(r"store/list", views.StoreList.as_view(), name="stores"),
    
    url(r"store/detail", views.StoreDetail.as_view(), name="store"),
    url(r"store/search", views.StoreSearch.as_view(), name="search"),
    url(r"survey/search", views.SurveySearch, name="surevey_search"),
    url(r"survey/type", views.SurveyType, name="surevey_type"),

    # url(r"review/", views.ReviewDetail.as_view(), name="review"),
    
    path("review", views.ReviewPost.as_view(), name="review_post"),
    path("review/<store_id>", views.ReviewList.as_view(), name="review_store"),
    path("review/<review_id>/", views.ReviewDetail.as_view(), name="review_detail"),
    path("review/user/<user_id>", views.ReviewByUser.as_view(), name="review_user"),
    path("review/img/<review_id>", views.ReviewImgList.as_view(), name="review_user"),
]
