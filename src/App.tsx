import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./hooks/useSidebar";
import { UserProvider } from "./hooks/useUser";
import { PageLayout } from "./components/layout/PageLayout";
import Overview from "./pages/Overview";
import Chats from "./pages/Chats";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserProvider>
          <SidebarProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PageLayout>
                    <Overview />
                  </PageLayout>
                }
              />
              <Route path="/chats" element={<Chats />} />
              <Route
                path="/todays-schedule"
                element={
                  <PageLayout>
                    <TodaysSchedule />
                  </PageLayout>
                }
              />
              <Route
                path="/employee-dashboard"
                element={
                  <PageLayout>
                    <EmployeeDashboard />
                  </PageLayout>
                }
              />
              <Route
                path="/company-dashboard"
                element={
                  <PageLayout>
                    <CompanyDashboard />
                  </PageLayout>
                }
              />
              <Route
                path="/tasks"
                element={
                  <PageLayout>
                    <Tasks />
                  </PageLayout>
                }
              />
              <Route
                path="/meet"
                element={
                  <PageLayout>
                    <Meet />
                  </PageLayout>
                }
              />
              <Route
                path="/notes-reminder"
                element={
                  <PageLayout>
                    <NotesReminder />
                  </PageLayout>
                }
              />
              <Route
                path="/reports"
                element={
                  <PageLayout>
                    <Reports />
                  </PageLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <PageLayout>
                    <Settings />
                  </PageLayout>
                }
              />
              <Route
                path="/help-support"
                element={
                  <PageLayout>
                    <HelpSupport />
                  </PageLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <PageLayout>
                    <Profile />
                  </PageLayout>
                }
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route
                path="*"
                element={
                  <PageLayout>
                    <NotFound />
                  </PageLayout>
                }
              />
            </Routes>
          </SidebarProvider>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
