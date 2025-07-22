# Database Schema for AI‑Based Mutation Map Generator

## 1. SubdivisionProject  
Holds the main parcel, AI‐computed area, user preferences and lifecycle state.

| Column                | Type            | Null  | Default       | Description                                               |
|-----------------------|-----------------|-------|---------------|-----------------------------------------------------------|
| `id`                  | UUID (PK)       | No    | auto          | Unique project identifier                                 |
| `user_id`             | UUID → User     | No    |               | Owner of the project                                      |
| `name`                | varchar(255)    | No    |               | Descriptive project name                                  |
| `boundary`            | Polygon         | Yes   |               | Geo‑polygon of main parcel (from file or manual entry)    |
| `total_area_sqft`     | float           | Yes   |               | AI‐computed total area of parcel                          |
| `default_plot_size`   | float           | No    |               | Default plot size (sq ft) calculated from total/num_plots |
| `plot_size_sqft`      | float           | No    |               | User‐adjustable desired plot size                         |
| `shape_preference`    | varchar(50)     | No    |               | e.g., rectangular / irregular / circular                  |
| `number_of_plots`     | int             | No    |               | Desired sub‑plot count                                    |
| `road_width_ft`       | float           | Yes   |               | To be set after boundary display (manual road mode)       |
| `setback_percentage`  | float           | No    |               | % buffer from boundary                                    |
| `zoning`              | varchar(20)     | No    |               | residential / commercial / public                         |
| `terrain_model_ref`   | varchar(255)    | Yes   |               | Reference to DEM or terrain tile used for AI checks       |
| `status`              | varchar(20)     | No    | draft         | [draft, in_progress, ai_generated, road_defined, submitted] |
| `created_at`          | timestamp       | No    | now()         | Creation timestamp                                        |
| `updated_at`          | timestamp       | No    | now()         | Last modification                                         |

---

## 2. BoundaryFile  
Stores uploaded GIS files for defining the parcel.

| Column        | Type           | Null | Description                           |
|---------------|----------------|------|---------------------------------------|
| `id`          | UUID (PK)      | No   | Unique file identifier                |
| `project_id`  | UUID → Project | No   | Associated SubdivisionProject         |
| `file_type`   | varchar(20)    | No   | [kml, geojson, shp]                   |
| `file_path`   | varchar(512)   | No   | Storage path to the uploaded file     |
| `uploaded_at` | timestamp      | No   | When the file was added               |

---

## 3. ManualCoordinate  
Keeps ordered beacon points if no file upload.

| Column        | Type           | Null | Description                           |
|---------------|----------------|------|---------------------------------------|
| `id`          | UUID (PK)      | No   | Unique coordinate record             |
| `project_id`  | UUID → Project | No   | Associated SubdivisionProject         |
| `latitude`    | decimal(9,6)   | No   | Latitude in decimal degrees           |
| `longitude`   | decimal(9,6)   | No   | Longitude in decimal degrees          |
| `sequence`    | int            | No   | Order for boundary polygon creation   |

---

## 4. MutationOutput  
Captures AI‐suggested layouts and “feasibility” flags.

| Column             | Type         | Null | Default | Description                                      |
|--------------------|--------------|------|---------|--------------------------------------------------|
| `id`               | UUID (PK)    | No   |         | Unique mutation record                           |
| `project_id`       | UUID → Project | No |       | Parent SubdivisionProject                        |
| `preview_image`    | varchar(512) | Yes  |         | PNG/SVG of AI layout sketch                      |
| `geojson_layout`   | JSON         | Yes  |         | GeoJSON of suggested parcels                     |
| `suggested_roads`  | JSON         | Yes  |         | Auto‐suggested road segments & widths            |
| `layout_score`     | float        | Yes  |         | AI’s feasibility score (0–1)                     |
| `approved`         | boolean      | No   | false   | True once surveyor confirms                       |
| `created_at`       | timestamp    | No   | now()   | When AI generated this layout                     |

---

## 5. RoadSegment  
Stores each manual or AI‐suggested road drawn by the surveyor.

