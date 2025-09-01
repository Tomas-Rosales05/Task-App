from rest_framework import serializers
from .models import Task,UserLogin

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"

# serializer.py
from rest_framework import serializers
from .models import UserLogin

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLogin
        fields = ['id', 'name', 'email', 'password']

    def validate_email(self, value):
        if UserLogin.objects.filter(email=value).exists():
            raise serializers.ValidationError("El correo ya está registrado")
        return value
