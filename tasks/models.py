
# models.py
from django.db import models

class UserLogin(models.Model):
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    name = models.CharField(max_length=100)  

    def __str__(self):
        return self.email

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    user = models.ForeignKey(UserLogin, on_delete=models.CASCADE, related_name="tasks")  # 🔹 Nuevo campo

    def __str__(self):
        return self.title