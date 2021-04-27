from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("todos", views.TodoView, basename="TodoModel")
router.register("register", views.RegisterView, basename="Register")

urlpatterns = [path("", include(router.urls))]

