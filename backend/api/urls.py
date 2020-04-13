from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from api import views


router = DefaultRouter(trailing_slash=False)
router.register(r"stores", views.StoreViewSet, basename="stores")
# router.register(r"users", views.UserViewSet, basename="users")

urlpatterns = [
    url(r"users", views.UserList.as_view(), name="users"),
    url(r"user", views.UserDetail.as_view(), name="user"),
    url(r"join_check", views.UserJoinCheck.as_view(), name="join_check"),
    url(r"dup_check", views.NickDuplicateCheck.as_view(), name="dup_check"),
]
