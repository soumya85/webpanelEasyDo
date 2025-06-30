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

        {/* Employee Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="min-h-[400px]">
            <EmployeeAttendanceCard />
          </div>
          <div className="min-h-[600px]">
            <EmployeeLocationTimelineCard />
          </div>
        </div>

        {/* Holidays and Leave Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <div className="min-h-[400px]">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <button className="text-primary-500">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span className="text-primary-500 font-medium">CDB</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Holiday list
                </h2>
                <div className="flex items-center gap-1">
                  <span className="text-primary-500 font-medium">All</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Summary Stats */}
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">37</div>
                    <div className="text-xs text-gray-600 font-medium">
                      TOTAL
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">16</div>
                    <div className="text-xs text-gray-600 font-medium">
                      PUBLIC
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">1</div>
                    <div className="text-xs text-gray-600 font-medium">
                      COMPANY
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-800">10</div>
                    <div className="text-xs text-gray-600 font-medium">
                      REGIONAL
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                </div>
              </div>

              {/* Holiday List */}
              <div className="h-80 overflow-y-auto">
                {[
                  {
                    date: "Wed 01",
                    month: "JAN 25",
                    name: "ENGLISH NEW YEAR",
                    location: "Haldia",
                    type: "Company",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 14",
                    month: "JAN 25",
                    name: "Uttrayan",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 15",
                    month: "JAN 25",
                    name: "Vasi Uttrayan",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sun 26",
                    month: "JAN 25",
                    name: "REPUBLIC DAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 03",
                    month: "FEB 25",
                    name: "SARASWATI PUJA",
                    location: "Head office",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 05",
                    month: "FEB 25",
                    name: "Delhi Assembly Election",
                    location: "New Delhi",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 26",
                    month: "FEB 25",
                    name: "MAHASHIVRATRI",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 14",
                    month: "MAR 25",
                    name: "Dhuleti",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 14",
                    month: "MAR 25",
                    name: "DOLYATRA / HOLI",
                    location: "Head office",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sat 15",
                    month: "MAR 25",
                    name: "Dolyatra/Holi",
                    location: "Paradip",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 31",
                    month: "MAR 25",
                    name: "ID UL FITAR",
                    location: "Head office",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 10",
                    month: "APR 25",
                    name: "MAHAVIR JAYANTI",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 15",
                    month: "APR 25",
                    name: "BENGALI NEW YEARS DAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 18",
                    month: "APR 25",
                    name: "GOODFRIDAY",
                    location: "Head office",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 12",
                    month: "MAY 25",
                    name: "BUDDHA PURNIMA",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sat 07",
                    month: "JUN 25",
                    name: "BAKRID",
                    location: "New Delhi",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Sun 15",
                    month: "JUN 25",
                    name: "RAJA SANKRANTI",
                    location: "Paradip",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Fri 27",
                    month: "JUN 25",
                    name: "RATH YATRA",
                    location: "Paradip",
                    type: "General",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 30",
                    month: "SEP 25",
                    name: "MAHA ASTAMI",
                    location: "Paradip",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 01",
                    month: "OCT 25",
                    name: "MAHA NABAMI",
                    location: "Head office",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 02",
                    month: "OCT 25",
                    name: "Dussehra",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 02",
                    month: "OCT 25",
                    name: "DUSSHERA / GANDHI BIRTHDAY",
                    location: "Head office",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 06",
                    month: "OCT 25",
                    name: "LAXMI PUJA",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 20",
                    month: "OCT 25",
                    name: "Diwali",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Mon 20",
                    month: "OCT 25",
                    name: "KALI PUJA",
                    location: "Paradip",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 21",
                    month: "OCT 25",
                    name: "Gujarati New Year",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Tue 21",
                    month: "OCT 25",
                    name: "KALI PUJA/DIWALI",
                    location: "New Delhi",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 22",
                    month: "OCT 25",
                    name: "Gujarati New Year",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 23",
                    month: "OCT 25",
                    name: "Bhai Bij",
                    location: "Ahmedabad office",
                    type: "Regional",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Wed 05",
                    month: "NOV 25",
                    name: "GURU NANAK BIRTHDAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                  {
                    date: "Thu 25",
                    month: "DEC 25",
                    name: "X MAS DAY",
                    location: "Haldia",
                    type: "Public",
                    typeColor: "bg-primary-500",
                  },
                ].map((holiday, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[50px]">
                        <div className="text-lg font-bold text-gray-800">
                          {holiday.date.split(" ")[1]}
                        </div>
                        <div className="text-xs text-gray-600">
                          {holiday.date.split(" ")[0]}
                        </div>
                        <div className="text-xs text-gray-500">
                          {holiday.month}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">
                          {holiday.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {holiday.location}
                        </div>
                        <div className="h-0.5 bg-primary-500 rounded-full mt-1 w-full"></div>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded text-white text-xs font-medium ${holiday.typeColor}`}
                    >
                      {holiday.type}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="min-h-[400px]">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Leave
              </h2>
              <div className="flex items-center justify-center h-[300px] text-gray-400">
                <p>Card content coming soon...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
