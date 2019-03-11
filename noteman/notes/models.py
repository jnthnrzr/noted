from django.db import models


class Note(models.Model):
  title = models.CharField(max_length=140)
  body = models.TextField()
  created_at = models.DateTimeField(auto_now_add=True)
  modified_at = models.DateTimeField(auto_now=True)
