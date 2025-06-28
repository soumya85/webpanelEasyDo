import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function EmployeeLocationTimelineCard() {
  // State to track the current time window offset
  const [windowOffset, setWindowOffset] = useState(0);
  // State to track single selected time slot (current time as initial selection)
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  // State for map marker selection
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Branch locations data matching the screenshot
  const branches = [
    {
      id: "3",
      name: "New Delhi Branch",
      position: { x: 52, y: 25 }, // Position as percentage
      address: "New Delhi",
      employees: 15,
    },
    {
      id: "0",
      name: "Ahmedabad Office Branch",
      position: { x: 25, y: 45 },
      address: "Ahmedabad, Gujarat",
      employees: 8,
    },
    {
      id: "42",
      name: "Haldia Branch",
      position: { x: 75, y: 35 },
      address: "Haldia, West Bengal",
      employees: 12,
    },
    {
      id: "10",
      name: "Paradip Branch",
      position: { x: 65, y: 50 },
      address: "Paradip, Odisha",
      employees: 18,
    },
  ];

  // Define all possible time slots
  const allSlots = useMemo(
    () => [
      { time: "1 AM", hour: 1 },
      { time: "2 AM", hour: 2 },
      { time: "3 AM", hour: 3 },
      { time: "4 AM", hour: 4 },
      { time: "5 AM", hour: 5 },
      { time: "6 AM", hour: 6 },
      { time: "7 AM", hour: 7 },
      { time: "8 AM", hour: 8 },
      { time: "9 AM", hour: 9 },
      { time: "10 AM", hour: 10 },
      { time: "11 AM", hour: 11 },
      { time: "12 PM", hour: 12 },
      { time: "1 PM", hour: 13 },
      { time: "2 PM", hour: 14 },
      { time: "3 PM", hour: 15 },
      { time: "4 PM", hour: 16 },
      { time: "5 PM", hour: 17 },
      { time: "6 PM", hour: 18 },
      { time: "7 PM", hour: 19 },
      { time: "8 PM", hour: 20 },
      { time: "9 PM", hour: 21 },
      { time: "10 PM", hour: 22 },
      { time: "11 PM", hour: 23 },
      { time: "12 AM", hour: 0 }, // Midnight
    ],
    [],
  );

  // Calculate current time slots based on window offset
  const { timeSlots, currentHour, canGoPrevious, canGoNext } = useMemo(() => {
    const now = new Date();
    const currentHour = now.getHours();

    // Set current time as initial selection if no selection exists
    if (selectedHour === null) {
      setSelectedHour(currentHour);
    }

    // Find the current active hour slot
    const activeSlotIndex = allSlots.findIndex(
      (slot) => slot.hour === currentHour,
    );

    // Calculate the base start index (centered around current time)
    let baseStartIndex = Math.max(0, activeSlotIndex - 4);

    // Apply window offset
    let startIndex = Math.max(0, baseStartIndex + windowOffset);
    let endIndex = Math.min(allSlots.length, startIndex + 8);

    // Adjust if we don't have enough slots at the end
    if (endIndex - startIndex < 8) {
      startIndex = Math.max(0, endIndex - 8);
    }

    // Get the 8-hour window
    const windowSlots = allSlots.slice(startIndex, endIndex);

    // Set active state for each slot (only if current hour is in this window)
    const timeSlots = windowSlots.map((slot) => ({
      time: slot.time,
      active: slot.hour === currentHour,
    }));

    // Check if we can navigate
    const canGoPrevious = startIndex > 0;
    const canGoNext = endIndex < allSlots.length;

    return { timeSlots, currentHour, canGoPrevious, canGoNext };
  }, [allSlots, windowOffset]);

  // Navigation handlers
  const handlePrevious = () => {
    if (canGoPrevious) {
      setWindowOffset((offset) => offset - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setWindowOffset((offset) => offset + 1);
    }
  };

  // Simple marker click handler
  const handleMarkerClick = (branchId: string) => {
    setSelectedMarker(selectedMarker === branchId ? null : branchId);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full overflow-hidden">
      <CardContent className="p-2 flex flex-col h-full">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2 px-2">
          Employee Location Timeline
        </h2>

        {/* Main Content Container - White rounded card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-2">
          {/* Date and Status Row */}
          <div className="flex items-center justify-between px-4 py-2 text-sm border-b border-gray-100">
            <span className="text-gray-600 font-medium">
              Today (Sat, 28 Jun 2025) IST
            </span>
            <span className="text-gray-900 font-semibold">Present</span>
          </div>

          {/* All Branches Section */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {/* Building Icon */}
              <div className="w-7 h-7 bg-red-500 rounded flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900">All Branches</span>
            </div>
            <div className="flex items-center gap-2">
              {/* Chart Icon */}
              <svg
                className="w-4 h-4 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
              </svg>
              <span className="text-2xl font-bold text-gray-900">29</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter employee name"
                className="w-full pl-10 pr-4 py-2 text-sm border-0 rounded-lg bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
                disabled
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="px-4 py-2">
            <div className="relative mb-3">
              {/* Timeline Background Bar */}
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-300"></div>

              {/* Timeline Active Segments */}
              <div className="absolute top-2 left-0 right-0 flex">
                {timeSlots.slice(0, -1).map((slot, index) => {
                  const selectedIndex =
                    selectedHour !== null
                      ? timeSlots.findIndex(
                          (s) =>
                            allSlots.find((as) => as.time === s.time)?.hour ===
                            selectedHour,
                        )
                      : -1;

                  const shouldShowGreen =
                    selectedIndex >= 0 && index < selectedIndex;
                  const segmentWidth = `${100 / (timeSlots.length - 1)}%`;

                  return (
                    <div
                      key={index}
                      className="relative"
                      style={{ width: segmentWidth }}
                    >
                      <div
                        className={cn(
                          "h-0.5 w-full",
                          shouldShowGreen ? "bg-green-500" : "bg-transparent",
                        )}
                      />
                    </div>
                  );
                })}
              </div>
              {/* Timeline Dots */}
              <div className="flex justify-between items-center relative">
                {timeSlots.map((slot, index) => {
                  const slotHour = allSlots.find(
                    (as) => as.time === slot.time,
                  )?.hour;
                  const isSelected = selectedHour === slotHour;

                  return (
                    <div key={slot.time} className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (slotHour !== undefined) {
                            setSelectedHour(slotHour);
                          }
                        }}
                        className={cn(
                          "rounded-full z-10 relative transition-all duration-200 hover:scale-110 cursor-pointer",
                          isSelected
                            ? "w-4 h-4 bg-green-500"
                            : "w-3 h-3 bg-gray-400",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs mt-2 font-medium whitespace-nowrap transition-colors duration-200",
                          isSelected
                            ? "text-green-600 font-semibold"
                            : "text-gray-500",
                        )}
                      >
                        {slot.time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls - Below Timeline */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                disabled={!canGoPrevious}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  canGoPrevious
                    ? "text-gray-600 hover:text-gray-800 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed",
                )}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors",
                  canGoNext
                    ? "text-gray-600 hover:text-gray-800 cursor-pointer"
                    : "text-gray-400 cursor-not-allowed",
                )}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* India Map */}
        <div className="relative flex-1 min-h-80 rounded-xl overflow-hidden border border-gray-200 bg-[#A8D3E0]">
          <div className="relative w-full h-full">
            {/* India Map SVG */}
            <svg
              viewBox="0 0 100 120"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Ocean/Water Background */}
              <rect width="100" height="120" fill="#A8D3E0" />

              {/* Neighboring Countries - Light Gray */}
              <path
                d="M15 25 L35 20 L45 25 L40 35 L30 40 L20 35 Z"
                fill="#F5F5F5"
                stroke="#E0E0E0"
                strokeWidth="0.2"
              />

              {/* Pakistan */}
              <path
                d="M10 30 L25 28 L30 35 L25 45 L15 50 L8 45 Z"
                fill="#F5F5F5"
                stroke="#E0E0E0"
                strokeWidth="0.2"
              />

              {/* Accurate India Map Shape */}
              <path
                d="M38 28 C42 22 50 20 58 19 C66 18 72 20 78 24 C84 28 88 34 90 40 C92 46 93 52 94 58 C95 64 94 70 93 76 C91 82 88 87 84 91 C80 95 75 98 70 100 C65 102 60 103 55 103.5 C52 104 49 103.5 47 102 C45 100 43 97 42 94 C41 90 40.5 86 40 82 C39.5 78 39 74 38.5 70 C38 66 37.5 62 37 58 C36.5 54 36 50 35.5 46 C35 42 34.5 38 34 34 C33.5 32 33 30 32 28 C30 26 28 28 26 30 C24 32 22 36 21 40 C20 44 19.5 48 19 52 C18.5 56 19 60 20 64 C21 68 23 72 25 76 C27 80 30 84 33 87 C36 90 40 93 44 95 C46 96 48 97 49 99 C50 101 49.5 103 47 103 Z"
                fill="#E8F5E8"
                stroke="#B8D4B9"
                strokeWidth="0.3"
              />

              {/* Detailed coastline features */}
              {/* Western coastline (Gujarat/Maharashtra) */}
              <path
                d="M21 52 C18 50 16 53 17 56 C18 59 21 60 24 58 C26 56 25 53 23 52"
                fill="#E8F5E8"
                stroke="#B8D4B9"
                strokeWidth="0.2"
              />

              {/* Eastern coastline (West Bengal/Odisha) */}
              <path
                d="M88 38 C90 36 92 39 91 42 C90 45 87 46 84 44 C82 42 84 39 86 38"
                fill="#E8F5E8"
                stroke="#B8D4B9"
                strokeWidth="0.2"
              />

              {/* Southern peninsula detail */}
              <path
                d="M47 102 C45 104 46 106 48 107 C50 106 51 104 49 102 C48 101 47 101 47 102"
                fill="#E8F5E8"
                stroke="#B8D4B9"
                strokeWidth="0.2"
              />

              {/* Andaman and Nicobar Islands */}
              <circle
                cx="85"
                cy="75"
                r="1"
                fill="#E8F5E8"
                stroke="#B8D4B9"
                strokeWidth="0.1"
              />
              <circle
                cx="86"
                cy="80"
                r="0.8"
                fill="#E8F5E8"
                stroke="#B8D4B9"
                strokeWidth="0.1"
              />
              <circle
                cx="87"
                cy="85"
                r="0.6"
                fill="#E8F5E8"
                stroke="#B8D4B9"
                strokeWidth="0.1"
              />

              {/* Sri Lanka */}
              <ellipse
                cx="45"
                cy="105"
                rx="3"
                ry="8"
                fill="#C8E6C9"
                stroke="#B8D4B9"
                strokeWidth="0.2"
              />

              {/* Country Labels */}
              <text
                x="20"
                y="18"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                Kyrgyzstan
              </text>
              <text
                x="70"
                y="15"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                XINJIANG
              </text>
              <text
                x="8"
                y="22"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                Tajikistan
              </text>
              <text
                x="5"
                y="38"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                Pakistan
              </text>
              <text
                x="72"
                y="22"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                TIBET
              </text>
              <text
                x="68"
                y="35"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                Nepal
              </text>
              <text
                x="85"
                y="45"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                Bhutan
              </text>
              <text
                x="85"
                y="85"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                Myanmar
              </text>
              <text
                x="85"
                y="92"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                (Burma)
              </text>

              {/* India Label */}
              <text
                x="50"
                y="65"
                fontSize="8"
                fill="#333"
                fontFamily="Arial, sans-serif"
                textAnchor="middle"
                fontWeight="normal"
              >
                India
              </text>

              {/* Water Bodies */}
              <text
                x="5"
                y="85"
                fontSize="4"
                fill="#4A90E2"
                fontFamily="Arial, sans-serif"
              >
                Arabian Sea
              </text>
              <text
                x="75"
                y="95"
                fontSize="4"
                fill="#4A90E2"
                fontFamily="Arial, sans-serif"
              >
                Bay of Bengal
              </text>
              <text
                x="45"
                y="118"
                fontSize="3"
                fill="#666"
                fontFamily="Arial, sans-serif"
              >
                Sri Lanka
              </text>
            </svg>

            {/* Branch Markers */}
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                style={{
                  left: `${branch.position.x}%`,
                  top: `${branch.position.y}%`,
                }}
                onClick={() => handleMarkerClick(branch.id)}
              >
                {/* Pin Marker */}
                <div className="relative">
                  <svg
                    width="30"
                    height="40"
                    viewBox="0 0 30 40"
                    className="drop-shadow-md"
                  >
                    {/* Pin Shadow */}
                    <ellipse
                      cx="15"
                      cy="37"
                      rx="6"
                      ry="2"
                      fill="rgba(0,0,0,0.2)"
                    />
                    {/* Pin Shape */}
                    <path
                      d="M15 2C9.5 2 5 6.5 5 12C5 20 15 38 15 38S25 20 25 12C25 6.5 20.5 2 15 2Z"
                      fill="#EA4335"
                      stroke="#FFFFFF"
                      strokeWidth="1.5"
                    />
                    {/* White Circle */}
                    <circle cx="15" cy="12" r="7" fill="#FFFFFF" />
                    {/* Number */}
                    <text
                      x="15"
                      y="16"
                      textAnchor="middle"
                      fill="#EA4335"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="Arial, sans-serif"
                    >
                      {branch.id}
                    </text>
                  </svg>
                </div>

                {/* Branch Label */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                  <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-medium text-gray-800 whitespace-nowrap">
                    {branch.name}
                  </div>
                </div>
              </div>
            ))}

            {/* Info Window */}
            {selectedMarker && (
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-48 z-20">
                {(() => {
                  const branch = branches.find((b) => b.id === selectedMarker);
                  return branch ? (
                    <div>
                      <button
                        onClick={() => setSelectedMarker(null)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300"
                      >
                        ×
                      </button>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {branch.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {branch.address}
                      </p>
                      <p className="text-sm text-blue-600">
                        {branch.employees} employees present
                      </p>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {/* Google Logo (to match the screenshot) */}
            <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-gray-700 font-semibold shadow">
              Google
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
