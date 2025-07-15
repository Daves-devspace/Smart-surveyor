# 🛰️ Smart Surveyor System

A full-stack Django + Leaflet + AI-powered land surveying platform for plotting, subdivision, mutation mapping, offline field data collection, and performance tracking—aligned with **UN SDG 9: Industry, Innovation, and Infrastructure**.

---

## 📌 Overview

This system digitizes the land surveying workflow by integrating:

- 🧠 AI-based layout generation
- 📍 Coordinate marking & distance tracking
- 📤 Offline map caching & field data collection
- 📲 Mobile-friendly project sharing via QR
- 📊 Surveyor performance dashboard
- 🔒 PIN-secured project access

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Django (Python), Django CBVs |
| Frontend | HTML, Leaflet.js, Leaflet.draw, JavaScript |
| AI/ML | Genetic Algorithms for subplot layout |
| Data Storage | PostgreSQL (with PostGIS recommended), IndexedDB (browser) |
| Offline | Service Workers, Leaflet.offline, idb-keyval |
| Map | OpenStreetMap, Mapbox (optional) |
| Reports | WeasyPrint, HTML-to-PDF |
| Share | QR Code (Python `qrcode`) |
| Deployment | Docker-ready, PWA-friendly |

---

## 📁 Project Structure

surveyor/
│

├── models.py # LayoutProject, SurveyorPoint

├── views.py # All CBVs for project handling

├── urls.py # URL routing

├── templates/

│ ├── project_map_mobile.html

│ ├── performance_report.html

│ ├── project_dashboard.html

│ └── pdf_template.html

├── static/

│ └── JS/CSS assets

├── utils/

│ └── ai_layout_generator.py

│ └── haversine.py


---

## 🚀 Features

### 📌 Project Dashboard
- View user’s saved layouts
- GeoJSON download + live preview

### 📐 AI-Based Subdivision Generator
- Upload master parcel + mutation details
- Automatically generate optimized layout using Genetic Algorithm
- Exports layout to DXF/GeoJSON with labels, sizes

### 🗺️ Interactive Map Interface
- Draw/edit subplots
- View layout on mobile
- Offline tile caching with Leaflet.Offline

### 📍 Coordinate Logging
- Click to mark points (logged to DB)
- Works offline via IndexedDB
- Syncs when connection is restored

### 🧭 Boundary Tracking
- Displays distance between clicked points
- Bearing direction from GPS to target
- Real-time GPS location tracking

### 🔐 Security
- PIN-protected map access
- Unique sharable links + QR codes for surveyors

### 📤 Offline Resilience
- Save map tiles for use in disconnected areas
- Store unsynced coordinates offline (browser DB)
- Manual sync back to server

### 📊 Performance Reports
- Admin dashboard of:
  - Points marked per surveyor
  - Distance walked
  - Total time spent
- Uses timestamp + geospatial logs

### 📄 PDF Export
- Print/save layout map with metadata as PDF (offline)
- HTML template styled for mobile printing

---

## 🔐 Security Model

| Feature | Method |
|--------|--------|
| Project ownership | ForeignKey to `User` |
| Access control | User-based + optional `access_pin` |
| Shared maps | Public URL + optional QR + PIN check |
| Data integrity | Unit tests for area checks, GeoJSON validation |

---

## 📱 Mobile UX Highlights

| Feature | Availability |
|--------|-------------|
| GPS location tracking | ✅ |
| Point marking & distance | ✅ |
| Offline tiles & sync | ✅ |
| Add to Home Screen (PWA-ready) | ✅ |
| QR code project access | ✅ |
| Save as PDF offline | ✅ |

---

## 📈 Performance Metrics

Collected via `SurveyorPoint` model:

- `user`: Who marked it
- `lat/lng`: Where
- `timestamp`: When
- `project`: Associated layout

Aggregate views calculate:
- Total points
- Total distance walked (Haversine)
- Time coverage

---

## 🤖 AI Layout Generator

| Feature | Description |
|--------|-------------|
| Input | Parent parcel boundary + desired plot sizes |
| Algorithm | Genetic Algorithm with boundary + spacing constraints |
| Output | Optimal sub-plot layout with spacing |
| Export | DXF, SHP, GeoJSON |
| Libraries | Shapely, NumPy, Matplotlib, DXFWriter |

---

## 🛠️ Dev & Setup

### 🧩 Requirements

```bash
pip install django weasyprint qrcode idb-keyval
sudo apt install chromium-driver
⚙️ Run

python manage.py migrate
python manage.py runserver
📥 Future Enhancements
🔄 Real-time collaboration (multiple surveyors on same layout)

☁️ Cloud sync integration (Google Drive or custom)

📌 Offline location-aware snapping to boundary

📷 Photologging with camera per plot

📡 Live GPS route tracking & speed monitoring

💬 Field surveyor feedback module (via mobile)

✅ SDG Impact Alignment
Goal	Contribution
SDG 9: Industry, Innovation and Infrastructure	Modernizes land surveying through automation and smart geospatial tools
SDG 11: Sustainable Cities and Communities	Helps ensure well-planned subdivisions and infrastructure layout
SDG 8: Decent Work and Economic Growth	Empowers local surveyors with digital tools and trackable performance

📧 Contact & Credits
Developed by: [David Maina]
Contact: [info@liorixdigital.com]
GitHub: [(https://github.com/Daves-devspace/Smart-surveyor.git)]

 Ready for the field, ready for launch 🚀

“Digitizing the land, empowering the hands.” 🌍📐🛰️

