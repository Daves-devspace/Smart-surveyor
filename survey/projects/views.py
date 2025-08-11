# projects/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from survey.models import SubdivisionProject
from .serializers import (
    SubdivisionProjectListSerializer,
    SubdivisionProjectCreateUpdateSerializer,
    SubdivisionProjectDetailSerializer,
)
from .permissions import IsOwnerOrAdmin

# Import your async service to trigger AI layout generation (implement later)
# from .services import generate_ai_layout_async

class SubdivisionProjectViewSet(viewsets.ModelViewSet):
    """
    CRUD + lifecycle actions for subdivision projects.

    /api/v1/projects/             GET, POST
    /api/v1/projects/{pk}/        GET, PATCH, DELETE
    /api/v1/projects/{pk}/generate/   POST (trigger AI layout)
    /api/v1/projects/{pk}/submit/     POST (submit for registry)
    """
    queryset = SubdivisionProject.objects.all().order_by("-created_at")
    permission_classes = [IsOwnerOrAdmin]  # default object-level; view-level handled in get_queryset

    def get_serializer_class(self):
        if self.action in ("list",):
            return SubdivisionProjectListSerializer
        if self.action in ("retrieve",):
            return SubdivisionProjectDetailSerializer
        return SubdivisionProjectCreateUpdateSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return super().get_queryset()
        return super().get_queryset().filter(user=user)

    def perform_create(self, serializer):
        # serializer.create handles setting user
        serializer.save()

    @action(detail=True, methods=["post"], url_path="generate")
    def generate(self, request, pk=None):
        """
        Trigger AI layout generation (async). The actual implementation should:
          - Validate boundary exists
          - Start a Celery task (generate_ai_layout_async) passing project id
          - Return task id or job URL
        For now we do a quick check and return a placeholder.
        """
        project = get_object_or_404(self.get_queryset(), pk=pk)

        # Basic checks:
        if not project.boundary:
            return Response(
                {"detail": "Boundary not present. Upload boundary (file or manual coords) before generating."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Example: call to service layer which enqueues background job
        # task = generate_ai_layout_async(project.id, user_id=request.user.id)
        # return Response({"task_id": task.id, "detail": "AI layout generation started."}, status=202)

        # Placeholder synchronous response (replace with above)
        project.status = "ai_generated"
        project.updated_at = timezone.now()
        project.save(update_fields=["status", "updated_at"])
        return Response({"detail": "AI layout placeholder created (replace with async task)."}, status=200)

    @action(detail=True, methods=["post"], url_path="submit")
    def submit(self, request, pk=None):
        """
        Transition project to 'submitted' — only allowed after approval in real flow.
        Add any final checks here (e.g., preview exists, approved mutation output).
        """
        project = get_object_or_404(self.get_queryset(), pk=pk)

        # Lightweight guard: only allow submit if AI has run / boundary present (adapt to your rules)
        if project.status not in ("ai_generated", "road_defined"):
            return Response({"detail": "Project not ready for submission. Run AI generation and define roads first."},
                            status=status.HTTP_400_BAD_REQUEST)

        project.status = "submitted"
        project.save(update_fields=["status"])
        return Response({"detail": "Project submitted."}, status=status.HTTP_200_OK)
