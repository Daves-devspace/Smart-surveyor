import React from "react";

const PlotLayout = () => (
  <div className="py-8 px-2 md:px-4 w-full max-w-6xl mx-auto">
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="md:w-80 w-full flex-shrink-0 space-y-6">
        <div className="bg-white rounded-lg shadow p-4">
          <input
            className="w-full border rounded px-3 py-2 mb-4"
            placeholder="Plot 123"
            defaultValue="Plot 123"
            readOnly
          />
          <div className="mb-4">
            <img
              src="https://maps.wikimedia.org/img/osm-intl,13,37.7749,-122.4194,300x150.png"
              alt="Map preview"
              className="rounded w-full h-32 object-cover mb-2"
            />
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Plot Details</h3>
            <div className="text-sm mb-1">Plot ID: <span className="font-medium">123</span></div>
            <div className="text-sm mb-1">Area: <span className="font-medium">1000 sq ft</span></div>
            <div className="text-sm mb-1">Perimeter: <span className="font-medium">400 ft</span></div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Project Details</h3>
            <div className="text-sm mb-1">Project Name: <span className="font-medium">Green Acres Subdivision</span></div>
            <div className="text-sm mb-1">Subdivision Date: <span className="font-medium">2024-01-15</span></div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Download Layout</h3>
            <div className="flex flex-col gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 text-left font-medium">Download PDF</button>
              <button className="bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 text-left font-medium">Download CAD</button>
              <button className="bg-gray-100 hover:bg-gray-200 rounded px-4 py-2 text-left font-medium">Download SHP</button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 space-y-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Plot 123 Details</h1>
          <div className="text-lg text-muted-foreground mb-2">Green Acres Subdivision</div>
          <img
            src="/plot.gif"
            alt="AI Generated Layout"
            className="rounded-lg w-full h-72 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Plot Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>Plot ID: <span className="font-medium">123</span></div>
            <div>Area: <span className="font-medium">1000 sq ft</span></div>
            <div>Perimeter: <span className="font-medium">400 ft</span></div>
            <div>Coordinates: <span className="font-medium">Lat: 34.0522, Long: -118.2437</span></div>
            <div>Address: <span className="font-medium">123 Oak Street, Anytown, CA</span></div>
            <div>Legal Description: <span className="font-medium">Lot 1, Block A, Green Acres Subdivision</span></div>
            <div>Zoning: <span className="font-medium">Residential</span></div>
            <div>Land Use: <span className="font-medium">Single-Family Home</span></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>Project Name: <span className="font-medium">Green Acres Subdivision</span></div>
            <div>Subdivision Date: <span className="font-medium">2024-01-15</span></div>
            <div>Surveyor: <span className="font-medium">Surveying Solutions Inc.</span></div>
            <div>Project ID: <span className="font-medium">456789</span></div>
            <div>Total Plots: <span className="font-medium">50</span></div>
            <div>Approval Status: <span className="font-medium">Approved</span></div>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="mt-4 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded shadow hover:scale-105 transition font-semibold text-lg">Approve Layout</button>
        </div>
      </div>
    </div>
  </div>
);

export default PlotLayout; 