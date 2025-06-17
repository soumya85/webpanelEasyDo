import React, { useState, useMemo } from "react";
import { format, addDays, subDays, startOfWeek, endOfWeek } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Search,
  SlidersHorizontal,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  Calendar as CalendarDays,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Pie,
  PieChart,
  Cell,
} from "recharts";
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Date Range Types
type DateRangeOption =
  | "TODAY"
  | "YESTERDAY"
  | "LAST_7_DAYS"
  | "LAST_30_DAYS"
  | "THIS_MONTH"
  | "LAST_MONTH"
  | "CUSTOM_RANGE";

interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

// Date Range Calculator
const calculateDateRange = (option: DateRangeOption): DateRange => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (option) {
    case "TODAY":
      return {
        start: today,
        end: today,
        label: `${today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }).toUpperCase()}`,
      };

    case "YESTERDAY":
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        start: yesterday,
        end: yesterday,
        label: `${yesterday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }).toUpperCase()}`,
      };

    case "LAST_7_DAYS":
      const last7Start = new Date(today);
      last7Start.setDate(last7Start.getDate() - 6);
      return {
        start: last7Start,
        end: today,
        label: `${last7Start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }).toUpperCase()} - ${today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }).toUpperCase()}`,
      };

    case "LAST_30_DAYS":
      const last30Start = new Date(today);
      last30Start.setDate(last30Start.getDate() - 29);
      return {
        start: last30Start,
        end: today,
        label: `${last30Start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }).toUpperCase()} - ${today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "2-digit" }).toUpperCase()}`,
      };

    case "THIS_MONTH":
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        start: thisMonthStart,
        end: thisMonthEnd,
        label: `${thisMonthStart.toLocaleDateString("en-US", { month: "short", year: "2-digit" }).toUpperCase()}`,
      };

    case "LAST_MONTH":
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        start: lastMonthStart,
        end: lastMonthEnd,
        label: `${lastMonthStart.toLocaleDateString("en-US", { month: "short", year: "2-digit" }).toUpperCase()}`,
      };

    case "CUSTOM_RANGE":
    default:
      // Default to MAY 14, 25 - JUN 12, 25 as shown in screenshot
      const customStart = new Date(2025, 4, 14); // May 14, 2025
      const customEnd = new Date(2025, 5, 12); // Jun 12, 2025
      return {
        start: customStart,
        end: customEnd,
        label: "MAY 14, 25 - JUN 12, 25",
      };
  }
};

// Data Generator Functions
const generateKPIData = (dateRange: DateRange) => {
  // Simulate different data based on date range
  const daysDiff =
    Math.ceil(
      (dateRange.end.getTime() - dateRange.start.getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1;

  // Base multiplier based on range duration
  const multiplier = Math.min(daysDiff / 30, 2); // Cap at 2x for longer ranges

  return {
    totalEmployees: Math.floor(100 + multiplier * 20),
    employeesOnLeave: Math.floor(8 + multiplier * 4),
    newJoinees: Math.floor(2 + multiplier * 3),
    totalHoliday: Math.floor(3 + multiplier * 2),
  };
};

const generateSalaryData = (dateRange: DateRange) => {
  const months = [
    "Apr 25",
    "May 25",
    "Jun 25",
    "Jul 25",
    "Aug 25",
    "Sep 25",
    "Oct 25",
    "Nov 25",
    "Dec 25",
    "Jan 26",
    "Feb 26",
    "Mar 26",
  ];

  return months.map((month, index) => ({
    month,
    salary: index < 3 ? Math.floor(150000 + Math.random() * 100000) : 0,
  }));
};

const generateAttendanceStatusData = (dateRange: DateRange) => {
  return [
    {
      name: "Present",
      value: Math.floor(50 + Math.random() * 30),
      color: "#4ADE80",
    },
    {
      name: "Absent",
      value: Math.floor(15 + Math.random() * 15),
      color: "#9CA3AF",
    },
    {
      name: "Leave",
      value: Math.floor(5 + Math.random() * 10),
      color: "#FB923C",
    },
    {
      name: "Late",
      value: Math.floor(2 + Math.random() * 8),
      color: "#EF4444",
    },
    {
      name: "Half Day",
      value: Math.floor(1 + Math.random() * 4),
      color: "#7DD3FC",
    },
  ];
};

// Employee of the Month Data Generator
const generateEmployeeOfTheMonthData = (dateRange: DateRange) => {
  const employees = [
    { name: "Sanjay Patel", initials: "SP", office: "Ahmedabad", score: 2.76 },
    { name: "Priya Sharma", initials: "PS", office: "Mumbai", score: 2.85 },
    { name: "Rajesh Kumar", initials: "RK", office: "Delhi", score: 2.69 },
    { name: "Anita Singh", initials: "AS", office: "Bangalore", score: 2.91 },
    { name: "Vikram Mehta", initials: "VM", office: "Chennai", score: 2.73 },
  ];

  // Use the start date of the range to determine which month's employee to show
  // This allows different employees for "This Month", "Last Month", "Last 30 Days" etc.
  const referenceDate = dateRange.start;
  const monthYear = `${referenceDate.getFullYear()}-${referenceDate.getMonth()}`;
  const index =
    Math.abs(monthYear.split("").reduce((a, b) => a + b.charCodeAt(0), 0)) %
    employees.length;

  return employees[index];
};

// Working Hour Trends Data Generator
const generateWorkingHourTrendsData = (dateRange: DateRange) => {
  // Always use the same day markers as shown in the design: 1, 8, 15, 22, 29
  const fixedDays = [1, 8, 15, 22, 29];

  // Create a unique identifier for the date range to generate different data
  // This ensures data changes for different meaningful date ranges
  const rangeIdentifier = `${dateRange.start.getTime()}-${dateRange.end.getTime()}`;

  // Generate data for each fixed day marker
  const data = fixedDays.map((day, index) => {
    // Create a seed based on the date range to ensure data changes with meaningful filter changes
    const rangeSeed =
      rangeIdentifier.split("").reduce((a, b) => a + b.charCodeAt(0), 0) +
      index;
    const random = () => {
      const x = Math.sin(rangeSeed + index * 1000) * 10000;
      return x - Math.floor(x);
    };

    return {
      day: day,
      Present: Math.floor(4 + random() * 4), // 4-8 hours
      Leave: Math.floor(random() * 3), // 0-3 hours
      Absent: Math.floor(random() * 2), // 0-2 hours
      Holiday: index === 2 ? Math.floor(random() * 3) : 0, // Holiday in middle
      OT: Math.floor(random() * 3), // 0-3 OT hours
      RedFlags: Math.floor(random() * 2), // 0-2 red flags
    };
  });

  return data;
};

// Calculate working hour summary based on trends data
const calculateWorkingHourSummary = (trendsData: any[]) => {
  const totalWorked = trendsData.reduce((sum, day) => sum + day.Present, 0);
  const totalOT = trendsData.reduce((sum, day) => sum + day.OT, 0);
  const totalPossibleHours = trendsData.length * 8; // 8 hours per day

  return {
    totalHours: totalPossibleHours,
    workedHours: totalWorked,
    overtimeHours: totalOT,
  };
};

const generateSalaryRangeData = (dateRange: DateRange) => {
  return [
    {
      name: "Below-25000",
      value: Math.floor(15 + Math.random() * 10),
      color: "#F472B6",
    },
    {
      name: "25001-50000",
      value: Math.floor(25 + Math.random() * 20),
      color: "#60A5FA",
    },
    {
      name: "50001-75000",
      value: Math.floor(10 + Math.random() * 15),
      color: "#FBBF24",
    },
    {
      name: "Above-75000",
      value: Math.floor(20 + Math.random() * 20),
      color: "#6EE7B7",
    },
  ];
};

const generateMonthlyAttendanceData = (dateRange: DateRange) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
  ];

  return months.map((month, index) => ({
    month,
    Present: index < 5 ? Math.floor(60 + Math.random() * 20) : 0,
    Absent: index < 5 ? Math.floor(10 + Math.random() * 15) : 0,
    Leave: index < 5 ? Math.floor(5 + Math.random() * 10) : 0,
    Late: index < 5 ? Math.floor(2 + Math.random() * 5) : 0,
    Half: index < 5 ? Math.floor(1 + Math.random() * 3) : 0,
  }));
};

