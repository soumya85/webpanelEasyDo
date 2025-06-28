import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EmployeeLocationTimelineCard() {
  // Timeline showing 10 AM as active (green dot) - matching the second screenshot
  // Green bars appear from start up to the active time (10 AM)
  const timeSlots = [
    { time: "6 AM", active: false, hasBar: true },
    { time: "7 AM", active: false, hasBar: true },
    { time: "8 AM", active: false, hasBar: true },
    { time: "9 AM", active: false, hasBar: true },
    { time: "10 AM", active: true, hasBar: true },
    { time: "11 AM", active: false, hasBar: false },
    { time: "12 PM", active: false, hasBar: false },
    { time: "1 PM", active: false, hasBar: false },
  ];

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
            <div className="relative">
              {/* Timeline Line - continuous line with segments */}
              <div className="absolute top-3 left-6 right-6 h-1 bg-gray-300 rounded-full"></div>

              {/* Green segments up to active time */}
              <div
                className="absolute top-3 left-6 h-1 bg-green-500 rounded-full"
                style={{ width: "62.5%" }}
              ></div>

              {/* Timeline Dots */}
              <div className="flex justify-between items-center relative">
                {timeSlots.map((slot, index) => (
                  <div key={slot.time} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-4 h-4 rounded-full shadow-sm z-10",
                        slot.active ? "bg-green-500" : "bg-gray-300",
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs mt-2 font-medium whitespace-nowrap",
                        slot.active
                          ? "text-green-600 font-semibold"
                          : "text-gray-500",
                      )}
                    >
                      {slot.time}
                    </span>
                  </div>
                ))}
              </div>
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
