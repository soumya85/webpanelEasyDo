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
import EmployeeRegister from "./pages/EmployeeRegister";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <UserProvider>
          <SidebarProvider>
            <PageLayout>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/todays-schedule" element={<TodaysSchedule />} />
                <Route
                  path="/employee-dashboard"
                  element={<EmployeeDashboard />}
                />
                <Route
                  path="/company-dashboard"
                  element={<CompanyDashboard />}
                /><Route
                  path="/employee-register"
                  element={<EmployeeRegister />}
                />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/meet" element={<Meet />} />
                <Route path="/notes-reminder" element={<NotesReminder />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/help-support" element={<HelpSupport />} />
                <Route path="/profile" element={<Profile />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageLayout>
          </SidebarProvider>
        </UserProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
