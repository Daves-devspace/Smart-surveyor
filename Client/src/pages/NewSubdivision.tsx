// src/components/NewSubdivision/NewSubdivision.tsx
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MapCanvas from "./../components/Map/MapCanvas";
import { useCreateProject } from "./../hooks/useProjects";
import * as projectsApi from "./../api/projects";
import type { Geometry } from "geojson";

/**
 * Types used in this file
 */
type RemainderInfo = {
  sqft: number;
  message?: string;
};

type ProjectPayload = {
  name: string;
  plot_size_sqft?: number;
  number_of_plots?: number;
  shape_preference?: string;
  setback_percentage?: number;
  zoning?: string;
  boundary?: Geometry | null;
};

type CreateProjectResult = {
  id?: string;
  // some backends return { data: { id } } or { id }
  data?: { id?: string };
};

/**
 * Ready-to-drop NewSubdivision page (typed)
 */

const remainderOptions = [
  { label: "Add to one plot (e.g., make Plot 4 larger)", value: "add-to-plot" },
  { label: "Create a small custom plot", value: "custom-plot" },
  { label: "Reserve for public use (green area)", value: "public-use" },
  { label: "Leave as undeveloped", value: "undeveloped" },
] as const;

const NewSubdivision: React.FC = () => {
  const navigate = useNavigate();
  const { create, loading: creating, error } = useCreateProject();

  // Form state
  const [name, setName] = useState<string>("");
  const [plotSize, setPlotSize] = useState<string>(""); // sq ft
  const [shapePref, setShapePref] = useState<string>("rectangular");
  const [numPlots, setNumPlots] = useState<string>("1");
  const [roadWidth, setRoadWidth] = useState<string>("");
  const [setback, setSetback] = useState<string>("10");
  const [zoning, setZoning] = useState<{
    residential: boolean;
    commercial: boolean;
    public: boolean;
  }>({
    residential: true,
    commercial: false,
    public: false,
  });

  // Boundary geometry created from MapCanvas (GeoJSON geometry object)
  const [boundaryGeoJson, setBoundaryGeoJson] = useState<Geometry | null>(null);

  // File input (optional): user may upload KML/GeoJSON/SHP as an alternative
  const [boundaryFile, setBoundaryFile] = useState<File | null>(null);

  // UI states
  const [showRemainderModal, setShowRemainderModal] = useState(false);
  const [remainderLoading, setRemainderLoading] = useState(false);
  const [remainderInfo, setRemainderInfo] = useState<RemainderInfo | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Map callback: MapCanvas should call this with geometry GeoJSON (Polygon)
  const handleBoundaryCreate = useCallback((geometry: Geometry) => {
    setBoundaryGeoJson(geometry);
  }, []);

  // File input handler (simple)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) setBoundaryFile(f);
  };

  // helper: safely extract project id from various response shapes
  const getProjectIdFromResponse = (resp: unknown): string | undefined => {
    if (!resp) return undefined;
    const asObj = resp as CreateProjectResult;
    if (typeof asObj?.id === "string") return asObj.id;
    if (asObj?.data && typeof asObj.data.id === "string") return asObj.data.id;
    // if using axios, resp.data may be nested further: handle as needed
    return undefined;
  };

  // Main create project submit handler
  const handleCreateProject = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSubmitting(true);

    try {
      // Build zoning string: pick first true or 'residential' default — adapt as you need
      let zoningChoice = "residential";
      if (zoning.commercial) zoningChoice = "commercial";
      if (zoning.public) zoningChoice = "public";

      // Prepare payload. If boundaryGeoJson exists, send it inline (preferred).
      const payload: ProjectPayload = {
        name: name || `New Project ${new Date().toISOString()}`,
        plot_size_sqft: plotSize ? Number(plotSize) : undefined,
        number_of_plots: numPlots ? Number(numPlots) : undefined,
        shape_preference: shapePref,
        setback_percentage: setback ? Number(setback) : undefined,
        zoning: zoningChoice,
        boundary: boundaryGeoJson ?? null,
      };

      // 1) Create project via DRF
      // useCreateProject.create should be typed to return the created resource
      const createdRaw = await create(payload);
      const projectId = getProjectIdFromResponse(createdRaw);

      // 2) If the user uploaded a file instead of drawing, upload file and notify backend.
      if (boundaryFile && projectId) {
        try {
          const form = new FormData();
          form.append("file", boundaryFile);
          form.append("file_type", boundaryFile.name.split(".").pop() || "geojson");
          // projectsApi.createBoundaryFile should be typed on your API helper
          // treat the call's return as unknown for safety
          await projectsApi.createBoundaryFile(projectId, form);
          // Ideally: backend will parse file (async) and set project.boundary. Poll project until boundary populated.
        } catch (err: unknown) {
          // safe error handling - no 'any'
          if (err instanceof Error) {
            console.warn("Boundary file upload failed:", err.message);
          } else {
            console.warn("Boundary file upload failed:", String(err));
          }
        }
      }

      // 3) Trigger AI layout generation
      if (projectId) {
        const genResp = await projectsApi.generateLayout(projectId);
        const genData = genResp as unknown;

        // examine possible shapes
        // prefer a typed interface on the API helper in future
        const remainderSqft =
          (genData as { remainder_sqft?: number })?.remainder_sqft ??
          (genData as { data?: { remainder_sqft?: number } })?.data?.remainder_sqft;

        const taskId =
          (genData as { task_id?: string })?.task_id ??
          (genData as { data?: { task_id?: string } })?.data?.task_id;

        if (typeof remainderSqft === "number") {
          setRemainderInfo({ sqft: remainderSqft });
          setShowRemainderModal(true);
        } else if (typeof taskId === "string") {
          // TODO: replace with a real polling solution
          navigate(`/dashboard/plot-layout?project=${projectId}&task=${taskId}`);
        } else {
          navigate(`/dashboard/plot-layout?project=${projectId}`);
        }
      } else {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      // safe error handling
      if (err instanceof Error) {
        console.error("Create project failed", err.message);
        alert(err.message || "Failed to create project");
      } else {
        console.error("Create project failed", String(err));
        alert("Failed to create project");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemainderOption = async (option: (typeof remainderOptions)[number]["value"]) => {
    setRemainderLoading(true);
    try {
      // Call your backend to apply the chosen remainder strategy to project layout
      // Example: POST /projects/{id}/mutations/{mid}/remainder?action=custom-plot
      // For now we simulate a wait and then navigate.
      await new Promise((r) => setTimeout(r, 1200));
      setShowRemainderModal(false);
      navigate("/dashboard/plot-layout");
    } catch (err: unknown) {
      console.error(err);
    } finally {
      setRemainderLoading(false);
    }
  };

  return (
    <div className="py-8 px-2 md:px-4 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary">New Subdivision Project</h1>
      <p className="text-muted-foreground mb-6">
        Define the boundaries of the new subdivision project using one of the methods below.
      </p>

      {/* Upload Boundary Files */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Upload Boundary Files</h2>
        <label className="block mb-1 text-sm font-medium">Upload Files (KML, GeoJSON, SHP)</label>
        <input type="file" className="block w-full border rounded p-2 mb-2" multiple={false} onChange={handleFileChange} />
        <div className="text-xs text-muted-foreground">
          Prefer drawing on the map for faster results. File uploads are parsed asynchronously.
        </div>
      </div>

      {/* Manual Coordinate Entry */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Manual Coordinate Entry</h2>
        <label className="block mb-1 text-sm font-medium">Enter Coordinates</label>
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows={3}
          placeholder="Enter coordinates in a comma-separated format (e.g., latitude, longitude)"
          onBlur={(e) => {
            const text = e.target.value.trim();
            if (!text) return;

            const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

            // map into tuple or null, then filter with a type guard
            const mapped: ([number, number] | null)[] = lines.map((ln) => {
              const parts = ln.split(",").map((s) => s.trim());
              if (parts.length < 2) return null;
              const lat = Number(parts[0]);
              const lon = Number(parts[1]);
              if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
              return [lon, lat] as [number, number]; // GeoJSON order is [lon, lat]
            });

            // type guard to filter out nulls
            const coords: [number, number][] = mapped.filter(
              (c): c is [number, number] => c !== null
            );

            if (coords.length >= 3) {
              // ensure polygon closed
              const first = coords[0];
              const last = coords[coords.length - 1];
              if (first[0] !== last[0] || first[1] !== last[1]) {
                coords.push(first);
              }
              // create a minimal Polygon geometry
              setBoundaryGeoJson({ type: "Polygon", coordinates: [coords] });
            }
          }}
        />
        <div className="text-xs text-muted-foreground">
          Tip: paste each point on a new line as `lat, lon` and leave the map draw tool for fine adjustments.
        </div>
      </div>

      {/* Subdivision Preferences Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Subdivision Preferences</h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block font-medium mb-1">Project Name</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Project name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Plot Size (sq ft)</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter plot size" value={plotSize} onChange={(e) => setPlotSize(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Shape Preference</label>
            <select className="w-full border rounded px-3 py-2" value={shapePref} onChange={(e) => setShapePref(e.target.value)}>
              <option value="">Select shape</option>
              <option value="rectangular">Rectangle</option>
              <option value="square">Square</option>
              <option value="irregular">Irregular</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Number of Plots</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter number of plots" value={numPlots} onChange={(e) => setNumPlots(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Minimum Road Width (ft)</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter minimum road width" value={roadWidth} onChange={(e) => setRoadWidth(e.target.value)} />
            <div className="text-xs text-muted-foreground mt-1">Road width can be adjusted later using the Road Sketch tool on the map.</div>
          </div>

          <div>
            <label className="block font-medium mb-1">Setback Percentage (%)</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter setback percentage" value={setback} onChange={(e) => setSetback(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Zoning</label>
            <div className="flex flex-col gap-2 pl-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={zoning.residential} onChange={(e) => setZoning({ ...zoning, residential: e.target.checked })} /> Residential
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={zoning.commercial} onChange={(e) => setZoning({ ...zoning, commercial: e.target.checked })} /> Commercial
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" checked={zoning.public} onChange={(e) => setZoning({ ...zoning, public: e.target.checked })} /> Public
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="mt-2 px-6 py-2 bg-primary text-white rounded hover:bg-primary-hover transition self-end" onClick={() => alert("Preferences saved locally. Draw or upload boundary then create project.")}>
              Save Preferences
            </button>
          </div>
        </form>
      </div>

      {/* Draw on Map */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Draw on Map</h2>
        <div className="w-full aspect-video bg-muted flex items-center justify-center rounded border mb-2">
          <div style={{ width: "100%", height: 480 }}>
            <MapCanvas onBoundaryCreate={handleBoundaryCreate} initialBoundary={boundaryGeoJson ?? undefined} />
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-2">Total Area: {boundaryGeoJson ? "calculated on server" : "0 sq ft"}</div>
      </div>

      <div className="flex justify-end">
        <button className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded shadow hover:scale-105 transition font-semibold text-lg" onClick={handleCreateProject} disabled={creating || submitting}>
          {creating || submitting ? "Creating..." : "Create Project"}
        </button>
      </div>

      {/* Creating spinner modal */}
      {(creating || submitting) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center gap-4">
            <span className="text-2xl font-bold text-primary">AI is analyzing your details...</span>
            <span className="text-muted-foreground">It will generate a layout shortly.</span>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      )}

      {/* Remainder modal */}
      {showRemainderModal && remainderInfo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 max-w-md w-full border border-primary/20">
            <span className="text-2xl font-bold text-primary mb-2">Remainder Land Detected!</span>
            <div className="text-muted-foreground text-center mb-2 text-base">
              <div className="mb-2">AI noticed your land can't be divided evenly. <span className="text-primary font-semibold">{remainderInfo.sqft} sq. meters</span> remain unallocated.</div>
              <div className="mb-2">How would you like to handle this leftover land?</div>
            </div>
            <div className="w-full space-y-2">
              {remainderOptions.map((opt) => (
                <button key={opt.value} className="w-full px-4 py-2 rounded-lg border font-medium hover:bg-primary/10 transition text-left shadow-sm" onClick={() => handleRemainderOption(opt.value)} disabled={remainderLoading}>
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground mt-2 italic">You'll get a preview before final confirmation.</div>
            {remainderLoading && (
              <div className="flex flex-col items-center gap-2 mt-4">
                <span className="text-primary font-semibold">AI is finalizing your layout...</span>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSubdivision;
