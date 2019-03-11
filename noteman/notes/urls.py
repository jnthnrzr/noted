from rest_framework import routers
from .views import NoteViewSet

router = routers.DefaultRouter()
router.register(prefix='api/notes', viewset=NoteViewSet, basename='notes')

urlpatterns = router.urls
