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
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ComponentSection } from "@/components/docs/ComponentSection";
import { ComponentShowcase } from "@/components/docs/ComponentShowcase";
import PerformanceMeter from "@/components/PerformanceMeter";
import AttendanceSummary from "@/components/AttendanceSummary";
import WagesSummary from "@/components/WagesSummary";
import LeaveBalance from "@/components/LeaveBalance";
import UpcomingHolidays from "@/components/UpcomingHolidays";

export default function ComponentLibrary() {
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Head Office");

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
                    <UpcomingHolidays />
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
