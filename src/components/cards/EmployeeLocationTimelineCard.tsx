import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function EmployeeLocationTimelineCard() {
  // State to track the current time window offset
  const [windowOffset, setWindowOffset] = useState(0);
  // State to track selected time slots by hour values (multiple selection)
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
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

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full overflow-hidden">
      <CardContent className="p-4">
        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Employee Location Timeline
        </h2>

        {/* Main Content Container - White rounded card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* Date and Status Row */}
          <div className="flex items-center justify-between p-4 text-sm border-b border-gray-100">
            <span className="text-gray-600 font-medium">
              Today (Sat, 28 Jun 2025) IST
            </span>
            <span className="text-gray-900 font-semibold">Present</span>
          </div>

          {/* All Branches Section */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
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
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter employee name"
                className="w-full pl-10 pr-4 py-2.5 text-sm border-0 rounded-lg bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
                disabled
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="p-4">
            <div className="relative mb-4">
              {/* Timeline Background Bar */}
              <div className="absolute top-2 left-0 right-0 h-0.5 bg-gray-300"></div>

              {/* Timeline Active Segments */}
              <div className="absolute top-2 left-0 right-0 flex">
                {timeSlots.slice(0, -1).map((slot, index) => {
                  const activeIndex = timeSlots.findIndex((s) => s.active);
                  const selectedIndices = selectedHours
                    .map((hour) =>
                      timeSlots.findIndex(
                        (s) =>
                          allSlots.find((as) => as.time === s.time)?.hour ===
                          hour,
                      ),
                    )
                    .filter((idx) => idx >= 0);

                  // Include both current time and selected times
                  const allHighlightedIndices = [
                    activeIndex,
                    ...selectedIndices,
                  ].filter((idx) => idx >= 0);
                  const maxHighlightedIndex =
                    allHighlightedIndices.length > 0
                      ? Math.max(...allHighlightedIndices)
                      : -1;

                  const shouldShowGreen =
                    maxHighlightedIndex >= 0 && index < maxHighlightedIndex;
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
                  const isSelected =
                    slotHour !== undefined && selectedHours.includes(slotHour);
                  const isCurrentTime = slot.active;

                  // Current time is ALWAYS highlighted, other times are highlighted only if selected
                  const shouldHighlight =
                    isCurrentTime || (!isCurrentTime && isSelected);

                  return (
                    <div key={slot.time} className="flex flex-col items-center">
                      <button
                        onClick={() => {
                          if (slotHour !== undefined) {
                            if (isCurrentTime) {
                              // Current time can't be deselected - do nothing
                              return;
                            }
                            // For non-current times, toggle selection
                            setSelectedHours(
                              (prev) =>
                                prev.includes(slotHour)
                                  ? prev.filter((hour) => hour !== slotHour) // Remove if already selected
                                  : [...prev, slotHour], // Add if not selected
                            );
                          }
                        }}
                        className={cn(
                          "rounded-full z-10 relative transition-all duration-200",
                          !isCurrentTime && "hover:scale-110 cursor-pointer",
                          isCurrentTime && "cursor-default", // Current time not interactive
                          shouldHighlight
                            ? "w-4 h-4 bg-green-500"
                            : "w-3 h-3 bg-gray-400",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs mt-2 font-medium whitespace-nowrap transition-colors duration-200",
                          shouldHighlight
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

        {/* Map Section */}
        <div className="relative mt-4 h-64 bg-gradient-to-br from-green-100 via-blue-50 to-cyan-100 rounded-xl overflow-hidden border border-gray-200">
          {/* Map content matching the screenshots */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cdefs%3E%3Cpattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 10 0 L 0 0 0 10" fill="none" stroke="%23e0e0e0" stroke-width="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100" height="100" fill="url(%23grid)" /%3E%3C/svg%3E\')',
            }}
          >
            {/* Country/Region Labels */}
            <div className="absolute top-1 left-4 text-xs font-medium text-gray-700">
              Kyrgyzstan
            </div>
            <div className="absolute top-4 left-6 text-xs font-medium text-gray-700">
              Tajikistan
            </div>
            <div className="absolute top-1 right-4 text-xs text-gray-600">
              XINJIANG
            </div>
            <div className="absolute top-8 left-1 text-xs font-medium text-gray-700">
              Pakistan
            </div>
            <div className="absolute top-12 right-4 text-xs text-gray-600">
              TIBET
            </div>
            <div className="absolute top-14 right-10 text-xs text-gray-600">
              QING
            </div>
            <div className="absolute bottom-16 left-4 text-xs font-medium text-gray-700">
              Mumbai
              <br />
              मुंबई
            </div>
            <div className="absolute bottom-12 right-1 text-xs font-medium text-gray-700">
              Myanmar
              <br />
              (Burma)
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
              Sri Lanka
            </div>
            <div className="absolute bottom-1 right-6 text-xs text-gray-600">
              Andaman
            </div>

            {/* India Central Label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-gray-800">
              India
            </div>

            {/* State Abbreviations */}
            <div className="absolute" style={{ top: "35%", left: "46%" }}>
              <span className="text-xs text-gray-600">UP</span>
            </div>
            <div className="absolute" style={{ top: "58%", right: "25%" }}>
              <span className="text-xs text-gray-600">OD</span>
            </div>
            <div className="absolute" style={{ top: "45%", right: "20%" }}>
              <span className="text-xs text-gray-600">ML</span>
            </div>
            <div className="absolute" style={{ top: "42%", right: "16%" }}>
              <span className="text-xs text-gray-600">NL</span>
            </div>
            <div className="absolute" style={{ top: "38%", right: "18%" }}>
              <span className="text-xs text-gray-600">AR</span>
            </div>
            <div className="absolute" style={{ top: "49%", right: "10%" }}>
              <span className="text-xs text-gray-600">MZ</span>
            </div>
            <div className="absolute" style={{ bottom: "28%", left: "12%" }}>
              <span className="text-xs text-gray-600">KA</span>
            </div>
            <div className="absolute" style={{ bottom: "22%", left: "16%" }}>
              <span className="text-xs text-gray-600">TN</span>
            </div>
            <div className="absolute" style={{ bottom: "24%", left: "20%" }}>
              <span className="text-xs text-gray-600">KL</span>
            </div>
            <div className="absolute" style={{ bottom: "32%", left: "14%" }}>
              <span className="text-xs text-gray-600">GA</span>
            </div>
            <div className="absolute" style={{ bottom: "28%", left: "32%" }}>
              <span className="text-xs text-gray-600">AP</span>
            </div>

            {/* Branch Labels */}
            <div className="absolute" style={{ top: "28%", left: "40%" }}>
              <span className="text-xs font-medium text-gray-800">
                New Delhi
                <br />
                Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "42%", left: "18%" }}>
              <span className="text-xs font-medium text-gray-800">
                Ahmedabad
                <br />
                office Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "52%", right: "20%" }}>
              <span className="text-xs font-medium text-gray-800">
                Haldia Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "48%", right: "16%" }}>
              <span className="text-xs font-medium text-gray-800">
                Head office
                <br />
                Branch
              </span>
            </div>
            <div className="absolute" style={{ bottom: "32%", right: "18%" }}>
              <span className="text-xs font-medium text-gray-800">
                Paradip Branch
              </span>
            </div>
            <div className="absolute" style={{ bottom: "28%", left: "38%" }}>
              <span className="text-xs font-medium text-gray-800">
                Hyderabad
                <br />
                హైదరాబాద్
              </span>
            </div>

            {/* Nepal label */}
            <div className="absolute" style={{ top: "35%", right: "25%" }}>
              <span className="text-xs font-medium text-gray-700">Nepal</span>
            </div>

            {/* Bay of Bengal label */}
            <div className="absolute" style={{ bottom: "20%", right: "28%" }}>
              <span className="text-xs text-gray-600">Bay of Bengal</span>
            </div>
          </div>

          {/* Location Markers - matching the exact positions and numbers from screenshots */}
          <div
            className="absolute w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg"
            style={{ top: "22%", left: "40%" }}
          >
            3
          </div>
          <div
            className="absolute w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg"
            style={{ top: "38%", left: "17%" }}
          >
            0
          </div>
          <div
            className="absolute w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg"
            style={{ top: "45%", right: "26%" }}
          >
            12
          </div>
          <div
            className="absolute w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-3 border-white shadow-lg"
            style={{ top: "42%", right: "22%" }}
          >
            10
          </div>

          {/* Google Logo */}
          <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-gray-700 font-semibold shadow">
            Google
          </div>

          {/* Location Pin Control */}
          <div className="absolute bottom-3 right-3">
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
