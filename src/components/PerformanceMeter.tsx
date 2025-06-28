import { Card, CardContent } from "@/components/ui/card";
import { Search, Building } from "lucide-react";
import { useState } from "react";

export default function PerformanceMeter() {
  const [currentTime, setCurrentTime] = useState("10 AM");
  const [searchValue, setSearchValue] = useState("");
  const [totalEmployees] = useState(29);

  // Sample branch data
  const branches = [
    { name: "New Delhi Branch", count: 3, lat: 28.6, lng: 77.2 },
    { name: "Ahmedabad Office Branch", count: 0, lat: 23.0, lng: 72.6 },
    { name: "Halasuru Branch", count: 12, lat: 12.97, lng: 77.6 },
    { name: "Paradip Branch", count: 10, lat: 20.26, lng: 86.7 },
  ];

  // Timeline hours
  const timelineHours = [
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
  ];

  const getCurrentDate = () => {
    const today = new Date();
    const options = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return `Today (${today.toLocaleDateString("en-US", options)}) IST`;
  };

  return (
    <div className="w-full h-full">
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Employee Location
            </h2>
          </div>

          {/* Content Container */}
          <div className="flex-1 flex flex-col space-y-4">
            {/* Top Info Panel */}
            <div className="bg-gray-50 rounded-lg p-4 border">
              {/* Date and Present Status */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-900">
                  {getCurrentDate()}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  Present
                </span>
              </div>

              {/* All Branches Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    All Branches
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7 14l5-5 5 5z" />
                    </svg>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {totalEmployees}
                  </span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Enter employee name"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-200 rounded-lg text-sm text-gray-600 placeholder-gray-500 border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Timeline Scrubber */}
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                {timelineHours.slice(0, 8).map((hour, index) => (
                  <div key={hour} className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full mb-1 ${
                        hour === currentTime
                          ? "bg-green-500"
                          : index < 5
                            ? "bg-green-400"
                            : "bg-gray-300"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        hour === currentTime
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {hour}
                    </span>
                  </div>
                ))}
              </div>

              {/* Timeline Line */}
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200"></div>
                <div
                  className="absolute top-0 left-0 h-0.5 bg-green-500"
                  style={{ width: "62%" }}
                ></div>
              </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg border relative overflow-hidden min-h-[300px]">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full"
                  style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))" }}
                >
                  {/* India Map Outline (Simplified) */}
                  <path
                    d="M100 80 Q120 60 140 70 Q160 50 180 60 Q200 40 220 50 Q240 45 250 55 Q270 50 280 65 Q300 60 320 75 Q340 80 350 100 Q360 120 350 140 Q345 160 340 180 Q330 200 320 220 Q300 240 280 250 Q260 255 240 250 Q220 245 200 240 Q180 235 160 230 Q140 225 120 220 Q100 210 90 190 Q85 170 90 150 Q95 130 100 110 Q105 90 100 80 Z"
                    fill="#e8f5e8"
                    stroke="#a8d8a8"
                    strokeWidth="1"
                  />

                  {/* Branch Markers */}
                  {branches.map((branch, index) => {
                    const positions = [
                      { x: 160, y: 90 }, // New Delhi
                      { x: 120, y: 140 }, // Ahmedabad
                      { x: 200, y: 180 }, // Halasuru
                      { x: 220, y: 160 }, // Paradip
                    ];

                    return (
                      <g key={branch.name}>
                        {/* Pin */}
                        <circle
                          cx={positions[index].x}
                          cy={positions[index].y}
                          r="20"
                          fill="#ef4444"
                          stroke="white"
                          strokeWidth="3"
                        />
                        {/* Count */}
                        <text
                          x={positions[index].x}
                          y={positions[index].y + 5}
                          textAnchor="middle"
                          className="text-sm font-bold fill-white"
                        >
                          {branch.count}
                        </text>
                        {/* Branch Name */}
                        <text
                          x={positions[index].x}
                          y={positions[index].y + 35}
                          textAnchor="middle"
                          className="text-xs font-medium fill-gray-700"
                        >
                          {branch.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Location Button (Bottom Left) */}
              <button className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border">
                <svg
                  className="w-5 h-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </button>

              {/* Google Logo (Bottom Right) */}
              <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-xs font-medium text-gray-600 shadow-sm">
                Google
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
