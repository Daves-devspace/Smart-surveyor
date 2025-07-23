import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const remainderOptions = [
  {
    label: "Add to one plot (e.g., make Plot 4 larger)",
    value: "add-to-plot"
  },
  {
    label: "Create a small custom plot",
    value: "custom-plot"
  },
  {
    label: "Reserve for public use (green area)",
    value: "public-use"
  },
  {
    label: "Leave as undeveloped",
    value: "undeveloped"
  }
];

const NewSubdivision = () => {
  const [loading, setLoading] = useState(false);
  const [showRemainderModal, setShowRemainderModal] = useState(false);
  const [remainderLoading, setRemainderLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowRemainderModal(true);
    }, 2200);
  };

  const handleRemainderOption = (option: string) => {
    setRemainderLoading(true);
    setTimeout(() => {
      setRemainderLoading(false);
      setShowRemainderModal(false);
      navigate("/dashboard/plot-layout");
    }, 1800);
  };

  return (
    <div className="py-8 px-2 md:px-4 w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-primary">New Subdivision Project</h1>
      <p className="text-muted-foreground mb-6">Define the boundaries of the new subdivision project using one of the methods below.</p>
      {/* Upload Boundary Files */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Upload Boundary Files</h2>
        <label className="block mb-1 text-sm font-medium">Upload Files (KML, GeoJSON, SHP)</label>
        <input type="file" className="block w-full border rounded p-2 mb-2" multiple />
      </div>
      {/* Manual Coordinate Entry */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Manual Coordinate Entry</h2>
        <label className="block mb-1 text-sm font-medium">Enter Coordinates</label>
        <textarea className="w-full border rounded p-2 mb-2" rows={3} placeholder="Enter coordinates in a comma-separated format (e.g., latitude, longitude)" />
      </div>
      {/* Subdivision Preferences Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Subdivision Preferences</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Plot Size (sq ft)</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter plot size" />
          </div>
          <div>
            <label className="block font-medium mb-1">Shape Preference</label>
            <select className="w-full border rounded px-3 py-2">
              <option value="">Select shape</option>
              <option value="rectangle">Rectangle</option>
              <option value="square">Square</option>
              <option value="irregular">Irregular</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Number of Plots</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter number of plots" />
          </div>
          <div>
            <label className="block font-medium mb-1">Minimum Road Width (ft)</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter minimum road width" />
          </div>
          <div>
            <label className="block font-medium mb-1">Setback Percentage (%)</label>
            <input className="w-full border rounded px-3 py-2" placeholder="Enter setback percentage" />
          </div>
          <div>
            <label className="block font-medium mb-1">Zoning</label>
            <div className="flex flex-col gap-2 pl-1">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" defaultChecked /> Residential
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" /> Commercial
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-primary" /> Public
              </label>
            </div>
          </div>
          <button type="button" className="mt-2 px-6 py-2 bg-primary text-white rounded hover:bg-primary-hover transition self-end">Save Preferences</button>
        </form>
      </div>
      {/* Draw on Map */}
      <div className="bg-white rounded-lg shadow p-6 mb-2">
        <h2 className="text-xl font-semibold mb-4 text-primary">Draw on Map</h2>
        <div className="w-full aspect-video bg-muted flex items-center justify-center rounded border mb-2">
          <span className="text-muted-foreground">[Map Placeholder]</span>
        </div>
        <div className="text-xs text-muted-foreground mt-2">Total Area: 0 sq ft</div>
      </div>
      <div className="flex justify-end">
        <button
          className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded shadow hover:scale-105 transition font-semibold text-lg"
          onClick={handleCreateProject}
          disabled={loading || showRemainderModal}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center gap-4">
            <span className="text-2xl font-bold text-primary">AI is analyzing your details...</span>
            <span className="text-muted-foreground">It will generate a layout shortly.</span>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      )}
      {showRemainderModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 max-w-md w-full border border-primary/20">
            <span className="text-2xl font-bold text-primary mb-2">Remainder Land Detected!</span>
            <div className="text-muted-foreground text-center mb-2 text-base">
              <div className="mb-2">AI noticed your land can't be divided evenly. <span className="text-primary font-semibold">72 sq. meters</span> remain unallocated.</div>
              <div className="mb-2">How would you like to handle this leftover land?</div>
            </div>
            <div className="w-full space-y-2">
              {remainderOptions.map(opt => (
                <button
                  key={opt.value}
                  className="w-full px-4 py-2 rounded-lg border font-medium hover:bg-primary/10 transition text-left shadow-sm"
                  onClick={() => handleRemainderOption(opt.value)}
                  disabled={remainderLoading}
                >
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