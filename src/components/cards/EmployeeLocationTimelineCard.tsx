import {
  Search,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState, useCallback } from "react";

export default function EmployeeLocationTimelineCard() {
  // State to track the current time window offset
  const [windowOffset, setWindowOffset] = useState(0);
  // State to track single selected time slot (current time as initial selection)
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  // State for custom interactive map
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [mapPosition, setMapPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Branch locations data with pixel positions matching screenshot
  const branches = [
    {
      id: "6",
      name: "New Delhi Branch",
      position: { x: 300, y: 140 }, // Northern region
      address: "New Delhi",
      employees: 15,
    },
    {
      id: "0",
      name: "Ahmedabad Office Branch",
      position: { x: 180, y: 230 }, // Western region
      address: "Ahmedabad, Gujarat",
      employees: 8,
    },
    {
      id: "18",
      name: "Haldia Branch",
      position: { x: 460, y: 220 }, // Eastern region
      address: "Haldia, West Bengal",
      employees: 12,
    },
    {
      id: "22",
      name: "Paradip Branch",
      position: { x: 380, y: 280 }, // Central-eastern region
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

  // Custom map interaction handlers
  const handleMarkerClick = useCallback(
    (branchId: string) => {
      setSelectedMarker(selectedMarker === branchId ? null : branchId);
    },
    [selectedMarker],
  );

  const handleMapClick = useCallback(() => {
    setSelectedMarker(null);
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 1, 10));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - mapPosition.x,
        y: e.clientY - mapPosition.y,
      });
    },
    [mapPosition],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setMapPosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

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

        {/* Custom Interactive Map Section - Google Maps Style */}
        <div
          className="relative flex-1 min-h-80 rounded-xl overflow-hidden border border-gray-200"
          style={{ backgroundColor: "#AAD3DF" }}
        >
          <div
            className="relative w-full h-full cursor-grab select-none"
            style={{
              transform: `translate(${mapPosition.x}px, ${mapPosition.y}px) scale(${0.8 + (zoomLevel - 1) * 0.1})`,
              transformOrigin: "center center",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={handleMapClick}
          >
            {/* Google Maps Style Geographic Base */}
            <svg
              viewBox="0 0 600 400"
              className="absolute inset-0 w-full h-full"
              style={{ backgroundColor: "#AAD3DF" }}
            >
              {/* Gradient Definitions for Google Maps Style */}
              <defs>
                <linearGradient
                  id="landColor"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#F5F5DC" />
                  <stop offset="50%" stopColor="#E6E6FA" />
                  <stop offset="100%" stopColor="#D3D3D3" />
                </linearGradient>
                <linearGradient
                  id="waterColor"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#AAD3DF" />
                  <stop offset="100%" stopColor="#7FB8C4" />
                </linearGradient>
                <linearGradient
                  id="mountainColor"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#DEB887" />
                  <stop offset="100%" stopColor="#CD853F" />
                </linearGradient>
              </defs>

              {/* Ocean Background - Light Blue like Google Maps */}
              <rect width="600" height="400" fill="#AAD3DF" />

              {/* Pakistan Land Mass */}
              <path
                d="M50 80 L180 70 L230 90 L210 140 L170 160 L120 140 L80 120 Z"
                fill="#F5F5DC"
                stroke="#D0D0D0"
                strokeWidth="1"
              />

              {/* India Main Land Mass - Google Maps Beige */}
              <path
                d="M200 120 L220 100 L280 95 L350 90 L420 110 L480 130 L520 170 L550 210 L580 270 L590 330 L580 390 L560 440 L520 470 L460 490 L400 500 L340 490 L280 470 L240 440 L200 390 L180 330 L170 270 L180 210 Z"
                fill="#F5F5DC"
                stroke="#D0D0D0"
                strokeWidth="1.5"
              />

              {/* Mountain Regions - Northern India/Himalayas */}
              <path
                d="M200 120 L280 95 L350 90 L420 110 L480 130 L450 140 L380 125 L320 115 L250 125 L200 140 Z"
                fill="#E0E0E0"
                stroke="#C0C0C0"
                strokeWidth="0.5"
                opacity="0.7"
              />

              {/* Nepal - Small region */}
              <path
                d="M380 140 L420 135 L440 150 L430 165 L390 160 Z"
                fill="#F0F0F0"
                stroke="#D0D0D0"
                strokeWidth="1"
              />

              {/* Bangladesh */}
              <path
                d="M460 200 L490 195 L510 210 L505 230 L480 235 L465 220 Z"
                fill="#F5F5DC"
                stroke="#D0D0D0"
                strokeWidth="1"
              />

              {/* Sri Lanka */}
              <path
                d="M310 480 L330 475 L340 490 L335 505 L320 510 L305 500 Z"
                fill="#F5F5DC"
                stroke="#D0D0D0"
                strokeWidth="1"
              />

              {/* Myanmar */}
              <path
                d="M510 180 L540 175 L560 200 L570 250 L550 300 L530 280 L520 220 Z"
                fill="#F5F5DC"
                stroke="#D0D0D0"
                strokeWidth="1"
              />

              {/* Bhutan - Small region */}
              <path
                d="M450 150 L480 145 L490 160 L480 170 L460 165 Z"
                fill="#F0F0F0"
                stroke="#D0D0D0"
                strokeWidth="1"
              />

              {/* State Boundaries - Light Gray Lines */}
              <g stroke="#E0E0E0" strokeWidth="0.5" fill="none" opacity="0.5">
                {/* Major state divisions */}
                <path d="M200 200 L350 190 L400 200" />
                <path d="M250 250 L450 240" />
                <path d="M220 300 L380 290 L480 300" />
                <path d="M280 350 L420 340" />
              </g>

              {/* Major Cities - Small Dots */}
              <circle cx="200" cy="280" r="2" fill="#808080" opacity="0.6" />
              <circle cx="350" cy="320" r="2" fill="#808080" opacity="0.6" />
              <circle cx="320" cy="380" r="2" fill="#808080" opacity="0.6" />
              <circle cx="300" cy="180" r="2" fill="#808080" opacity="0.6" />

              {/* Major Rivers - Subtle Blue Lines */}
              <path
                d="M420 160 Q380 180 350 200 Q320 220 290 240 Q250 260 220 280"
                fill="none"
                stroke="#AAD3DF"
                strokeWidth="2"
                opacity="0.6"
              />

              <path
                d="M480 170 Q460 180 440 190 Q420 200 400 210"
                fill="none"
                stroke="#AAD3DF"
                strokeWidth="1.5"
                opacity="0.6"
              />
            </svg>

            {/* Text Labels Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Country/Region Labels */}
              <div className="absolute top-4 left-8 text-xs font-medium text-gray-800">
                Kyrgyzstan
              </div>
              <div className="absolute top-8 left-12 text-xs font-medium text-gray-800">
                Tajikistan
              </div>
              <div className="absolute top-2 right-8 text-xs text-gray-700">
                XINJIANG
              </div>
              <div className="absolute top-16 left-2 text-xs font-medium text-gray-800">
                Pakistan
              </div>
              <div className="absolute top-20 right-8 text-xs text-gray-700">
                TIBET
              </div>
              <div className="absolute top-24 right-16 text-xs text-gray-700">
                QINGHAI
              </div>
              <div className="absolute bottom-20 left-8 text-xs font-medium text-gray-800">
                Mumbai
                <br />
                मुंबई
              </div>
              <div className="absolute bottom-16 right-4 text-xs font-medium text-gray-800">
                Myanmar
                <br />
                (Burma)
              </div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-800">
                Sri Lanka
              </div>
              <div className="absolute bottom-2 right-12 text-xs text-gray-700">
                Andaman
              </div>

              {/* India Central Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-gray-900 bg-white bg-opacity-80 px-2 py-1 rounded">
                India
              </div>

              {/* State Abbreviations */}
              <div className="absolute" style={{ top: "40%", left: "52%" }}>
                <span className="text-xs text-gray-700 font-medium">UP</span>
              </div>
              <div className="absolute" style={{ top: "65%", right: "30%" }}>
                <span className="text-xs text-gray-700 font-medium">OD</span>
              </div>
              <div className="absolute" style={{ top: "50%", right: "25%" }}>
                <span className="text-xs text-gray-700 font-medium">ML</span>
              </div>
              <div className="absolute" style={{ top: "47%", right: "20%" }}>
                <span className="text-xs text-gray-700 font-medium">NL</span>
              </div>
              <div className="absolute" style={{ top: "43%", right: "22%" }}>
                <span className="text-xs text-gray-700 font-medium">AR</span>
              </div>
              <div className="absolute" style={{ top: "54%", right: "15%" }}>
                <span className="text-xs text-gray-700 font-medium">MZ</span>
              </div>
              <div className="absolute" style={{ bottom: "35%", left: "15%" }}>
                <span className="text-xs text-gray-700 font-medium">KA</span>
              </div>
              <div className="absolute" style={{ bottom: "28%", left: "20%" }}>
                <span className="text-xs text-gray-700 font-medium">TN</span>
              </div>
              <div className="absolute" style={{ bottom: "30%", left: "25%" }}>
                <span className="text-xs text-gray-700 font-medium">KL</span>
              </div>
              <div className="absolute" style={{ bottom: "40%", left: "18%" }}>
                <span className="text-xs text-gray-700 font-medium">GA</span>
              </div>
              <div className="absolute" style={{ bottom: "35%", left: "38%" }}>
                <span className="text-xs text-gray-700 font-medium">AP</span>
              </div>

              {/* Branch Labels */}
              <div className="absolute" style={{ top: "32%", left: "45%" }}>
                <span className="text-xs font-medium text-gray-900 bg-white bg-opacity-90 px-1 rounded">
                  New Delhi
                  <br />
                  Branch
                </span>
              </div>
              <div className="absolute" style={{ top: "48%", left: "22%" }}>
                <span className="text-xs font-medium text-gray-900 bg-white bg-opacity-90 px-1 rounded">
                  Ahmedabad
                  <br />
                  office Branch
                </span>
              </div>
              <div className="absolute" style={{ top: "58%", right: "25%" }}>
                <span className="text-xs font-medium text-gray-900 bg-white bg-opacity-90 px-1 rounded">
                  Haldia Branch
                </span>
              </div>
              <div className="absolute" style={{ bottom: "35%", left: "42%" }}>
                <span className="text-xs font-medium text-gray-900 bg-white bg-opacity-90 px-1 rounded">
                  Hyderabad
                  <br />
                  హైదరాబాద్
                </span>
              </div>
              <div className="absolute" style={{ bottom: "45%", right: "18%" }}>
                <span className="text-xs font-medium text-gray-900 bg-white bg-opacity-90 px-1 rounded">
                  Paradip Branch
                </span>
              </div>

              {/* Nepal label */}
              <div className="absolute" style={{ top: "40%", right: "30%" }}>
                <span className="text-xs font-medium text-gray-800">Nepal</span>
              </div>

              {/* Water Body Labels */}
              <div className="absolute" style={{ bottom: "25%", right: "32%" }}>
                <span className="text-sm text-blue-800 font-medium">
                  Bay of Bengal
                </span>
              </div>
              <div className="absolute" style={{ top: "60%", left: "8%" }}>
                <span className="text-sm text-blue-800 font-medium">
                  Arabian Sea
                </span>
              </div>
            </div>

            {/* Branch Markers */}
            {branches.map((branch) => (
              <div
                key={branch.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform z-10"
                style={{
                  left: `${branch.position.x}px`,
                  top: `${branch.position.y}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkerClick(branch.id);
                }}
              >
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg">
                  {branch.id}
                </div>
              </div>
            ))}

            {/* Info Window */}
            {selectedMarker && (
              <div
                className="absolute z-20 bg-white rounded-lg shadow-lg border border-gray-200 p-3 min-w-48"
                style={{
                  left: `${(branches.find((b) => b.id === selectedMarker)?.position.x || 0) + 20}px`,
                  top: `${(branches.find((b) => b.id === selectedMarker)?.position.y || 0) - 60}px`,
                }}
              >
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
          </div>

          {/* Google Logo */}
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-gray-700 font-semibold shadow z-30">
            Google
          </div>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded shadow-lg border border-gray-200 z-30">
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 border-b border-gray-200"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Location Pin Control */}
          <div className="absolute bottom-3 right-16">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
