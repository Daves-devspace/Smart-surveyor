import React from "react";
import { MapPin } from "lucide-react";

const results = [
  {
    id: 1,
    plot: "WP3-015",
    project: "Westlands Phase 3",
    size: "50x100 ft • 0.116 acres",
    owner: "John Doe",
    verified: true,
    location: "Nairobi, Kenya"
  },
  {
    id: 2,
    plot: "KG-022",
    project: "Karen Gardens Estate",
    size: "60x120 ft • 0.165 acres",
    owner: "Jane Smith",
    verified: true,
    location: "Nairobi, Kenya"
  },
  {
    id: 3,
    plot: "KH-038",
    project: "Kiambu Hills",
    size: "45x90 ft • 0.093 acres",
    owner: "Private",
    verified: true,
    location: "Kiambu, Kenya"
  }
];

const PlotSearch = () => (
  <div className="py-8 px-2 md:px-4 w-full max-w-4xl mx-auto space-y-8">
    <h1 className="text-xl font-bold mb-4">Plot Search & Registry</h1>
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <form className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Search by Plot Number</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g., WP3-001" />
        </div>
        <div>
          <label className="block font-medium mb-1">Title Deed Number</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g., NRB/12345" />
        </div>
        <div>
          <label className="block font-medium mb-1">GPS Coordinates</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g., -1.2921, 36.8219" />
        </div>
        <div>
          <label className="block font-medium mb-1">Project Name</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g., Westlands Phase 3" />
        </div>
        <div>
          <label className="block font-medium mb-1">Location</label>
          <input className="w-full border rounded px-3 py-2" placeholder="e.g., Nairobi, Kenya" />
        </div>
        <button type="submit" className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2 font-semibold">
          <span className="material-icons">search</span> Search Registry
        </button>
      </form>
    </div>
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Search Results (3 plots found)</h2>
      <div className="divide-y">
        {results.map((plot) => (
          <div key={plot.id} className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 rounded-lg p-3">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-base">Plot {plot.plot}</div>
                <div className="text-sm text-muted-foreground">{plot.project}</div>
                <div className="text-xs text-muted-foreground">{plot.size}</div>
              </div>
            </div>
            <div className="flex flex-col md:items-end gap-1">
              <div className="text-sm">Owner: {plot.owner}</div>
              <div className="text-xs text-green-700">Verified ✓</div>
              <button className="mt-1 px-4 py-1 rounded bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition text-sm">View on Map</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PlotSearch; 