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
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [leaveFormData, setLeaveFormData] = useState({
    leaveType: "",
    startDate: "26 Jun 2025",
    endDate: "29 Jun 2025",
    notes: "",
    attachments: [] as string[],
  });

  const handleLeaveFormChange = (field: string, value: string) => {
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
      startDate: "26 Jun 2025",
      endDate: "29 Jun 2025",
      notes: "",
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

      {/* Leave Request Modal - Mobile First Design */}
      <Dialog
        open={isLeaveRequestModalOpen}
        onOpenChange={setIsLeaveRequestModalOpen}
      >
        <DialogContent className="sm:max-w-[430px] h-[100vh] sm:h-auto p-0 gap-0 rounded-none sm:rounded-lg overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Leave Request Form</DialogTitle>
          </VisuallyHidden>
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
            <button
              onClick={() => setIsLeaveRequestModalOpen(false)}
              className="flex items-center text-[#007AFF] text-base font-normal"
            >
              <svg
                className="w-5 h-5 mr-1"
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
              EDB
            </button>
            <h1 className="text-base font-semibold text-black">
              Leave Request
            </h1>
            <button
              onClick={handleLeaveSubmit}
              className="text-[#007AFF] text-base font-normal"
            >
              Submit
            </button>
          </div>

          <div className="flex-1 bg-[#F2F2F7] overflow-y-auto">
            <div className="space-y-4 p-4">
              {/* Leave Type */}
              <div className="bg-white rounded-lg">
                <Select
                  value={leaveFormData.leaveType}
                  onValueChange={(value) =>
                    handleLeaveFormChange("leaveType", value)
                  }
                >
                  <SelectTrigger className="h-12 border-none shadow-none text-[#007AFF] justify-between px-4">
                    <SelectValue placeholder="Leave type" />
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

              {/* Start Date */}
              <div className="bg-white rounded-lg">
                <div className="flex items-center justify-between px-4 py-3 h-12">
                  <span className="text-black text-base">Start date</span>
                  <div className="flex items-center text-[#007AFF] text-base">
                    <span>{leaveFormData.startDate}</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <div className="border-t border-gray-200 mx-4"></div>
              </div>

              {/* End Date */}
              <div className="bg-white rounded-lg">
                <div className="flex items-center justify-between px-4 py-3 h-12">
                  <span className="text-black text-base">End date</span>
                  <div className="flex items-center text-[#007AFF] text-base">
                    <span>{leaveFormData.endDate}</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-white rounded-lg">
                <button
                  onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 h-12"
                >
                  <div className="flex items-center">
                    <span className="text-xl mr-2">+</span>
                    <span className="text-black text-base">
                      Notes (Optional)
                    </span>
                  </div>
                  <div className="flex items-center text-[#007AFF] text-base">
                    <span>{leaveFormData.notes ? "Added" : "None"}</span>
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {isNotesExpanded && (
                  <>
                    <div className="border-t border-gray-200 mx-4"></div>
                    <div className="p-4">
                      <Textarea
                        placeholder="Notes (Optional)"
                        value={leaveFormData.notes}
                        onChange={(e) =>
                          handleLeaveFormChange("notes", e.target.value)
                        }
                        className="min-h-[100px] border-none shadow-none resize-none bg-transparent placeholder:text-gray-400"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Add Attachment */}
              <div className="bg-white rounded-lg">
                <button
                  onClick={() => setIsAttachmentModalOpen(true)}
                  className="w-full flex items-center justify-between px-4 py-3 h-12"
                >
                  <div className="flex items-center text-[#007AFF] text-base">
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
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <span>Add Attachment</span>
                  </div>
                  <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </button>
              </div>

              {/* Leave Balance Section */}
              <div className="bg-white rounded-lg p-4 mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-black">
                    Leave Balance
                  </h3>
                  <button className="flex items-center text-[#007AFF] text-sm">
                    <span>More Info</span>
                    <svg
                      className="w-4 h-4 ml-1"
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

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-[#E4D9FF] rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-black">0</div>
                    <div className="text-xs text-black">EARNED</div>
                  </div>
                  <div className="bg-[#FFD9D9] rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-black">4</div>
                    <div className="text-xs text-black">SICK</div>
                  </div>
                  <div className="bg-[#FFF5CC] rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-black">2.16</div>
                    <div className="text-xs text-black">CASUAL</div>
                  </div>
                  <div className="bg-[#FFE4F0] rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-black">6</div>
                    <div className="text-xs text-black">OTHER</div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600 mb-4">
                  3.00 Approved • 0 Pending
                </div>

                <button className="w-full bg-[#007AFF] text-white py-3 rounded-lg text-base font-medium">
                  Leave Calendar
                </button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attachment Options Modal */}
      <Dialog
        open={isAttachmentModalOpen}
        onOpenChange={setIsAttachmentModalOpen}
      >
        <DialogContent className="sm:max-w-[400px] p-0 gap-0 rounded-t-xl sm:rounded-xl">
          <VisuallyHidden>
            <DialogTitle>Attachment Options</DialogTitle>
          </VisuallyHidden>
          <div className="bg-white rounded-t-xl p-4 space-y-1">
            <button
              onClick={() => handleAttachmentSelect("scan")}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-[#007AFF] rounded flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-base text-[#007AFF]">Scan</span>
            </button>

            <button
              onClick={() => handleAttachmentSelect("documents")}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-[#007AFF] rounded flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-base text-[#007AFF]">Documents</span>
            </button>

            <button
              onClick={() => handleAttachmentSelect("camera")}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-[#007AFF] rounded flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-base text-[#007AFF]">Camera</span>
            </button>

            <button
              onClick={() => handleAttachmentSelect("photos")}
              className="w-full flex items-center px-4 py-3 text-left hover:bg-gray-50 rounded-lg"
            >
              <div className="w-8 h-8 bg-[#007AFF] rounded flex items-center justify-center mr-3">
                <svg
                  className="w-4 h-4 text-white"
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
              <span className="text-base text-[#007AFF]">Photos</span>
            </button>
          </div>

          <div className="bg-white rounded-b-xl p-4 border-t border-gray-200">
            <button
              onClick={() => setIsAttachmentModalOpen(false)}
              className="w-full py-3 text-[#007AFF] text-base font-medium"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
