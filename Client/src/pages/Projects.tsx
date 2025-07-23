import React from "react";

const projects = [
  {
    id: 1,
    name: "Westfield Subdivision",
    location: "Nairobi, Kenya",
    plots: 24,
    status: "In Progress",
  },
  {
    id: 2,
    name: "Industrial Park Phase 2",
    location: "Mombasa, Kenya",
    plots: 12,
    status: "Completed",
  },
  {
    id: 3,
    name: "Residential Complex A",
    location: "Kisumu, Kenya",
    plots: 36,
    status: "Under Review",
  },
];

const statusColor = (status: string) => {
  if (status === "Completed") return "bg-blue-700 text-white";
  if (status === "In Progress") return "bg-muted text-gray-700";
  return "bg-gray-200 text-gray-700";
};

const Projects = () => (
  <div className="py-8 px-2 md:px-4 w-full max-w-4xl mx-auto space-y-8">
    <h1 className="text-2xl font-bold mb-4 text-primary">Projects</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-2 font-semibold">Project Name</th>
            <th className="py-2 px-2 font-semibold">Location</th>
            <th className="py-2 px-2 font-semibold">Plots</th>
            <th className="py-2 px-2 font-semibold">Status</th>
            <th className="py-2 px-2 font-semibold"></th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b hover:bg-muted/50 transition-colors">
              <td className="py-3 px-2 font-medium">{project.name}</td>
              <td className="py-3 px-2">{project.location}</td>
              <td className="py-3 px-2">{project.plots}</td>
              <td className="py-3 px-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(project.status)}`}>
                  {project.status}
                </span>
              </td>
              <td className="py-3 px-2 text-right">
                <button className="px-4 py-1 rounded bg-primary text-white font-semibold hover:bg-primary-hover transition text-sm">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default Projects; 