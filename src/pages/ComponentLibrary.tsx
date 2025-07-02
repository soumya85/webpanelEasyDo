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

// Demo components for Company Dashboard

const CompanyPerformanceDemo = () => {
  return (
    <div className="bg-white rounded-[10px] border-b-[6px] border-[#4766E5] shadow-sm p-4 min-h-[280px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50">
          <ChevronDown className="w-5 h-5 text-blue-600 rotate-180" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          Company Performance
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-3 bg-blue-50 rounded">
          <div className="text-lg font-bold text-blue-600">85%</div>
          <div className="text-xs text-blue-600">Overall Efficiency</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded">
          <div className="text-lg font-bold text-green-600">₹2.4M</div>
          <div className="text-xs text-green-600">Monthly Revenue</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded">
          <div className="text-lg font-bold text-purple-600">328</div>
          <div className="text-xs text-purple-600">Total Employees</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded">
          <div className="text-lg font-bold text-orange-600">7</div>
          <div className="text-xs text-orange-600">Active Branches</div>
        </div>
      </div>

      <Button className="w-full h-8 text-xs" variant="outline">
        View Detailed Analytics
      </Button>
    </div>
  );
};

const EmployeeRegisterDemo = () => {
  return (
    <div className="bg-white rounded-[10px] border-b-[6px] border-[#4766E5] shadow-sm p-4 min-h-[280px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#283C50]">
          Employee Register
        </h3>
        <div className="text-xs text-blue-600">328 Total</div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            AM
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-900">
              Abhijit Mondal
            </div>
            <div className="text-xs text-gray-500">Jetty Sircar • Haldia</div>
          </div>
          <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
            Active
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            AM
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-900">
              Abhijit Mukherjee
            </div>
            <div className="text-xs text-gray-500">
              Operation Executive • Head Office
            </div>
          </div>
          <div className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
            Active
          </div>
        </div>

        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
            AR
          </div>
          <div className="flex-1">
            <div className="text-xs font-medium text-gray-900">Ahsan Raza</div>
            <div className="text-xs text-gray-500">Manager • Head Office</div>
          </div>
          <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
            Manager
          </div>
        </div>
      </div>

      <Button className="w-full h-8 text-xs" variant="outline">
        View All Employees
      </Button>
    </div>
  );
};

const OperationalExpensesDemo = () => {
  return (
    <div className="bg-white rounded-[10px] border-b-[6px] border-[#4766E5] shadow-sm p-4 min-h-[280px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-50">
          <ChevronDown className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          Operational Expenses
        </h3>
      </div>

      <div className="text-xs text-gray-600 mb-3">May 2025</div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-xs text-gray-600">Total Amount</span>
          <span className="text-xs font-semibold text-gray-900">₹1,24,500</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-gray-600">Paid Out Expenses</span>
          <span className="text-xs font-semibold text-green-600">₹98,200</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xs text-gray-600">Pending Expenses</span>
          <span className="text-xs font-semibold text-orange-600">₹26,300</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="text-sm font-bold text-blue-600">42%</div>
          <div className="text-xs text-blue-600">Travel</div>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="text-sm font-bold text-green-600">28%</div>
          <div className="text-xs text-green-600">Office</div>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <div className="text-sm font-bold text-purple-600">30%</div>
          <div className="text-xs text-purple-600">Other</div>
        </div>
      </div>

      <Button className="w-full h-8 text-xs" variant="outline">
        View Expense Report
      </Button>
    </div>
  );
};

const BranchManagementDemo = () => {
  return (
    <div className="bg-white rounded-[10px] border-b-[6px] border-[#4766E5] shadow-sm p-4 min-h-[280px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-purple-50">
          <ChevronDown className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          Branch Management
        </h3>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div>
            <div className="text-xs font-medium text-gray-900">Head Office</div>
            <div className="text-xs text-gray-500">Kolkata, West Bengal</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-gray-900">
              156 employees
            </div>
            <div className="text-xs text-green-600">95% attendance</div>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div>
            <div className="text-xs font-medium text-gray-900">
              Delhi Branch
            </div>
            <div className="text-xs text-gray-500">New Delhi, Delhi</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-gray-900">
              84 employees
            </div>
            <div className="text-xs text-green-600">92% attendance</div>
          </div>
        </div>

        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
          <div>
            <div className="text-xs font-medium text-gray-900">
              Mumbai Branch
            </div>
            <div className="text-xs text-gray-500">Mumbai, Maharashtra</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-gray-900">
              88 employees
            </div>
            <div className="text-xs text-orange-600">88% attendance</div>
          </div>
        </div>
      </div>

      <Button className="w-full h-8 text-xs" variant="outline">
        Manage All Branches
      </Button>
    </div>
  );
};

const SalesRegisterDemo = () => {
  return (
    <div className="bg-white rounded-[10px] border-b-[6px] border-[#4766E5] shadow-sm p-4 min-h-[280px]">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-50">
          <ChevronDown className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">Sales Register</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="text-lg font-bold text-green-600">₹8.2M</div>
          <div className="text-xs text-green-600">Total Sales</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="text-lg font-bold text-blue-600">142</div>
          <div className="text-xs text-blue-600">Active Clients</div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Top Performer:</span>
          <span className="font-semibold text-gray-900">Abhijit Mondal</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Best Branch:</span>
          <span className="font-semibold text-gray-900">Head Office</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Monthly Target:</span>
          <span className="font-semibold text-green-600">108% achieved</span>
        </div>
      </div>

      <Button className="w-full h-8 text-xs" variant="outline">
        View Sales Report
      </Button>
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
                    typescript={{
                      filePath: "src/components/PerformanceMeter.tsx",
                      startLine: 1,
                      endLine: 85,
                      importPath: `import PerformanceMeter from "@/components/PerformanceMeter";`,
                    }}
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
                    typescript={{
                      filePath: "src/components/AttendanceSummary.tsx",
                      startLine: 1,
                      endLine: 120,
                      importPath: `import AttendanceSummary from "@/components/AttendanceSummary";`,
                    }}
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
                    typescript={{
                      filePath: "src/components/WagesSummary.tsx",
                      startLine: 1,
                      endLine: 95,
                      importPath: `import WagesSummary from "@/components/WagesSummary";`,
                    }}
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
                    typescript={{
                      filePath: "src/components/LeaveBalance.tsx",
                      startLine: 1,
                      endLine: 110,
                      importPath: `import LeaveBalance from "@/components/LeaveBalance";`,
                    }}
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
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V9a2 2 0 00-2-2H9a2 2 0 00-2 2v2.172a2 2 0 00.586 1.414l2 2a2 2 0 001.414.586h.172a2 2 0 001.414-.586l2-2A2 2 0 0015 9V7a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No Company Dashboard Components Yet
                </h3>
                <p className="text-gray-500 max-w-md">
                  Company Dashboard components haven't been created yet. All
                  existing components are designed for Employee Dashboard use
                  cases.
                </p>
              </div>
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
