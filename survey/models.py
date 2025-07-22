import uuid
from django.conf import settings
from django.db import models
from django.contrib.gis.db import models as geomodels


class SubdivisionProject(models.Model):
    """
    Represents a subdivision project created by a surveyor.
    Stores main parcel boundary, AI-calculated area, user preferences, and status.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique identifier for the project"
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='subdivision_projects',
        help_text="Owner of this project"
    )
    name = models.CharField(
        max_length=255,
        help_text="Descriptive name of the subdivision project"
    )
    # GeoJSON or file-derived polygon for the main parcel boundary
    boundary = geomodels.PolygonField(
        null=True,
        blank=True,
        help_text="Geo-polygon of the main parcel boundary"
    )
    total_area_sqft = models.FloatField(
        null=True,
        blank=True,
        help_text="AI-computed total area of the parcel in square feet"
    )
    # Default and user-adjustable plot size, based on total_area_sqft / number_of_plots
    default_plot_size = models.FloatField(
        help_text="System-calculated default sub-plot size in square feet"
    )
    plot_size_sqft = models.FloatField(
        help_text="User-adjustable desired sub-plot size in square feet"
    )
    shape_preference = models.CharField(
        max_length=50,
        choices=[
            ('rectangular', 'Rectangular'),
            ('irregular', 'Irregular'),
            ('circular', 'Circular'),
        ],
        help_text="Preferred geometric shape for sub-plots"
    )
    number_of_plots = models.PositiveIntegerField(
        help_text="Desired number of sub-plots to generate"
    )
    # To be set manually in Road-Sketch mode after AI boundary draw
    road_width_ft = models.FloatField(
        null=True,
        blank=True,
        help_text="Width of new internal roads in feet"
    )
    setback_percentage = models.FloatField(
        help_text="Percentage buffer from boundary reserved as setback"
    )
    zoning = models.CharField(
        max_length=20,
        choices=[
            ('residential', 'Residential'),
            ('commercial', 'Commercial'),
            ('public', 'Public/Institutional'),
        ],
        help_text="Zoning category for the subdivision"
    )
    status = models.CharField(
        max_length=20,
        default='draft',
        choices=[
            ('draft', 'Draft'),
            ('in_progress', 'In Progress'),
            ('ai_generated', 'AI Generated'),
            ('road_defined', 'Road Defined'),
            ('submitted', 'Submitted'),
        ],
        help_text="Current lifecycle state of the project"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the project was created"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text="Timestamp when the project was last modified"
    )


class BoundaryFile(models.Model):
    """
    Stores uploaded GIS boundary files (KML, GeoJSON, Shapefile) for a project.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique identifier for the boundary file"
    )
    project = models.ForeignKey(
        SubdivisionProject,
        on_delete=models.CASCADE,
        related_name='boundary_files',
        help_text="Project associated with this boundary file"
    )
    file_type = models.CharField(
        max_length=20,
        choices=[('kml', 'KML'), ('geojson', 'GeoJSON'), ('shp', 'Shapefile')],
        help_text="Format of the uploaded boundary file"
    )
    file = models.FileField(
        upload_to='boundaries/',
        help_text="The uploaded boundary file"
    )
    uploaded_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the file was uploaded"
    )


class ManualCoordinate(models.Model):
    """
    Stores manually entered beacon points if no boundary file is provided.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    project = models.ForeignKey(
        SubdivisionProject,
        on_delete=models.CASCADE,
        related_name='manual_coords',
        help_text="Project associated with these coordinates"
    )
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        help_text="Latitude in decimal degrees"
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        help_text="Longitude in decimal degrees"
    )
    sequence = models.PositiveIntegerField(
        help_text="Order index to reconstruct boundary polygon"
    )


class MutationOutput(models.Model):
    """
    Captures AI-generated layout suggestions and export files for a project.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    project = models.ForeignKey(
        SubdivisionProject,
        on_delete=models.CASCADE,
        related_name='mutations',
        help_text="Project associated with this AI output"
    )
    preview_image = models.ImageField(
        upload_to='mutations/previews/',
        help_text="PNG/SVG preview of AI-generated layout"
    )
    geojson_layout = models.JSONField(
        null=True,
        blank=True,
        help_text="GeoJSON representation of suggested parcels"
    )
    suggested_roads = models.JSONField(
        null=True,
        blank=True,
        help_text="AI-suggested road centerlines and widths"
    )
    layout_score = models.FloatField(
        null=True,
        blank=True,
        help_text="AI feasibility score (0.0–1.0) for the layout"
    )
    approved = models.BooleanField(
        default=False,
        help_text="Set true when surveyor approves the AI layout"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when the layout was generated"
    )


class RoadSegment(models.Model):
    """
    Stores each road segment drawn by the surveyor (manual or AI suggested).
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    project = models.ForeignKey(
        SubdivisionProject,
        on_delete=models.CASCADE,
        related_name='road_segments',
        help_text="Project associated with this road segment"
    )
    centerline = geomodels.LineStringField(
        help_text="Polyline of the road centerline"
    )
    width_ft = models.FloatField(
        help_text="Full width of the road in feet"
    )
    buffer_polygon = geomodels.PolygonField(
        help_text="Buffered polygon representing road reserve"
    )
    dimension_label = models.CharField(
        max_length=50,
        help_text="Dimension annotation text, e.g., 'R-W = 20 ft'"
    )
    bearing_distance = models.TextField(
        help_text="Callouts for bearings & distances along centerline"
    )
    is_suggested = models.BooleanField(
        default=False,
        help_text="True if this road was AI-suggested"
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )


class TemplatePlacement(models.Model):
    """
    Tracks the placement of the final drawing onto the PDF template.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    project = models.OneToOneField(
        SubdivisionProject,
        on_delete=models.CASCADE,
        related_name='template_placement',
        help_text="Project for which this template placement applies"
    )
    template_pdf = models.FileField(
        upload_to='templates/',
        help_text="Static mutation application PDF (A3/A4)"
    )
    offset_x = models.FloatField(
        default=0.0,
        help_text="X-offset in PDF units for drawing placement"
    )
    offset_y = models.FloatField(
        default=0.0,
        help_text="Y-offset in PDF units for drawing placement"
    )
    scale_pct = models.FloatField(
        default=100.0,
        help_text="Scale percentage of the drawing relative to template"
    )
    snapped = models.BooleanField(
        default=False,
        help_text="Whether snapping guides were used for placement"
    )
    final_pdf = models.FileField(
        upload_to='templates/final/',
        null=True,
        blank=True,
        help_text="Merged print-ready PDF for stamping"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp when template was merged"
    )
