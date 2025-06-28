import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EmployeeLocationTimelineCard() {
  const branchData = [
    { name: "New Delhi Branch", count: 18, color: "bg-red-500" },
    { name: "Kolkata Branch", count: 22, color: "bg-red-500" },
    { name: "Mumbai Office", count: 0, color: "bg-blue-500" },
    { name: "Head Office Branch", count: 10, color: "bg-orange-500" },
    { name: "Ahmedabad Office Branch", count: 10, color: "bg-orange-500" },
  ];

  const timeSlots = [
    { time: "7 AM", active: false },
    { time: "8 AM", active: false },
    { time: "9 AM", active: false },
    { time: "10 AM", active: true },
    { time: "11 AM", active: false },
    { time: "12 PM", active: false },
    { time: "1 PM", active: false },
    { time: "2 PM", active: false },
  ];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Employee Location Timeline
          </h2>
          <span className="text-sm text-gray-500">Present</span>
        </div>

        {/* Date and Branch Info */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            Today (Sat, Jun 28, 2025) IST
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium">All Branches</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">29</div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter employee name"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            disabled
          />
        </div>

        {/* Timeline */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <button className="p-1 text-gray-400">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs">Previous</span>
            </button>
            <div className="text-sm font-medium">10 AM</div>
            <button className="p-1 text-gray-400">
              <span className="text-xs">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline Bar */}
          <div className="flex items-center gap-1 mb-2">
            {timeSlots.map((slot) => (
              <div key={slot.time} className="flex-1 text-center">
                <div className="text-xs text-gray-500 mb-1">{slot.time}</div>
                <div
                  className={cn(
                    "h-2 rounded-full",
                    slot.active ? "bg-green-500" : "bg-gray-200",
                  )}
                />
              </div>
            ))}
          </div>

          {/* Active Time Indicator */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full">
              ✓
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="relative bg-gray-100 rounded-lg h-32 mb-4 overflow-hidden">
          {/* Simplified map background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            {/* Mock map elements */}
            <div className="absolute top-4 left-4 text-xs font-semibold text-gray-700">
              Pakistan
            </div>
            <div className="absolute top-8 right-8 text-xs font-semibold text-gray-700">
              Tibet
            </div>
            <div className="absolute bottom-6 left-12 text-xs font-semibold text-gray-700">
              Mumbai
            </div>
            <div className="absolute bottom-8 right-6 text-xs font-semibold text-gray-700">
              Myanmar (Burma)
            </div>

            {/* Location markers */}
            {branchData.map((branch, index) => (
              <div
                key={branch.name}
                className={cn(
                  "absolute w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold",
                  branch.color,
                )}
                style={{
                  top: `${20 + index * 15}%`,
                  left: `${30 + index * 12}%`,
                }}
              >
                {branch.count}
              </div>
            ))}
          </div>

          {/* Google watermark */}
          <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-500">
            Google
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
