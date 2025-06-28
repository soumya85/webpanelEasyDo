import { Search, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function EmployeeLocationTimelineCard() {
  const [currentTimeSlot, setCurrentTimeSlot] = useState(3); // 10 AM slot

  // Timeline data - different time slots throughout the day
  const timeSlots = [
    { time: "1 AM", active: false },
    { time: "2 AM", active: false },
    { time: "3 AM", active: false },
    { time: "4 AM", active: false },
    { time: "5 AM", active: false },
    { time: "6 AM", active: false },
    { time: "7 AM", active: false },
    { time: "8 AM", active: false },
    { time: "9 AM", active: false },
    { time: "10 AM", active: true },
    { time: "11 AM", active: false },
    { time: "12 PM", active: false },
    { time: "1 PM", active: false },
    { time: "2 PM", active: false },
  ];

  // Branch location data with coordinates for positioning
  const branchLocations = [
    { name: "New Delhi Branch", count: 3, top: "20%", left: "45%" },
    { name: "Ahmedabad office Branch", count: 0, top: "35%", left: "25%" },
    { name: "Haldia Branch", count: 12, top: "45%", left: "70%" },
    { name: "Head office Branch", count: 10, top: "50%", left: "65%" },
    { name: "Paradip Branch", count: 22, top: "60%", left: "72%" },
  ];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full">
      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Employee Location Timeline
          </h2>

          {/* Date and Status Row */}
          <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              Today (Sat, 28 Jun 2025) IST
            </span>
            <span className="text-sm font-medium text-gray-900">Present</span>
          </div>

          {/* All Branches Section */}
          <div className="flex items-center justify-between mb-4 p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-gray-900">All Branches</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">29</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter employee name"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 text-gray-500 placeholder-gray-400"
            />
          </div>

          {/* Timeline */}
          <div className="mb-6">
            {/* Timeline Bar */}
            <div className="flex items-center gap-1 mb-2">
              {timeSlots
                .slice(currentTimeSlot, currentTimeSlot + 8)
                .map((slot, index) => (
                  <div key={slot.time} className="flex-1 text-center">
                    <div className="text-xs text-gray-500 mb-1">
                      {slot.time}
                    </div>
                    <div
                      className={cn(
                        "h-2 rounded-full",
                        slot.active ? "bg-green-500" : "bg-gray-300",
                      )}
                    />
                  </div>
                ))}
            </div>

            {/* Active Time Indicator */}
            <div className="text-center mt-2">
              <div className="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full">
                ✓
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="relative bg-gradient-to-br from-blue-100 via-green-50 to-yellow-50 rounded-lg h-64 overflow-hidden border border-gray-200">
          {/* Map Background with Country Names */}
          <div className="absolute inset-0">
            {/* Country Labels */}
            <div className="absolute top-3 left-4 text-xs font-semibold text-gray-700">
              Kyrgyzstan
            </div>
            <div className="absolute top-8 left-8 text-xs font-semibold text-gray-700">
              Tajikistan
            </div>
            <div className="absolute top-6 right-6 text-xs font-semibold text-gray-600">
              XINJIANG
            </div>
            <div className="absolute top-16 left-2 text-xs font-semibold text-gray-700">
              Pakistan
            </div>
            <div className="absolute top-20 right-8 text-xs font-semibold text-gray-600">
              TIBET
            </div>
            <div className="absolute bottom-20 left-8 text-xs font-semibold text-gray-700">
              Mumbai
            </div>
            <div className="absolute bottom-16 right-4 text-xs font-semibold text-gray-700">
              Myanmar
              <br />
              (Burma)
            </div>
            <div
              className="absolute bottom-8 center text-xs font-semibold text-gray-700"
              style={{ left: "45%" }}
            >
              Sri Lanka
            </div>
            <div className="absolute bottom-12 left-12 text-xs text-gray-600">
              Arabian Sea
            </div>
            <div className="absolute bottom-8 right-8 text-xs text-gray-600">
              Bay of Bengal
            </div>

            {/* India label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-800">
              India
            </div>

            {/* State/Region Labels */}
            <div className="absolute" style={{ top: "40%", left: "52%" }}>
              <span className="text-xs text-gray-600">UP</span>
            </div>
            <div className="absolute" style={{ top: "58%", right: "25%" }}>
              <span className="text-xs text-gray-600">OD</span>
            </div>
            <div className="absolute" style={{ top: "45%", right: "20%" }}>
              <span className="text-xs text-gray-600">ML</span>
            </div>
            <div className="absolute" style={{ top: "42%", right: "15%" }}>
              <span className="text-xs text-gray-600">NL</span>
            </div>
            <div className="absolute" style={{ top: "35%", right: "18%" }}>
              <span className="text-xs text-gray-600">AR</span>
            </div>
            <div className="absolute" style={{ top: "48%", right: "10%" }}>
              <span className="text-xs text-gray-600">MZ</span>
            </div>
            <div className="absolute" style={{ bottom: "25%", left: "15%" }}>
              <span className="text-xs text-gray-600">KA</span>
            </div>
            <div className="absolute" style={{ bottom: "20%", left: "20%" }}>
              <span className="text-xs text-gray-600">TN</span>
            </div>
            <div className="absolute" style={{ bottom: "22%", left: "25%" }}>
              <span className="text-xs text-gray-600">KL</span>
            </div>
            <div className="absolute" style={{ bottom: "35%", left: "18%" }}>
              <span className="text-xs text-gray-600">GA</span>
            </div>
            <div className="absolute" style={{ bottom: "30%", left: "35%" }}>
              <span className="text-xs text-gray-600">AP</span>
            </div>

            {/* City Labels */}
            <div className="absolute" style={{ top: "28%", left: "45%" }}>
              <span className="text-xs font-medium text-gray-800">
                New Delhi Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "42%", left: "20%" }}>
              <span className="text-xs font-medium text-gray-800">
                Ahmedabad
                <br />
                office Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "52%", left: "62%" }}>
              <span className="text-xs font-medium text-gray-800">
                Haldia Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "48%", left: "70%" }}>
              <span className="text-xs font-medium text-gray-800">
                Head office
                <br />
                Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "65%", left: "68%" }}>
              <span className="text-xs font-medium text-gray-800">
                Paradip Branch
              </span>
            </div>
            <div className="absolute" style={{ bottom: "30%", left: "45%" }}>
              <span className="text-xs font-medium text-gray-800">
                Hyderabad
              </span>
            </div>
          </div>

          {/* Location Markers */}
          {branchLocations.map((branch, index) => (
            <div
              key={branch.name}
              className="absolute w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-2 border-white shadow-lg"
              style={{
                top: branch.top,
                left: branch.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              {branch.count}
            </div>
          ))}

          {/* Google Logo */}
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-gray-600 font-semibold">
            Google
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
