import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AttendanceSummary() {
  const attendanceData = [
    {
      label: "Present",
      value: 20,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Absent",
      value: 0,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      label: "Leave",
      value: 1,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    { label: "Late", value: 3, color: "text-red-600", bgColor: "bg-red-50" },
    {
      label: "Half Day",
      value: 0,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
    {
      label: "Red Flags",
      value: 5,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      label: "Holidays",
      value: 3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#283C50] font-inter text-xl font-bold">
          Attendance
        </h2>
        <div className="flex items-center gap-2 text-[#4766E5] font-medium">
          <span className="text-sm">May, 2025</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Attendance Cards Grid */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {attendanceData.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg",
                  "min-h-[80px] transition-transform hover:scale-105",
                  item.bgColor,
                )}
              >
                <div className={cn("text-2xl font-bold mb-1", item.color)}>
                  {item.value}
                </div>
                <div className="text-xs text-gray-600 text-center font-medium">
                  {item.label}
                </div>
                {item.label === "Present" && (
                  <div className="w-full h-1 bg-green-500 rounded-full mt-2" />
                )}
                {item.label === "Leave" && (
                  <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
                )}
                {item.label === "Late" && (
                  <div className="w-full h-1 bg-red-500 rounded-full mt-2" />
                )}
                {item.label === "Red Flags" && (
                  <div className="w-full h-1 bg-red-500 rounded-full mt-2" />
                )}
                {item.label === "Holidays" && (
                  <div className="w-full h-1 bg-blue-500 rounded-full mt-2" />
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-600 text-center font-medium">
            Total Days: 24, Working Days: 21
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
