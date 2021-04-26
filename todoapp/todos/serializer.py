from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.ModelSerializer):
    owner = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Todo
        fields = ("id", "owner", "name", "text", "done")
