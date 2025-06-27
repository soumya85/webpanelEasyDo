import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SidebarProvider } from "./hooks/useSidebar";
import { UserProvider } from "./hooks/useUser";
import { PageLayout } from "./components/layout/PageLayout";
import Sample from "./pages/Overview";
import ChatsSimple from "./pages/ChatsSimple";
import TodaysSchedule from "./pages/TodaysSchedule";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import Tasks from "./pages/Tasks";
import Meet from "./pages/Meet";
import NotesReminder from "./pages/NotesReminder";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import EmployeeRegister from "./pages/EmployeeRegister";
import PerformanceReview from "@/pages/PerformanceReview";
import EmployeeLocation from "@/pages/EmployeeLocation";
import BranchManagement from "@/pages/BranchManagement";
import Announcement from "@/pages/Announcement";
import Documents from "@/pages/Documents";
import Leave from "@/pages/Leave";
import Holiday from "@/pages/Holiday";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import OTPVerification from "@/pages/OTPVerification";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

// Component to handle conditional layout based on route
const AppContent = () => {
  return (
    <Routes>
      {/* Public routes (no authentication required) */}
      <Route path="/login" element={<Login />} />
      <Route path="/otp-verification" element={<OTPVerification />} />

      {/* Protected routes (authentication required) */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <UserProvider>
              <SidebarProvider>
                <PageLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chats" element={<ChatsSimple />} />
                    <Route
                      path="/todays-schedule"
                      element={<TodaysSchedule />}
                    />
                    <Route
                      path="/employee-dashboard"
                      element={<EmployeeDashboard />}
                    />
                    <Route
                      path="/company-dashboard"
                      element={<CompanyDashboard />}
                    />
                    <Route
                      path="/employee-register"
                      element={<EmployeeRegister />}
                    />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/meet" element={<Meet />} />
                    <Route path="/holiday" element={<Holiday />} />
                    <Route path="/sample" element={<Sample />} />
                    <Route path="/help-support" element={<HelpSupport />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route
                      path="/performance-review"
                      element={<PerformanceReview />}
                    />
                    <Route path="/location" element={<EmployeeLocation />} />
                    <Route path="/branch" element={<BranchManagement />} />
                    <Route path="/announcement" element={<Announcement />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/leave" element={<Leave />} />
                    <Route path="/notes-reminder" element={<NotesReminder />} />
                    <Route path="/reports" element={<Reports />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </PageLayout>
              </SidebarProvider>
            </UserProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
