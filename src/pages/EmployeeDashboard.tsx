import { cn } from "@/lib/utils";
import { useState } from "react";
import AttendanceSummary from "@/components/AttendanceSummary";
import PerformanceMeter from "@/components/PerformanceMeter";
import WagesSummary from "@/components/WagesSummary";
import LeaveBalance from "@/components/LeaveBalance";
import UpcomingHolidays from "@/components/UpcomingHolidays";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom ChevronRight Icon to match Overview page
const ChevronRightIcon = () => (
  <svg
    width="6"
    height="9"
    viewBox="0 0 6 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-1 h-[7px] flex-shrink-0"
  >
    <path
      d="M1.00391 7.595L5.00391 4.095L1.00391 0.595001"
      stroke="#7C8796"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function EmployeeDashboard() {
  const [isLeaveRequestModalOpen, setIsLeaveRequestModalOpen] = useState(false);
  const [isLeaveCalendarOpen, setIsLeaveCalendarOpen] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<"day" | "list">("day");
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "approved" | "denied"
  >("pending");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 14)); // May 14, 2025
  const [leaveFormData, setLeaveFormData] = useState({
    leaveType: "",
    startDate: "2025-06-19",
    endDate: "2025-06-19",
    notes: "",
    firstHalfDay: false,
    secondHalfDay: false,
    attachments: [] as string[],
  });

  const handleLeaveFormChange = (field: string, value: string | boolean) => {
    setLeaveFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLeaveSubmit = () => {
    // Handle form submission logic here
    console.log("Leave request submitted:", leaveFormData);
    setIsLeaveRequestModalOpen(false);
    setIsNotesExpanded(false);
    setIsAttachmentModalOpen(false);
    // Reset form
    setLeaveFormData({
      leaveType: "",
      startDate: "2025-06-19",
      endDate: "2025-06-19",
      notes: "",
      firstHalfDay: false,
      secondHalfDay: false,
      attachments: [],
    });
  };

  const handleAttachmentSelect = (type: string) => {
    console.log("Selected attachment type:", type);
    setIsAttachmentModalOpen(false);
    // Handle attachment logic here
  };

  const cardData = [
    // Row 1
    {
      icon: <img src="/leave_request-icon.png" alt="Leave Request" />,
      title: "Leave Request",
      id: "leave-request",
    },
    {
      icon: <img src="/OT_request-icon.png" alt="OT Request" />,
      title: "OT Request",
      id: "ot-request",
    },
    {
      icon: (
        <img src="/Salaryadvance_request-icon.png" alt="Salary Adv. Request" />
      ),
      title: "Salary Adv. Request",
      id: "salary-request",
    },
    {
      icon: <img src="/Reimburse_request-icon.png" alt="Reimburse Request" />,
      title: "Reimburse Request",
      id: "reimburse-request",
    },
    // Row 2
    {
      icon: <img src="/statistics-icon.png" alt="Statistics" />,
      title: "Statistics",
      id: "statistics",
    },
    {
      icon: <img src="/leave-icon.png" alt="Leave" />,
      title: "Leave",
      id: "leave",
    },
    {
      icon: <img src="/holiday-icon.png" alt="Holiday" />,
      title: "Holiday",
      id: "holiday",
    },
    {
      icon: <img src="/reports-icon.png" alt="Reports" />,
      title: "Reports",
      id: "reports",
    },
  ];

  return (
    <div className={cn("w-full p-3 sm:p-4 lg:p-6 font-inter")}>
      {/* Page Area */}
      <div
        className={cn(
          "flex w-full flex-col items-start gap-4 sm:gap-5 lg:gap-6",
        )}
      >
        {/* Breadcrumb Section Row */}
        <div
          className={cn(
            "flex min-h-[50px] sm:min-h-[60px] lg:min-h-[65px]",
            "px-4 py-3 sm:px-6 sm:py-3 lg:px-[30px] lg:py-[13.5px]",
            "justify-between items-center self-stretch",
            "rounded-lg border-l-[6px] border-[#4766E5] bg-white",
            "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
            "flex-row gap-2 lg:gap-0",
          )}
        >
          <div className="flex items-center gap-2 sm:gap-[8px] lg:gap-[10px] flex-wrap flex-1">
            <span className="text-[#283C50] font-inter text-base sm:text-xl lg:text-base font-bold leading-[20px] sm:leading-[24px] lg:leading-[19.2px]">
              Employee Dashboard
            </span>
            <span className="text-[#DBD9D9] font-inter text-sm sm:text-base font-normal leading-[16px] sm:leading-[19.2px] hidden sm:block">
              |
            </span>
            <span className="text-[#283C50] font-inter text-xs sm:text-[13px] font-bold leading-[16px] sm:leading-[20.8px] hidden sm:block">
              Liberty Highrise PVT Ltd
            </span>
            <div className="hidden sm:block">
              <ChevronRightIcon />
            </div>
            <span className="text-[#222] font-inter text-xs sm:text-[13px] font-normal leading-[16px] sm:leading-[20.8px] hidden sm:block">
              All Branch
            </span>
          </div>
          <div className="flex justify-end items-center gap-2 lg:gap-[10px] flex-shrink-0">
            <div className="w-[171px] h-[41.19px] flex items-center justify-end">
              <div className="h-full bg-transparent"></div>
            </div>
          </div>
        </div>

        {/* Quick Action Cards Grid */}
        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 w-full">
          {/* Row 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
            {cardData.slice(0, 4).map((card, index) => (
              <div
                key={card.id}
                onClick={() => {
                  if (card.id === "leave-request") {
                    setIsLeaveRequestModalOpen(true);
                  }
                }}
                className={cn(
                  "flex w-full min-w-[200px] sm:min-w-[251px] h-[100px] sm:h-[116px]",
                  "px-3 sm:px-4 justify-center items-center flex-shrink-0",
                  "rounded-[10px] border-b-[6px] border-[#4766E5] bg-white",
                  "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                  "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="flex w-[35px] sm:w-[41px] flex-col items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="text-[#283C50] font-inter font-bold text-sm sm:text-base leading-[20px] sm:leading-[25.6px]">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
            {cardData.slice(4, 8).map((card, index) => (
              <div
                key={card.id}
                className={cn(
                  "flex w-full min-w-[200px] sm:min-w-[251px] h-[100px] sm:h-[116px]",
                  "px-3 sm:px-4 justify-center items-center flex-shrink-0",
                  "rounded-[10px] border-b-[6px] border-[#4766E5] bg-white",
                  "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
                  "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
                )}
              >
                <div className="flex items-center gap-2">
                  <div className="flex w-[35px] sm:w-[41px] flex-col items-center justify-center flex-shrink-0">
                    {card.icon}
                  </div>
                  <h3 className="text-[#283C50] font-inter font-bold text-sm sm:text-base leading-[20px] sm:leading-[25.6px]">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Dashboard Sections */}
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 w-full">
          {/* First Row: Attendance Summary and Performance Meter - Equal Heights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="min-h-[400px] lg:min-h-[450px]">
              <AttendanceSummary />
            </div>
            <div className="min-h-[400px] lg:min-h-[450px]">
              <PerformanceMeter />
            </div>
          </div>

          {/* Second Row: Wages, Leave Balance, and Upcoming Holidays - Equal Heights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="min-h-[350px] lg:min-h-[400px]">
              <WagesSummary />
            </div>
            <div className="min-h-[350px] lg:min-h-[400px]">
              <LeaveBalance />
            </div>
            <div className="min-h-[350px] lg:min-h-[400px]">
              <UpcomingHolidays />
            </div>
          </div>
        </div>
      </div>

      {/* Leave Request Modal - Web App Style */}
      <Dialog
        open={isLeaveRequestModalOpen}
        onOpenChange={setIsLeaveRequestModalOpen}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#283C50]">
              Leave Request
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh]">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              {/* Leave Type */}
              <div className="space-y-2">
                <Label
                  htmlFor="leave-type"
                  className="text-sm font-medium text-[#283C50]"
                >
                  Leave Type *
                </Label>
                <Select
                  value={leaveFormData.leaveType}
                  onValueChange={(value) =>
                    handleLeaveFormChange("leaveType", value)
                  }
                >
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="maternity">Maternity Leave</SelectItem>
                    <SelectItem value="paternity">Paternity Leave</SelectItem>
                    <SelectItem value="emergency">Emergency Leave</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="start-date"
                    className="text-sm font-medium text-[#283C50]"
                  >
                    Start Date *
                  </Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={leaveFormData.startDate}
                    onChange={(e) =>
                      handleLeaveFormChange("startDate", e.target.value)
                    }
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="end-date"
                    className="text-sm font-medium text-[#283C50]"
                  >
                    End Date *
                  </Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={leaveFormData.endDate}
                    onChange={(e) =>
                      handleLeaveFormChange("endDate", e.target.value)
                    }
                    className="h-12"
                  />
                </div>
              </div>

              {/* Half Day Options */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="first-half-day"
                    checked={leaveFormData.firstHalfDay}
                    onChange={(e) =>
                      handleLeaveFormChange("firstHalfDay", e.target.checked)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 text-[#4766E5] focus:ring-[#4766E5] focus:ring-2"
                  />
                  <Label
                    htmlFor="first-half-day"
                    className="text-base font-medium text-[#283C50]"
                  >
                    First Half Day
                  </Label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="second-half-day"
                    checked={leaveFormData.secondHalfDay}
                    onChange={(e) =>
                      handleLeaveFormChange("secondHalfDay", e.target.checked)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 text-[#4766E5] focus:ring-[#4766E5] focus:ring-2"
                  />
                  <Label
                    htmlFor="second-half-day"
                    className="text-base font-medium text-[#283C50]"
                  >
                    Second Half Day
                  </Label>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                    className="flex items-center space-x-2 text-[#4766E5] hover:text-[#4766E5]/80"
                  >
                    <span className="text-lg">
                      {isNotesExpanded ? "−" : "+"}
                    </span>
                    <span className="text-sm font-medium">
                      Notes (Optional)
                    </span>
                  </button>
                  <span className="text-xs text-gray-500">
                    {leaveFormData.notes ? "Added" : "None"}
                  </span>
                </div>

                {isNotesExpanded && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Add any additional notes for your leave request..."
                      value={leaveFormData.notes}
                      onChange={(e) =>
                        handleLeaveFormChange("notes", e.target.value)
                      }
                      className="min-h-[120px] resize-none"
                    />
                  </div>
                )}
              </div>

              {/* Attachment Section */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-[#283C50]">
                  Attachments
                </Label>
                <button
                  onClick={() => setIsAttachmentModalOpen(true)}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-[#4766E5] hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">
                      Click to add attachments
                    </span>
                    <span className="text-xs text-gray-400">
                      Scan, Documents, Camera, or Photos
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column - Leave Balance */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#283C50]">
                    Leave Balance
                  </h3>
                  <button className="text-[#4766E5] text-sm hover:underline">
                    More Info →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-[#E4D9FF] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#283C50]">0</div>
                    <div className="text-xs font-medium text-[#283C50] mt-1">
                      EARNED
                    </div>
                  </div>
                  <div className="bg-[#FFD9D9] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#283C50]">4</div>
                    <div className="text-xs font-medium text-[#283C50] mt-1">
                      SICK
                    </div>
                  </div>
                  <div className="bg-[#FFF5CC] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#283C50]">
                      2.16
                    </div>
                    <div className="text-xs font-medium text-[#283C50] mt-1">
                      CASUAL
                    </div>
                  </div>
                  <div className="bg-[#FFE4F0] rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-[#283C50]">6</div>
                    <div className="text-xs font-medium text-[#283C50] mt-1">
                      OTHER
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600 mb-4">
                  <span className="font-medium">3.00 Approved</span> •{" "}
                  <span>0 Pending</span>
                </div>

                <Button
                  onClick={() => setIsLeaveCalendarOpen(true)}
                  className="w-full bg-[#4766E5] hover:bg-[#4766E5]/90 h-12"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Leave Calendar
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-row justify-start space-x-2">
            <Button
              onClick={handleLeaveSubmit}
              className="bg-[#4766E5] hover:bg-[#4766E5]/90 h-12 px-8"
            >
              Submit Request
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsLeaveRequestModalOpen(false)}
              className="h-12 px-8"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Calendar Modal */}
      <Dialog open={isLeaveCalendarOpen} onOpenChange={setIsLeaveCalendarOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <VisuallyHidden>
            <DialogTitle>Leave Calendar</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center px-4 py-3 bg-[#F8F9FA] border-b relative">
            <div className="flex items-center flex-1">
              <button
                onClick={() => setIsLeaveCalendarOpen(false)}
                className="flex items-center text-[#4766E5] text-sm font-medium hover:text-[#4766E5]/80"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Leave Request
              </button>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-lg font-semibold text-[#283C50]">
                Your Leave
              </h1>
            </div>

            <div className="flex items-center flex-1 justify-end">
              <div className="flex bg-white rounded-lg p-1 border mr-8">
                <button
                  onClick={() => setCalendarView("day")}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    calendarView === "day"
                      ? "bg-[#4766E5] text-white"
                      : "text-[#283C50] hover:bg-gray-100"
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setCalendarView("list")}
                  className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                    calendarView === "list"
                      ? "bg-[#4766E5] text-white"
                      : "text-[#283C50] hover:bg-gray-100"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[75vh]">
            {calendarView === "day" ? (
              <>
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1,
                        ),
                      )
                    }
                    className="p-2 rounded-lg border hover:bg-gray-50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#283C50]">
                      {currentMonth.toLocaleDateString("en-US", {
                        month: "long",
                      })}
                    </div>
                    <div className="text-lg text-red-500 font-medium">
                      {currentMonth.getFullYear()}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1,
                        ),
                      )
                    }
                    className="p-2 rounded-lg border hover:bg-gray-50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Selected Date Display */}
                <div className="text-center mb-6">
                  <div className="text-xl font-medium text-[#4766E5]">
                    {selectedDate.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white rounded-lg border">
                  {/* Days of Week Header */}
                  <div className="grid grid-cols-7 gap-0 border-b">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="p-3 text-center font-semibold text-[#283C50] border-r last:border-r-0"
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>

                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-0">
                    {Array.from({ length: 42 }, (_, i) => {
                      const firstDay = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        1,
                      );
                      const startDate = new Date(firstDay);
                      startDate.setDate(
                        startDate.getDate() - firstDay.getDay(),
                      );
                      const currentDate = new Date(startDate);
                      currentDate.setDate(currentDate.getDate() + i);

                      const isCurrentMonth =
                        currentDate.getMonth() === currentMonth.getMonth();
                      const isSelected =
                        currentDate.toDateString() ===
                        selectedDate.toDateString();
                      const isToday =
                        currentDate.toDateString() ===
                        new Date().toDateString();

                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(currentDate)}
                          className={`relative p-3 h-16 border-r border-b last:border-r-0 hover:bg-gray-50 transition-colors ${
                            !isCurrentMonth ? "text-gray-400" : "text-[#283C50]"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto ${
                              isSelected
                                ? "bg-[#4766E5] text-white"
                                : isToday
                                  ? "bg-red-100 text-red-600"
                                  : ""
                            }`}
                          >
                            {currentDate.getDate()}
                          </div>
                          {/* Green dot for leave days */}
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Leave Details Card */}
                <div className="mt-6 bg-white rounded-lg border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src="/placeholder.svg"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#283C50]">
                          Soumyadeep Goswami
                        </h3>
                        <p className="text-gray-600">
                          Liberty Righrise Pvt Ltd
                        </p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Approved
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-[#283C50] mb-2">
                        Casual Leave
                      </h4>
                      <div className="flex items-center text-[#283C50] mb-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="font-bold">1 day May 14</span>
                      </div>
                      <p className="text-gray-600 mb-1">
                        Reporting Manager - Amulya Kumar Kar
                      </p>
                      <p className="text-gray-400 text-sm">
                        12 May 2025, 08:14 PM
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-red-500 font-bold text-lg">
                        On Leave
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* List View - Tabs */}
                <div className="flex border-b mb-6">
                  <button
                    onClick={() => setSelectedTab("pending")}
                    className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                      selectedTab === "pending"
                        ? "border-[#283C50] text-[#283C50]"
                        : "border-transparent text-gray-500 hover:text-[#283C50]"
                    }`}
                  >
                    PENDING
                  </button>
                  <button
                    onClick={() => setSelectedTab("approved")}
                    className={`px-4 py-3 font-semibold border-b-2 transition-colors relative ${
                      selectedTab === "approved"
                        ? "border-[#283C50] text-[#283C50]"
                        : "border-transparent text-gray-500 hover:text-[#283C50]"
                    }`}
                  >
                    APPROVED
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                      1
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedTab("denied")}
                    className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                      selectedTab === "denied"
                        ? "border-[#283C50] text-[#283C50]"
                        : "border-transparent text-gray-500 hover:text-[#283C50]"
                    }`}
                  >
                    DENIED
                  </button>
                </div>

                {/* Tab Content */}
                {selectedTab === "pending" && (
                  <div className="text-center py-16">
                    <div className="mb-6">
                      <img
                        src="/placeholder.svg"
                        alt="No pending items"
                        className="w-64 h-64 mx-auto opacity-50"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-[#283C50] mb-2">
                      Nothing's Pending
                    </h3>
                    <p className="text-gray-600">
                      No PENDING approval available
                    </p>
                  </div>
                )}

                {selectedTab === "approved" && (
                  <div className="space-y-4">
                    <div className="bg-[#E3F2FD] text-[#4766E5] px-4 py-2 rounded-t-lg font-semibold">
                      LEAVE APPROVAL
                    </div>
                    <div className="bg-white border rounded-lg p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                          <img
                            src="/placeholder.svg"
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-[#283C50] mb-1">
                            Soumyadeep Goswami
                          </h4>
                          <p className="text-xl font-bold text-[#283C50] mb-2">
                            1 day May 14
                          </p>
                          <p className="text-gray-600 mb-1">Head office</p>
                          <p className="text-[#283C50] font-medium mb-2">
                            CASUAL LEAVE (CL)
                          </p>
                          <p className="text-gray-400 text-sm">
                            12 May, 2025 8:14 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === "denied" && (
                  <div className="text-center py-16">
                    <div className="mb-6">
                      <img
                        src="/placeholder.svg"
                        alt="No denied items"
                        className="w-64 h-64 mx-auto opacity-50"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-[#283C50] mb-2">
                      No Denied Requests
                    </h3>
                    <p className="text-gray-600">
                      No DENIED approval available
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Attachment Options Modal */}
      <Dialog
        open={isAttachmentModalOpen}
        onOpenChange={setIsAttachmentModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-[#283C50]">
              Choose Attachment Source
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            <button
              onClick={() => handleAttachmentSelect("scan")}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#4766E5] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4766E5]/90">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#283C50]">
                Scan Document
              </span>
            </button>

            <button
              onClick={() => handleAttachmentSelect("documents")}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#4766E5] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4766E5]/90">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#283C50]">
                Documents
              </span>
            </button>

            <button
              onClick={() => handleAttachmentSelect("camera")}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#4766E5] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4766E5]/90">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#283C50]">Camera</span>
            </button>

            <button
              onClick={() => handleAttachmentSelect("photos")}
              className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-colors group"
            >
              <div className="w-12 h-12 bg-[#4766E5] rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#4766E5]/90">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#283C50]">
                Photo Gallery
              </span>
            </button>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAttachmentModalOpen(false)}
              className="w-full"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
