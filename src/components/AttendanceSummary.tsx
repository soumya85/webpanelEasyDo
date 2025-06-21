import { ChevronRight, ChevronUp, User, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback, useRef } from "react";

// Mock attendance data generator
const generateAttendanceEntry = (date: Date, index: number) => {
  const statuses = ["Present", "Late", "On Time", "Half Day"];
  const times = ["10:40 AM", "10:31 AM", "09:15 AM", "11:20 AM", "10:05 AM"];
  const punchOutTimes = [
    "09:20 PM",
    "08:45 PM",
    "07:30 PM",
    "06:15 PM",
    "09:00 PM",
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const hasWorkingHours = index % 3 === 0; // Every 3rd entry has working hours
  const isLate = index % 4 === 0; // Every 4th entry is late
  const status = isLate ? "Late" : statuses[index % statuses.length];

  return {
    id: `attendance-${date.getTime()}`,
    date: `${dayName}, ${day} ${month}, ${year}`,
    shortDate: `${day} ${month}`,
    status: status,
    isPresent: status !== "Absent",
    punchInTime: times[index % times.length],
    punchOutTime: punchOutTimes[index % punchOutTimes.length],
    location: "Kolkata, West",
    company: "Liberty Righrise Pvt Ltd",
    workingHours: hasWorkingHours ? "8:20" : null,
    isLate: isLate,
    hasApproval: index % 2 === 0,
  };
};

// Generate initial data for "This Month"
const generateInitialData = () => {
  const entries = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Generate entries for the current month up to today
  for (let i = 1; i <= today.getDate(); i++) {
    const date = new Date(currentYear, currentMonth, i);
    // Skip weekends (Saturday = 6, Sunday = 0)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      entries.push(generateAttendanceEntry(date, i));
    }
  }

  return entries.reverse(); // Most recent first
};

// Generate data for different tabs
const generateDataForTab = (tabId: string) => {
  const entries = [];
  const today = new Date();

  if (tabId === "thisMonth") {
    return generateInitialData();
  } else if (tabId === "last30Days") {
    // Generate data for last 30 days
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        entries.push(generateAttendanceEntry(date, i));
      }
    }
    return entries;
  } else if (tabId === "lastMonth") {
    // Generate data for last month
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

    for (let i = 1; i <= lastMonthEnd.getDate(); i++) {
      const date = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), i);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        entries.push(generateAttendanceEntry(date, i));
      }
    }
    return entries.reverse();
  } else if (tabId === "thisYear") {
    // Generate data for this year (last 90 working days)
    let entryCount = 0;
    for (let i = 0; i < 365 && entryCount < 90; i++) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      if (date.getFullYear() === today.getFullYear()) {
        const currentDate = new Date(date);
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
          entries.push(
            generateAttendanceEntry(new Date(currentDate), entryCount),
          );
          entryCount++;
        }
      }
    }
    return entries;
  }

  return entries;
};

