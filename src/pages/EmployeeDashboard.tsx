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

      {/* Leave Request Modal */}
      <Dialog
        open={isLeaveRequestModalOpen}
        onOpenChange={setIsLeaveRequestModalOpen}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#283C50]">
              Leave Request
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Leave Type */}
            <div className="grid gap-2">
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
                <SelectTrigger>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
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
                />
              </div>
              <div className="grid gap-2">
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
                />
              </div>
            </div>

            {/* Total Days */}
            <div className="grid gap-2">
              <Label
                htmlFor="total-days"
                className="text-sm font-medium text-[#283C50]"
              >
                Total Days
              </Label>
              <Input
                id="total-days"
                type="number"
                placeholder="Enter total days"
                value={leaveFormData.totalDays}
                onChange={(e) =>
                  handleLeaveFormChange("totalDays", e.target.value)
                }
              />
            </div>

            {/* Reason */}
            <div className="grid gap-2">
              <Label
                htmlFor="reason"
                className="text-sm font-medium text-[#283C50]"
              >
                Reason *
              </Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for your leave request..."
                value={leaveFormData.reason}
                onChange={(e) =>
                  handleLeaveFormChange("reason", e.target.value)
                }
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsLeaveRequestModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleLeaveSubmit}
              className="bg-[#4766E5] hover:bg-[#4766E5]/90"
            >
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
