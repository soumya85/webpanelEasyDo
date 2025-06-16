import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

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
        <div className="text-[#4B5563] text-[13px] sm:text-[14px] lg:text-[15px] font-medium leading-[16px] sm:leading-[18px] lg:leading-[19.2px] font-inter -mt-3">
          {label}
        </div>
      </div>
    </div>
  );
};

// Employee Working Hour Trends Card Component
const EmployeeWorkingHourTrendsCard: React.FC = () => {
  const workingHourData = [
    { day: 1, Present: 6, Leave: 1, Absent: 0, Holiday: 0, OT: 1, RedFlags: 0 },
    {
      day: 8,
      Present: 5,
      Leave: 2,
      Absent: 1,
      Holiday: 0,
      OT: 1.5,
      RedFlags: 0.5,
    },
    {
      day: 15,
      Present: 4,
      Leave: 0,
      Absent: 2,
      Holiday: 2,
      OT: 0,
      RedFlags: 0,
    },
    {
      day: 22,
      Present: 7,
      Leave: 0.5,
      Absent: 0,
      Holiday: 0,
      OT: 2,
      RedFlags: 0.5,
    },
    {
      day: 29,
      Present: 5.5,
      Leave: 1.5,
      Absent: 0.5,
      Holiday: 0,
      OT: 1.5,
      RedFlags: 1,
    },
  ];

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
            <span className="text-[#4766E5] font-bold">- Sept 2024</span>
          </h3>
        </div>
        <div className="flex flex-col items-end text-right">
          <div className="text-[#1a1a1a] font-inter text-[10px] sm:text-[11px] lg:text-[12px] font-bold">
            Total Hour :{" "}
            <span className="text-[11px] sm:text-[12px] lg:text-[13px]">
              208
            </span>
          </div>
          <div className="text-[#1a1a1a] font-inter text-[8px] sm:text-[9px] lg:text-[10px] font-normal">
            Worked : <span className="text-[#22C55E] font-semibold">160</span>{" "}
            OT : <span className="text-[#3B82F6] font-semibold">14</span> Hrs
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
const EmployeeOfTheMonthCard: React.FC = () => {
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
        <h3 className="text-[#1a1a1a] font-inter text-[14px] font-medium leading-tight">
          Employee of the month{" "}
          <span className="text-[#4766E5] font-medium">- Sept 2024</span>
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
            SP
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
              Sanjay Patel
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
            Ahmedabad office{" "}
            <span className="font-semibold text-[#1a1a1a]">Branch</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#6B7280] font-inter text-[12px] font-normal">
              Overall Employee Score:{" "}
              <span className="font-bold text-[#1a1a1a]">2.76</span>
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
        d="M31.9844 17.1744C32.5469 17.1744 33.0156 17.3775 33.3906 17.7838C33.7969 18.1588 34 18.6275 34 19.19V33.2056C34 33.7369 33.7969 34.2056 33.3906 34.6119C33.0156 34.9869 32.5469 35.1744 31.9844 35.1744H18.0156C18.0156 35.1744H18.0156C17.4531 35.1744 16.9688 34.9869 16.5625 34.6119C16.1875 34.2056 16 33.7369 16 33.2056V19.19C16 18.6275 16.1875 18.1588 16.5625 17.7838C16.9688 17.3775 17.4531 17.1744 18.0156 17.1744H19V15.2056H21.0156V17.1744H28.9844V15.2056H31V17.1744H31.9844ZM31.9844 33.2056V23.1744H18.0156V33.2056H31.9844ZM22 27.2056V25.19H19.9844V27.2056H22ZM25.9844 27.2056V25.19H24.0156V27.2056H25.9844ZM30.0156 27.2056V25.19H28V27.2056H30.0156ZM22 31.19V29.1744H19.9844V31.19H22ZM25.9844 31.19V29.1744H24.0156V31.19H25.9844ZM30.0156 31.19V29.1744H28V31.19H30.0156Z"
        fill="#4766E5"
        transform="scale(2)"
        transform-origin="center"
      />
    </svg>
  </div>
);

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
            icon={<TotalHolidayIcon />}
            value="40"
            label="Pending Tasks"
          />
          <KPICard
            icon={<TotalHolidayIcon />}
            value="20"
            label="Upcoming Meetings"
          />
          <KPICard
            icon={<TotalHolidayIcon />}
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
              icon={<TotalHolidayIcon />}
              value="7"
              label="Announcements"
            />
            <EmployeeOfTheMonthCard />
          </div>
          <div className="flex-1">
            <EmployeeWorkingHourTrendsCard />
          </div>
        </div>

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
