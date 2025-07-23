import React from "react";
import { FolderOpen, MapPin, FileText, Users, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const stats = [
  {
    title: "Total Projects",
    value: "23",
    change: "+12%",
    icon: <FolderOpen className="h-5 w-5" />,
    description: "+12% from last month"
  },
  {
    title: "Plots Created",
    value: "1,247",
    change: "+18%",
    icon: <MapPin className="h-5 w-5" />,
    description: "+18% from last month"
  },
  {
    title: "Compliance Rate",
    value: "98.5%",
    change: "+2.1%",
    icon: <FileText className="h-5 w-5" />,
    description: "+2.1% from last month"
  },
  {
    title: "Active Clients",
    value: "15",
    change: "+5%",
    icon: <Users className="h-5 w-5" />,
    description: "+5% from last month"
  }
];

const projects = [
  {
    id: 1,
    name: "Westfield Subdivision",
    location: "Nairobi, Kenya",
    plots: 24,
    status: "In Progress",
    updated: "2 hours ago"
  },
  {
    id: 2,
    name: "Industrial Park Phase 2",
    location: "Mombasa, Kenya",
    plots: 12,
    status: "Completed",
    updated: "1 day ago"
  }
];

const DashboardOverview = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-1">Welcome back, John Surveyor</h2>
          <p className="text-muted-foreground text-base">Ready to create your next subdivision project?</p>
        </div>
        <Button
          variant="hero"
          size="lg"
          className="px-6"
          onClick={() => navigate("/dashboard/new-subdivision")}
        >
          <Plus className="h-5 w-5 mr-2" /> New Subdivision
        </Button>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
              <span className="text-muted-foreground">{stat.icon}</span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              {stat.description}
            </div>
          </div>
        ))}
      </div>
      {/* Recent Projects & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">Recent Projects</h3>
                <p className="text-muted-foreground text-sm">Your latest subdivision projects and their status</p>
              </div>
              <Button variant="outline" size="sm">
                <FolderOpen className="h-4 w-4 mr-2" /> View All
              </Button>
            </div>
            <div className="space-y-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{project.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {project.location}
                      </span>
                      <span>{project.plots} plots</span>
                      <span>{project.updated}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === "Completed" ? "bg-blue-700 text-white" : "bg-muted text-gray-700"}`}>
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-2">Quick Actions</h3>
            <p className="text-muted-foreground text-sm mb-4">Common tasks and shortcuts</p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" /> Create Subdivision
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" /> Search Plots
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" /> Export Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" /> Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 