import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function EmployeeLocationTimelineCard() {
  // Timeline showing 10 AM as active (green dot)
  const timeSlots = [
    { time: "10 AM", active: true },
    { time: "11 AM", active: false },
    { time: "12 PM", active: false },
    { time: "1 PM", active: false },
    { time: "2 PM", active: false },
    { time: "3 PM", active: false },
    { time: "4 PM", active: false },
    { time: "5 PM", active: false },
  ];

  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full overflow-hidden">
      <CardContent className="p-0">
        {/* Main Content Container */}
        <div className="bg-white rounded-2xl p-4 m-3 border border-gray-200 shadow-sm">
          {/* Date and Status Row */}
          <div className="flex items-center justify-between mb-4 text-sm">
            <span className="text-gray-600 font-medium">
              Today (Sat, 28 Jun 2025) IST
            </span>
            <span className="text-gray-900 font-semibold">Present</span>
          </div>

          {/* All Branches Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Building Icon */}
              <div className="w-8 h-8 bg-blue-500 rounded-sm flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-900 text-lg">
                All Branches
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Chart Icon */}
              <svg
                className="w-5 h-5 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
              </svg>
              <span className="text-3xl font-bold text-gray-900">29</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Enter employee name"
              className="w-full pl-10 pr-4 py-3 text-sm border-0 rounded-lg bg-gray-100 text-gray-500 placeholder-gray-400 focus:outline-none"
              disabled
            />
          </div>

          {/* Timeline */}
          <div className="mb-6">
            {/* Timeline Dots and Line */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-3 left-3 right-3 h-0.5 bg-gray-300"></div>

              {/* Timeline Dots */}
              <div className="flex justify-between items-center relative">
                {timeSlots.map((slot, index) => (
                  <div key={slot.time} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 border-white shadow-sm z-10",
                        slot.active ? "bg-green-500" : "bg-gray-300",
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs mt-2 font-medium",
                        slot.active ? "text-green-600" : "text-gray-500",
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
        <div className="relative h-80 bg-gradient-to-br from-green-100 via-green-50 to-blue-100 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0">
            {/* Country/Region Labels */}
            <div className="absolute top-2 left-4 text-xs font-medium text-gray-700">
              Kyrgyzstan
            </div>
            <div className="absolute top-6 left-6 text-xs font-medium text-gray-700">
              Tajikistan
            </div>
            <div className="absolute top-2 right-6 text-xs text-gray-600">
              XINJIANG
            </div>
            <div className="absolute top-12 left-2 text-xs font-medium text-gray-700">
              Pakistan
            </div>
            <div className="absolute top-16 right-6 text-xs text-gray-600">
              TIBET
            </div>
            <div className="absolute top-20 right-12 text-xs text-gray-600">
              QING
            </div>
            <div className="absolute bottom-24 left-6 text-xs font-medium text-gray-700">
              Mumbai
              <br />
              मुंबई
            </div>
            <div className="absolute bottom-20 right-2 text-xs font-medium text-gray-700">
              Myanmar
              <br />
              (Burma)
            </div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
              Sri Lanka
            </div>
            <div className="absolute bottom-3 right-8 text-xs text-gray-600">
              Andaman
            </div>

            {/* India Central Label */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-800">
              India
            </div>

            {/* State Abbreviations */}
            <div className="absolute" style={{ top: "38%", left: "48%" }}>
              <span className="text-xs text-gray-600">UP</span>
            </div>
            <div className="absolute" style={{ top: "62%", right: "28%" }}>
              <span className="text-xs text-gray-600">OD</span>
            </div>
            <div className="absolute" style={{ top: "48%", right: "22%" }}>
              <span className="text-xs text-gray-600">ML</span>
            </div>
            <div className="absolute" style={{ top: "44%", right: "18%" }}>
              <span className="text-xs text-gray-600">NL</span>
            </div>
            <div className="absolute" style={{ top: "40%", right: "20%" }}>
              <span className="text-xs text-gray-600">AR</span>
            </div>
            <div className="absolute" style={{ top: "52%", right: "12%" }}>
              <span className="text-xs text-gray-600">MZ</span>
            </div>

            {/* Branch Labels */}
            <div className="absolute" style={{ top: "32%", left: "42%" }}>
              <span className="text-xs font-medium text-gray-800">
                New Delhi
                <br />
                Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "45%", left: "22%" }}>
              <span className="text-xs font-medium text-gray-800">
                Ahmedabad
                <br />
                office Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "55%", right: "22%" }}>
              <span className="text-xs font-medium text-gray-800">
                Haldia Branch
              </span>
            </div>
            <div className="absolute" style={{ top: "50%", right: "18%" }}>
              <span className="text-xs font-medium text-gray-800">
                Head office
                <br />
                Branch
              </span>
            </div>
            <div className="absolute" style={{ bottom: "35%", right: "20%" }}>
              <span className="text-xs font-medium text-gray-800">
                Paradip Branch
              </span>
            </div>
            <div className="absolute" style={{ bottom: "32%", left: "42%" }}>
              <span className="text-xs font-medium text-gray-800">
                Hyderabad
                <br />
                హైదరాబాద్
              </span>
            </div>
          </div>

          {/* Location Markers */}
          <div
            className="absolute w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-lg"
            style={{ top: "25%", left: "42%" }}
          >
            3
          </div>
          <div
            className="absolute w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-lg font-bold border-4 border-white shadow-lg"
            style={{ top: "40%", left: "20%" }}
          >
            0
          </div>
          <div
            className="absolute w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-4 border-white shadow-lg"
            style={{ top: "48%", right: "28%" }}
          >
            12
          </div>
          <div
            className="absolute w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold border-4 border-white shadow-lg"
            style={{ top: "45%", right: "24%" }}
          >
            10
          </div>

          {/* Google Logo */}
          <div className="absolute bottom-2 left-2">
            <svg
              className="w-16 h-6"
              viewBox="0 0 272 92"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                fill="#EA4335"
              />
              <path
                d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                fill="#FBBC05"
              />
              <path
                d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
                fill="#34A853"
              />
              <path d="M225 3v65h-9.5V3h9.5z" fill="#EA4335" />
              <path
                d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
                fill="#FBBC05"
              />
              <path
                d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
                fill="#4285F4"
              />
            </svg>
          </div>

          {/* Location Pin Control */}
          <div className="absolute bottom-4 right-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-200">
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
