// src/types/react-leaflet-draw.d.ts
declare module "react-leaflet-draw" {
  import * as React from "react";
  import type { ControlPosition, Layer } from "leaflet";
  import type { Feature, Geometry } from "geojson";

  /**
   * GeoJSON Feature returned by layer.toGeoJSON()
   * Use `unknown` for properties to avoid `any` while remaining flexible.
   */
  export type DrawFeature = Feature<Geometry, unknown>;

  /**
   * Event fired when a new layer is created (polygon, rectangle, etc.)
   * We only rely on `layer.toGeoJSON()` in our code, so expose that shape.
   */
  export type DrawCreatedEvent = {
    layer: {
      toGeoJSON: () => DrawFeature;
    } & Layer;
  };

  /**
   * Event fired when existing layers are edited.
   * `layers` is a Leaflet LayerGroup-like object exposing a forEach / eachLayer method.
   */
  export type DrawEditedEvent = {
    layers: {
      /**
       * Iterate over all edited layers. Each layer exposes toGeoJSON().
       */
      eachLayer: (fn: (layer: { toGeoJSON: () => DrawFeature } & Layer) => void) => void;
      // optionally expose length/size if needed
    };
  };

  /**
   * Event fired when layers are deleted.
   * Similar to edited, `layers` contains the items removed.
   */
  export type DrawDeletedEvent = {
    layers: {
      eachLayer: (fn: (layer: { toGeoJSON: () => DrawFeature } & Layer) => void) => void;
    };
  };

  export type EditControlDrawOptions = {
    polygon?: boolean;
    polyline?: boolean;
    rectangle?: boolean;
    circle?: boolean;
    marker?: boolean;
    circlemarker?: boolean;
  };

  export interface EditControlProps {
    position?: ControlPosition;
    draw?: EditControlDrawOptions;
    onCreated?: (e: DrawCreatedEvent) => void;
    onEdited?: (e: DrawEditedEvent) => void;
    onDeleted?: (e: DrawDeletedEvent) => void;
  }

  export const EditControl: React.ComponentType<EditControlProps>;
  export default EditControl;
}