// Date Range Picker Component
const DateRangePicker: React.FC<{
  selectedRange: DateRangeOption;
  onRangeChange: (range: DateRangeOption) => void;
  currentLabel: string;
}> = ({ selectedRange, onRangeChange, currentLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "TODAY" as DateRangeOption, label: "TODAY" },
    { value: "YESTERDAY" as DateRangeOption, label: "YESTERDAY" },
    { value: "LAST_7_DAYS" as DateRangeOption, label: "LAST 7 DAYS" },
    { value: "LAST_30_DAYS" as DateRangeOption, label: "LAST 30 DAYS" },
    { value: "THIS_MONTH" as DateRangeOption, label: "THIS MONTH" },
    { value: "LAST_MONTH" as DateRangeOption, label: "LAST MONTH" },
    { value: "CUSTOM_RANGE" as DateRangeOption, label: "CUSTOM RANGE" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "text-[#283C50] font-inter text-xs font-normal leading-[19.2px] uppercase",
          "flex items-center justify-between px-3 py-[8px] sm:px-4 sm:py-[10.5px] rounded-[5px]",
          "border border-[#DCDEE4] bg-white hover:bg-gray-50 transition-colors",
          "w-full sm:min-w-[180px] lg:min-w-[200px] text-left",
        )}
      >
        <span className="truncate pr-2 text-[10px] sm:text-xs">
          {currentLabel}
        </span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className={cn(
              "absolute top-full left-0 mt-1 w-full z-20",
              "bg-white border border-[#DCDEE4] rounded-[5px] shadow-lg",
              "max-h-64 overflow-y-auto",
            )}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onRangeChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium",
                  "hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0",
                  selectedRange === option.value
                    ? "bg-[#4766E5] text-white hover:bg-[#4766E5]"
                    : "text-[#283C50]",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// KPI Card Component
interface KPICardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const KPICard: React.FC<KPICardProps> = ({ icon, value, label }) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 sm:gap-3 lg:gap-3 bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "px-3 pt-4 pb-4 sm:px-5 sm:pt-5 sm:pb-5 lg:px-6 lg:pt-6 lg:pb-6 h-[110px] sm:h-[125px] lg:h-[140px]",
        "flex-1 min-w-0 sm:min-w-[280px] lg:min-w-[257px]",
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex flex-col justify-center items-start min-w-0 flex-1">
        <div className="text-[#283C50] text-[24px] sm:text-[32px] lg:text-[40px] font-bold leading-tight lg:leading-[64px] font-inter">
          {value}
        </div>
        <div className="text-[#4B5563] text-[14px] font-medium leading-[18px] font-inter -mt-3">
          {label}
        </div>
      </div>
    </div>
  );
};

// Employee Working Hour Trends Card Component
interface EmployeeWorkingHourTrendsCardProps {
  dateRange: DateRange;
}

const EmployeeWorkingHourTrendsCard: React.FC<
  EmployeeWorkingHourTrendsCardProps
