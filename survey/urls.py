# projects/urls.py
from rest_framework.routers import DefaultRouter
from .projects.views import SubdivisionProjectViewSet

router = DefaultRouter()
router.register(r"projects", SubdivisionProjectViewSet, basename="projects")

urlpatterns = router.urls
