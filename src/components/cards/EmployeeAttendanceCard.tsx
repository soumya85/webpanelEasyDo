import { User, Search, ChevronDown, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export default function EmployeeAttendanceCard() {
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedFilter, setSelectedFilter] = useState("Present");
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

  // Sample employee data for different statuses
  const employeeData = {
    Present: {
      name: "ABHIJIT MONDAL",
      department: "Jetty Sircar",
      status: "PRESENT",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
      dotColor: "bg-green-500",
      inTime: "10:01 AM",
      outTime: "07:02 PM",
      inStatus: "Office",
      inStatusColor: "text-green-600",
      outStatus: "Unverified",
      outStatusColor: "text-red-600",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    Absent: {
      name: "PRIYA SHARMA",
      department: "Operations",
      status: "ABSENT",
      statusColor: "text-red-600",
      statusBg: "bg-red-100",
      dotColor: "bg-red-500",
      inTime: "--",
      outTime: "--",
      inStatus: "No Check-in",
      inStatusColor: "text-red-600",
      outStatus: "No Check-out",
      outStatusColor: "text-red-600",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    "Half Day": {
      name: "RAHUL GUPTA",
      department: "Marketing",
      status: "HALF DAY",
      statusColor: "text-orange-600",
      statusBg: "bg-orange-100",
      dotColor: "bg-orange-500",
      inTime: "10:15 AM",
      outTime: "02:30 PM",
      inStatus: "Office",
      inStatusColor: "text-green-600",
      outStatus: "Half Day Leave",
      outStatusColor: "text-orange-600",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    Late: {
      name: "SNEHA PATEL",
      department: "Finance",
      status: "LATE",
      statusColor: "text-yellow-600",
      statusBg: "bg-yellow-100",
      dotColor: "bg-yellow-500",
      inTime: "11:45 AM",
      outTime: "07:15 PM",
      inStatus: "Late Entry",
      inStatusColor: "text-yellow-600",
      outStatus: "Office",
      outStatusColor: "text-green-600",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    Leave: {
      name: "AMIT KUMAR",
      department: "IT Support",
      status: "LEAVE",
      statusColor: "text-purple-600",
      statusBg: "bg-purple-100",
      dotColor: "bg-purple-500",
      inTime: "--",
      outTime: "--",
      inStatus: "On Leave",
      inStatusColor: "text-purple-600",
      outStatus: "Approved Leave",
      outStatusColor: "text-purple-600",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    },
    "Week off": {
      name: "ANJALI SINGH",
      department: "HR",
      status: "WEEK OFF",
      statusColor: "text-blue-600",
      statusBg: "bg-blue-100",
      dotColor: "bg-blue-500",
      inTime: "--",
      outTime: "--",
      inStatus: "Weekend",
      inStatusColor: "text-blue-600",
      outStatus: "Weekend",
      outStatusColor: "text-blue-600",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    },
    Holiday: {
      name: "RAJESH VERMA",
      department: "Sales",
      status: "HOLIDAY",
      statusColor: "text-indigo-600",
      statusBg: "bg-indigo-100",
      dotColor: "bg-indigo-500",
      inTime: "--",
      outTime: "--",
      inStatus: "Public Holiday",
      inStatusColor: "text-indigo-600",
      outStatus: "Public Holiday",
      outStatusColor: "text-indigo-600",
      image:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&crop=face",
    },
  };

  const currentEmployee =
    employeeData[selectedFilter as keyof typeof employeeData] ||
    employeeData.Present;

  const branchDropdownRef = useRef<HTMLDivElement>(null);
  const filterDropdownRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        branchDropdownRef.current &&
        !branchDropdownRef.current.contains(event.target as Node)
      ) {
        setBranchDropdownOpen(false);
      }
      if (
        filterDropdownRef.current &&
        !filterDropdownRef.current.contains(event.target as Node)
      ) {
        setFilterDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const branches = [
    {
      name: "All Branches",
      subtitle: "Manage/View all the branches",
      icon: "🏢",
    },
    {
      name: "Head office",
      subtitle:
        "104, 3rd Floor , Shyama Prasad Mukherjee Road, Hazra, Kalighat, Kalighat, Kolkata, West Bengal 700026, India",
      icon: "🏢",
    },
    {
      name: "Haldia",
      subtitle:
        "336G+34V, Sukanta Nagar, WARD NO-15, Haldia, West Bengal 721657, India",
      icon: "🏢",
    },
    {
      name: "Ahmedabad office",
      subtitle: "C/142, Vishwas City 1, Sola, Ahmedabad, Gujarat 380061, India",
      icon: "🏢",
    },
    {
      name: "Paradip",
      subtitle: "7J9X+5GG, Paradeep, Odisha 754142, India",
      icon: "🏢",
    },
    {
      name: "New Delhi",
      subtitle:
        "New Delhi,415, District Centre, Janakpuri, New Delhi, Delhi, 110058, India",
      icon: "🏢",
    },
    { name: "Your View", subtitle: "", icon: "👁️" },
  ];

  const filterOptions = [
    { name: "Present", count: 79 },
    { name: "Absent", count: 24 },
    { name: "Half Day", count: 0 },
    { name: "Late", count: 0 },
    { name: "Leave", count: 0 },
    { name: "Week off", count: 119 },
    { name: "Holiday", count: 0 },
  ];

  const attendanceData = [
    {
      label: "Present",
      value: 59,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      showIcon: true,
    },
    {
      label: "Total Staff",
      value: 121,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "Week off",
      value: 9,
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
      label: "Absent",
      value: 46,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      label: "Leave",
      value: 7.0,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    {
      label: "Work From Home",
      value: 0,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      label: "Work On Holiday",
      value: 0,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  return (
    <Card className="bg-white border border-gray-200 shadow-lg h-full">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Employee Attendance
          </h2>
          <div className="flex items-center gap-1">
            <span className="text-sm text-blue-600 font-medium">
              Today (Sat, 28 Jun 2025)
            </span>
            <ChevronDown className="w-4 h-4 text-blue-600 rotate-[-90deg]" />
          </div>
        </div>

        {/* Attendance Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {attendanceData.slice(0, 6).map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg border-b-4",
                "min-h-[80px] transition-all duration-200",
                item.bgColor,
                item.label === "Present"
                  ? "border-green-500"
                  : item.label === "Total Staff"
                    ? "border-blue-500"
                    : item.label === "Week off"
                      ? "border-orange-500"
                      : item.label === "Absent"
                        ? "border-red-500"
                        : item.label === "Leave"
                          ? "border-yellow-500"
                          : "border-gray-400",
              )}
            >
              <div className="flex items-center gap-1 mb-1">
                <div className={cn("text-xl font-bold", item.color)}>
                  {item.value}
                </div>
                {item.showIcon && (
                  <User className={cn("w-4 h-4", item.color)} />
                )}
              </div>
              <div className="text-xs text-gray-700 text-center font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Second Row - 3 boxes */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {attendanceData.slice(6, 9).map((item) => (
            <div
              key={item.label}
              className={cn(
                "flex flex-col items-center justify-center p-3 rounded-lg border-b-4",
                "min-h-[80px] transition-all duration-200",
                item.bgColor,
                item.label === "Leave"
                  ? "border-yellow-500"
                  : item.label === "Work From Home"
                    ? "border-purple-500"
                    : item.label === "Work On Holiday"
                      ? "border-indigo-500"
                      : "border-gray-400",
              )}
            >
              <div className="flex items-center gap-1 mb-1">
                <div className={cn("text-xl font-bold", item.color)}>
                  {item.value}
                </div>
              </div>
              <div className="text-xs text-gray-700 text-center font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-700" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-400 rounded-lg bg-gray-100 text-gray-700 placeholder-gray-700 focus:outline-none focus:border-gray-600"
            />
          </div>
          <div className="relative" ref={branchDropdownRef}>
            <button
              onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
              className="flex items-center gap-2 bg-white border-0 text-blue-600 text-sm font-medium px-3 py-2 rounded-lg focus:outline-none cursor-pointer"
            >
              <span>All</span>
              <ChevronDown className="w-4 h-4 text-blue-600" />
            </button>

            {branchDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {branches.map((branch, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedBranch(branch.name);
                      setBranchDropdownOpen(false);
                    }}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">
                        {branch.name}
                      </div>
                      {branch.subtitle && (
                        <div className="text-xs text-gray-500 mt-1">
                          {branch.subtitle}
                        </div>
                      )}
                    </div>
                    {branch.name === "All Branches" && (
                      <div className="text-blue-600">✓</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Date Navigation */}
        <div className="flex items-center justify-between mb-4 px-2">
          <button className="p-1">
            <ChevronDown className="w-5 h-5 text-gray-600 rotate-90" />
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            Saturday, 28 Jun, 2025
          </h3>
          <button className="p-1">
            <ChevronDown className="w-5 h-5 text-gray-600 rotate-[-90deg]" />
          </button>
        </div>

        {/* Filter Dropdown */}
        <div className="flex justify-center mb-4">
          <div className="relative" ref={filterDropdownRef}>
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="flex items-center justify-between gap-3 px-6 py-3 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors min-w-[200px]"
            >
              <div className="flex items-center gap-2">
                <span>{selectedFilter}</span>
                <span className="text-sm font-bold text-gray-600">
                  (
                  {
                    filterOptions.find((opt) => opt.name === selectedFilter)
                      ?.count
                  }
                  )
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>

            {filterDropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {filterOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedFilter(option.name);
                      setFilterDropdownOpen(false);
                    }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {option.name}
                    </span>
                    <span className="text-sm font-bold text-gray-600">
                      ({option.count})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Employee Details Card - Only show for Present filter */}
        {selectedFilter === "Present" && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-3">
            {/* Employee Profile */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <img
                  src={currentEmployee.image}
                  alt={currentEmployee.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border border-white flex items-center justify-center",
                    currentEmployee.dotColor,
                  )}
                >
                  <User className="w-1.5 h-1.5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">
                  {currentEmployee.name}
                </h4>
                <p className="text-xs text-gray-600">
                  {currentEmployee.department}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      currentEmployee.dotColor,
                    )}
                  ></div>
                  <span
                    className={cn(
                      "text-xs font-medium px-1.5 py-0.5 rounded",
                      currentEmployee.statusColor,
                      currentEmployee.statusBg,
                    )}
                  >
                    {currentEmployee.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  In: {currentEmployee.inTime}
                </p>
              </div>
            </div>

            {/* Attendance Details */}
            <div className="space-y-2">
              <div className="text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1 rounded">
                Attendance from Office
              </div>

              {/* Check In & Out */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    IN - {currentEmployee.inTime}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        currentEmployee.inStatusColor,
                      )}
                    >
                      {currentEmployee.inStatus}
                    </span>
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        currentEmployee.dotColor,
                      )}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    OUT: {currentEmployee.outTime}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        currentEmployee.outStatusColor,
                      )}
                    >
                      {currentEmployee.outStatus}
                    </span>
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        currentEmployee.dotColor,
                      )}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-2">
                <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-blue-50 rounded text-xs text-blue-600 font-medium hover:bg-blue-100 transition-colors">
                  Location Timeline
                  <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 p-2 bg-blue-50 rounded text-xs text-blue-600 font-medium hover:bg-blue-100 transition-colors">
                  View Logs
                  <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                </button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
