from rest_framework import viewsets, permissions 
from .models import Room
from .serializers import RoomSerializer

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
