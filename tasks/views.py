from rest_framework import viewsets
from .models import Task, UserLogin
from .serializer import TaskSerializer, UserLoginSerializer

class UserLogin(viewsets.ModelViewSet):
    queryset = UserLogin.objects.all()
    serializer_class = UserLoginSerializer

class TaskView(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get_queryset(self):

        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return Task.objects.all()
        
        user_id = self.request.query_params.get("user_id")
        if user_id:
            return Task.objects.filter(user_id=user_id)
        return Task.objects.none()

    def perform_create(self, serializer):
        user_id = self.request.data.get("user")
        serializer.save(user_id=user_id)

