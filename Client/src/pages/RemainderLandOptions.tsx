import React from "react";

const RemainderLandOptions = () => (
  <div className="container mx-auto py-8 px-2 max-w-3xl">
    <h1 className="text-3xl font-bold mb-2">Remainder Land Options</h1>
    <p className="text-muted-foreground mb-6">After generating the initial plot layout, our AI has detected a remainder area that cannot form a standard plot. Please select an option to handle this area.</p>
    <div className="mb-6">
      <h2 className="font-semibold mb-2">Option 1: Add to Existing Plot</h2>
      <div className="w-full aspect-video bg-muted flex items-center justify-center rounded border mb-2">
        <span className="text-muted-foreground">[Image Placeholder]</span>
      </div>
      <button className="mb-4 px-4 py-2 border rounded">Select Option 1</button>
      <h2 className="font-semibold mb-2">Option 2: Create Custom Plot</h2>
      <div className="w-full aspect-video bg-muted flex items-center justify-center rounded border mb-2">
        <span className="text-muted-foreground">[Image Placeholder]</span>
      </div>
      <button className="mb-4 px-4 py-2 border rounded">Select Option 2</button>
      <h2 className="font-semibold mb-2">Option 3: Reserve for Public Use</h2>
      <div className="w-full aspect-video bg-muted flex items-center justify-center rounded border mb-2">
        <span className="text-muted-foreground">[Image Placeholder]</span>
      </div>
      <button className="mb-4 px-4 py-2 border rounded">Select Option 3</button>
      <h2 className="font-semibold mb-2">Option 4: Leave Undeveloped</h2>
      <div className="w-full aspect-video bg-muted flex items-center justify-center rounded border mb-2">
        <span className="text-muted-foreground">[Image Placeholder]</span>
      </div>
      <button className="mb-4 px-4 py-2 border rounded">Select Option 4</button>
    </div>
    <div className="flex gap-2">
      <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-hover transition">Confirm Selection</button>
      <button className="px-6 py-2 border rounded">Cancel</button>
    </div>
  </div>
);

export default RemainderLandOptions; 