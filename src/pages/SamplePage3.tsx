import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import EmployeeAttendanceCard from "@/components/cards/EmployeeAttendanceCard";
import EmployeeLocationTimelineCard from "@/components/cards/EmployeeLocationTimelineCard";

export default function SamplePage3() {
  const { t } = useGlobalTranslation();
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);

  // Sample card data for this page with business-focused actions
  const cardData = [
    {
      icon: <img src="/register-icon.png" alt="Register" />,
      title: "Register",
      id: "register",
    },
    {
      icon: (
        <img src="/backgroundcheck-icon.png" alt="Background Verification" />
      ),
      title: "Background Verification",
      id: "background-verification",
    },
    {
      icon: (
        <img src="/performamance_review-icon.png" alt="Performance Review" />
      ),
      title: "Performance Review",
      id: "performance-review",
      notificationCount: 18,
    },
    {
      icon: <img src="/branch-icon.png" alt="Branch" />,
      title: "Branch",
      id: "branch",
    },
    {
      icon: <img src="/announce-icon.png" alt="Announce" />,
      title: "Announce",
      id: "announce",
      notificationCount: 5,
    },
    {
      icon: <img src="/Documents-icon.png" alt="Documents" />,
      title: "Documents",
      id: "documents",
    },
    {
      icon: <img src="/pendingapproval-icon.png" alt="Pending Approval" />,
      title: "Pending Approval",
      id: "pending-approval",
      notificationCount: 3,
    },
    {
      icon: <img src="/reports-icon.png" alt="Reports" />,
      title: "Reports",
      id: "reports",
    },
  ];

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 pt-8 font-inter")}>
      {/* Page Area */}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        {/* Quick Action Cards Grid - Fewer cards */}
        <div className="w-full">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 w-full">
            {cardData.map((card, index) => (
              <div
                key={card.id}
                onClick={() => {
                  console.log(`Clicked ${card.title}`);
                }}
                className={cn(
                  "flex w-full h-[100px]",
                  "px-2 py-3 justify-center items-center flex-shrink-0",
                  "rounded-[8px] sm:rounded-[10px] border-b-[4px] sm:border-b-[6px] border-[#7C3AED] bg-white",
                  "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                  "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
                )}
              >
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <div className="flex items-center justify-center h-[40px] mb-1 relative">
                    <img
                      src={card.icon.props.src}
                      alt={card.icon.props.alt}
                      className="w-[32px] h-[32px] object-contain"
                    />
                    {card.notificationCount && (
                      <div className="absolute -top-1 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {card.notificationCount}
                      </div>
                    )}
                  </div>
                  <div className="flex items-start justify-center h-[32px] text-center">
                    <h3 className="text-[#283C50] font-inter font-bold text-sm leading-tight max-w-full">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Locations Map Section */}
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl font-bold text-[#283C50] mb-4">
              Office Locations
            </h2>
            <div
              className="relative bg-gray-100 rounded-lg overflow-hidden"
              style={{ height: "400px" }}
            >
              {/* Map Container */}
              <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-green-50">
                {/* India Map Outline SVG */}
                <svg
                  viewBox="0 0 800 600"
                  className="absolute inset-0 w-full h-full"
                  style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
                >
                  {/* Simplified India map shape */}
                  <path
                    d="M200 150 L220 120 L280 110 L350 100 L420 120 L480 140 L520 180 L550 220 L580 280 L590 340 L580 400 L560 450 L520 480 L460 500 L400 510 L340 500 L280 480 L240 450 L200 400 L180 340 L170 280 L180 220 Z"
                    fill="#e8f4f8"
                    stroke="#94a3b8"
                    strokeWidth="2"
                  />
                  {/* Neighboring countries - simplified */}
                  <path
                    d="M120 80 L200 70 L250 90 L220 120 L180 140 L140 120 Z"
                    fill="#f1f5f9"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                  />
                  <text
                    x="130"
                    y="110"
                    className="text-xs fill-gray-600"
                    fontSize="12"
                  >
                    Pakistan
                  </text>
                  <text
                    x="100"
                    y="95"
                    className="text-xs fill-gray-600"
                    fontSize="10"
                  >
                    Kyrgyzstan
                  </text>
                  <text
                    x="100"
                    y="105"
                    className="text-xs fill-gray-600"
                    fontSize="10"
                  >
                    Tajikistan
                  </text>
                </svg>

                {/* Location Markers */}
                {/* Mumbai - Marker 0 */}
                <div
                  className="absolute"
                  style={{ left: "160px", top: "280px" }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      0
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                      Mumbai
                      <div className="text-gray-500">Head Office Branch</div>
                    </div>
                  </div>
                </div>

                {/* Delhi - Marker 3 */}
                <div
                  className="absolute"
                  style={{ left: "300px", top: "180px" }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      3
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                      Delhi
                      <div className="text-gray-500">Branch</div>
                    </div>
                  </div>
                </div>

                {/* Hyderabad - Marker 1 */}
                <div
                  className="absolute"
                  style={{ left: "350px", top: "320px" }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      1
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                      Hyderabad
                      <div className="text-gray-500">Regional Branch</div>
                    </div>
                  </div>
                </div>

                {/* Bangalore - Marker 10 */}
                <div
                  className="absolute"
                  style={{ left: "320px", top: "380px" }}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      10
                    </div>
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                      Bangalore
                      <div className="text-gray-500">Tech Hub Branch</div>
                    </div>
                  </div>
                </div>

                {/* Geographic Labels */}
                <div
                  className="absolute"
                  style={{ left: "280px", top: "260px" }}
                >
                  <span className="text-lg font-bold text-gray-700">India</span>
                </div>

                <div
                  className="absolute"
                  style={{ left: "420px", top: "380px" }}
                >
                  <span className="text-sm text-gray-600">Bay of Bengal</span>
                </div>

                <div
                  className="absolute"
                  style={{ left: "480px", top: "220px" }}
                >
                  <span className="text-sm text-gray-600">
                    Myanmar
                    <br />
                    (Burma)
                  </span>
                </div>

                <div
                  className="absolute"
                  style={{ left: "380px", top: "120px" }}
                >
                  <span className="text-sm text-gray-600">XINJIANG</span>
                </div>

                <div
                  className="absolute"
                  style={{ left: "480px", top: "140px" }}
                >
                  <span className="text-sm text-gray-600">
                    TIBET
                    <br />
                    QINGHAI
                  </span>
                </div>

                {/* Google Attribution */}
                <div className="absolute bottom-2 left-2 bg-white px-2 py-1 rounded text-xs text-gray-600">
                  Google
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-4 right-4 flex flex-col bg-white rounded shadow">
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 border-b">
                    +
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600">
                    −
                  </button>
                </div>
              </div>
            </div>

            {/* Branch Statistics */}
            <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">4</div>
                <div className="text-sm text-gray-600">Total Branches</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">1,250</div>
                <div className="text-sm text-gray-600">Total Employees</div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">15</div>
                <div className="text-sm text-gray-600">Cities Covered</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">States</div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="min-h-[400px]">
            <EmployeeAttendanceCard />
          </div>
          <div className="min-h-[400px]">
            <EmployeeLocationTimelineCard />
          </div>
        </div>
      </div>
    </div>
  );
}
