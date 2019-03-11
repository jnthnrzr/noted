from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
  title = models.CharField(max_length=140)
  body = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  modified_at = models.DateTimeField(auto_now=True)
  owner = models.ForeignKey(User, related_name='notes',
                            on_delete=models.CASCADE, null=True)
