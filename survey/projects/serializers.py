# projects/serializers.py
from rest_framework import serializers
from rest_framework_gis.fields import GeometryField
from django.utils import timezone
from survey.models import SubdivisionProject

class SubdivisionProjectListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for lists.
    Uses GeometryField for boundary (GeoDjango polygon).
    """
    boundary = GeometryField(required=False, allow_null=True)

    class Meta:
        model = SubdivisionProject
        fields = (
            "id", "name", "user", "total_area_sqft",
            "plot_size_sqft", "number_of_plots",
            "shape_preference", "zoning",
            "status", "created_at", "updated_at",
            "boundary",
        )
        read_only_fields = ("id", "user", "total_area_sqft", "status", "created_at", "updated_at")


class SubdivisionProjectCreateUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer used for creating/updating projects.
    Performs input validations (number_of_plots, setback, etc.).
    """
    boundary = GeometryField(required=False, allow_null=True)

    class Meta:
        model = SubdivisionProject
        fields = "__all__"
        read_only_fields = ("id", "user", "total_area_sqft", "default_plot_size", "created_at", "updated_at", "status")

    def validate_number_of_plots(self, value):
        if value <= 0:
            raise serializers.ValidationError("number_of_plots must be greater than 0.")
        return value

    def validate_setback_percentage(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("setback_percentage must be between 0 and 100.")
        return value

    def validate(self, data):
        """
        Additional cross-field validation.
        If boundary exists and plot_size specified, check plausibility (lightweight check here).
        Deeper area checks happen in service tasks.
        """
        boundary = data.get("boundary") or (self.instance.boundary if self.instance else None)
        plot_size = data.get("plot_size_sqft") or (self.instance.plot_size_sqft if self.instance else None)
        number = data.get("number_of_plots") or (self.instance.number_of_plots if self.instance else None)

        # If boundary and both plot_size and number are provided, do a simple plausibility check:
        if boundary and plot_size and number:
            # total_area may not yet be populated; if present compare, otherwise skip heavy calc
            total_area = getattr(self.instance, "total_area_sqft", None)
            if total_area:
                required = plot_size * number
                if required > total_area * 1.05:  # 5% tolerance
                    raise serializers.ValidationError(
                        "Requested number_of_plots * plot_size_sqft exceeds parcel area (with 5% tolerance)."
                    )
        return data

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        # default status is 'draft' defined in model
        project = super().create(validated_data)
        return project

    def update(self, instance, validated_data):
        # allow partial updates; keep business logic out of view
        return super().update(instance, validated_data)


class SubdivisionProjectDetailSerializer(serializers.ModelSerializer):
    """
    Detailed serializer to return full project info for retrieve.
    """
    boundary = GeometryField(required=False, allow_null=True)

    class Meta:
        model = SubdivisionProject
        fields = "__all__"
        read_only_fields = ("id", "user", "total_area_sqft", "default_plot_size", "created_at", "updated_at", "status")
