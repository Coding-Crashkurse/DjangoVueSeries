from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Todo(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=30)
    description = models.TextField(max_length=255)
    done = models.BooleanField()
    updated = models.DateTimeField(auto_now_add=True)

