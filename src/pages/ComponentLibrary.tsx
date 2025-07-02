import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ChevronDown, Calendar } from "lucide-react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { ComponentSection } from "@/components/docs/ComponentSection";
import { ComponentShowcase } from "@/components/docs/ComponentShowcase";
import PerformanceMeter from "@/components/PerformanceMeter";
import AttendanceSummary from "@/components/AttendanceSummary";
import WagesSummary from "@/components/WagesSummary";
import LeaveBalance from "@/components/LeaveBalance";
import UpcomingHolidays from "@/components/UpcomingHolidays";
import { AttendanceCard } from "@/components/cards/AttendanceCard";
import EmployeeAttendanceCard from "@/components/cards/EmployeeAttendanceCard";

// Standalone Company Attendance Component for demo purposes
const CompanyAttendanceDemo = () => {
  return (
    <div className="w-full h-full">
      <div className="bg-white rounded-[10px] border-b-[6px] border-[#4766E5] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)] p-4 flex flex-col h-full min-h-[280px]">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-green-50">
            <Calendar className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-sm font-semibold text-[#283C50]">
            Monthly Attendance Summary
          </h3>
        </div>

        <div className="text-xs text-gray-600 mb-3">- June 2025</div>
        <div className="text-xs text-gray-600 mb-4">
          Total Days: 30 | Working Days: 22
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="text-center p-2 bg-green-50 rounded">
            <div className="text-lg font-bold text-green-600">22</div>
            <div className="text-xs text-green-600">Present</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded">
            <div className="text-lg font-bold text-red-600">0</div>
            <div className="text-xs text-red-600">Absent</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="text-lg font-bold text-blue-600">5</div>
            <div className="text-xs text-blue-600">Sunday</div>
          </div>
          <div className="text-center p-2 bg-orange-50 rounded">
            <div className="text-lg font-bold text-orange-600">3</div>
            <div className="text-xs text-orange-600">Holiday</div>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded">
            <div className="text-lg font-bold text-purple-600">0</div>
            <div className="text-xs text-purple-600">Late</div>
          </div>
          <div className="text-center p-2 bg-pink-50 rounded">
            <div className="text-lg font-bold text-pink-600">0</div>
            <div className="text-xs text-pink-600">Red Flag</div>
          </div>
        </div>

        <Button
          className="w-full h-8 text-xs text-gray-700 hover:opacity-90"
          style={{
            backgroundColor: "#eff5ff",
            borderColor: "#bfdbfe",
            borderWidth: "1px",
          }}
        >
          View Detailed Report
        </Button>
      </div>
    </div>
  );
};

export default function ComponentLibrary() {
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Head Office");
  const [dashboardType, setDashboardType] = useState("employee");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Component Library
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              A comprehensive collection of reusable UI components built with
              React, TypeScript, and TailwindCSS
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="productivity" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="productivity" className="text-base">
              Productivity Module
            </TabsTrigger>
            <TabsTrigger value="company" className="text-base">
              Company Module
            </TabsTrigger>
          </TabsList>

          {/* Productivity Module Tab */}
          <TabsContent value="productivity" className="space-y-8">
            {/* Add productivity components here */}
          </TabsContent>

          {/* Company Module Tab */}
          <TabsContent value="company" className="space-y-8">
            {/* Dashboard Type Selector */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Dashboard Components
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select the dashboard type to view relevant components
                </p>
              </div>
              <Select value={dashboardType} onValueChange={setDashboardType}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select dashboard type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Employee Dashboard</SelectItem>
                  <SelectItem value="company">Company Dashboard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Employee Dashboard Components */}
            {dashboardType === "employee" && (
              <>
                <ComponentSection
                  title="Employee Performance"
                  description="Components for tracking and displaying employee performance metrics"
                >
                  <ComponentShowcase
                    title="Performance Meter"
                    description="A comprehensive performance dashboard with gauge visualization and detailed metrics breakdown"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <PerformanceMeter />
                      </div>
                    }
                    code={`import PerformanceMeter from "@/components/PerformanceMeter";

export function EmployeePerformanceWidget() {
  return (
    <div className="w-full">
      <PerformanceMeter />
    </div>
  );
}`}
                    props={[
                      {
                        name: "overallScore",
                        type: "number",
                        default: "25.5",
                        description: "The overall performance score percentage",
                      },
                      {
                        name: "performanceData",
                        type: "Array<{category: string, percentage: number}>",
                        description:
                          "Array of performance categories and their scores",
                      },
                    ]}
                    variants={["default", "with-modal"]}
                  />
                </ComponentSection>

                <ComponentSection
                  title="Employee Attendance"
                  description="Components for tracking and displaying employee attendance data"
                >
                  <ComponentShowcase
                    title="Attendance Summary"
                    description="A comprehensive attendance dashboard with detailed metrics, calendar view, and interactive modal with analytics"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <AttendanceSummary />
                      </div>
                    }
                    code={`import AttendanceSummary from "@/components/AttendanceSummary";

export function EmployeeAttendanceWidget() {
  return (
    <div className="w-full">
      <AttendanceSummary />
    </div>
  );
}`}
                    props={[
                      {
                        name: "className",
                        type: "string",
                        default: "undefined",
                        description:
                          "Additional CSS classes for styling customization",
                      },
                      {
                        name: "data",
                        type: "AttendanceData",
                        description:
                          "Attendance data including present, absent, leave, late, holidays, and summary statistics",
                      },
                    ]}
                    variants={["default", "with-modal", "interactive"]}
                  />
                </ComponentSection>

                <ComponentSection
                  title="Employee Wages & Payroll"
                  description="Components for displaying employee salary, earnings, deductions, and payroll information"
                >
                  <ComponentShowcase
                    title="Wages Summary"
                    description="A comprehensive wages dashboard showing earnings, deductions, and net pay with detailed payslip modal"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <WagesSummary />
                      </div>
                    }
                    code={`import WagesSummary from "@/components/WagesSummary";

export function EmployeeWagesWidget() {
  return (
    <div className="w-full">
      <WagesSummary />
    </div>
  );
}`}
                    props={[
                      {
                        name: "className",
                        type: "string",
                        default: "undefined",
                        description:
                          "Additional CSS classes for styling customization",
                      },
                      {
                        name: "month",
                        type: "string",
                        default: "May 2025",
                        description:
                          "The month and year for which wages are displayed",
                      },
                      {
                        name: "wagesData",
                        type: "Array<{label: string, amount: string, color: string}>",
                        description:
                          "Array of wage components including earnings, deductions, and net pay",
                      },
                    ]}
                    variants={["default", "with-modal", "interactive"]}
                  />
                </ComponentSection>

                <ComponentSection
                  title="Employee Leave Management"
                  description="Components for tracking and managing employee leave balances and requests"
                >
                  <ComponentShowcase
                    title="Leave Balance"
                    description="A comprehensive leave balance dashboard showing different leave types (Earned, Sick, Casual, Other) with approval status and detailed modal"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <LeaveBalance />
                      </div>
                    }
                    code={`import LeaveBalance from "@/components/LeaveBalance";

export function EmployeeLeaveWidget() {
  return (
    <div className="w-full">
      <LeaveBalance />
    </div>
  );
}`}
                    props={[
                      {
                        name: "className",
                        type: "string",
                        default: "undefined",
                        description:
                          "Additional CSS classes for styling customization",
                      },
                      {
                        name: "leaveData",
                        type: "Array<{label: string, value: string, color: string}>",
                        description:
                          "Array of leave types with their balances (Earned, Sick, Casual, Other)",
                      },
                      {
                        name: "approvedCount",
                        type: "number",
                        default: "3",
                        description: "Number of approved leave requests",
                      },
                      {
                        name: "pendingCount",
                        type: "number",
                        default: "0",
                        description: "Number of pending leave requests",
                      },
                    ]}
                    variants={["default", "with-modal", "with-status-badges"]}
                  />
                </ComponentSection>

                <ComponentSection
                  title="Company Holidays & Events"
                  description="Components for displaying company holidays, events, and calendar information"
                >
                  <ComponentShowcase
                    title="Upcoming Holidays"
                    description="A holiday calendar widget showing upcoming company holidays with details like date, type, location, and additional holiday count"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <UpcomingHolidays
                          onViewDetails={() => setIsHolidayModalOpen(true)}
                        />
                      </div>
                    }
                    code={`import UpcomingHolidays from "@/components/UpcomingHolidays";

export function CompanyHolidaysWidget() {
  return (
    <div className="w-full">
      <UpcomingHolidays />
    </div>
  );
}`}
                    props={[
                      {
                        name: "className",
                        type: "string",
                        default: "undefined",
                        description:
                          "Additional CSS classes for styling customization",
                      },
                      {
                        name: "holidayData",
                        type: "Array<{name: string, date: string, type: string, location: string}>",
                        description:
                          "Array of upcoming holidays with their details",
                      },
                      {
                        name: "branch",
                        type: "string",
                        default: "Head Office",
                        description:
                          "The branch/location for which holidays are displayed",
                      },
                      {
                        name: "remainingCount",
                        type: "number",
                        default: "5",
                        description:
                          "Number of additional holidays available in calendar",
                      },
                    ]}
                    variants={["default", "with-modal", "branch-specific"]}
                  />
                </ComponentSection>
              </>
            )}

            {/* Company Dashboard Components */}
            {dashboardType === "company" && (
              <>
                <ComponentSection
                  title="Company Attendance Management"
                  description="Components for managing and tracking employee attendance across the organization"
                >
                  <ComponentShowcase
                    title="Company Attendance Overview"
                    description="A comprehensive company-wide attendance tracking card showing monthly summaries and statistics"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <AttendanceCard id="attendance-demo" index={0} />
                      </div>
                    }
                    code={`import { AttendanceCard } from "@/components/cards/AttendanceCard";

export function CompanyAttendanceWidget() {
  return (
    <div className="w-full">
      <AttendanceCard id="attendance" index={0} />
    </div>
  );
}`}
                    props={[
                      {
                        name: "id",
                        type: "string",
                        description: "Unique identifier for the card",
                      },
                      {
                        name: "index",
                        type: "number",
                        description: "Index position for card ordering",
                      },
                      {
                        name: "size",
                        type: "CardSize",
                        default: "undefined",
                        description: "Optional size configuration for the card",
                      },
                      {
                        name: "onResize",
                        type: "function",
                        default: "undefined",
                        description:
                          "Optional callback function for card resizing",
                      },
                    ]}
                    variants={["default", "resizable", "interactive"]}
                  />
                </ComponentSection>

                <ComponentSection
                  title="Employee Management"
                  description="Components for tracking and managing individual employee status and attendance"
                >
                  <ComponentShowcase
                    title="Employee Attendance Tracking"
                    description="A detailed employee attendance card with branch filtering, status tracking, and employee details"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <EmployeeAttendanceCard />
                      </div>
                    }
                    code={`import EmployeeAttendanceCard from "@/components/cards/EmployeeAttendanceCard";

export function EmployeeTrackingWidget() {
  return (
    <div className="w-full">
      <EmployeeAttendanceCard />
    </div>
  );
}`}
                    props={[
                      {
                        name: "onDateClick",
                        type: "function",
                        default: "undefined",
                        description:
                          "Optional callback function for date selection",
                      },
                    ]}
                    variants={["default", "with-filters", "interactive"]}
                  />
                </ComponentSection>

                <ComponentSection
                  title="Company Holidays & Events"
                  description="Components for managing company-wide holidays, events, and calendar information"
                >
                  <ComponentShowcase
                    title="Company Holiday Management"
                    description="A comprehensive holiday management widget for viewing and managing company holidays with branch filtering"
                    component={
                      <div className="w-full max-w-md mx-auto">
                        <UpcomingHolidays
                          onViewDetails={() => setIsHolidayModalOpen(true)}
                        />
                      </div>
                    }
                    code={`import UpcomingHolidays from "@/components/UpcomingHolidays";

export function CompanyHolidayWidget() {
  return (
    <div className="w-full">
      <UpcomingHolidays onViewDetails={() => openHolidayModal()} />
    </div>
  );
}`}
                    props={[
                      {
                        name: "onViewDetails",
                        type: "function",
                        default: "undefined",
                        description:
                          "Callback function to open detailed holiday modal",
                      },
                      {
                        name: "className",
                        type: "string",
                        default: "undefined",
                        description:
                          "Additional CSS classes for styling customization",
                      },
                    ]}
                    variants={["default", "with-modal", "company-wide"]}
                  />
                </ComponentSection>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Holiday List Modal */}
      <Dialog open={isHolidayModalOpen} onOpenChange={setIsHolidayModalOpen}>
        <DialogContent className="max-w-2xl h-[90vh] max-h-[90vh] overflow-hidden p-0 flex flex-col [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Holiday List</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white">
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-gray-900">
                Holiday List
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                    {selectedBranch}
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4 ml-1"
                    >
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-80">
                  <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold text-gray-900">
                    Branches
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setSelectedBranch("All Branches")}
                    className="px-3 py-3 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-3 h-3"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          All Branches
                        </div>
                        <div className="text-sm text-gray-600">
                          Manage/View all the branches
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedBranch("Head Office")}
                    className="px-3 py-3 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-3 h-3"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          Head Office
                        </div>
                        <div className="text-sm text-gray-600">
                          Business Cinema, 9SK, Shyama Prasad Mukherjee Rd,
                          More, Hazra, Kalighat, Kolkata, West Bengal 700026,
                          India
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setSelectedBranch("Second Branch")}
                    className="px-3 py-3 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center mt-0.5">
                        <svg
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-3 h-3"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          Second Branch
                        </div>
                        <div className="text-sm text-gray-600">
                          9S, Shyam Prasad Mukherjee Rd, Hazra, Kalighat,
                          Kolkata, West Bengal 700026, India
                        </div>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <button
              onClick={() => setIsHolidayModalOpen(false)}
              className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4 text-gray-600"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-4 gap-3 p-4 bg-gray-50">
            <div className="bg-white rounded-lg p-3 text-center border-b-2 border-blue-500 shadow-md">
              <div className="text-2xl font-bold text-gray-900">17</div>
              <div className="text-xs font-medium text-gray-600 uppercase">
                TOTAL
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border-b-2 border-blue-500 shadow-md">
              <div className="text-2xl font-bold text-gray-900">11</div>
              <div className="text-xs font-medium text-gray-600 uppercase">
                PUBLIC
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border-b-2 border-blue-500 shadow-md">
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-xs font-medium text-gray-600 uppercase">
                COMPANY
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center border-b-2 border-blue-500 shadow-md">
              <div className="text-2xl font-bold text-gray-900">5</div>
              <div className="text-xs font-medium text-gray-600 uppercase">
                REGIONAL
              </div>
            </div>
          </div>

          {/* Holiday List */}
          <div className="flex-1 overflow-y-auto bg-gray-50">
            {[
              {
                day: "Wed",
                date: "01",
                month: "JAN 25",
                name: "ENGLISH NEW YEAR",
                location: "Head office",
                type: "Company",
                typeColor: "bg-blue-600",
              },
              {
                day: "Sun",
                date: "26",
                month: "JAN 25",
                name: "REPUBLIC DAY",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Mon",
                date: "03",
                month: "FEB 25",
                name: "SARASWATI PUJA",
                location: "Head office",
                type: "General",
                typeColor: "bg-blue-600",
              },
              {
                day: "Fri",
                date: "14",
                month: "MAR 25",
                name: "DOLYATRA / HOLI",
                location: "Head office",
                type: "General",
                typeColor: "bg-blue-600",
              },
              {
                day: "Mon",
                date: "31",
                month: "MAR 25",
                name: "ID UL FITAR",
                location: "Head office",
                type: "General",
                typeColor: "bg-blue-600",
              },
              {
                day: "Tue",
                date: "15",
                month: "APR 25",
                name: "BENGALI NEW YEARS DAY",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Fri",
                date: "18",
                month: "APR 25",
                name: "GOODFRIDAY",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Sat",
                date: "07",
                month: "JUN 25",
                name: "BAKRID",
                location: "Head office",
                type: "General",
                typeColor: "bg-blue-600",
              },
              {
                day: "Fri",
                date: "15",
                month: "AUG 25",
                name: "INDEPENDENCE DAY",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Mon",
                date: "29",
                month: "SEP 25",
                name: "MAHA SAPTAMI",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Tue",
                date: "30",
                month: "SEP 25",
                name: "MAHA ASTAMI",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Wed",
                date: "01",
                month: "OCT 25",
                name: "MAHA NABAMI",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Thu",
                date: "02",
                month: "OCT 25",
                name: "DUSSHERA / GANDHI BIRTHDAY",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Mon",
                date: "06",
                month: "OCT 25",
                name: "LAXMI PUJA",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Mon",
                date: "20",
                month: "OCT 25",
                name: "KALI PUJA",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Wed",
                date: "05",
                month: "NOV 25",
                name: "GURU NANAK BIRTHDAY",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
              {
                day: "Thu",
                date: "25",
                month: "DEC 25",
                name: "X MAS DAY",
                location: "Head office",
                type: "Public",
                typeColor: "bg-blue-600",
              },
            ].map((holiday, index) => (
              <div
                key={index}
                className="bg-white mx-4 mb-3 rounded-lg border-b-4 border-blue-500 overflow-hidden shadow-md"
              >
                <div className="flex items-center p-4">
                  {/* Date Section */}
                  <div className="text-center mr-4 min-w-[60px]">
                    <div className="text-sm text-gray-600 font-medium">
                      {holiday.day}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {holiday.date}
                    </div>
                    <div className="text-xs text-gray-600 font-medium">
                      {holiday.month}
                    </div>
                  </div>

                  {/* Holiday Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {holiday.name}
                    </h3>
                    <p className="text-sm text-gray-600">{holiday.location}</p>
                  </div>

                  {/* Type Badge */}
                  <div
                    className={`px-3 py-1 rounded text-white text-sm font-medium ${holiday.typeColor}`}
                  >
                    {holiday.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
