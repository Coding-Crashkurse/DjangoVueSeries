from django.shortcuts import render
from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer, RegisterSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework import generics


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Todo.objects.all()
        # queryset = Todo.objects.filter(owner=self.request.user)
        return queryset


class RegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    http_method_names = ["post"]
