import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AttendanceSummary() {
  const attendanceData = [
    {
      label: "Present",
      value: 0,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      label: "Late",
      value: 0,
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
      label: "Total Staff",
      value: 120,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      label: "Week Off",
      value: 0,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      label: "Absent",
      value: 3,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
    },
    {
      label: "Leave",
      value: "0.0",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <div className="w-full h-full">
      {/* Card with background starting from title */}
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Attendance
            </h2>
            <div className="flex items-center gap-2">
              <button className="text-[#4766E5] font-medium hover:text-[#3752D1] transition-colors cursor-pointer">
                <span className="text-sm">Today (Fri, 13 Jun 2025)</span>
              </button>
              <ChevronRight className="w-4 h-4 text-[#4766E5]" />
            </div>
          </div>

          {/* Attendance Cards Grid */}
          <div className="flex-1 flex flex-col">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 flex-1">
              {attendanceData.map((item, index) => (
                <div
                  key={item.label}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-lg border",
                    "min-h-[100px] transition-all duration-200 hover:scale-105 hover:shadow-md",
                    item.bgColor,
                    item.borderColor,
                  )}
                >
                  <div className={cn("text-3xl font-bold mb-2", item.color)}>
                    {item.value}
                  </div>
                  <div className="text-sm text-gray-700 text-center font-medium">
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
                  {item.label === "Total Staff" && (
                    <div className="w-full h-1 bg-blue-500 rounded-full mt-3" />
                  )}
                  {item.label === "Week Off" && (
                    <div className="w-full h-1 bg-red-500 rounded-full mt-3" />
                  )}
                </div>
              ))}
            </div>

            {/* Footer with additional information */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                  <span className="text-gray-700 font-medium">
                    <span className="text-gray-500">Total Days:</span>
                    <span className="text-gray-800 font-semibold ml-1">24</span>
                  </span>
                  <span className="text-gray-700 font-medium">
                    <span className="text-gray-500">Working Days:</span>
                    <span className="text-gray-800 font-semibold ml-1">21</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-xs">Work From</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
