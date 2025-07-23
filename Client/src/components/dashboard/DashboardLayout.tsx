import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  Plus, 
  Bell, 
  LogOut,
  Layers
} from "lucide-react";

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Layers className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">SurveyPro</h1>
              <p className="text-xs text-muted-foreground">Professional Dashboard</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => navigate("/dashboard")}
              className={`text-sm font-medium transition-colors ${
                window.location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate("/dashboard/projects")}
              className={`text-sm font-medium transition-colors ${
                window.location.pathname === "/dashboard/projects" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => navigate("/dashboard/plot-search")}
              className={`text-sm font-medium transition-colors ${
                window.location.pathname === "/dashboard/plot-search" ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Plot Search
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.organization}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="container py-8">
        <Outlet />
      </div>
    </div>
  );
};