| Column               | Type         | Null | Description                                       |
|----------------------|--------------|------|---------------------------------------------------|
| `id`                 | UUID (PK)    | No   | Unique road segment                              |
| `project_id`         | UUID → Project | No | Parent SubdivisionProject                         |
| `centerline`         | LineString   | No   | Snapped polyline between clicked points           |
| `width_ft`           | float        | No   | User‐entered road width                           |
| `buffered_polygon`   | Polygon      | No   | Computed road reserve polygon                     |
| `dimension_label`    | varchar(50)  | Yes  | e.g., “R‑W = 20 ft”                               |
| `bearing_distance`   | varchar(255) | Yes  | JSON or text of segment bearings & distances      |
| `is_suggested`       | boolean      | No   | True if AI suggested this road                    |
| `created_at`         | timestamp    | No   | Timestamp of creation                             |

---

## 6. TemplatePlacement  
Tracks final placement of mutation drawing into the PDF form.

| Column           | Type         | Null | Default | Description                                       |
|------------------|--------------|------|---------|---------------------------------------------------|
| `id`             | UUID (PK)    | No   |         | Unique placement record                           |
| `project_id`     | UUID → Project | No |       | One‑to‑one with SubdivisionProject                |
| `template_pdf`   | varchar(512) | Yes  |         | Path to blank A3/A4 template                      |
| `offset_x`       | float        | No   | 0       | X‑offset in PDF units                             |
| `offset_y`       | float        | No   | 0       | Y‑offset in PDF units                             |
| `scale_pct`      | float        | No   | 100     | Scale relative to original drawing                |
| `snapped`        | boolean      | No   | false   | True if snapped to margin/title block             |
| `final_pdf`      | varchar(512) | Yes  |         | Merged, print‑ready PDF                            |
| `created_at`     | timestamp    | No   | now()   | Timestamp of merge                                 |

---

# Surveyor Workflow (Markdown)

```markdown
## Surveyor Workflow: Creating a New Subdivision Project

1. **Start New Project**
   - Surveyor logs in and clicks **“New Subdivision Project”**.
   - Enters a project name and optional description.

2. **Define Boundary**
   - **Option A:** Upload KML / GeoJSON / SHP file → saved to `BoundaryFile`.
   - **Option B:** Click **“Manual Coordinate Entry”** → enters lat, lon sequence → saved to `ManualCoordinate`.
   - Click **“Draw on Map”** → backend computes `boundary` & `total_area_sqft` in `SubdivisionProject`.

3. **Review AI Calculations**
   - System auto‑computes:
     - `total_area_sqft`
     - `default_plot_size = total_area / number_of_plots`
   - Displays these values in the form; surveyor may adjust `plot_size_sqft` or `number_of_plots`.

4. **Set Preferences**
   - Choose `shape_preference`, `setback_percentage`, `zoning`.
   - **Save Preferences** → status becomes **in_progress**.

5. **AI Layout Generation**
   - Click **“Create project”** → creates a `MutationOutput` with:
     - `geojson_layout`
     - `preview_image`
     - `suggested_roads` (array of {centerline, width_ft})
   - Surveyor inspects suggested parcels & road hints on the map canvas.

6. **Interactive Road Placement**
   - Activate **Road‑Sketch Mode** from toolbar.
   - Click two points for centerline → system snaps to `boundary` or `beacon` if close.
   - Enter `width_ft` → `RoadSegment` record created.
   - Right‑click → **“Add Dimension”**, adds `dimension_label` and `bearing_distance`.
   - Style with hatch & labels per Survey of Kenya standards.
   - Repeat until all required roads are defined; status switches to **road_defined**.

7. **Finalize & Approve Layout**
   - Toggle template overlay on/off; drag `preview_image` into white‑space using snapping guides.
   - Confirm all annotations (roads, bearings, setbacks) are visible.
   - Mark `MutationOutput.approved = true`.

8. **Template Merge & Export**
   - System writes a `TemplatePlacement`:
     - Calculates `offset_x`, `offset_y`, `scale_pct`.
   - Click **“Export PDF”** → generates `final_pdf`.

9. **Print & Submit**
   - Download or auto‑send `final_pdf` to printer.
   - Submit the stamped paper plan to Land Registry.
   - Optionally export DXF / SHP from `MutationOutput` for office archive.
   - Status updates to **submitted**.

---

This schema and workflow ensure every step—from boundary definition through AI suggestion, manual road sketching, to final template merge—aligns with Kenyan surveying regulations and Land Registry requirements.
