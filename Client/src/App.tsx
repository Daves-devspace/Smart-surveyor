import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NewSubdivision from "./pages/NewSubdivision";
import RemainderLandOptions from "./pages/RemainderLandOptions";
import PlotLayout from "./pages/PlotLayout";
import PlotDetails from "./pages/PlotDetails";
import Projects from "./pages/Projects";
import PlotSearch from "./pages/PlotSearch";
import Profile from "./pages/Profile";
import { AuthProvider } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/DashboardOverview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard/*" element={
            <AuthProvider>
              <DashboardLayout />
            </AuthProvider>
          }>
            <Route index element={<DashboardOverview />} />
            <Route path="projects" element={<Projects />} />
            <Route path="plot-search" element={<PlotSearch />} />
            <Route path="new-subdivision" element={<NewSubdivision />} />
            <Route path="plot-layout" element={<PlotLayout />} />
            <Route path="profile" element={<Profile />} />
            {/* Add other dashboard subpages here */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
