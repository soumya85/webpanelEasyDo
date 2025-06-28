import { User, Search, ChevronDown, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";

export default function EmployeeAttendanceCard() {
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedFilter, setSelectedFilter] = useState("Present");
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

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
    { name: "All", count: null },
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
    <Card className="bg-white border border-gray-200 shadow-sm h-full">
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
        <div className="relative mb-4" ref={filterDropdownRef}>
          <button
            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <span>{selectedFilter}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {filterDropdownOpen && (
            <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {filterOptions.map((option, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedFilter(option.name);
                    setFilterDropdownOpen(false);
                  }}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-sm font-medium text-gray-700">
                    {option.name}
                  </span>
                  {option.count !== null && (
                    <span className="text-sm font-bold text-gray-600">
                      {option.count}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Employee Details Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {/* Employee Profile */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Abhijit Mondal"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <User className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">ABHIJIT MONDAL</h4>
              <p className="text-sm text-gray-600">Jetty Sircar</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">📞</span>
                <span className="text-sm text-gray-500">💬</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  PRESENT
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">In: 10:01 AM - Ou...</p>
            </div>
          </div>

          {/* Attendance Details */}
          <div className="space-y-3">
            <div className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded">
              Attendance from Office
            </div>

            {/* Check In */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  IN - 10:01 AM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-green-600">
                  Office
                </span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
            <div className="text-xs text-gray-500 pl-2">
              336G+34V, Sukanta Nagar, WARD NO-15, Haldia, West Bengal 721657,
              India
            </div>

            {/* Check Out */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  OUT: 07:02 PM
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-red-600">
                  Unverified
                </span>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <button className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-blue-600 font-medium">
                  Location Timeline
                </span>
                <ChevronDown className="w-4 h-4 text-blue-600 rotate-[-90deg]" />
              </button>
              <button className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="text-blue-600 font-medium">View Logs</span>
                <ChevronDown className="w-4 h-4 text-blue-600 rotate-[-90deg]" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
