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
                  src="https://cdn.builder.io/api/v1/image/assets%2F8583191a47d44dd9bdafe859141fb375%2F2c2d38107bb34d34afb93eee2cd7252a?format=webp&width=800"
                  alt="India Map"
                  className="w-full h-full object-cover"
                />

                {/* Branch Markers Overlay */}
                <div className="absolute inset-0">
                  {branches.map((branch, index) => {
                    const positions = [
                      { x: "42%", y: "28%", name: "New Delhi\nBranch" }, // New Delhi - top center
                      { x: "22%", y: "50%", name: "Ahmedabad\noffice Branch" }, // Ahmedabad - left
                      { x: "58%", y: "65%", name: "Halasuru Branch\noffice" }, // Halasuru - bottom right
                      { x: "62%", y: "55%", name: "Paradip Branch" }, // Paradip - right center
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
                        {/* Pin Marker with Google Maps Style */}
                        <div className="relative">
                          {/* Pin Drop Shadow */}
                          <div className="absolute top-1 left-1 w-10 h-10 bg-black opacity-20 rounded-full blur-sm"></div>

                          {/* Main Pin */}
                          <div className="relative w-10 h-10 bg-red-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {branch.count}
                            </span>
                          </div>

                          {/* Branch Name Label - Positioned cleanly below */}
                          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm border text-xs font-medium text-gray-800 whitespace-pre-line text-center max-w-20">
                            {positions[index].name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location Button (Bottom Left) */}
              <button className="absolute bottom-3 left-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center border">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </button>

              {/* Google Logo (Bottom Right) */}
              <div className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded shadow-sm">
                <span className="text-xs font-medium text-gray-700">
                  Google
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
