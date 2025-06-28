import { Card, CardContent } from "@/components/ui/card";
import { Search, Building } from "lucide-react";
import { useState } from "react";

export default function PerformanceMeter() {
  const [currentTime, setCurrentTime] = useState("10 AM");
  const [searchValue, setSearchValue] = useState("");

  // Timeline hours with full day coverage
  const timelineHours = [
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
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
    "11:59 PM",
  ];

  // Get current timeline slice based on current time
  const getCurrentTimelineSlice = () => {
    const currentIndex = timelineHours.indexOf(currentTime);
    if (currentIndex === -1) return timelineHours.slice(0, 8);

    // Show 8 hours starting from current time position
    const startIndex = Math.max(0, currentIndex - 3);
    return timelineHours.slice(startIndex, startIndex + 8);
  };

  // Dynamic data based on selected time
  const getDataForTime = (time: string) => {
    const timeData = {
      "1 AM": { total: 63, branches: [6, 0, 20, 22] },
      "2 AM": { total: 63, branches: [6, 0, 20, 22] },
      "3 AM": { total: 63, branches: [6, 0, 20, 22] },
      "4 AM": { total: 63, branches: [6, 0, 20, 22] },
      "5 AM": { total: 63, branches: [6, 0, 20, 22] },
      "6 AM": { total: 63, branches: [6, 0, 20, 22] },
      "7 AM": { total: 63, branches: [6, 0, 20, 22] },
      "8 AM": { total: 63, branches: [6, 0, 20, 22] },
      "9 AM": { total: 29, branches: [3, 0, 12, 10] },
      "10 AM": { total: 29, branches: [3, 0, 12, 10] },
      "11 AM": { total: 29, branches: [3, 0, 12, 10] },
      "12 PM": { total: 29, branches: [3, 0, 12, 10] },
      "1 PM": { total: 29, branches: [3, 0, 12, 10] },
      "2 PM": { total: 29, branches: [3, 0, 12, 10] },
      "3 PM": { total: 29, branches: [3, 0, 12, 10] },
      "4 PM": { total: 29, branches: [3, 0, 12, 10] },
      "5 PM": { total: 29, branches: [3, 0, 12, 10] },
      "6 PM": { total: 29, branches: [3, 0, 12, 10] },
      "7 PM": { total: 29, branches: [3, 0, 12, 10] },
      "8 PM": { total: 29, branches: [3, 0, 12, 10] },
      "9 PM": { total: 29, branches: [3, 0, 12, 10] },
      "10 PM": { total: 29, branches: [3, 0, 12, 10] },
      "11 PM": { total: 29, branches: [3, 0, 12, 10] },
      "11:59 PM": { total: 29, branches: [3, 0, 12, 10] },
    };
    return timeData[time] || { total: 29, branches: [3, 0, 12, 10] };
  };

  const currentData = getDataForTime(currentTime);
  const totalEmployees = currentData.total;

  // Sample branch data with dynamic counts
  const branches = [
    {
      name: "New Delhi Branch",
      count: currentData.branches[0],
      lat: 28.6,
      lng: 77.2,
    },
    {
      name: "Ahmedabad Office Branch",
      count: currentData.branches[1],
      lat: 23.0,
      lng: 72.6,
    },
    {
      name: "Halasuru Branch",
      count: currentData.branches[2],
      lat: 12.97,
      lng: 77.6,
    },
    {
      name: "Paradip Branch",
      count: currentData.branches[3],
      lat: 20.26,
      lng: 86.7,
    },
  ];

  const handleTimeSelect = (time: string) => {
    setCurrentTime(time);
  };

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
              <div className="flex items-center justify-between mb-3">
                {getCurrentTimelineSlice().map((hour, index) => {
                  const currentIndex = timelineHours.indexOf(currentTime);
                  const hourIndex = timelineHours.indexOf(hour);
                  const isActive = hour === currentTime;
                  const isPassed = hourIndex < currentIndex;

                  return (
                    <button
                      key={hour}
                      onClick={() => handleTimeSelect(hour)}
                      className="flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-200"
                    >
                      <div
                        className={`w-3 h-3 rounded-full mb-1 transition-all duration-200 ${
                          isActive ? "bg-green-500 scale-125" : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={`text-xs font-medium transition-colors ${
                          isActive
                            ? "text-green-600 font-bold"
                            : "text-gray-500"
                        }`}
                      >
                        {hour}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Timeline Line */}
              <div className="relative mt-2">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-200 rounded-full"></div>
                <div
                  className="absolute top-0 left-0 h-0.5 bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${((timelineHours.indexOf(currentTime) + 1) / timelineHours.length) * 100}%`,
                  }}
                ></div>
              </div>

              {/* Time Navigation Arrows */}
              <div className="flex justify-between items-center mt-3 pt-3">
                <button
                  onClick={() => {
                    const currentIndex = timelineHours.indexOf(currentTime);
                    if (currentIndex > 0) {
                      setCurrentTime(timelineHours[currentIndex - 1]);
                    }
                  }}
                  disabled={timelineHours.indexOf(currentTime) === 0}
                  className="text-gray-700 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm"
                >
                  ← Previous
                </button>
                <span className="text-xs text-gray-800 font-semibold">
                  {currentTime}
                </span>
                <button
                  onClick={() => {
                    const currentIndex = timelineHours.indexOf(currentTime);
                    if (currentIndex < timelineHours.length - 1) {
                      setCurrentTime(timelineHours[currentIndex + 1]);
                    }
                  }}
                  disabled={
                    timelineHours.indexOf(currentTime) ===
                    timelineHours.length - 1
                  }
                  className="text-gray-700 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed font-medium text-sm"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 bg-white rounded-lg border relative overflow-hidden min-h-[300px]">
              {/* Map Background */}
              <div className="absolute inset-0">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F8583191a47d44dd9bdafe859141fb375%2F7583651bfe0c474185fe766e3678b252?format=webp&width=800"
                  alt="India Map"
                  className="w-full h-full object-cover"
                />

                {/* Branch Markers Overlay */}
                <div className="absolute inset-0">
                  {branches.map((branch, index) => {
                    const positions = [
                      { x: "42%", y: "35%", name: "New Delhi\nBranch" }, // New Delhi
                      { x: "25%", y: "55%", name: "Ahmedabad\noffice Branch" }, // Ahmedabad
                      { x: "58%", y: "70%", name: "Halasuru Branch" }, // Halasuru
                      { x: "62%", y: "62%", name: "Paradip Branch" }, // Paradip
                    ];

                    return (
                      <div
                        key={branch.name}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: positions[index].x,
                          top: positions[index].y,
                        }}
                      >
                        {/* Pin Marker */}
                        <div className="relative">
                          <div className="w-12 h-12 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                              {branch.count}
                            </span>
                          </div>

                          {/* Branch Name Label */}
                          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md border text-xs font-medium text-gray-800 whitespace-pre-line text-center min-w-max">
                            {positions[index].name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location Button (Bottom Left) */}
              <button className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border">
                <svg
                  className="w-5 h-5 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </button>

              {/* Google Logo (Bottom Right) */}
              <div className="absolute bottom-4 right-4">
                <svg
                  width="66"
                  height="26"
                  viewBox="0 0 66 26"
                  className="bg-white px-1 rounded"
                >
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M9.5 14.5v-3h8.5c.1.5.1 1.1.1 1.8 0 5.7-3.8 9.7-8.6 9.7-5 0-9-4-9-9s4-9 9-9c2.4 0 4.4.9 5.9 2.3L13 10.7c-.8-.8-2-1.4-3.5-1.4-2.9 0-5.2 2.4-5.2 5.2s2.3 5.2 5.2 5.2c3.3 0 4.6-2.4 4.8-3.6H9.5v-1.6z"
                      fill="#4285F4"
                    />
                    <path
                      d="M25 9.5c3.2 0 5.7 2.5 5.7 6s-2.5 6-5.7 6-5.7-2.5-5.7-6 2.5-6 5.7-6zm0 1.8c-2.3 0-3.9 1.9-3.9 4.2s1.6 4.2 3.9 4.2 3.9-1.9 3.9-4.2-1.6-4.2-3.9-4.2z"
                      fill="#EA4335"
                    />
                    <path
                      d="M38.5 9.5c3.2 0 5.7 2.5 5.7 6s-2.5 6-5.7 6-5.7-2.5-5.7-6 2.5-6 5.7-6zm0 1.8c-2.3 0-3.9 1.9-3.9 4.2s1.6 4.2 3.9 4.2 3.9-1.9 3.9-4.2-1.6-4.2-3.9-4.2z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M52 9.5c3.2 0 5.7 2.5 5.7 6s-2.5 6-5.7 6-5.7-2.5-5.7-6 2.5-6 5.7-6zm0 1.8c-2.3 0-3.9 1.9-3.9 4.2s1.6 4.2 3.9 4.2 3.9-1.9 3.9-4.2-1.6-4.2-3.9-4.2z"
                      fill="#34A853"
                    />
                    <path
                      d="M65.5 9.5c3.2 0 5.7 2.5 5.7 6s-2.5 6-5.7 6-5.7-2.5-5.7-6 2.5-6 5.7-6zm0 1.8c-2.3 0-3.9 1.9-3.9 4.2s1.6 4.2 3.9 4.2 3.9-1.9 3.9-4.2-1.6-4.2-3.9-4.2z"
                      fill="#EA4335"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
