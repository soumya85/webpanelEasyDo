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
  ChevronDown,
  Trophy,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  Tooltip,
} from "recharts";

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
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      return {
        start: thisMonthStart,
        end: today,
        label: `${thisMonthStart.toLocaleDateString("en-US", { month: "short", year: "2-digit" }).toUpperCase()}`,
      };

    case "LAST_MONTH":
      const lastMonthStart = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      );
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);
      return {
        start: lastMonthStart,
        end: lastMonthEnd,
        label: `${lastMonthStart.toLocaleDateString("en-US", { month: "short", year: "2-digit" }).toUpperCase()}`,
      };

    case "CUSTOM_RANGE":
    default:
      return {
        start: today,
        end: today,
        label: "MAY 14, 25 - JUN 12, 25",
      };
  }
};

// Data Generation Functions
const generateKPIData = (dateRange: DateRange) => {
  const daysDiff =
    Math.floor(
      (dateRange.end.getTime() - dateRange.start.getTime()) /
        (1000 * 60 * 60 * 24),
    ) + 1;
  const multiplier = Math.min(daysDiff / 30, 2); // Cap at 2x for very long ranges

  return {
    totalEmployees: Math.floor(100 + multiplier * 50),
    employeesPresent: Math.floor(85 + multiplier * 40),
    employeesOnLeave: Math.floor(10 + multiplier * 5),
    newJoinees: Math.floor(5 + multiplier * 3),
    totalHoliday: Math.floor(3 + multiplier * 2),
  };
};

const generateAttendanceStatusData = (dateRange: DateRange) => {
  return [
    { name: "Present", value: 85, color: "#22C55E" },
    { name: "Absent", value: 8, color: "#EF4444" },
    { name: "Late", value: 4, color: "#F59E0B" },
    { name: "Half Day", value: 3, color: "#3B82F6" },
  ].map((item, index) => ({
    ...item,
    value: Math.max(1, item.value + (Math.random() - 0.5) * 10),
  }));
};

const generateSalaryData = (dateRange: DateRange) => {
  const months = [
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
  ];

  return months.map((month, index) => {
    const baseValue = 8000000;
    const seasonal = Math.sin((index / 12) * 2 * Math.PI) * 1000000;
    const random = (Math.random() - 0.5) * 500000;
    return {
      month,
      value: Math.max(6000000, baseValue + seasonal + random),
    };
  });
};

const generateEmployeeOfTheMonthData = (dateRange: DateRange) => {
  const employees = [
    { name: "Alex Johnson", department: "Engineering", performance: 95 },
    { name: "Sarah Chen", department: "Marketing", performance: 92 },
    { name: "Mike Rodriguez", department: "Sales", performance: 88 },
    { name: "Emily Davis", department: "HR", performance: 90 },
  ];

  const index = Math.floor(
    (dateRange.start.getMonth() + dateRange.start.getFullYear()) %
      employees.length,
  );
  return employees[index];
};

const generateWorkingHourTrendsData = (dateRange: DateRange) => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    const random = () => {
      let x = Math.sin(i * 0.1) + Math.cos(i * 0.2) + Math.random() * 0.5;
      return x - Math.floor(x);
    };

    data.push({
      day: i,
      Present: Math.floor(6 + random() * 3), // 6-9 hours
      Leave: Math.floor(random() * 2), // 0-2 hours
      Absent: Math.floor(random() * 1), // 0-1 hours
      Holiday: i % 7 === 0 ? Math.floor(1 + random()) : 0, // Some holidays
      OT: Math.floor(random() * 3), // 0-3 hours overtime
      RedFlags: Math.floor(random() * 2), // 0-2 red flags
    });
  }
  return data;
};

const calculateWorkingHourSummary = (data: any[]) => {
  const totalPresent = data.reduce((sum, item) => sum + item.Present, 0);
  const totalOT = data.reduce((sum, item) => sum + item.OT, 0);

  return {
    totalHours: `${totalPresent + totalOT}h`,
    workedHours: `${totalPresent}h`,
    overtimeHours: `${totalOT}h`,
  };
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
    "Nov",
    "Dec",
  ];

  return months.map((month, index) => ({
    month,
    Present: Math.floor(75 + Math.random() * 20),
    Absent: Math.floor(5 + Math.random() * 10),
    Leave: Math.floor(8 + Math.random() * 12),
    Holiday: Math.floor(2 + Math.random() * 6),
  }));
};

const generateSalaryRangeData = (dateRange: DateRange) => {
  return [
    { range: "20K-40K", value: 25, color: "#EF4444" },
    { range: "40K-60K", value: 35, color: "#F59E0B" },
    { range: "60K-80K", value: 25, color: "#22C55E" },
    { range: "80K-100K", value: 15, color: "#3B82F6" },
  ];
};