> = ({ dateRange }) => {
  const workingHourData = useMemo(
    () => generateWorkingHourTrendsData(dateRange),
    [dateRange],
  );
  const summary = useMemo(
    () => calculateWorkingHourSummary(workingHourData),
    [workingHourData],
  );

  // Format date range for display
  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
  };

  const dateRangeDisplay =
    dateRange.start.getTime() === dateRange.end.getTime()
      ? formatDateForDisplay(dateRange.start)
      : `${formatDateForDisplay(dateRange.start)} - ${formatDateForDisplay(dateRange.end)}`;

  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "w-full min-w-0 h-[110px] sm:h-[125px] lg:h-[140px]",
      )}
    >
      {/* Header - Made more compact */}
      <div className="flex items-center justify-between px-2 pt-0.5 pb-0.5 sm:px-3 sm:pt-1 sm:pb-0.5 lg:px-4 lg:pt-1 lg:pb-0.5 border-b border-gray-100 flex-shrink-0">
        <div className="flex flex-col">
          <h3 className="text-[#1a1a1a] font-inter text-[14px] font-bold leading-tight">
            Employee Working Hour Trends{" "}
            <span className="text-[#4766E5] font-bold">
              - {dateRangeDisplay}
            </span>
          </h3>
        </div>
        <div className="flex flex-col items-end text-right">
          <div className="text-[#1a1a1a] font-inter text-[10px] sm:text-[11px] lg:text-[12px] font-bold">
            Total Hour :{" "}
            <span className="text-[11px] sm:text-[12px] lg:text-[13px]">
              {summary.totalHours}
            </span>
          </div>
          <div className="text-[#1a1a1a] font-inter text-[8px] sm:text-[9px] lg:text-[10px] font-normal">
            Worked :{" "}
            <span className="text-[#22C55E] font-semibold">
              {summary.workedHours}
            </span>{" "}
            OT :{" "}
            <span className="text-[#3B82F6] font-semibold">
              {summary.overtimeHours}
            </span>{" "}
            Hrs
          </div>
        </div>
      </div>

      {/* Chart Content - Expanded to take more space */}
      <div className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-1 flex-1">
        {/* Chart - Increased height */}
        <div className="flex-1" style={{ minHeight: "90px", height: "90px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={workingHourData}
              margin={{ top: 15, right: 2, left: 15, bottom: 10 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#D1D5DB"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#1a1a1a", fontWeight: "bold" }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
                height={12}
              />
              <YAxis
                domain={[0, 12]}
                tickFormatter={(value) => `${value}h`}
                tick={{ fontSize: 10, fill: "#1a1a1a", fontWeight: "bold" }}
                axisLine={false}
                tickLine={false}
                width={20}
                interval={0}
                tickCount={5}
                ticks={[0, 4, 8, 12]}
              />
              <Tooltip
                formatter={(value) => [`${value}h`, ""]}
                labelFormatter={(label) => `Day ${label}`}
              />
              <Bar dataKey="Present" stackId="a" fill="#22C55E" />
              <Bar dataKey="Leave" stackId="a" fill="#FB923C" />
              <Bar dataKey="Absent" stackId="a" fill="#9CA3AF" />
              <Bar dataKey="Holiday" stackId="a" fill="#EF4444" />
              <Bar dataKey="OT" stackId="a" fill="#3B82F6" />
              <Bar dataKey="RedFlags" stackId="a" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend - 2 Column Layout */}
        <div className="flex gap-1.5 flex-shrink-0">
          {/* Column 1 */}
          <div className="flex flex-col gap-0.5">
            {[
              { name: "Present", color: "#22C55E" },
              { name: "Absent", color: "#9CA3AF" },
              { name: "OT", color: "#3B82F6" },
            ].map((entry, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-[7px] sm:text-[8px] lg:text-[9px] text-[#1a1a1a] font-inter font-medium">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-0.5">
            {[
              { name: "Leave", color: "#FB923C" },
              { name: "Holiday", color: "#EF4444" },
              { name: "Red Flags", color: "#DC2626" },
            ].map((entry, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-2 h-2 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-[7px] sm:text-[8px] lg:text-[9px] text-[#1a1a1a] font-inter font-medium">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Employee of the Month Card Component
interface EmployeeOfTheMonthCardProps {
  dateRange: DateRange;
}

const EmployeeOfTheMonthCard: React.FC<EmployeeOfTheMonthCardProps> = ({
  dateRange,
}) => {
  const employeeData = useMemo(
    () => generateEmployeeOfTheMonthData(dateRange),
    [dateRange],
  );

  // Format date range for display - show the reference month for Employee of the Month
  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
  };

  const monthDisplay = formatDateForDisplay(dateRange.start).toUpperCase();

  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "p-4 h-[110px] sm:h-[125px] lg:h-[140px]",
        "flex-1 min-w-0 sm:min-w-[280px] lg:min-w-[257px]",
      )}
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-[#1a1a1a] font-inter text-[14px] font-bold leading-tight">
          Employee of the month{" "}
          <span className="text-[#4766E5] font-bold">- {monthDisplay}</span>
        </h3>
      </div>

      {/* Employee Info */}
      <div className="flex items-start gap-3 flex-1">
        {/* Avatar with Badge */}
        <div className="flex-shrink-0 relative">
          <div
            className={cn(
              "flex items-center justify-center w-12 h-12",
              "bg-[#1a1a1a] rounded-full text-white font-bold text-lg",
            )}
          >
            {employeeData.initials}
          </div>
          {/* Trophy Badge Icon */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#4766E5] rounded-full flex items-center justify-center">
            <Trophy className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Employee Details */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-[#1a1a1a] font-inter text-[16px] font-bold leading-tight">
              {employeeData.name}
            </h4>
            <div className="flex items-center gap-1 flex-shrink-0">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="#22C55E"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
              >
                <path d="M12 2L14.09 8.26L21 9L15.5 14.74L17 21.5L12 18.27L7 21.5L8.5 14.74L3 9L9.91 8.26L12 2Z" />
              </svg>
              <span className="text-[#6B7280] font-inter text-[12px] font-medium">
                (0)
              </span>
            </div>
          </div>

          <div className="text-[#6B7280] font-inter text-[12px] font-normal mb-1">
            {employeeData.office} office{" "}
            <span className="font-semibold text-[#1a1a1a]">Branch</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#6B7280] font-inter text-[12px] font-normal">
              Overall Employee Score:{" "}
              <span className="font-bold text-[#1a1a1a]">
                {employeeData.score}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chart Card Component
interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  subtitle?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children, subtitle }) => {
  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "h-[400px] sm:h-[450px] lg:h-[492.8px] flex-1 min-w-0 w-full",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex items-start sm:items-center justify-between px-4 py-3 sm:px-[20px] sm:py-[20px] lg:px-[25px] lg:py-[25px]",
          "border-b border-[#E5E7EB] rounded-t-[5px] flex-shrink-0",
          "flex-col sm:flex-row gap-2 sm:gap-0",
        )}
      >
        <div className="flex flex-col items-start min-w-0 flex-1">
          <h3 className="text-[#283C50] font-inter text-[16px] sm:text-[18px] lg:text-[20px] font-bold leading-5 sm:leading-6">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[#283C50] font-inter text-[13px] sm:text-[14px] lg:text-[15px] font-bold leading-[16px] sm:leading-[17px] lg:leading-[18px] mt-1 sm:mt-2">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-3 sm:p-4 min-h-0 w-full relative">
        {children}
      </div>
    </div>
  );
};

// Custom Legend Component
const CustomLegend: React.FC<{ data: any[]; className?: string }> = ({
  data,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 sm:gap-3 lg:gap-4 justify-center",
        className,
      )}
    >
      {data.map((entry, index) => (
        <div key={index} className="flex items-center gap-1 sm:gap-2">
          <div
            className="w-2 h-2 sm:w-3 sm:h-3 rounded-sm flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[10px] sm:text-xs lg:text-sm text-[#283C50] font-inter">
            {entry.name}
          </span>
        </div>
      ))}
    </div>
  );
};

// Format currency for salary chart
const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(0)}L`;
  }
  return `₹${value.toLocaleString()}`;
};

// Icon Components (Responsive)
const TotalEmployeesIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px]"
    >
      <path
        d="M17.5 29.1744H20.5V35.1744H17.5V29.1744ZM32.5 15.5806C32.4375 17.0494 32.0625 18.3306 31.375 19.4244C30.6875 20.4869 29.7344 21.2056 28.5156 21.5806V35.1744H26.5V29.1744H24.5312V35.1744H22.5156V23.2681C22.2344 23.3619 22.0312 23.4713 21.9062 23.5963C20.9688 24.3463 20.5 25.3775 20.5 26.69V27.2056H18.5312V26.69C18.5312 24.7213 19.2344 23.1275 20.6406 21.9088C22.0469 20.7525 23.6719 20.1744 25.5156 20.1744C26.9219 20.1744 28.0781 19.8306 28.9844 19.1431C30.0156 18.2994 30.5312 17.1431 30.5312 15.6744V15.2056H32.5V15.5806ZM26.9219 18.5806C26.5156 18.9869 26.0469 19.19 25.5156 19.19C24.9844 19.19 24.5156 18.9869 24.1094 18.5806C23.7031 18.1744 23.5 17.7056 23.5 17.1744C23.5 16.6431 23.7031 16.19 24.1094 15.815C24.5156 15.4088 24.9844 15.2056 25.5156 15.2056C26.0469 15.2056 26.5156 15.4088 26.9219 15.815C27.3281 16.19 27.5312 16.6431 27.5312 17.1744C27.5312 17.7056 27.3281 18.1744 26.9219 18.5806Z"
        fill="#4766E5"
        transform="scale(2)"
        transform-origin="center"
      />
    </svg>
  </div>
);

const EmployeesOnLeaveIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px]"
    >
      <path
        d="M34.333 32.7369L32.9268 34.19L26.458 27.7681L27.9111 26.315L34.333 32.7369ZM26.458 16.19C23.8799 16.19 21.3018 17.1744 19.333 19.1431H19.2861C15.3486 23.0806 15.3486 29.5025 19.2861 33.44L33.583 19.1431C31.6143 17.1744 29.0361 16.19 26.458 16.19ZM19.4736 30.44C18.7236 29.2213 18.3486 27.815 18.3486 26.315C18.3486 25.3775 18.4893 24.4869 18.7705 23.6431C19.0049 25.565 19.6611 27.44 20.8799 29.0806L19.4736 30.44ZM22.333 27.6275C20.9736 25.565 20.458 23.1275 20.9268 20.7838C21.5361 20.69 22.0986 20.5963 22.6611 20.5963C24.4893 20.5963 26.2236 21.1588 27.7705 22.19L22.333 27.6275ZM23.7861 18.6275C24.6299 18.3463 25.5205 18.2056 26.458 18.2056C27.958 18.2056 29.3643 18.5806 30.583 19.3306L29.2236 20.7369C27.583 19.5181 25.708 18.8619 23.7861 18.6275Z"
        fill="#4766E5"
        transform="scale(2)"
        transform-origin="center"
      />
    </svg>
  </div>
);

const NewJoineesIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="51"
      height="51"
      viewBox="0 0 51 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px]"
    >
      <path
        d="M29.3936 21.2994L33.8467 25.7994L32.4404 27.2056L28.5029 23.2213V35.1744H26.4873V29.1744H24.5186V35.1744H22.5029V21.9088C21.0342 21.4713 19.8311 20.6431 18.8936 19.4244C17.9561 18.1744 17.4873 16.7681 17.4873 15.2056H19.5029C19.5029 16.5806 19.9873 17.7525 20.9561 18.7213C21.9248 19.69 23.0967 20.1744 24.4717 20.1744H27.0498C27.8623 20.1744 28.6436 20.5494 29.3936 21.2994ZM24.0498 18.6275C23.6748 18.2213 23.4873 17.7369 23.4873 17.1744C23.4873 16.6119 23.6748 16.1431 24.0498 15.7681C24.4561 15.3931 24.9404 15.2056 25.5029 15.2056C26.0654 15.2056 26.5342 15.3931 26.9092 15.7681C27.3154 16.1431 27.5186 16.6119 27.5186 17.1744C27.5186 17.7369 27.3154 18.2213 26.9092 18.6275C26.5342 19.0025 26.0654 19.19 25.5029 19.19C24.9404 19.19 24.4561 19.0025 24.0498 18.6275Z"
        fill="#4766E5"
        transform="scale(2)"
        transform-origin="center"
      />
    </svg>
  </div>
);

const TotalHolidayIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] lg:w-[140px] lg:h-[140px]"
    >
      <path
        d="M31.9844 17.1744C32.5469 17.1744 33.0156 17.3775 33.3906 17.7838C33.7969 18.1588 34 18.6275 34 19.19V33.2056C34 33.7369 33.7969 34.2056 33.3906 34.6119C33.0156 34.9869 32.5469 35.1744 31.9844 35.1744H18.0156C17.4531 35.1744 16.9688 34.9869 16.5625 34.6119C16.1875 34.2056 16 33.7369 16 33.2056V19.19C16 18.6275 16.1875 18.1588 16.5625 17.7838C16.9688 17.3775 17.4531 17.1744 18.0156 17.1744H19V15.2056H21.0156V17.1744H28.9844V15.2056H31V17.1744H31.9844ZM31.9844 33.2056V23.1744H18.0156V33.2056H31.9844ZM22 27.2056V25.19H19.9844V27.2056H22ZM25.9844 27.2056V25.19H24.0156V27.2056H25.9844ZM30.0156 27.2056V25.19H28V27.2056H30.0156ZM22 31.19V29.1744H19.9844V31.19H22ZM25.9844 31.19V29.1744H24.0156V31.19H25.9844ZM30.0156 31.19V29.1744H28V31.19H30.0156Z"
        fill="#4766E5"
        transform="scale(2)"
        transform-origin="center"
      />
    </svg>
  </div>
);

const PendingTasksIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[26px] h-[25px] sm:w-[30px] sm:h-[29px] lg:w-[34px] lg:h-[33px]"
    >
      <path
        d="M14.5 27.75C12.5979 27.75 10.8104 27.3891 9.1375 26.6672C7.46458 25.9453 6.00938 24.9656 4.77187 23.7281C3.53437 22.4906 2.55469 21.0354 1.83281 19.3625C1.11094 17.6896 0.75 15.9021 0.75 14C0.75 12.0979 1.11094 10.3104 1.83281 8.6375C2.55469 6.96458 3.53437 5.50938 4.77187 4.27187C6.00938 3.03437 7.46458 2.05469 9.1375 1.33281C10.8104 0.610937 12.5979 0.25 14.5 0.25C15.9896 0.25 17.399 0.467708 18.7281 0.903125C20.0573 1.33854 21.2833 1.94583 22.4062 2.725L20.4125 4.75313C19.5417 4.20313 18.6135 3.77344 17.6281 3.46406C16.6427 3.15469 15.6 3 14.5 3C11.4521 3 8.85677 4.07135 6.71406 6.21406C4.57135 8.35677 3.5 10.9521 3.5 14C3.5 17.0479 4.57135 19.6432 6.71406 21.7859C8.85677 23.9286 11.4521 25 14.5 25C17.5479 25 20.1432 23.9286 22.2859 21.7859C24.4286 19.6432 25.5 17.0479 25.5 14C25.5 13.5875 25.4771 13.175 25.4313 12.7625C25.3854 12.35 25.3167 11.949 25.225 11.5594L27.4594 9.325C27.7115 10.0583 27.9062 10.8146 28.0438 11.5938C28.1812 12.3729 28.25 13.175 28.25 14C28.25 15.9021 27.8891 17.6896 27.1672 19.3625C26.4453 21.0354 25.4656 22.4906 24.2281 23.7281C22.9906 24.9656 21.5354 25.9453 19.8625 26.6672C18.1896 27.3891 16.4021 27.75 14.5 27.75ZM12.575 20.325L6.73125 14.4813L8.65625 12.5562L12.575 16.475L26.325 2.69062L28.25 4.61562L12.575 20.325Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

const PendingApprovalsIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="22"
      height="28"
      viewBox="0 0 22 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[24px] h-[30px] sm:w-[28px] sm:h-[35px] lg:w-[32px] lg:h-[40px]"
    >
      <path
        d="M0.333321 27.3333V19.3333C0.333321 18.6 0.594432 17.9722 1.11665 17.45C1.63888 16.9277 2.26665 16.6666 2.99999 16.6666H19C19.7333 16.6666 20.3611 16.9277 20.8833 17.45C21.4055 17.9722 21.6667 18.6 21.6667 19.3333V27.3333H0.333321ZM2.99999 22H19V19.3333H2.99999V22ZM11 16.6666L4.33332 7.3333C4.33332 5.48886 4.98332 3.91663 6.28332 2.61663C7.58332 1.31663 9.15554 0.666635 11 0.666635C12.8444 0.666635 14.4167 1.31663 15.7167 2.61663C17.0167 3.91663 17.6667 5.48886 17.6667 7.3333L11 16.6666ZM11 12.9333L15 7.3333C15 6.22219 14.6111 5.27775 13.8333 4.49997C13.0555 3.72219 12.1111 3.3333 11 3.3333C9.88888 3.3333 8.94443 3.72219 8.16665 4.49997C7.38888 5.27775 6.99999 6.22219 6.99999 7.3333L11 12.9333Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

const AnnouncementsIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="40"
      height="32"
      viewBox="0 0 40 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[24px] sm:w-[35px] sm:h-[28px] lg:w-[40px] lg:h-[32px]"
    >
      <path
        d="M32 18V14H40V18H32ZM34.4 32L28 27.2L30.4 24L36.8 28.8L34.4 32ZM30.4 8.00003L28 4.80003L34.4 3.05176e-05L36.8 3.20003L30.4 8.00003ZM6 30V22H4C2.9 22 1.95833 21.6084 1.175 20.825C0.391667 20.0417 0 19.1 0 18V14C0 12.9 0.391667 11.9584 1.175 11.175C1.95833 10.3917 2.9 10 4 10H12L22 4.00003V28L12 22H10V30H6ZM18 20.9V11.1L13.1 14H4V18H13.1L18 20.9ZM24 22.7V9.30003C24.9 10.1 25.625 11.075 26.175 12.225C26.725 13.375 27 14.6334 27 16C27 17.3667 26.725 18.625 26.175 19.775C25.625 20.925 24.9 21.9 24 22.7Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

const UpcomingMeetingsIcon = () => (
  <div className="flex justify-center items-center flex-shrink-0 w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] lg:w-[50px] lg:h-[50px]">
    <svg
      width="31"
      height="22"
      viewBox="0 0 31 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[28px] h-[20px] sm:w-[32px] sm:h-[23px] lg:w-[36px] lg:h-[26px]"
    >
      <path
        d="M0.375 22V18.15C0.375 17.3708 0.575521 16.6547 0.976562 16.0016C1.3776 15.3484 1.91042 14.85 2.575 14.5063C3.99583 13.7958 5.43958 13.263 6.90625 12.9078C8.37292 12.5526 9.8625 12.375 11.375 12.375C12.8875 12.375 14.3771 12.5526 15.8438 12.9078C17.3104 13.263 18.7542 13.7958 20.175 14.5063C20.8396 14.85 21.3724 15.3484 21.7734 16.0016C22.1745 16.6547 22.375 17.3708 22.375 18.15V22H0.375ZM25.125 22V17.875C25.125 16.8667 24.8443 15.8984 24.2828 14.9703C23.7214 14.0422 22.925 13.2458 21.8938 12.5813C23.0625 12.7188 24.1625 12.9536 25.1938 13.2859C26.225 13.6182 27.1875 14.025 28.0812 14.5063C28.9062 14.9646 29.5365 15.4745 29.9719 16.0359C30.4073 16.5974 30.625 17.2104 30.625 17.875V22H25.125ZM11.375 11C9.8625 11 8.56771 10.4615 7.49063 9.38438C6.41354 8.30729 5.875 7.0125 5.875 5.5C5.875 3.9875 6.41354 2.69271 7.49063 1.61563C8.56771 0.538542 9.8625 0 11.375 0C12.8875 0 14.1823 0.538542 15.2594 1.61563C16.3365 2.69271 16.875 3.9875 16.875 5.5C16.875 7.0125 16.3365 8.30729 15.2594 9.38438C14.1823 10.4615 12.8875 11 11.375 11ZM25.125 5.5C25.125 7.0125 24.5865 8.30729 23.5094 9.38438C22.4323 10.4615 21.1375 11 19.625 11C19.3729 11 19.0521 10.9714 18.6625 10.9141C18.2729 10.8568 17.9521 10.7938 17.7 10.725C18.3188 9.99167 18.7943 9.17813 19.1266 8.28438C19.4589 7.39063 19.625 6.4625 19.625 5.5C19.625 4.5375 19.4589 3.60938 19.1266 2.71563C18.7943 1.82187 18.3188 1.00833 17.7 0.275C18.0208 0.160417 18.3417 0.0859375 18.6625 0.0515625C18.9833 0.0171875 19.3042 0 19.625 0C21.1375 0 22.4323 0.538542 23.5094 1.61563C24.5865 2.69271 25.125 3.9875 25.125 5.5ZM3.125 19.25H19.625V18.15C19.625 17.8979 19.562 17.6687 19.4359 17.4625C19.3099 17.2562 19.1438 17.0958 18.9375 16.9813C17.7 16.3625 16.451 15.8984 15.1906 15.5891C13.9302 15.2797 12.6583 15.125 11.375 15.125C10.0917 15.125 8.81979 15.2797 7.55937 15.5891C6.29896 15.8984 5.05 16.3625 3.8125 16.9813C3.60625 17.0958 3.4401 17.2562 3.31406 17.4625C3.18802 17.6687 3.125 17.8979 3.125 18.15V19.25ZM11.375 8.25C12.1313 8.25 12.7786 7.98073 13.3172 7.44219C13.8557 6.90365 14.125 6.25625 14.125 5.5C14.125 4.74375 13.8557 4.09635 13.3172 3.55781C12.7786 3.01927 12.1313 2.75 11.375 2.75C10.6187 2.75 9.97135 3.01927 9.43281 3.55781C8.89427 4.09635 8.625 4.74375 8.625 5.5C8.625 6.25625 8.89427 6.90365 9.43281 7.44219C9.97135 7.98073 10.6187 8.25 11.375 8.25Z"
        fill="#4766E5"
      />
    </svg>
  </div>
);

// Employee Attendance Log Component
interface EmployeeAttendanceData {
  id: string;
  name: string;
  designation: string;
  location: string;
  initials: string;
  checkInTime: string;
  checkoutTime: string;
  arrival: "Ontime" | "Late" | "N/A";
  totalWorkingHour: string;
  status:
    | "PRESENT"
    | "HALF-DAY"
    | "CASUAL LEAVE"
    | "SICK LEAVE"
    | "ABSENT"
    | "WEEK OFF";
  dateOfJoining: string;
}

const employeeAttendanceData: EmployeeAttendanceData[] = [
  {
    id: "1",
    name: "Amulya Kr Kar",
    designation: "Chief Accountant",
    location: "Head Office",
    initials: "AK",
    checkInTime: "10:15 A.M",
    checkoutTime: "9:00 P.M",
    arrival: "Ontime",
    totalWorkingHour: "10:45 Hrs",
    status: "PRESENT",
    dateOfJoining: "2018-03-15",
  },
  {
    id: "2",
    name: "Abhijit Mukherjee",
    designation: "Operation Executive",
    location: "Head Office",
    initials: "AM",
    checkInTime: "10:15 A.M",
    checkoutTime: "7:15 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
    status: "PRESENT",
    dateOfJoining: "2020-07-22",
  },
  {
    id: "3",
    name: "Abhijit Mondal",
    designation: "Jetty Sincer",
    location: "Haldia Branch",
    initials: "AM",
    checkInTime: "N/A",
    checkoutTime: "N/A",
    arrival: "N/A",
    totalWorkingHour: "N/A",
    status: "CASUAL LEAVE",
    dateOfJoining: "2019-11-08",
  },
  {
    id: "4",
    name: "Amit Parmer",
    designation: "IOS Developer",
    location: "Ahmedabad Branch",
    initials: "AP",
    checkInTime: "10:15 A.M",
    checkoutTime: "7:15 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
    status: "PRESENT",
    dateOfJoining: "2021-01-10",
  },
  {
    id: "5",
    name: "Bholanath Paul",
    designation: "Office Boy",
    location: "Head Office",
    initials: "BP",
    checkInTime: "N/A",
    checkoutTime: "N/A",
    arrival: "N/A",
    totalWorkingHour: "N/A",
    status: "ABSENT",
    dateOfJoining: "2017-05-20",
  },
  {
    id: "6",
    name: "Chandan Bose",
    designation: "Airport Executive",
    location: "Head Office",
    initials: "CB",
    checkInTime: "11:15 A.M",
    checkoutTime: "7:15 P.M",
    arrival: "Late",
    totalWorkingHour: "8 Hrs",
    status: "HALF-DAY",
    dateOfJoining: "2022-09-12",
  },
  {
    id: "7",
    name: "Chinmay Bannerjee",
    designation: "Operation Staff",
    location: "Head Office",
    initials: "CB",
    checkInTime: "N/A",
    checkoutTime: "N/A",
    arrival: "N/A",
    totalWorkingHour: "N/A",
    status: "ABSENT",
    dateOfJoining: "2020-02-28",
  },
  {
    id: "8",
    name: "Nital Samanta",
    designation: "Accounts Manager",
    location: "Head Office",
    initials: "NS",
    checkInTime: "10:15 A.M",
    checkoutTime: "7:15 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
    status: "PRESENT",
    dateOfJoining: "2019-06-15",
  },
  {
    id: "9",
    name: "Rupkumar Saha",
    designation: "Accounts Executive",
    location: "Head Office",
    initials: "RS",
    checkInTime: "10:40 A.M",
    checkoutTime: "7:15P.M",
    arrival: "Late",
    totalWorkingHour: "8:35 Hrs",
    status: "PRESENT",
    dateOfJoining: "2021-08-22",
  },
  {
    id: "10",
    name: "Smita Chakraborty",
    designation: "Customs Executive",
    location: "Head Office",
    initials: "SC",
    checkInTime: "N/A",
    checkoutTime: "N/A",
    arrival: "N/A",
    totalWorkingHour: "N/A",
    status: "SICK LEAVE",
    dateOfJoining: "2020-11-30",
  },
  {
    id: "11",
    name: "Rahul Sharma",
    designation: "Software Developer",
    location: "Bangalore Branch",
    initials: "RS",
    checkInTime: "9:30 A.M",
    checkoutTime: "6:30 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
    status: "PRESENT",
    dateOfJoining: "2022-01-15",
  },
  {
    id: "12",
    name: "Priya Patel",
    designation: "HR Executive",
    location: "Mumbai Branch",
    initials: "PP",
    checkInTime: "10:00 A.M",
    checkoutTime: "7:00 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
    status: "PRESENT",
    dateOfJoining: "2021-03-10",
  },
  {
    id: "13",
    name: "Vikram Singh",
    designation: "Marketing Manager",
    location: "Delhi Branch",
    initials: "VS",
    checkInTime: "10:30 A.M",
    checkoutTime: "8:00 P.M",
    arrival: "Late",
    totalWorkingHour: "9:30 Hrs",
    status: "PRESENT",
    dateOfJoining: "2018-09-05",
  },
  {
    id: "14",
    name: "Anita Das",
    designation: "Finance Executive",
    location: "Kolkata Branch",
    initials: "AD",
    checkInTime: "N/A",
    checkoutTime: "N/A",
    arrival: "N/A",
    totalWorkingHour: "N/A",
    status: "CASUAL LEAVE",
    dateOfJoining: "2020-05-18",
  },
  {
    id: "15",
    name: "Suresh Kumar",
    designation: "Operations Head",
    location: "Chennai Branch",
    initials: "SK",
    checkInTime: "9:00 A.M",
    checkoutTime: "6:00 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
    status: "PRESENT",
    dateOfJoining: "2017-12-08",
  },
];

const StatusBadge: React.FC<{ status: EmployeeAttendanceData["status"] }> = ({
  status,
}) => {
  const statusStyles = {
    PRESENT: "border-green-500 text-green-600 bg-green-50",
    "HALF-DAY": "border-red-500 text-red-600 bg-red-50",
    "CASUAL LEAVE": "border-orange-500 text-orange-600 bg-orange-50",
    "SICK LEAVE": "border-yellow-500 text-yellow-600 bg-yellow-50",
    ABSENT: "border-gray-500 text-gray-600 bg-gray-50",
    "WEEK OFF": "border-blue-500 text-blue-600 bg-blue-50",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 rounded-md border text-xs font-medium",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
};

const ArrivalBadge: React.FC<{
  arrival: EmployeeAttendanceData["arrival"];
}> = ({ arrival }) => {
  if (arrival === "N/A") {
    return <span className="text-gray-500 text-sm">N/A</span>;
  }

  const arrivalStyles = {
    Ontime: "text-green-600",
    Late: "text-red-600",
  };

  return (
    <span
      className={cn(
        "text-sm font-medium",
        arrivalStyles[arrival as "Ontime" | "Late"],
      )}
    >
      {arrival}
    </span>
  );
};

const EmployeeAttendanceLog: React.FC = () => {
  const [sortBy, setSortBy] = useState<"alphabetical" | "date">("alphabetical");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Create ref for scrolling to table
  const tableRef = React.useRef<HTMLDivElement>(null);

  // Get current date in the format shown in the UI
  const getCurrentDateString = () => {
    const date = selectedDate;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Generate dynamic attendance data based on selected date
  const generateAttendanceDataForDate = (date: Date) => {
    const today = new Date();

    return employeeAttendanceData.map((employee, index) => {
      // Create more complex variation based on date and employee
      const dateKey = (date.getDate() * date.getMonth() * (index + 1)) % 100;
      const dayOfWeek = date.getDay();

      // Weekend handling
      if (dayOfWeek === 0) {
        // Sunday
        return {
          ...employee,
          status: "WEEK OFF" as const,
          checkInTime: "N/A",
          checkoutTime: "N/A",
          arrival: "N/A" as const,
          totalWorkingHour: "N/A",
        };
      } else if (dayOfWeek === 6) {
        // Saturday
        return {
          ...employee,
          status: "WEEK OFF" as const,
          checkInTime: "N/A",
          checkoutTime: "N/A",
          arrival: "N/A" as const,
          totalWorkingHour: "N/A",
        };
      }

      // Create better balanced patterns based on date and employee
      const pattern = (dateKey + index * 7) % 100; // Better distribution

      // Special day patterns with reduced impact
      let adjustedPattern = pattern;

      // Monday patterns (slightly more absences, but not too many)
      if (dayOfWeek === 1) {
        // Only 10% extra chance for absence/leave on Mondays
        if (pattern < 5) {
          adjustedPattern = pattern + 2; // Shift some people to absent/leave categories
        }
      }

      // Friday patterns (some half days)
      if (dayOfWeek === 5) {
        // 15% chance for half days on Fridays
        if (pattern >= 85 && pattern < 100) {
          return {
            ...employee,
            status: "HALF-DAY" as const,
            checkInTime: "10:15 A.M",
            checkoutTime: pattern < 92 ? "1:00 P.M" : "2:30 P.M",
            arrival: "Ontime" as const,
            totalWorkingHour: pattern < 92 ? "2:45 Hrs" : "4:15 Hrs",
          };
        }
      }

      // Main distribution logic (applies to all days)
      if (adjustedPattern < 8) {
        // 8% absent
        return {
          ...employee,
          status: "ABSENT" as const,
          checkInTime: "N/A",
          checkoutTime: "N/A",
          arrival: "N/A" as const,
          totalWorkingHour: "N/A",
        };
      } else if (adjustedPattern < 15) {
        // 7% casual leave
        return {
          ...employee,
          status: "CASUAL LEAVE" as const,
          checkInTime: "N/A",
          checkoutTime: "N/A",
          arrival: "N/A" as const,
          totalWorkingHour: "N/A",
        };
      } else if (adjustedPattern < 20) {
        // 5% sick leave
        return {
          ...employee,
          status: "SICK LEAVE" as const,
          checkInTime: "N/A",
          checkoutTime: "N/A",
          arrival: "N/A" as const,
          totalWorkingHour: "N/A",
        };
      } else if (adjustedPattern < 35) {
        // 15% late arrivals with varied times
        const lateIndex = adjustedPattern % 4;
        const checkInTimes = [
          "10:30 A.M",
          "10:45 A.M",
          "11:00 A.M",
          "11:15 A.M",
        ];
        const workingHours = ["8:30 Hrs", "8:15 Hrs", "8 Hrs", "7:45 Hrs"];

        return {
          ...employee,
          status: "PRESENT" as const,
          checkInTime: checkInTimes[lateIndex],
          checkoutTime: "7:15 P.M",
          arrival: "Late" as const,
          totalWorkingHour: workingHours[lateIndex],
        };
      } else if (adjustedPattern < 45) {
        // 10% half day
        return {
          ...employee,
          status: "HALF-DAY" as const,
          checkInTime: "10:15 A.M",
          checkoutTime: adjustedPattern < 40 ? "2:00 P.M" : "3:00 P.M",
          arrival: "Ontime" as const,
          totalWorkingHour: adjustedPattern < 40 ? "3:45 Hrs" : "4:45 Hrs",
        };
      } else {
        // 55% normal present with slight time variations
        const timeIndex = adjustedPattern % 6;
        const checkInTimes = [
          "9:30 A.M",
          "9:45 A.M",
          "10:00 A.M",
          "10:15 A.M",
          "10:15 A.M",
          "10:15 A.M",
        ];
        const checkOutTimes = [
          "6:30 P.M",
          "6:45 P.M",
          "7:00 P.M",
          "7:15 P.M",
          "7:30 P.M",
          "7:45 P.M",
        ];
        const workingHours = [
          "9 Hrs",
          "9 Hrs",
          "9 Hrs",
          "9 Hrs",
          "9:15 Hrs",
          "9:30 Hrs",
        ];

        return {
          ...employee,
          status: "PRESENT" as const,
          checkInTime: checkInTimes[timeIndex],
          checkoutTime: checkOutTimes[timeIndex],
          arrival:
            timeIndex === 0 || timeIndex >= 3 ? "Ontime" : ("Ontime" as const),
          totalWorkingHour: workingHours[timeIndex],
        };
      }
    });
  };

  // Filter and sort employees
  const filteredAndSortedEmployees = useMemo(() => {
    // Generate dynamic data based on selected date
    const dataToFilter = generateAttendanceDataForDate(selectedDate);

    let filtered = dataToFilter.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Sort based on selected criteria
    filtered.sort((a, b) => {
      if (sortBy === "alphabetical") {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (sortOrder === "asc") {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      } else if (sortBy === "date") {
        const dateA = new Date(a.dateOfJoining);
        const dateB = new Date(b.dateOfJoining);
        if (sortOrder === "asc") {
          return dateA.getTime() - dateB.getTime();
        } else {
          return dateB.getTime() - dateA.getTime();
        }
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, selectedDate]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedEmployees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentEmployees = filteredAndSortedEmployees.slice(
    startIndex,
    endIndex,
  );

  // Handle sort change
  const handleSortChange = (newSortBy: "alphabetical" | "date") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  // Handle rows per page change
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    scrollToTable();
  };

  // Scroll to table function
  const scrollToTable = () => {
    // Use setTimeout to ensure DOM has updated before scrolling
    setTimeout(() => {
      if (tableRef.current) {
        // Try multiple scroll methods for better compatibility

        // Method 1: scrollIntoView
        tableRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        // Method 2: Fallback with window.scrollTo
        setTimeout(() => {
          const tablePosition =
            tableRef.current?.getBoundingClientRect().top ?? 0;
          const currentScrollY = window.pageYOffset;

          if (tablePosition !== 0) {
            window.scrollTo({
              top: currentScrollY + tablePosition - 100, // 100px offset from top
              behavior: "smooth",
            });
          }
        }, 100);
      }
    }, 50);
  };

  // Handle pagination navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTable();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      scrollToTable();
    }
  };

  return (
    <div className="bg-white rounded-[10px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)] p-6 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-[#1a1a1a] font-inter text-[18px] font-semibold mb-4">
          Employee Attendance Log
        </h2>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-700" />
            </div>
            <input
              type="text"
              placeholder="Enter employee name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors placeholder:text-gray-600"
            />
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 text-gray-700 hover:text-gray-900 transition-colors hover:bg-gray-100 rounded-lg">
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => handleSortChange("alphabetical")}
                className="flex items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="26"
                      height="25"
                      viewBox="0 0 27 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        d="M26.5001 16.5274C26.3013 16.7472 26.1024 16.9775 25.8931 17.1868C24.4486 18.6313 23.0042 20.0757 21.5597 21.5201C21.4341 21.6458 21.319 21.7609 21.2143 21.8656C21.162 21.8656 21.1515 21.8656 21.1306 21.8656C21.1201 21.8656 21.0992 21.8551 21.0887 21.8446C19.3407 20.0966 17.5823 18.3382 15.8029 16.5588C15.8343 16.3704 15.8761 16.161 15.918 15.9203C16.1378 15.868 16.3576 15.8156 16.546 15.7633C17.8753 17.0926 19.1732 18.3905 20.513 19.7303C20.5235 19.5105 20.534 19.3639 20.534 19.2069C20.534 14.2351 20.534 9.2633 20.5235 4.29148C20.5235 3.93561 20.6177 3.66346 20.9003 3.43319C21.0573 3.43319 21.2352 3.43319 21.4341 3.43319C21.4969 3.50646 21.5702 3.60066 21.6853 3.73673C21.6853 8.98069 21.6853 14.2979 21.6853 19.6989C21.8319 19.5524 21.9365 19.4477 22.0412 19.343C23.1193 18.2649 24.1869 17.1973 25.2546 16.1192C25.4953 15.8784 25.7465 15.7005 26.1338 15.7947C26.2385 15.8784 26.3641 15.9831 26.5001 16.0878C26.5001 16.2448 26.5001 16.3913 26.5001 16.5274Z"
                        fill="#374151"
                      />
                      <path
                        d="M1.18026 24.6916C1.18026 24.1997 1.18026 23.7496 1.18026 23.2786C2.91778 21.1642 4.67623 19.0394 6.47655 16.8518C4.80184 16.8518 3.21085 16.8518 1.59894 16.8518C1.59894 16.3494 1.59894 15.8784 1.59894 15.3969C3.91214 15.3969 6.22535 15.3969 8.58042 15.3969C8.63275 15.5853 8.59089 15.8156 8.60135 16.0354C8.61182 16.2448 8.60135 16.4541 8.60135 16.7053C8.47575 16.8623 8.31874 17.0298 8.18267 17.2182C7.84773 17.6787 7.44998 18.087 7.13597 18.558C6.9685 18.8092 6.72776 18.9976 6.53936 19.2488C6.18348 19.7407 5.75433 20.1803 5.36705 20.6514C4.85417 21.2898 4.35176 21.9388 3.84934 22.5878C3.69233 22.7866 3.5144 22.9646 3.29459 23.2158C5.17865 23.2158 6.97897 23.2158 8.80023 23.2158C8.80023 23.6868 8.80023 24.1159 8.80023 24.5556C8.75836 24.5974 8.70602 24.6498 8.65369 24.7021C6.17301 24.6916 3.7028 24.6916 1.18026 24.6916Z"
                        fill="#374151"
                      />
                      <path
                        d="M4.04831 0C4.62399 0 5.22061 0 5.83816 0C5.9847 0.502415 6.24638 0.983897 6.40338 1.50725C6.56039 2.0306 6.83253 2.51208 7.01047 3.03543C7.1884 3.55878 7.40821 4.05072 7.58615 4.57407C7.76409 5.08696 7.96296 5.59984 8.1723 6.10225C8.38164 6.60467 8.58051 7.11755 8.77939 7.63044C8.97826 8.13285 9.20853 8.63527 9.33414 9.19002C8.71659 9.19002 8.15137 9.19002 7.55475 9.19002C7.27214 8.39453 6.97907 7.59903 6.69646 6.80354C5.49275 6.80354 4.33092 6.80354 3.12721 6.80354C2.7504 7.55717 2.61433 8.40499 2.22705 9.17955C1.68277 9.17955 1.10709 9.17955 0.5 9.17955C1.7037 6.12319 2.86554 3.08776 4.04831 0ZM3.65056 5.41143C4.54026 5.41143 5.35668 5.41143 6.22544 5.41143C5.84863 4.16586 5.33575 2.99356 4.99034 1.71659C4.52979 2.40741 4.47746 3.21337 4.12158 3.90419C3.8913 4.36473 3.80757 4.89855 3.65056 5.41143Z"
                        fill="#374151"
                      />
                    </svg>
                  </div>
                  <span>Alphabetically</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("date")}
                className="flex items-center"
              >
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 21 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        d="M3.28456 18.8136H16.8111C18.9427 18.8136 20.0527 17.7134 20.0527 15.6113V3.65646C20.0527 1.5543 18.9427 0.454102 16.8111 0.454102H3.28456C1.16275 0.454102 0.0527344 1.54447 0.0527344 3.65646V15.6113C0.0527344 17.7134 1.16275 18.8136 3.28456 18.8136ZM3.27474 16.8588C2.45941 16.8588 2.00755 16.4364 2.00755 15.572V6.53465C2.00755 5.67021 2.45941 5.24781 3.27474 5.24781H16.8209C17.6362 5.24781 18.0881 5.67021 18.0881 6.53465V15.572C18.0881 16.4364 17.6362 16.8588 16.8209 16.8588H3.27474ZM8.15686 8.63681H8.73643C9.09006 8.63681 9.20794 8.52876 9.20794 8.18495V7.60538C9.20794 7.25174 9.09006 7.14369 8.73643 7.14369H8.15686C7.80323 7.14369 7.68535 7.25174 7.68535 7.60538V8.18495C7.68535 8.52876 7.80323 8.63681 8.15686 8.63681ZM11.369 8.63681H11.9486C12.2924 8.63681 12.4103 8.52876 12.4103 8.18495V7.60538C12.4103 7.25174 12.2924 7.14369 11.9486 7.14369H11.369C11.0154 7.14369 10.8975 7.25174 10.8975 7.60538V8.18495C10.8975 8.52876 11.0154 8.63681 11.369 8.63681ZM14.5714 8.63681H15.151C15.5046 8.63681 15.6225 8.52876 15.6225 8.18495V7.60538C15.6225 7.25174 15.5046 7.14369 15.151 7.14369H14.5714C14.2276 7.14369 14.1097 7.25174 14.1097 7.60538V8.18495C14.1097 8.52876 14.2276 8.63681 14.5714 8.63681ZM4.9545 11.7999H5.52425C5.87788 11.7999 5.99576 11.6918 5.99576 11.3382V10.7586C5.99576 10.4148 5.87788 10.3068 5.52425 10.3068H4.9545C4.60087 10.3068 4.48299 10.4148 4.48299 10.7586V11.3382C4.48299 11.6918 4.60087 11.7999 4.9545 11.7999ZM8.15686 11.7999H8.73643C9.09006 11.7999 9.20794 11.6918 9.20794 11.3382V10.7586C9.20794 10.4148 9.09006 10.3068 8.73643 10.3068H8.15686C7.80323 10.3068 7.68535 10.4148 7.68535 10.7586V11.3382C7.68535 11.6918 7.80323 11.7999 8.15686 11.7999ZM11.369 11.7999H11.9486C12.2924 11.7999 12.4103 11.6918 12.4103 11.3382V10.7586C12.4103 10.4148 12.2924 10.3068 11.9486 10.3068H11.369C11.0154 10.3068 10.8975 10.4148 10.8975 10.7586V11.3382C10.8975 11.6918 11.0154 11.7999 11.369 11.7999ZM14.5714 11.7999H15.151C15.5046 11.7999 15.6225 11.6918 15.6225 11.3382V10.7586C15.6225 10.4148 15.5046 10.3068 15.151 10.3068H14.5714C14.2276 10.3068 14.1097 10.4148 14.1097 10.7586V11.3382C14.1097 11.6918 14.2276 11.7999 14.5714 11.7999ZM4.9545 14.9531H5.52425C5.87788 14.9531 5.99576 14.8451 5.99576 14.5013V13.9217C5.99576 13.568 5.87788 13.46 5.52425 13.46H4.9545C4.60087 13.46 4.48299 13.568 4.48299 13.9217V14.5013C4.48299 14.8451 4.60087 14.9531 4.9545 14.9531ZM8.15686 14.9531H8.73643C9.09006 14.9531 9.20794 14.8451 9.20794 14.5013V13.9217C9.20794 13.568 9.09006 13.46 8.73643 13.46H8.15686C7.80323 13.46 7.68535 13.568 7.68535 13.9217V14.5013C7.68535 14.8451 7.80323 14.9531 8.15686 14.9531ZM11.369 14.9531H11.9486C12.2924 14.9531 12.4103 14.8451 12.4103 14.5013V13.9217C12.4103 13.568 12.2924 13.46 11.9486 13.46H11.369C11.0154 13.46 10.8975 13.568 10.8975 13.9217V14.5013C10.8975 14.8451 11.0154 14.9531 11.369 14.9531Z"
                        fill="#374151"
                      />
                    </svg>
                  </div>
                  <span>Date of Joining</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <CalendarIcon className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {getCurrentDateString()}
                </span>
                <ChevronDownIcon className="h-4 w-4 text-gray-700" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    setSelectedDate(date);
                    setCurrentPage(1); // Reset to first page when date changes
                    setIsCalendarOpen(false); // Close calendar immediately after selection
                  }
                }}
                initialFocus
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto" ref={tableRef}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Employee Name
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Check-In Time
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Checkout Time
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Arrival
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Total Working Hour
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee, index) => (
              <tr
                key={employee.id}
                className={cn(
                  "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
                )}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#374151] flex-shrink-0 flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {employee.initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-semibold text-gray-900 text-sm">
                          {employee.name}
                        </div>
                        <StatusBadge status={employee.status} />
                      </div>
                      <div className="text-xs text-gray-600 mt-1">
                        {employee.designation}
                      </div>
                      <div className="text-xs text-gray-500">
                        ({employee.location})
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {employee.checkInTime}
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {employee.checkoutTime}
                </td>
                <td className="py-4 px-4">
                  <ArrivalBadge arrival={employee.arrival} />
                </td>
                <td className="py-4 px-4 text-sm text-gray-700">
                  {employee.totalWorkingHour}
                </td>
                <td className="py-4 px-4">
                  <button className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    View
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-2 w-2"
                    >
                      <path
                        d="M1.4 13L0 11.6L9.6 2H1V0H13V12H11V3.4L1.4 13Z"
                        fill="#4766E5"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="text-sm text-gray-700">{rowsPerPage}</span>
                <ChevronDownIcon className="h-3 w-3 text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {[5, 10, 20, 50].map((rows) => (
                <DropdownMenuItem
                  key={rows}
                  onClick={() => handleRowsPerPageChange(rows)}
                  className={cn(
                    "cursor-pointer",
                    rowsPerPage === rows && "bg-gray-100",
                  )}
                >
                  {rows}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {startIndex + 1}-
            {Math.min(endIndex, filteredAndSortedEmployees.length)} of{" "}
            {filteredAndSortedEmployees.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-gray-600">
              {currentPage}/{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ChevronRightIcon = () => (
  <svg
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-1 h-[7px] flex-shrink-0"
  >
    <path
      d="M1.00391 7.595L5.00391 4.095L1.00391 0.595001"
      stroke="#7C8796"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Overview: React.FC = () => {
  // State Management
  const [selectedDateRange, setSelectedDateRange] =
    useState<DateRangeOption>("CUSTOM_RANGE");

  // Calculate current date range and generate dynamic data
  const currentDateRange = useMemo(
    () => calculateDateRange(selectedDateRange),
    [selectedDateRange],
  );

  const kpiData = useMemo(
    () => generateKPIData(currentDateRange),
    [currentDateRange],
  );
  const salaryData = useMemo(
    () => generateSalaryData(currentDateRange),
    [currentDateRange],
  );
  const attendanceStatusData = useMemo(
    () => generateAttendanceStatusData(currentDateRange),
    [currentDateRange],
  );
  const salaryRangeData = useMemo(
    () => generateSalaryRangeData(currentDateRange),
    [currentDateRange],
  );
  const monthlyAttendanceData = useMemo(
    () => generateMonthlyAttendanceData(currentDateRange),
    [currentDateRange],
  );
  const workingHourTrendsData = useMemo(
    () => generateWorkingHourTrendsData(currentDateRange),
    [currentDateRange],
  );
  const employeeOfTheMonthData = useMemo(
    () => generateEmployeeOfTheMonthData(currentDateRange),
    [currentDateRange],
  );

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 font-inter")}>
      {/* Page Area */}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        {/* Breadcrumb Section Row */}
        <div
          className={cn(
            "flex min-h-[50px] sm:min-h-[60px] lg:min-h-[65px]",
            "px-4 py-3 sm:px-6 sm:py-3 lg:px-[30px] lg:py-[13.5px]",
            "justify-between items-center self-stretch",
            "rounded-lg border-l-[6px] border-[#4766E5] bg-white",
            "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
            "flex-row gap-2 lg:gap-0",
          )}
        >
          {/* Breadcrumb Navigation */}
          <div className="flex justify-start items-center gap-2 sm:gap-[8px] lg:gap-[10px] flex-wrap flex-1">
            <div className="text-[#283C50] font-inter text-base sm:text-xl lg:text-base font-bold leading-[20px] sm:leading-[24px] lg:leading-[19.2px]">
              Overview
            </div>
            <div className="text-[#DBD9D9] font-inter text-sm sm:text-base font-normal leading-[16px] sm:leading-[19.2px] hidden sm:block">
              |
            </div>
            <div className="text-[#283C50] font-inter text-xs sm:text-[13px] font-bold leading-[16px] sm:leading-[20.8px] hidden sm:block">
              Liberty Highrise PVT Ltd
            </div>
            <div className="hidden sm:block">
              <ChevronRightIcon />
            </div>
            <div className="text-[#222] font-inter text-xs sm:text-[13px] font-normal leading-[16px] sm:leading-[20.8px] hidden sm:block">
              All Branch
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex justify-end items-center gap-2 lg:gap-[10px] flex-shrink-0">
            <DateRangePicker
              selectedRange={selectedDateRange}
              onRangeChange={setSelectedDateRange}
              currentLabel={currentDateRange.label}
            />
          </div>
        </div>

        {/* KPI Cards Row */}
        <div
          className={cn(
            "grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap lg:flex-nowrap",
            "gap-3 sm:gap-4 lg:gap-5 w-full",
            "sm:justify-start sm:items-stretch self-stretch",
          )}
        >
          <KPICard
            icon={<TotalEmployeesIcon />}
            value={kpiData.totalEmployees.toString()}
            label="Total Employees"
          />
          <KPICard
            icon={<EmployeesOnLeaveIcon />}
            value={kpiData.employeesOnLeave.toString()}
            label="Employees On Leave"
          />
          <KPICard
            icon={<NewJoineesIcon />}
            value={kpiData.newJoinees.toString()}
            label="New Joinees"
          />
          <KPICard
            icon={<TotalHolidayIcon />}
            value={kpiData.totalHoliday.toString()}
            label="Total Holiday"
          />
        </div>

        {/* Second KPI Cards Row */}
        <div
          className={cn(
            "grid grid-cols-2 sm:flex sm:flex-row sm:flex-wrap lg:flex-nowrap",
            "gap-3 sm:gap-4 lg:gap-5 w-full",
            "sm:justify-start sm:items-stretch self-stretch",
          )}
        >
          <KPICard
            icon={<TotalEmployeesIcon />}
            value="100"
            label="Total Attendance"
          />
          <KPICard
            icon={<PendingTasksIcon />}
            value="40"
            label="Pending Tasks"
          />
          <KPICard
            icon={<UpcomingMeetingsIcon />}
            value="20"
            label="Upcoming Meetings"
          />
          <KPICard
            icon={<PendingApprovalsIcon />}
            value="18"
            label="Pending Approvals"
          />
        </div>

        {/* Third KPI Cards Row */}
        <div
          className={cn(
            "flex flex-row flex-wrap lg:flex-nowrap",
            "gap-3 sm:gap-4 lg:gap-5 w-full",
            "justify-start items-stretch",
          )}
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-5 flex-1">
            <KPICard
              icon={<AnnouncementsIcon />}
              value="7"
              label="Announcements"
            />
            <EmployeeOfTheMonthCard dateRange={currentDateRange} />
          </div>
          <div className="flex-1">
            <EmployeeWorkingHourTrendsCard dateRange={currentDateRange} />
          </div>
        </div>

        {/* Employee Attendance Log Section */}
        <EmployeeAttendanceLog />

        {/* Analytics Section */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full">
          {/* First Row of Charts */}
          <div className="flex gap-4 sm:gap-5 lg:gap-6 w-full flex-col lg:flex-row">
            {/* Salary Data Chart */}
            <ChartCard title="Salary Data Of Financial Year 2025-26">
              <div className="h-full flex flex-col w-full">
                <div className="mb-2 sm:mb-3 lg:mb-4 flex-shrink-0">
                  <CustomLegend
                    data={[{ name: "Total Employee Salary", color: "#7DD3FC" }]}
                    className="justify-start"
                  />
                </div>
                <div className="flex-1 w-full" style={{ minHeight: "250px" }}>
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={250}
                  >
                    <BarChart
                      data={salaryData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 9, fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={50}
                      />
                      <YAxis
                        tickFormatter={formatCurrency}
                        tick={{ fontSize: 9, fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        width={60}
                      />
                      <Tooltip
                        formatter={(value) => [
                          formatCurrency(value as number),
                          "Total Employee Salary",
                        ]}
                      />
                      <Bar
                        dataKey="salary"
                        fill="#7DD3FC"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ChartCard>

            {/* Attendance Status Chart */}
            <ChartCard
              title="Attendance Status"
              subtitle={`Total Employees: ${kpiData.totalEmployees}`}
            >
              <div className="h-full flex flex-col items-center w-full">
                <div
                  className="flex-1 w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[350px]"
                  style={{ minHeight: "200px" }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={200}
                  >
                    <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Pie
                        data={attendanceStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius="75%"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {attendanceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-shrink-0 mt-2 sm:mt-3 lg:mt-4">
                  <CustomLegend data={attendanceStatusData} />
                </div>
              </div>
            </ChartCard>
          </div>

          {/* Second Row of Charts */}
          <div className="flex gap-4 sm:gap-5 lg:gap-6 w-full flex-col lg:flex-row">
            {/* Employee Count by Salary Range Chart */}
            <ChartCard title="Employee Count By Salary Range">
              <div className="h-full flex flex-col items-center w-full">
                <div
                  className="flex-1 w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px]"
                  style={{ minHeight: "200px" }}
                >
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={200}
                  >
                    <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                      <Pie
                        data={salaryRangeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius="75%"
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {salaryRangeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-shrink-0 mt-2 sm:mt-3 lg:mt-4">
                  <CustomLegend data={salaryRangeData} />
                </div>
              </div>
            </ChartCard>

            {/* Monthly Attendance Summary Chart */}
            <ChartCard
              title="Attendance Summary"
              subtitle="Monthly Attendance Summary for 2025"
            >
              <div className="h-full flex flex-col w-full">
                <div className="mb-2 sm:mb-3 lg:mb-4 flex-shrink-0">
                  <CustomLegend
                    data={[
                      { name: "Present", color: "#4ADE80" },
                      { name: "Absent", color: "#9CA3AF" },
                      { name: "Leave", color: "#FB923C" },
                      { name: "Late", color: "#EF4444" },
                      { name: "Half Day", color: "#7DD3FC" },
                    ]}
                    className="justify-start"
                  />
                </div>
                <div className="flex-1 w-full" style={{ minHeight: "250px" }}>
                  <ResponsiveContainer
                    width="100%"
                    height="100%"
                    minHeight={250}
                  >
                    <BarChart
                      data={monthlyAttendanceData}
                      margin={{ top: 5, right: 5, left: 5, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 9, fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        height={40}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tickFormatter={(value) => `${value}%`}
                        tick={{ fontSize: 9, fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        width={50}
                      />
                      <Tooltip formatter={(value) => [`${value}%`, ""]} />
                      <Bar dataKey="Present" stackId="a" fill="#4ADE80" />
                      <Bar dataKey="Absent" stackId="a" fill="#9CA3AF" />
                      <Bar dataKey="Leave" stackId="a" fill="#FB923C" />
                      <Bar dataKey="Late" stackId="a" fill="#EF4444" />
                      <Bar dataKey="Half" stackId="a" fill="#7DD3FC" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;