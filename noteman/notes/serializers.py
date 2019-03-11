from rest_framework import serializers
from .models import Note


class NoteSerializer(serializers.ModelSerializer):
  """Serializer to handle Notes. All model fields are handled here."""
  class Meta:
    model = Note
    fields = '__all__'
