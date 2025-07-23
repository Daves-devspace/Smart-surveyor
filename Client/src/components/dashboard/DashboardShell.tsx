import React from "react";
import { Outlet, Routes, Route, useNavigate } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarHeader, SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import { Layers } from "lucide-react";
import { DashboardLayout } from "./DashboardLayout";
import NewSubdivision from "@/pages/NewSubdivision";
import RemainderLandOptions from "@/pages/RemainderLandOptions";
import PlotLayout from "@/pages/PlotLayout";
import PlotDetails from "@/pages/PlotDetails";
import Projects from "@/pages/Projects";
import PlotSearch from "@/pages/PlotSearch";
import Profile from "@/pages/Profile";
import { AuthProvider } from "@/hooks/useAuth";

const DashboardShell = () => {
  const navigate = useNavigate();
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-muted/30">
          <Sidebar className="bg-primary">
            <SidebarHeader>
              <div className="flex items-center gap-2 px-2 py-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Layers className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-white">SurveyPro</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/dashboard")}>Dashboard</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/dashboard/new-subdivision")}>New Subdivision</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/dashboard/projects")}>Projects</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/dashboard/plot-search")}>Plot Search</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/dashboard/notifications")}>Notifications</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => navigate("/dashboard/profile")}>Profile</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarSeparator />
              <div className="px-2 py-4 text-xs text-white">&copy; 2025 SurveyPro</div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 min-h-screen">
            <Routes>
              <Route path="" element={<DashboardLayout />} />
              <Route path="new-subdivision" element={<NewSubdivision />} />
              <Route path="remainder-options" element={<RemainderLandOptions />} />
              <Route path="plot-layout" element={<PlotLayout />} />
              <Route path="plot-details" element={<PlotDetails />} />
              <Route path="projects" element={<Projects />} />
              <Route path="plot-search" element={<PlotSearch />} />
              <Route path="profile" element={<Profile />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default DashboardShell; 