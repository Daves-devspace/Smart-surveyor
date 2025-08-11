// src/components/Map/MapCanvas.tsx
import React, { useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import type { Geometry, Feature } from "geojson";
import type { Map as LeafletMap } from "leaflet";

/**
 * Small typed event describing what we expect from the Draw 'created' event.
 * The actual event object from leaflet-draw contains more, but we only use `.layer.toGeoJSON()`.
 */
type DrawCreatedEvent = {
  layer: {
    toGeoJSON: () => Feature<Geometry>;
  };
};

type Props = {
  /** Receives a GeoJSON Geometry (Polygon) when a boundary is drawn */
  onBoundaryCreate: (geojson: Geometry) => void;
  /** Optional: initial geometry to display on the map */
  initialBoundary?: Geometry | null;
};

const MapCanvas: React.FC<Props> = ({ onBoundaryCreate, initialBoundary = null }) => {
  // Use a typed ref for the Leaflet map instance
  const mapRef = useRef<LeafletMap | null>(null);

  // typed handler for created event
  const onCreated = (e: DrawCreatedEvent) => {
    const feature = e.layer.toGeoJSON(); // typed as Feature<Geometry>
    if (feature && feature.geometry) {
      onBoundaryCreate(feature.geometry);
    }
  };

  return (
    <MapContainer
      ref={mapRef}
      center={[-1.28, 36.82]}
      zoom={13}
      style={{ height: "480px" }}
      // you can pass other MapContainer props here
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <EditControl
        position="topright"
        onCreated={onCreated as unknown as (e: Record<string, unknown>) => void}
        draw={{
          polygon: true,
          polyline: false,
          rectangle: true,
          circle: false,
          marker: false,
          circlemarker: false,
        }}
      />
    </MapContainer>
  );
};

export default MapCanvas;