// Employee Attendance Data Types
interface EmployeeAttendanceData {
  id: string;
  name: string;
  initials: string;
  designation: string;
  location: string;
  dateOfJoining: string;
  status:
    | "PRESENT"
    | "ABSENT"
    | "CASUAL LEAVE"
    | "SICK LEAVE"
    | "HALF-DAY"
    | "WEEK OFF";
  checkInTime: string;
  checkoutTime: string;
  arrival: "Ontime" | "Late" | "N/A";
  totalWorkingHour: string;
}

const employeeAttendanceData: EmployeeAttendanceData[] = [
  {
    id: "EMP001",
    name: "Aarav Sharma",
    initials: "AS",
    designation: "Software Engineer",
    location: "Mumbai",
    dateOfJoining: "15 Jan 2023",
    status: "PRESENT",
    checkInTime: "10:15 A.M",
    checkoutTime: "7:15 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
  },
  {
    id: "EMP002",
    name: "Priya Patel",
    initials: "PP",
    designation: "Product Manager",
    location: "Delhi",
    dateOfJoining: "03 Mar 2022",
    status: "PRESENT",
    checkInTime: "9:45 A.M",
    checkoutTime: "6:45 P.M",
    arrival: "Ontime",
    totalWorkingHour: "9 Hrs",
  },
  {
    id: "EMP003",
    name: "Rohit Kumar",
    initials: "RK",
    designation: "UI/UX Designer",
    location: "Bangalore",
    dateOfJoining: "22 Sep 2023",
    status: "ABSENT",
    checkInTime: "N/A",
    checkoutTime: "N/A",
    arrival: "N/A",
    totalWorkingHour: "N/A",
  },
  {
    id: "EMP004",
    name: "Anita Singh",
    initials: "AS",
    designation: "Data Analyst",
    location: "Pune",
    dateOfJoining: "11 Jul 2021",
    status: "CASUAL LEAVE",
    checkInTime: "N/A",
    checkoutTime: "N/A",
    arrival: "N/A",
    totalWorkingHour: "N/A",
  },
  {
    id: "EMP005",
    name: "Vikram Rao",
    initials: "VR",
    designation: "DevOps Engineer",
    location: "Chennai",
    dateOfJoining: "05 Dec 2022",
    status: "PRESENT",
    checkInTime: "10:30 A.M",
    checkoutTime: "7:30 P.M",
    arrival: "Late",
    totalWorkingHour: "9 Hrs",
  },
];

// Component for date range picker
interface DateRangePickerProps {
  value: DateRangeOption;
  onChange: (value: DateRangeOption) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className,
}) => {
  const options: { value: DateRangeOption; label: string }[] = [
    { value: "TODAY", label: "Today" },
    { value: "YESTERDAY", label: "Yesterday" },
    { value: "LAST_7_DAYS", label: "Last 7 Days" },
    { value: "LAST_30_DAYS", label: "Last 30 Days" },
    { value: "THIS_MONTH", label: "This Month" },
    { value: "LAST_MONTH", label: "Last Month" },
    { value: "CUSTOM_RANGE", label: "Custom Range" },
  ];

  const selectedOption = options.find((option) => option.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg",
            "bg-white hover:bg-gray-50 transition-colors text-sm font-medium",
            className,
          )}
        >
          <span>{selectedOption?.label || "Select Range"}</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer",
              value === option.value && "bg-gray-100",
            )}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Chart card wrapper component
interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "p-4 sm:p-5 lg:p-6 flex-1 min-w-0",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-[#1a1a1a] font-inter text-base sm:text-lg font-bold mb-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[#666] font-inter text-sm">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

// Clean Employee Working Hour Trends Card Component - NO MODAL
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

      <div className="flex items-center gap-2 px-2 py-1 sm:px-3 sm:py-1 lg:px-4 lg:py-1 flex-1">
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

        <div className="flex gap-1.5 flex-shrink-0">
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

// Status Badge Component
const StatusBadge: React.FC<{ status: EmployeeAttendanceData["status"] }> = ({
  status,
}) => {
  const statusStyles = {
    PRESENT: "border-green-500 text-green-600 bg-green-50",
    ABSENT: "border-red-500 text-red-600 bg-red-50",
    "CASUAL LEAVE": "border-orange-500 text-orange-600 bg-orange-50",
    "SICK LEAVE": "border-purple-500 text-purple-600 bg-purple-50",
    "HALF-DAY": "border-yellow-500 text-yellow-600 bg-yellow-50",
    "WEEK OFF": "border-blue-500 text-blue-600 bg-blue-50",
  };

  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-medium border rounded-md",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
};

// Arrival Badge Component
const ArrivalBadge: React.FC<{
  arrival: EmployeeAttendanceData["arrival"];
}> = ({ arrival }) => {
  const arrivalStyles = {
    Ontime: "text-green-600",
    "N/A": "text-gray-600",
    Late: "text-red-600",
  };

  return (
    <span className={cn("text-sm font-medium", arrivalStyles[arrival])}>
      {arrival}
    </span>
  );
};

// Employee Attendance Log Component WITH MODAL
const EmployeeAttendanceLog: React.FC = () => {
  const [sortBy, setSortBy] = useState<"alphabetical" | "date">("alphabetical");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeAttendanceData | null>(null);

  const tableRef = React.useRef<HTMLDivElement>(null);

  const getCurrentDateString = () => {
    const date = selectedDate;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateAttendanceDataForDate = (date: Date) => {
    return employeeAttendanceData.map((employee) => ({
      ...employee,
      status: "PRESENT" as const,
      checkInTime: "10:15 A.M",
      checkoutTime: "7:15 P.M",
      arrival: "Ontime" as const,
      totalWorkingHour: "9 Hrs",
    }));
  };

  const filteredAndSortedEmployees = useMemo(() => {
    const dataToFilter = generateAttendanceDataForDate(selectedDate);

    let filtered = dataToFilter.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.location.toLowerCase().includes(searchTerm.toLowerCase()),
    );

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

  const totalPages = Math.ceil(filteredAndSortedEmployees.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentEmployees = filteredAndSortedEmployees.slice(
    startIndex,
    endIndex,
  );

  const handleSortChange = (newSortBy: "alphabetical" | "date") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortOrder("asc");
    }
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewEmployee = (employee: EmployeeAttendanceData) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-[10px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)] p-6 w-full">
      <div className="mb-6">
        <h2 className="text-[#1a1a1a] font-inter text-[18px] font-semibold mb-4">
          Employee Attendance Log
        </h2>

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
                <span>Alphabetically</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSortChange("date")}
                className="flex items-center"
              >
                <span>Date of Joining</span>
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
                    setCurrentPage(1);
                    setIsCalendarOpen(false);
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
                  <button
                    onClick={() => handleViewEmployee(employee)}
                    className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
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

      {/* Employee Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#374151] flex-shrink-0 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  {selectedEmployee?.initials}
                </span>
              </div>
              <div>
                <div className="text-xl font-semibold text-gray-900">
                  {selectedEmployee?.name}
                </div>
                <div className="text-sm text-gray-600">
                  {selectedEmployee?.designation}
                </div>
              </div>
            </DialogTitle>
            <DialogDescription>
              Attendance details for {getCurrentDateString()}
            </DialogDescription>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Employee Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">Employee ID</div>
                      <div className="text-sm font-medium">
                        {selectedEmployee.id}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">Location</div>
                      <div className="text-sm font-medium">
                        {selectedEmployee.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-xs text-gray-500">
                        Date of Joining
                      </div>
                      <div className="text-sm font-medium">
                        {selectedEmployee.dateOfJoining}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <StatusBadge status={selectedEmployee.status} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">
                        Today's Status
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Attendance Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Check-in Time
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedEmployee.checkInTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Check-out Time
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedEmployee.checkoutTime}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Arrival Status
                    </div>
                    <div className="flex items-center">
                      <ArrivalBadge arrival={selectedEmployee.arrival} />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">
                      Total Working Hours
                    </div>
                    <div className="text-lg font-semibold text-gray-900">
                      {selectedEmployee.totalWorkingHour}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium">
                  View Full History
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                  Export Report
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Overview: React.FC = () => {
  const [selectedDateRange, setSelectedDateRange] =
    useState<DateRangeOption>("CUSTOM_RANGE");

  const currentDateRange = useMemo(
    () => calculateDateRange(selectedDateRange),
    [selectedDateRange],
  );

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 font-inter")}>
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        <div className="bg-white rounded-lg border-l-[6px] border-[#4766E5] p-4 w-full">
          <h1 className="text-xl font-bold text-[#283C50]">Overview</h1>
        </div>

        <div className="w-full">
          <DateRangePicker
            value={selectedDateRange}
            onChange={setSelectedDateRange}
            className="mb-6"
          />
        </div>

        <div className="flex-1">
          <EmployeeWorkingHourTrendsCard dateRange={currentDateRange} />
        </div>

        <EmployeeAttendanceLog />
      </div>
    </div>
  );
};

export default Overview;
