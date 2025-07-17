# Surveyor Mutation Automation Tool - Documentation

## Overview

This tool is designed to automate and visualize the land subdivision and mutation process for certified surveyors in Kenya. It utilizes real-time satellite mapping, accurate field coordinates, and AI logic to speed up mutation drawing aligned with land registry requirements.

---

## 🎯 Goals

* Streamline the mutation drawing process.
* Accurately visualize real parcels on satellite maps.
* Provide auto-subdivision tools with intelligent plot arrangements.
* Minimize errors in beacon coordinate calculation.
* Align with Kenyan Land Authority practices.

---

## 🌍 Aligned SDGs

* **SDG 9:** Industry, Innovation, and Infrastructure
* **SDG 11:** Sustainable Cities and Communities
* **SDG 16:** Peace, Justice, and Strong Institutions

---

## 📌 Key Features

### 1. Coordinate Upload Form

* **Function:** Allow surveyor to upload raw GPS coordinates from total station.
* **Fields:** File input (CSV, XLS), Manual entry, Client reference
* **AI:** Auto-validate coordinate format and field boundaries

### 2. Visualize Actual Parcel on Map

* **Function:** Parse uploaded coordinates and plot parcel on satellite map (Leaflet/Google Maps)
* **Feature:** Zoom, rotate, adjust beacon positions
* **AI Role:** Detect irregular shapes and flag corrections

### 3. Auto Boundary and Area Calculation

* **Function:** Automatically calculate polygon area and draw boundary lines
* **Method:** GIS polygon algorithms
* **AI:** Detect errors, duplicate points, and overlaps

### 4. Manual or Auto Mutation Drawing

* **Modes:**

  * Manual Drawing with snapping and drag tools
  * Auto Drawing (choose by number of plots or dimensions)

* **Input Fields (Auto):**

  * Number of plots
  * Plot size (e.g., 50x100)
  * Road width & position (center, left, right, both)
  * Setbacks (default or custom)

* **AI Role:**

  * Optimize plot layout
  * Calculate & distribute reminder
  * Detect irregularities

### 5. Auto Beacon Coordinate Generation

* **Function:** Assign accurate beacon coordinates to each sub-parcel
* **Method:** Compute from total station coordinate system
* **AI:** Validate and reproject if necessary

### 6. Export Options

* **Format:** PDF (mutation form view), CSV (coordinate list), KML (Google Earth)
* **Includes:**

  * Map
  * Beacon coordinates
  * Plot layout info

---

## 📂 Developer Implementation Guide

### Tech Stack

* **Backend:** Django (REST API)
* **Frontend:** Bootstrap + JS + Leaflet.js / Google Maps
* **AI/ML:** Python (scikit-learn or custom logic), Turf.js (GIS calculations)

### Models

* `Client`
* `CoordinateSet`
* `Plot`
* `MutationPlan`

### API Endpoints

* `POST /upload-coordinates`
* `GET /parcel/:id/map-view`
* `POST /mutation/auto`
* `POST /mutation/manual`
* `GET /plot/:id/export`

### AI Models

* **Plot Arrangement Optimizer:**

  * Input: Polygon, plot size, road width
  * Output: Grid layout
  * Tools: Custom algorithm / Turf.js

* **Anomaly Detector:**

  * Detect overlaps, invalid geometry

### Key Logic

* **Subdivision Algorithm:** Grid-fitting inside polygon with margin and road cuts.
* **Beacon Generator:** Traverse each parcel and compute new beacon corners.
* **Reminder Allocation:**

  * Auto-detect smallest area and allocate reminder
  * Or allow surveyor to pick target plot

---

## 🛠️ Future Enhancements

* Client portal to track mutation progress
* Mutation plan validation against Land Authority records
* Mobile field app with offline mode

---

## ✅ Outcome

Surveyors will be able to:

* Automate subdivision in seconds
* Visualize and print mutations aligned with real maps
* Export ready-to-submit documents
* Reduce human error and time consumption drastically

---

## 👥 Target Market

* Licensed Land Surveyors
* Land Consultancy Firms
* County Governments / Ministry of Lands

---

## 👨‍💻 Contributions

Feel free to fork, contribute, or raise issues via the project repository.

---

> 📍 All logic aligns with guidelines from the Survey of Kenya and Ministry of Lands mutation practices.
