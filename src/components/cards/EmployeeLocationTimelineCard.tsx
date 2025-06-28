import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export default function EmployeeLocationTimelineCard() {
  // State to track the current time window offset
  const [windowOffset, setWindowOffset] = useState(0);
  // State to track single selected time slot (current time as initial selection)
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  // State for map marker selection
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);

  // Branch locations positioned accurately on the static India terrain map
  const branches = [
    {
      id: "3",
      name: "New Delhi Branch",
      position: { x: 45, y: 30 }, // North-central India - properly positioned within India borders
      address: "New Delhi",
      employees: 15,
    },
    {
      id: "0",
      name: "Ahmedabad Office Branch",
      position: { x: 25, y: 42 }, // Far Western India - Gujarat state, near Mumbai region
      address: "Ahmedabad, Gujarat",
      employees: 8,
    },
    {
      id: "42",
      name: "Haldia Branch",
      position: { x: 78, y: 48 }, // East Medinipur, West Bengal - coastal industrial area
      address: "Haldia, West Bengal",
      employees: 12,
    },
    {
      id: "10",
      name: "Paradip Branch",
      position: { x: 73, y: 52 }, // Odisha coast - major port city
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

        {/* Realistic Google Maps Terrain Style Map */}
        <div className="relative flex-1 min-h-80 rounded-xl overflow-hidden border border-gray-200">
          <div className="relative w-full h-full">
            {/* Background Map Image */}
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Ff5f5fbf5ad304e64bcf89b8190472c39%2Fba4855bb5c2f4eb4aaecd33cffd227ab?format=webp&width=800"
              alt="India Terrain Map"
              className="absolute inset-0 w-full h-full object-cover"
            />

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
                {/* Large Google Maps pin with good padding */}
                <div className="relative">
                  <svg
                    width="48"
                    height="64"
                    viewBox="0 0 48 64"
                    className="drop-shadow-lg"
                  >
                    {/* Pin shadow */}
                    <ellipse
                      cx="24"
                      cy="59"
                      rx="4"
                      ry="2"
                      fill="rgba(0,0,0,0.3)"
                    />

                    {/* Classic pin shape - teardrop */}
                    <path
                      d="M24 6 C35.05 6 44 14.95 44 26 C44 37.05 24 56 24 56 C24 56 4 37.05 4 26 C4 14.95 12.95 6 24 6 Z"
                      fill="#EA4335"
                    />

                    {/* White center circle */}
                    <circle cx="24" cy="26" r="14" fill="white" />

                    {/* Red inner border */}
                    <circle
                      cx="24"
                      cy="26"
                      r="14"
                      fill="none"
                      stroke="#EA4335"
                      strokeWidth="4"
                    />

                    {/* Number text */}
                    <text
                      x="24"
                      y="32"
                      textAnchor="middle"
                      fill="#EA4335"
                      fontSize="18"
                      fontWeight="bold"
                      fontFamily="system-ui, sans-serif"
                    >
                      {branch.id}
                    </text>
                  </svg>
                </div>

                {/* Branch Label - Below the marker */}
                <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2">
                  <div className="bg-white px-2 py-1 rounded shadow-sm text-xs font-medium text-gray-800 whitespace-nowrap text-center">
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
