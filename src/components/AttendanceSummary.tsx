import { ChevronRight, User, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

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
    company: "Liberty Righrise Pvt Ltd",
    punchIn: times[index % times.length],
    punchOut: hasWorkingHours
      ? punchOutTimes[index % punchOutTimes.length]
      : null,
    location: "Kolkata, West",
    workingHours: hasWorkingHours
      ? `${8 + (index % 3)}:${20 + (index % 40)}`
      : null,
    overtime: hasWorkingHours ? (index % 2 === 0 ? "0 Hrs" : "1.5 Hrs") : null,
    isLate: isLate,
    isOnTime: status === "On Time",
  };
};

// Generate initial data (last 30 days)
const generateInitialData = () => {
  const entries = [];
  const today = new Date();

  for (let i = 0; i < 10; i++) {
    // Start with 10 entries
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    // Skip weekends for some realism
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      entries.push(generateAttendanceEntry(date, i));
    }
  }

  return entries;
};

// Tab configuration
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

// Generate data based on tab selection
const generateDataForTab = (tabId: string) => {
  const entries = [];
  const today = new Date();
  let startDate, endDate, maxEntries;

  switch (tabId) {
    case "thisMonth":
      // Current month (June 2025)
      startDate = new Date(2025, 5, 1); // June 1st, 2025
      endDate = new Date(2025, 5, 30); // June 30th, 2025
      maxEntries = 20;
      break;
    case "last30Days":
      // Last 30 days from today
      endDate = new Date();
      startDate = new Date();
      startDate.setDate(today.getDate() - 30);
      maxEntries = 25;
      break;
    case "lastMonth":
      // Previous month (May 2025)
      startDate = new Date(2025, 4, 1); // May 1st, 2025
      endDate = new Date(2025, 4, 31); // May 31st, 2025
      maxEntries = 22;
      break;
    case "thisYear":
      // This year (2025) - show recent entries
      startDate = new Date(2025, 0, 1); // January 1st, 2025
      endDate = new Date();
      maxEntries = 50;
      break;
    default:
      return generateInitialData();
  }

  let currentDate = new Date(endDate);
  let entryCount = 0;

  while (currentDate >= startDate && entryCount < maxEntries) {
    // Skip weekends for some realism
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      entries.push(generateAttendanceEntry(new Date(currentDate), entryCount));
      entryCount++;
    }
    currentDate.setDate(currentDate.getDate() - 1);
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

  // Load more data function
  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newEntries = [];
    const today = new Date();

    // Generate next 10 entries
    for (let i = currentOffset; i < currentOffset + 10; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        newEntries.push(generateAttendanceEntry(date, i));
      }

      // Stop after 60 days total
      if (i >= 60) {
        setHasMore(false);
        break;
      }
    }

    setAttendanceEntries((prev) => [...prev, ...newEntries]);
    setCurrentOffset((prev) => prev + 10);
    setLoading(false);
  }, [loading, hasMore, currentOffset]);

  // Scroll detection
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

      // Load more when scrolled to 80% of content
      if (scrollHeight - scrollTop <= clientHeight * 1.2) {
        loadMoreData();
      }
    },
    [loadMoreData],
  );

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const newData = generateDataForTab(tabId);
      setAttendanceEntries(newData);
      setCurrentOffset(newData.length);
      setHasMore(newData.length >= 10); // Allow more loading if we have enough data
      setLoading(false);
    }, 300);
  };

  // Reset data when modal opens or tab changes
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

  const attendanceData = [
    {
      label: "Present",
      value: 16,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      showIcon: true,
    },
    {
      label: "Absent",
      value: 0,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      label: "Leave",
      value: 0,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      label: "Late",
      value: 2,
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      label: "Half Day",
      value: 0,
      color: "text-gray-500",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      label: "Red Flags",
      value: 2,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      label: "Holidays",
      value: 4,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
  ];

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
        <DialogContent className="max-w-4xl h-[90vh] max-h-[90vh] overflow-hidden p-0 flex flex-col [&>button]:hidden">
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
                  "flex-1 py-3 px-4 text-center font-medium transition-colors relative",
                  activeTab === tab.id
                    ? "text-gray-900 border-b-2 border-gray-800"
                    : "text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:border-gray-300",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div
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
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            entry.isPresent ? "bg-green-500" : "bg-red-500",
                          )}
                        ></div>
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4 text-gray-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            {entry.date}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-sm",
                            entry.isPresent ? "bg-red-500" : "bg-gray-500",
                          )}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">
                          {entry.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {entry.company}
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-300">
                            Punch-In
                          </span>
                          <span className="text-lg font-medium text-gray-900">
                            {entry.punchIn} (IST)
                          </span>
                        </div>
                        <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg">
                          Verified
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">{entry.location}</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                          Branch
                        </span>
                      </div>

                      {entry.isLate && (
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-lg border border-red-300">
                            Late
                          </span>
                          <span className="text-gray-600">
                            Punch-in-Approval : NA
                          </span>
                        </div>
                      )}

                      {entry.punchOut && (
                        <>
                          <hr className="border-gray-200" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-lg border border-red-300">
                                Punch-out
                              </span>
                              <span className="text-lg font-medium text-gray-900">
                                {entry.punchOut} (IST)
                              </span>
                            </div>
                            <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-lg">
                              Verified
                            </span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">
                              {entry.location}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg">
                              Branch
                            </span>
                          </div>

                          {/* Working Hours Summary */}
                          <div className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-center gap-2 bg-gray-100 py-2 rounded">
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="font-medium text-gray-900">
                                Total Working Hours: {entry.workingHours}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-blue-100 py-2 rounded">
                              <svg
                                className="w-4 h-4 text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="font-medium text-gray-900">
                                Overtime : {entry.overtime}
                              </span>
                            </div>
                            <div className="flex items-center justify-center gap-2 bg-blue-200 py-2 rounded">
                              <span className="font-medium text-gray-900">
                                Overtime : NA
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {entry.isOnTime && (
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-300">
                            On Time
                          </span>
                          <span className="text-gray-600">
                            Punch-in-Approval : NA
                          </span>
                        </div>
                      )}

                      <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1">
                        Location Timeline
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" />
                    <span className="text-gray-600">
                      Loading more attendance records...
                    </span>
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

            {/* Bottom Attendance Summary */}
            <div className="bg-white border-t p-4 sticky bottom-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Attendance</h3>
                <span className="text-blue-600 font-medium">
                  {tabOptions.find((tab) => tab.id === activeTab)?.fullLabel ||
                    "This Month (June)"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg border-b-4 border-green-500">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-2xl font-bold text-green-600">16</div>
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    Present
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border-b-4 border-gray-400">
                  <div className="text-2xl font-bold text-gray-600 mb-1">0</div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    Absent
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-orange-50 rounded-lg border-b-4 border-orange-500">
                  <div className="text-2xl font-bold text-orange-600 mb-1">
                    0
                  </div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    Leave
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border-b-4 border-gray-400">
                  <div className="text-2xl font-bold text-gray-500 mb-1">2</div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    Late
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg border-b-4 border-gray-400">
                  <div className="text-2xl font-bold text-gray-500 mb-1">0</div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    Half Day
                  </div>
                </div>
                <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg border-b-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600 mb-1">2</div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    Red Flags
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg border-b-4 border-red-500">
                  <div className="text-2xl font-bold text-red-600 mb-1">4</div>
                  <div className="text-xs text-gray-700 text-center font-medium">
                    Holidays
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <span className="text-gray-700 font-medium">
                  Total Days{" "}
                  <span className="text-gray-800 font-semibold">20</span>,
                  Working Days{" "}
                  <span className="text-gray-800 font-semibold">16</span>
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
