import { User, Search, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EmployeeAttendanceCard() {
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
          <span className="text-sm text-blue-600 font-medium">June, 2025</span>
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
      </CardContent>
    </Card>
  );
}