export default function AttendanceSummary() {
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("thisMonth");
  const [attendanceEntries, setAttendanceEntries] = useState(
    generateInitialData(),
  );
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentOffset, setCurrentOffset] = useState(10);
  const [isBottomSummaryCollapsed, setIsBottomSummaryCollapsed] =
    useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Load more data function
  const loadMoreData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(() => {
      const today = new Date();
      const newEntries = [];

      // Generate more entries based on current offset
      for (let i = currentOffset; i < currentOffset + 10; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        // Skip weekends
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          newEntries.push(generateAttendanceEntry(date, i));
        }
      }

      if (newEntries.length === 0) {
        setHasMore(false);
      } else {
        setAttendanceEntries((prev) => [...prev, ...newEntries]);
        setCurrentOffset((prev) => prev + 10);
      }

      setLoading(false);
    }, 1000);
  }, [currentOffset, loading, hasMore]);

  // Handle scroll to load more data
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        loadMoreData();
      }
    },
    [loadMoreData],
  );

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setLoading(true);
    setTimeout(() => {
      const newData = generateDataForTab(tabId);
      setAttendanceEntries(newData);
      setCurrentOffset(newData.length);
      setHasMore(newData.length >= 10);
      setLoading(false);
    }, 500);
  };

  // Reset modal state when opened
  useEffect(() => {
    if (isAttendanceModalOpen) {
      handleTabChange(activeTab);
    }
  }, [isAttendanceModalOpen]);

  // Update data when tab changes
  useEffect(() => {
    if (isAttendanceModalOpen) {
      const newData = generateDataForTab(activeTab);
      setAttendanceEntries(newData);
      setCurrentOffset(newData.length);
      setHasMore(newData.length >= 10);
    }
  }, [activeTab, isAttendanceModalOpen]);

  // Toggle bottom summary position
  const toggleBottomSummary = () => {
    setIsBottomSummaryCollapsed(!isBottomSummaryCollapsed);
  };

  // Dynamic attendance data based on active tab
  const getAttendanceDataForTab = (tabId: string) => {
    const baseConfig = [
      {
        label: "Present",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        showIcon: true,
      },
      {
        label: "Absent",
        color: "text-gray-600",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      },
      {
        label: "Leave",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200",
      },
      {
        label: "Late",
        color: "text-gray-500",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      },
      {
        label: "Half Day",
        color: "text-gray-500",
        bgColor: "bg-gray-50",
        borderColor: "border-gray-200",
      },
      {
        label: "Red Flags",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      },
      {
        label: "Holidays",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      },
    ];

    switch (tabId) {
      case "thisMonth":
        return baseConfig.map((config, index) => ({
          ...config,
          value: [17, 0, 0, 2, 0, 2, 4][index],
        }));
      case "last30Days":
        return baseConfig.map((config, index) => ({
          ...config,
          value: [25, 0, 0, 2, 0, 2, 5][index],
        }));
      case "lastMonth":
        return baseConfig.map((config, index) => ({
          ...config,
          value: [26, 0, 1, 3, 0, 5, 4][index],
        }));
      case "thisYear":
        return baseConfig.map((config, index) => ({
          ...config,
          value: [138, 0, 3, 14, 2, 41, 31][index],
        }));
      default:
        return baseConfig.map((config, index) => ({
          ...config,
          value: [17, 0, 0, 2, 0, 2, 4][index],
        }));
    }
  };

  // Get summary data for active tab
  const getSummaryDataForTab = (tabId: string) => {
    switch (tabId) {
      case "thisMonth":
        return {
          totalDays: 21,
          workingDays: 17,
          totalHours: "153",
          workedHours: "158.76",
          otHours: "0.00",
          punchInLocations: { value: 17, type: "BRANCH" },
        };
      case "last30Days":
        return {
          totalDays: 30,
          workingDays: 25,
          totalHours: "225",
          workedHours: "231.89",
          otHours: "0.00",
          punchInLocations: { value: 25, type: "BRANCH" },
        };
      case "lastMonth":
        return {
          totalDays: 31,
          workingDays: 27,
          totalHours: "243",
          workedHours: "240.27",
          otHours: "0.00",
          punchInLocations: {
            value: 24,
            type: "BRANCH",
            additional: "2 UNVERIFIED",
          },
        };
      case "thisYear":
        return {
          totalDays: 172,
          workingDays: 141,
          totalHours: "172.00",
          workedHours: "141.00",
          otHours: "0.00",
          punchInLocations: { value: 17, type: "BRANCH" },
        };
      default:
        return {
          totalDays: 21,
          workingDays: 17,
          totalHours: "153",
          workedHours: "158.76",
          otHours: "0.00",
          punchInLocations: { value: 17, type: "BRANCH" },
        };
    }
  };

  const attendanceData = getAttendanceDataForTab(activeTab);
  const summaryData = getSummaryDataForTab(activeTab);

  const tabOptions = [
    {
      id: "thisMonth",
      label: "This Month (June)",
      fullLabel: "This Month (June)",
    },
    {
      id: "last30Days",
      label: "Last 30 days (till 20 June)",
      fullLabel: "Last 30 days (till 20 June)",
    },
    {
      id: "lastMonth",
      label: "Last Month (May)",
      fullLabel: "Last Month (May)",
    },
    {
      id: "thisYear",
      label: "This Year (2025)",
      fullLabel: "This Year (2025)",
    },
  ];

  // Attendance summary component
  const AttendanceSummaryContent = () => (
    <div
      className={cn(
        "flex flex-col bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden",
        !isBottomSummaryCollapsed ? "h-[70vh]" : "h-auto",
      )}
    >
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 bg-white">
        {/* Collapse/Expand Arrow */}
        <div className="flex justify-center pt-4 pb-2">
          <button
            onClick={toggleBottomSummary}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label={
              isBottomSummaryCollapsed
                ? "Expand analytics"
                : "Collapse analytics"
            }
          >
            <ChevronUp
              className={cn(
                "w-5 h-5 text-gray-500 transition-transform duration-200",
                isBottomSummaryCollapsed ? "" : "rotate-180",
              )}
            />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 pb-3 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Attendance</h3>
          <span className="text-blue-600 font-medium">
            {tabOptions.find((tab) => tab.id === activeTab)?.fullLabel ||
              "This Month (June)"}
          </span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className={cn(
          "flex-1 overflow-y-auto",
          !isBottomSummaryCollapsed ? "min-h-0" : "",
        )}
      >
        <div className="p-4">
          {/* Attendance Grid */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            <div className="flex flex-col items-center p-2 bg-green-50 rounded-lg border-b-4 border-green-500">
              <div className="flex items-center gap-1 mb-1">
                <div className="text-xl font-bold text-green-600">16</div>
                <User className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-xs text-gray-700 text-center font-medium">
                Present
              </div>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg border-b-4 border-gray-400">
              <div className="text-xl font-bold text-gray-600 mb-1">0</div>
              <div className="text-xs text-gray-700 text-center font-medium">
                Absent
              </div>
            </div>
            <div className="flex flex-col items-center p-2 bg-orange-50 rounded-lg border-b-4 border-orange-500">
              <div className="text-xl font-bold text-orange-600 mb-1">0</div>
              <div className="text-xs text-gray-700 text-center font-medium">
                Leave
              </div>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg border-b-4 border-gray-400">
              <div className="text-xl font-bold text-gray-500 mb-1">2</div>
              <div className="text-xs text-gray-700 text-center font-medium">
                Late
              </div>
            </div>
            <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg border-b-4 border-gray-400">
              <div className="text-xl font-bold text-gray-500 mb-1">0</div>
              <div className="text-xs text-gray-700 text-center font-medium">
                Half Day
              </div>
            </div>
            <div className="flex flex-col items-center p-2 bg-red-50 rounded-lg border-b-4 border-red-500">
              <div className="text-xl font-bold text-red-600 mb-1">2</div>
              <div className="text-xs text-gray-700 text-center font-medium">
                Red Flags
              </div>
            </div>
            <div className="flex flex-col items-center p-2 bg-red-50 rounded-lg border-b-4 border-red-500">
              <div className="text-xl font-bold text-red-600 mb-1">4</div>
              <div className="text-xs text-gray-700 text-center font-medium">
                Holidays
              </div>
            </div>
          </div>

          {/* Total Days Summary */}
          <div className="text-center mb-4">
            <span className="text-gray-700 font-medium">
              Total Days{" "}
              <span className="text-gray-800 font-semibold">
                {summaryData.totalDays}
              </span>
              , Working Days{" "}
              <span className="text-gray-800 font-semibold">
                {summaryData.workingDays}
              </span>
            </span>
          </div>

          {/* Additional Analytics - Show only when expanded (not collapsed) */}
          {!isBottomSummaryCollapsed && (
            <>
              {/* Daily Hours Bar Chart */}
              <div className="mb-6 mt-6">
                <div className="relative bg-white p-4">
                  {/* Chart Container */}
                  <div className="flex items-end h-40 border-l border-b border-gray-400 relative">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between h-full text-xs text-gray-700 pr-3 -ml-1">
                      <span>12h</span>
                      <span>10h</span>
                      <span>8h</span>
                      <span>6h</span>
                      <span>4h</span>
                      <span>2h</span>
                      <span>0h</span>
                    </div>

                    {/* Chart Area */}
                    <div className="flex items-end flex-1 h-full relative ml-2">
                      {/* Bars representing each day of the month */}
                      <div className="flex items-end gap-[2px] w-full h-full">
                        {(() => {
                          // Define specific pattern matching the screenshot
                          const barHeights = [
                            75,
                            85,
                            80,
                            85,
                            85,
                            90,
                            0,
                            0, // Days 1-8 (weekend on 7,8)
                            95,
                            85,
                            85,
                            85,
                            95,
                            75,
                            0, // Days 9-15 (weekend on 15)
                            85,
                            95,
                            95,
                            95,
                            85,
                            85, // Days 16-21
                            0,
                            95,
                            85,
                            85,
                            85,
                            85,
                            0, // Days 22-28 (weekends on 22, 29)
                            5,
                            0, // Days 29-30 (very short on 29, weekend on 30)
                          ];

                          return Array.from({ length: 30 }, (_, i) => {
                            const day = i + 1;
                            const height = barHeights[i] || 0;
                            const isWeekend = height === 0 || height < 10;

                            return (
                              <div
                                key={day}
                                className={`flex-1 min-w-[8px] ${
                                  isWeekend ? "bg-red-500" : "bg-green-500"
                                }`}
                                style={{ height: `${height}%` }}
                                title={`Day ${day}: ${
                                  isWeekend
                                    ? "Weekend/Holiday"
                                    : `${Math.round((height / 100) * 12)} hours worked`
                                }`}
                              />
                            );
                          });
                        })()}
                      </div>

                      {/* X-axis day markers */}
                      <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs text-gray-700 px-4">
                        <span className="transform -translate-x-2">05</span>
                        <span className="transform -translate-x-1">10</span>
                        <span>15</span>
                        <span className="transform translate-x-1">20</span>
                        <span className="transform translate-x-2">25</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours Summary */}
              <div className="mb-6 px-4">
                <div className="flex items-center gap-8 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">
                      Total Hours :{" "}
                    </span>
                    <span className="text-gray-600">153....</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Worked : </span>
                    <span className="text-green-600 font-semibold">156.36</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">OT : </span>
                    <span className="text-blue-600 font-semibold">
                      0.00 Hrs
                    </span>
                  </div>
                </div>
              </div>

              {/* Punch-in Locations */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Punch-in Locations
                  </span>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">17</div>
                  <div className="text-xs text-gray-600 font-medium">
                    BRANCH
                  </div>
                </div>
              </div>

              {/* Monthly Calendar */}
              <div className="bg-white rounded-lg border p-4 min-h-[200px]">
                <div className="text-center text-sm font-semibold text-gray-900 mb-3">
                  Jun 2025
                </div>

                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-xs text-gray-600 text-center py-1 font-medium"
                      >
                        {day}
                      </div>
                    ),
                  )}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Generate full calendar grid - 6 weeks (42 days) */}
                  {(() => {
                    const calendarDays = [];

                    // Previous month end dates (May 2025 ends on 31st, June starts on Sunday)
                    const prevMonthDays = [25, 26, 27, 28, 29, 30, 31];
                    prevMonthDays.forEach((day) => {
                      calendarDays.push(
                        <div
                          key={`prev-${day}`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-gray-300 text-gray-600"
                        >
                          {day}
                        </div>,
                      );
                    });

                    // Current month days (June 2025 - 30 days)
                    for (let day = 1; day <= 30; day++) {
                      // Determine if it's a weekend/holiday (red) or working day (green)
                      // Sunday = 0, Saturday = 6 in JS Date
                      const date = new Date(2025, 5, day); // Month is 0-indexed
                      const dayOfWeek = date.getDay();
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                      calendarDays.push(
                        <div
                          key={`current-${day}`}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                            isWeekend
                              ? "bg-red-500 text-white"
                              : "bg-green-500 text-white"
                          }`}
                        >
                          {day}
                        </div>,
                      );
                    }

                    // Next month start dates to fill the grid (July 2025)
                    for (let day = 1; day <= 5; day++) {
                      calendarDays.push(
                        <div
                          key={`next-${day}`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-gray-300 text-gray-600"
                        >
                          {day}
                        </div>,
                      );
                    }

                    return calendarDays;
                  })()}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full">
      {/* Card with background starting from title */}
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Attendance
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="text-[#4766E5] font-medium hover:text-[#3752D1] transition-colors cursor-pointer"
                onClick={() => setIsAttendanceModalOpen(true)}
              >
                <span className="text-sm">June, 2025</span>
              </button>
              <ChevronRight className="w-4 h-4 text-[#4766E5]" />
            </div>
          </div>

          {/* Attendance Cards Grid */}
          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-3 gap-3 mb-4 flex-1">
              {attendanceData.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex flex-col items-center justify-center p-3 rounded-lg border",
                    "min-h-[80px] transition-all duration-200 hover:scale-105 hover:shadow-md",
                    item.bgColor,
                    item.borderColor,
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className={cn("text-2xl font-bold", item.color)}>
                      {item.value}
                    </div>
                    {item.showIcon && (
                      <User className={cn("w-5 h-5", item.color)} />
                    )}
                  </div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    {item.label}
                  </div>

                  {/* Progress indicators for specific categories */}
                  {item.label === "Present" && (
                    <div className="w-full h-1 bg-green-500 rounded-full mt-3" />
                  )}
                  {item.label === "Absent" && (
                    <div className="w-full h-1 bg-gray-400 rounded-full mt-3" />
                  )}
                  {item.label === "Leave" && (
                    <div className="w-full h-1 bg-orange-500 rounded-full mt-3" />
                  )}
                </div>
              ))}
            </div>

            {/* Footer with additional information */}
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <div className="flex items-center justify-center text-sm">
                <span className="text-gray-700 font-medium">
                  Total Days{" "}
                  <span className="text-gray-800 font-semibold">20</span>,
                  Working Days{" "}
                  <span className="text-gray-800 font-semibold">16</span>
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Detail Modal */}
      <Dialog
        open={isAttendanceModalOpen}
        onOpenChange={setIsAttendanceModalOpen}
      >
        <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] p-0 flex flex-col [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Soumyadeep Goswami Attendance Details</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#F8F9FA] border-b">
            <h1 className="text-lg font-semibold text-[#283C50]">
              Soumyadeep Goswami Attendance
            </h1>
            <button
              onClick={() => setIsAttendanceModalOpen(false)}
              className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b bg-white">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={cn(
                  "flex-1 py-1 px-4 text-center font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-gray-900 border-b-2 border-gray-800"
                    : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Summary Section When Expanded - Positioned Right After Tabs */}
          {!isBottomSummaryCollapsed && (
            <div className="mx-4 mt-2 z-10">
              <AttendanceSummaryContent />
            </div>
          )}

          {/* Content Container */}
          <div className="flex-1 relative flex flex-col overflow-hidden">
            {/* Scrollable Content Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto bg-gray-50"
              onScroll={handleScroll}
            >
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading attendance data...</span>
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {/* Dynamic Attendance Entries */}
                  {attendanceEntries.map((entry, index) => (
                    <div
                      key={entry.id}
                      className="bg-white rounded-lg shadow-sm border p-4"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-4 h-4"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">
                              {entry.date}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {entry.isLate && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                              Late
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-sm font-medium text-gray-900">
                          {entry.company}
                        </div>

                        {/* Punch In */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                              Punch-in
                            </span>
                            <span className="text-sm font-medium">
                              {entry.punchInTime} (IST)
                            </span>
                          </div>
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        </div>

                        <div className="text-xs text-gray-600">
                          {entry.location}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {entry.isLate && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                Late
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            Punch-in-Approval:{" "}
                            {entry.hasApproval ? "Approved" : "NA"}
                          </div>
                        </div>

                        {/* Punch Out */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                              Punch-out
                            </span>
                            <span className="text-sm font-medium">
                              {entry.punchOutTime} (IST)
                            </span>
                          </div>
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            Verified
                          </span>
                        </div>

                        <div className="text-xs text-gray-600">
                          {entry.location}
                        </div>

                        {entry.workingHours && (
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                              >
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12,6 12,12 16,14" />
                              </svg>
                              <span className="text-sm font-medium text-gray-900">
                                Total Working Hours: {entry.workingHours}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Loading indicator */}
                  {loading && hasMore && (
                    <div className="flex items-center justify-center py-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-gray-600">
                          Loading more attendance records...
                        </span>
                      </div>
                    </div>
                  )}

                  {/* End of data indicator */}
                  {!hasMore && attendanceEntries.length > 10 && (
                    <div className="text-center py-6">
                      <span className="text-gray-500">
                        No more attendance records to load
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Attendance Summary - Only show when collapsed */}
            {isBottomSummaryCollapsed && (
              <div className="bg-white border-t shadow-2xl sticky bottom-0 z-10">
                <AttendanceSummaryContent />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
