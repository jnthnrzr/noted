from .models import Note
from rest_framework import viewsets, permissions
from .serializers import NoteSerializer


class NoteViewSet(viewsets.ModelViewSet):
  """An API for the Note model. Basic CRUD functionality."""
  queryset = Note.objects.all()
  permission_classes = [
    permissions.AllowAny,
  ]
  serializer_class = NoteSerializer
