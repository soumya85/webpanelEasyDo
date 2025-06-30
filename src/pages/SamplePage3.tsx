import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import EmployeeAttendanceCard from "@/components/cards/EmployeeAttendanceCard";
import EmployeeLocationTimelineCard from "@/components/cards/EmployeeLocationTimelineCard";

export default function SamplePage3() {
  const { t } = useGlobalTranslation();
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState("Head office");
  const [holidayName, setHolidayName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [holidayType, setHolidayType] = useState("Public");
  const [selectedBranchFilter, setSelectedBranchFilter] =
    useState("All Branches");
  const [leaveView, setLeaveView] = useState("day");
  const [leaveFilter, setLeaveFilter] = useState("pending");

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
          <div className="min-h-[600px]">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Holiday list
                  </h2>
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-1 text-primary-500 font-medium"
                    >
                      <span>{selectedBranchFilter}</span>
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
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-80 h-96 bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-y-auto">
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Branches
                          </h3>
                          <div className="space-y-3">
                            <div
                              onClick={() => {
                                setSelectedBranchFilter("All Branches");
                                setIsDropdownOpen(false);
                              }}
                              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                  <circle cx="12" cy="10" r="3" />
                                </svg>
                                <div>
                                  <div className="font-semibold text-gray-800">
                                    All Branches
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Manage/View all the branches
                                  </div>
                                </div>
                              </div>
                              {selectedBranchFilter === "All Branches" && (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="text-primary-500"
                                >
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              )}
                            </div>
                            {[
                              {
                                name: "Head office",
                                address:
                                  "104, 3rd Floor, Shyama Prasad Mukherjee Road, Hazra, Kalighat, Kalighat, Kolkata, West Bengal 700026, India",
                              },
                              {
                                name: "Haldia",
                                address:
                                  "336G+34V, Sukanta Nagar, WARD NO:15, Haldia, West Bengal 721667, India",
                              },
                              {
                                name: "Ahmedabad office",
                                address:
                                  "C/142, Vishwas City 1, Sola, Ahmedabad, Gujarat 380061, India",
                              },
                              {
                                name: "Paradip",
                                address:
                                  "7J9X+5GG, Paradeep, Odisha 754142, India",
                              },
                              {
                                name: "New Delhi",
                                address:
                                  "New Delhi,405, District Centre, Janakpuri, New Delhi, Delhi, 110058, India",
                              },
                            ].map((branch, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  setSelectedBranchFilter(branch.name);
                                  setIsDropdownOpen(false);
                                }}
                                className="flex items-start justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                              >
                                <div className="flex items-start gap-3">
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="mt-1"
                                  >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                  </svg>
                                  <div>
                                    <div className="font-semibold text-gray-800">
                                      {branch.name}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                      {branch.address}
                                    </div>
                                  </div>
                                </div>
                                {selectedBranchFilter === branch.name && (
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-primary-500 mt-1"
                                  >
                                    <path d="M20 6 9 17l-5-5" />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsHolidayModalOpen(true)}
                  className="bg-black text-white rounded-lg p-2 hover:bg-gray-800 transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
              {/* Summary Stats */}
              <div className="p-4 border-b border-gray-200">
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">37</div>
                    <div className="text-xs text-gray-600 font-medium">
                      TOTAL
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">16</div>
                    <div className="text-xs text-gray-600 font-medium">
                      PUBLIC
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">1</div>
                    <div className="text-xs text-gray-600 font-medium">
                      COMPANY
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                  <div className="text-center bg-white rounded-lg p-3 shadow-md border border-gray-100">
                    <div className="text-2xl font-bold text-gray-800">10</div>
                    <div className="text-xs text-gray-600 font-medium">
                      REGIONAL
                    </div>
                    <div className="h-1 bg-primary-500 rounded-full mt-1"></div>
                  </div>
                </div>
              </div>
              {/* Holiday List */}
              <div className="h-[500px] overflow-y-auto">
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
                    date: "Sun 06",
                    month: "AUG 25",
                    name: "MUHARRAM",
                    location: "Head office",
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
                ]
                  .filter((holiday) => {
                    if (selectedBranchFilter === "All Branches") return true;
                    return holiday.location === selectedBranchFilter;
                  })
                  .map((holiday, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 mx-3 my-2 bg-white rounded-lg shadow-md border border-gray-100"
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
          <div className="min-h-[600px]">
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Leave</h2>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setLeaveView("day")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      leaveView === "day"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Day
                  </button>
                  <button
                    onClick={() => setLeaveView("list")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      leaveView === "list"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Day View - Calendar */}
              {leaveView === "day" && (
                <div className="p-4">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-3">
                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
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
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800">
                        June
                      </div>
                      <div className="text-red-500 font-semibold text-sm">
                        2025
                      </div>
                    </div>
                    <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Selected Date */}
                  <div className="text-center mb-3">
                    <div className="text-blue-500 font-semibold text-sm">
                      18 Jun 2025
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-0.5 mb-3">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-center text-xs font-medium text-gray-600 py-1"
                        >
                          {day}
                        </div>
                      ),
                    )}
                    {/* Previous month days */}
                    {[25, 26, 27, 28, 29, 30, 31].map((date) => (
                      <div
                        key={`prev-${date}`}
                        className="text-center p-1 text-gray-400 relative text-sm"
                      >
                        {date}
                        <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5"></div>
                      </div>
                    ))}
                    {/* Current month days */}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                      <div
                        key={date}
                        className={`text-center p-1 relative cursor-pointer hover:bg-gray-50 rounded text-sm ${
                          date === 18 ? "bg-blue-500 text-white rounded-lg" : ""
                        } ${[1, 7, 14, 15, 21, 27, 28].includes(date) ? "text-red-500" : ""}`}
                      >
                        {date}
                        {[
                          1, 2, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20,
                          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        ].includes(date) && (
                          <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                    ))}
                    {/* Next month days */}
                    {[1, 2, 3, 4, 5].map((date) => (
                      <div
                        key={`next-${date}`}
                        className="text-center p-1 text-gray-400 relative text-sm"
                      >
                        {date}
                        <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto mt-0.5"></div>
                      </div>
                    ))}
                  </div>

                  {/* Leave Details for Selected Date */}
                  <div className="border-t border-gray-200 pt-2">
                    <div className="bg-white rounded-lg border border-gray-200 p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            SM
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800 text-sm">
                            SAMIR PANDA
                          </div>
                          <div className="text-xs text-gray-600">
                            Liberty Highrise Pvt Ltd
                          </div>
                        </div>
                        <div className="ml-auto">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Approved
                          </span>
                        </div>
                      </div>
                      <div className="border-t border-gray-100 pt-2">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-semibold text-gray-800 text-sm">
                            Sick Leave
                          </div>
                          <div className="text-red-500 font-medium text-sm">
                            On Leave
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700 mb-1">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span className="font-semibold text-sm">
                            2 days from Jun 18 to Jun 19
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          Reporting Manager -{" "}
                          <span className="font-medium">Bhaskar Sir</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          17 Jun 2025, 10:46 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* List View */}
              {leaveView === "list" && (
                <div className="p-4">
                  {/* Status Filters */}
                  <div className="flex gap-6 mb-4">
                    <button
                      onClick={() => setLeaveFilter("pending")}
                      className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                        leaveFilter === "pending"
                          ? "border-gray-800 text-gray-800"
                          : "border-transparent text-gray-600"
                      }`}
                    >
                      <span className="font-medium">PENDING</span>
                      <span className="bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        1
                      </span>
                    </button>
                    <button
                      onClick={() => setLeaveFilter("approved")}
                      className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                        leaveFilter === "approved"
                          ? "border-gray-800 text-gray-800"
                          : "border-transparent text-gray-600"
                      }`}
                    >
                      <span className="font-medium">APPROVED</span>
                      <span className="bg-black text-white rounded-full w-6 h-5 text-xs flex items-center justify-center">
                        40
                      </span>
                    </button>
                    <button
                      onClick={() => setLeaveFilter("denied")}
                      className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
                        leaveFilter === "denied"
                          ? "border-gray-800 text-gray-800"
                          : "border-transparent text-gray-600"
                      }`}
                    >
                      <span className="font-medium">DENIED</span>
                      <span className="bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                        6
                      </span>
                    </button>
                  </div>

                  {/* Leave Approval Section */}
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <div className="text-blue-600 font-medium text-sm">
                      LEAVE APPROVAL
                    </div>
                  </div>

                  {/* Leave List */}
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    {leaveFilter === "pending" && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">
                              UD
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-gray-800">
                              Uttam Dey
                            </div>
                            <div className="text-sm font-semibold">
                              1 day Jun 30
                            </div>
                            <div className="text-sm text-gray-600">Haldia</div>
                            <div className="text-sm text-gray-600 font-medium">
                              CASUAL LEAVE (CL)
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 text-right">
                          30 June, 2025 5:56 AM
                        </div>
                      </div>
                    )}

                    {leaveFilter === "approved" && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                              alt="SMITA CHAKRABORTY"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                SMITA CHAKRABORTY
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 28
                              </div>
                              <div className="text-sm text-gray-600">
                                Head office
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                SICK LEAVE (SL)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            28 June, 2025 10:48 AM
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">
                                SM
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                SAMIR PANDA
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 28
                              </div>
                              <div className="text-sm text-gray-600">
                                Head office
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                OTHER LEAVE (OL)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            27 June, 2025 9:50 PM
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
                              alt="Rahul Kumar"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                Rahul Kumar
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 28
                              </div>
                              <div className="text-sm text-gray-600">
                                New Delhi
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                OTHER LEAVE (OL)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            27 June, 2025 6:32 PM
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                              alt="Manoj Kumar"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                Manoj Kumar
                              </div>
                              <div className="text-sm font-semibold">
                                1 day Jun 27
                              </div>
                              <div className="text-sm text-gray-600">
                                New Delhi
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                CASUAL LEAVE (CL)
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 text-right">
                            27 June, 2025 6:37 AM
                          </div>
                        </div>
                      </>
                    )}

                    {leaveFilter === "denied" && (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
                              alt="Smurti"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                Smurti
                              </div>
                              <div className="text-sm font-semibold">
                                2 days from May 16 to May 17
                              </div>
                              <div className="text-sm text-gray-600">
                                Liberty Highrise Pvt Ltd
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                SICK LEAVE
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                            </div>
                            <div className="ml-auto">
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Rejected
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            Reporting Manager -{" "}
                            <span className="font-medium">
                              Digambar Khuntia
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            16 May 2025, 09:47 AM
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face"
                              alt="Tusar Das"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">
                                Tusar Das
                              </div>
                              <div className="text-sm font-semibold">
                                4 days from May 15 to May 18
                              </div>
                              <div className="text-sm text-gray-600">
                                Liberty Highrise Pvt Ltd
                              </div>
                              <div className="text-sm text-gray-600 font-medium">
                                CASUAL LEAVE
                              </div>
                              <div className="text-red-500 font-medium text-sm">
                                ABSENT
                              </div>
                            </div>
                            <div className="ml-auto">
                              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                Rejected
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            Reporting Manager -{" "}
                            <span className="font-medium">
                              Digambar Khuntia
                            </span>
                          </div>
                          <div className="text-xs text-gray-500">
                            15 May 2025, 09:50 AM
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Holiday Modal */}
        {isHolidayModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-lg mx-4 max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Add Holiday
                </h2>
                <button
                  onClick={() => setIsHolidayModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 p-6 space-y-6">
                {/* Branch Dropdown */}
                <div className="relative">
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 appearance-none"
                  >
                    <option value="Head office">Head office</option>
                    <option value="Haldia">Haldia</option>
                    <option value="Ahmedabad office">Ahmedabad office</option>
                    <option value="Paradip">Paradip</option>
                    <option value="New Delhi">New Delhi</option>
                  </select>
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    value={holidayName}
                    onChange={(e) => setHolidayName(e.target.value)}
                    className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-600"
                  />
                </div>

                {/* Date Picker */}
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-4 bg-gray-100 border border-gray-200 rounded-lg text-gray-800"
                    placeholder="Select Date"
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>

                {/* Holiday Type Buttons */}
                <div className="flex gap-3">
                  {["Company", "Public", "Regional"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setHolidayType(type)}
                      className={`flex-1 py-3 px-4 rounded-full font-medium transition-colors ${
                        holidayType === type
                          ? "bg-black text-white"
                          : "bg-white text-gray-700 border border-gray-300"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button at Bottom */}
              <div className="p-6 border-t border-gray-200">
                <button className="w-full bg-primary-500 text-white py-4 rounded-lg font-medium text-lg hover:bg-primary-600 transition-colors">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
