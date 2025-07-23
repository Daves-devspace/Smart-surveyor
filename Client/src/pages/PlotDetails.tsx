import React from "react";

const PlotDetails = () => (
  <div className="container mx-auto py-8 px-2 max-w-4xl">
    <h1 className="text-3xl font-bold mb-2">Plot 123 Details</h1>
    <p className="text-muted-foreground mb-6">Green Acres Subdivision</p>
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <div className="w-full aspect-square bg-muted flex items-center justify-center rounded border mb-4">
          <span className="text-muted-foreground">[Map/Image Placeholder]</span>
        </div>
        <div className="bg-background rounded border p-4 mb-4">
          <h2 className="font-semibold mb-2">Plot Details</h2>
          <div className="text-sm mb-2">Plot ID: 123</div>
          <div className="text-sm mb-2">Area: 1000 sq ft</div>
          <div className="text-sm mb-2">Perimeter: 400 ft</div>
        </div>
        <div className="bg-background rounded border p-4 mb-4">
          <h2 className="font-semibold mb-2">Project Details</h2>
          <div className="text-sm mb-2">Project Name: Green Acres Subdivision</div>
          <div className="text-sm mb-2">Subdivision Date: 2024-01-15</div>
        </div>
        <div className="bg-background rounded border p-4 mb-4">
          <h2 className="font-semibold mb-2">Download Layout</h2>
          <button className="border rounded px-4 py-2 mb-2 w-full">Download PDF</button>
          <button className="border rounded px-4 py-2 mb-2 w-full">Download CAD</button>
          <button className="border rounded px-4 py-2 w-full">Download SHP</button>
        </div>
      </div>
      <div className="flex-1">
        <div className="bg-background rounded border p-4 mb-4">
          <h2 className="font-semibold mb-2">Plot Information</h2>
          <div className="text-sm mb-2">Plot ID: 123</div>
          <div className="text-sm mb-2">Area: 1000 sq ft</div>
          <div className="text-sm mb-2">Perimeter: 400 ft</div>
          <div className="text-sm mb-2">Coordinates: Lat: 34.0522, Long: -118.2437</div>
          <div className="text-sm mb-2">Address: 123 Oak Street, Anytown, CA</div>
          <div className="text-sm mb-2">Legal Description: Lot 1, Block A, Green Acres Subdivision</div>
          <div className="text-sm mb-2">Zoning: Residential</div>
          <div className="text-sm mb-2">Land Use: Single-Family Home</div>
        </div>
        <div className="bg-background rounded border p-4 mb-4">
          <h2 className="font-semibold mb-2">Project Information</h2>
          <div className="text-sm mb-2">Project Name: Green Acres Subdivision</div>
          <div className="text-sm mb-2">Subdivision Date: 2024-01-15</div>
          <div className="text-sm mb-2">Surveyor: Surveying Solutions Inc.</div>
          <div className="text-sm mb-2">Project ID: 456789</div>
          <div className="text-sm mb-2">Total Plots: 50</div>
          <div className="text-sm mb-2">Approval Status: Approved</div>
        </div>
        <div className="bg-background rounded border p-4 mb-4">
          <h2 className="font-semibold mb-2">Layout Files</h2>
          <table className="w-full text-sm border rounded">
            <thead>
              <tr>
                <th className="border px-2 py-1">File Type</th>
                <th className="border px-2 py-1">Description</th>
                <th className="border px-2 py-1">Download</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">PDF</td>
                <td className="border px-2 py-1">Detailed plot layout</td>
                <td className="border px-2 py-1"><button className="underline">Download</button></td>
              </tr>
              <tr>
                <td className="border px-2 py-1">CAD</td>
                <td className="border px-2 py-1">CAD file for engineering</td>
                <td className="border px-2 py-1"><button className="underline">Download</button></td>
              </tr>
              <tr>
                <td className="border px-2 py-1">SHP</td>
                <td className="border px-2 py-1">Shapefile for GIS</td>
                <td className="border px-2 py-1"><button className="underline">Download</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

export default PlotDetails; 