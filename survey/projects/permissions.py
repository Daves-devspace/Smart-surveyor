# projects/permissions.py
from rest_framework import permissions

class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Allow access only to owners of the object or staff/admin users.
    """

    def has_object_permission(self, request, view, obj):
        # allow safe methods for authenticated users? we restrict by view/queryset
        if request.user.is_staff:
            return True
        return getattr(obj, "user", None) == request.user
