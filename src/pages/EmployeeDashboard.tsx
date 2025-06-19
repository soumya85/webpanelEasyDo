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
  const [isLeaveBalanceInfoOpen, setIsLeaveBalanceInfoOpen] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [selectedLeaveTab, setSelectedLeaveTab] = useState<
    "approved" | "pending" | "availed"
  >("approved");
  const [isLeaveRulesOpen, setIsLeaveRulesOpen] = useState(false);
  const [isOTRequestModalOpen, setIsOTRequestModalOpen] = useState(false);
  const [isSalaryAdvanceModalOpen, setIsSalaryAdvanceModalOpen] =
    useState(false);
  const [isReimburseRequestModalOpen, setIsReimburseRequestModalOpen] =
    useState(false);
  const [otFormData, setOtFormData] = useState({
    title: "",
    startDate: "2025-06-18",
    notes: "",
    attachments: [] as Array<{
      id: string;
      name: string;
      type: string;
      size: number;
      url: string;
      source: "scan" | "documents" | "camera" | "photos";
    }>,
  });
  const [salaryAdvanceFormData, setSalaryAdvanceFormData] = useState({
    title: "",
    amount: "",
    startDate: "",
    duration: "1-month",
    notes: "",
    attachments: [] as Array<{
      id: string;
      name: string;
      type: string;
      size: number;
      url: string;
      source: "scan" | "documents" | "camera" | "photos";
    }>,
  });
  const [reimburseFormData, setReimburseFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
    notes: "",
    attachments: [] as Array<{
      id: string;
      name: string;
      type: string;
      size: number;
      url: string;
      source: "scan" | "documents" | "camera" | "photos";
    }>,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<"day" | "list">("day");
  const [selectedTab, setSelectedTab] = useState<
    "pending" | "approved" | "denied"
  >("pending");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 14)); // May 14, 2025
  const [leaveFormData, setLeaveFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    notes: "",
    firstHalfDay: false,
    secondHalfDay: false,
    attachments: [] as Array<{
      id: string;
      name: string;
      type: string;
      size: number;
      url: string;
      source: "scan" | "documents" | "camera" | "photos";
    }>,
  });

  const handleLeaveFormChange = (field: string, value: string | boolean) => {
    setLeaveFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLeaveSubmit = () => {
    // Validate required fields
    if (!leaveFormData.leaveType) {
      alert("Please select a leave type");
      return;
    }

    if (!leaveFormData.startDate || !leaveFormData.endDate) {
      alert("Please select start and end dates");
      return;
    }

    // Prepare submission data
    const submissionData = {
      ...leaveFormData,
      attachmentCount: leaveFormData.attachments.length,
      attachmentSummary: leaveFormData.attachments.map((att) => ({
        name: att.name,
        type: att.type,
        size: att.size,
        source: att.source,
      })),
    };

    console.log("Leave request submitted:", submissionData);

    // Clean up attachment URLs to prevent memory leaks
    leaveFormData.attachments.forEach((att) => {
      if (att.url.startsWith("blob:")) {
        URL.revokeObjectURL(att.url);
      }
    });

    // Close modals and reset form
    setIsLeaveRequestModalOpen(false);
    setIsNotesExpanded(false);
    setIsAttachmentModalOpen(false);

    // Reset form with new attachment structure
    setLeaveFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      notes: "",
      firstHalfDay: false,
      secondHalfDay: false,
      attachments: [],
    });

    // Show success message
    alert(
      `Leave request submitted successfully with ${submissionData.attachmentCount} attachment${submissionData.attachmentCount !== 1 ? "s" : ""}!`,
    );
  };

  const handleAttachmentSelect = (
    type: "scan" | "documents" | "camera" | "photos",
  ) => {
    setIsAttachmentModalOpen(false);

    // Create file input element dynamically
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";

    // Set file type constraints based on attachment type
    switch (type) {
      case "scan":
      case "documents":
        input.accept = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png";
        break;
      case "camera":
        input.accept = "image/*";
        input.capture = "environment"; // Use rear camera
        break;
      case "photos":
        input.accept = "image/*";
        break;
    }

    input.multiple = true; // Allow multiple file selection

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleFileUpload(Array.from(files), type);
      }
      document.body.removeChild(input);
    };

    document.body.appendChild(input);
    input.click();
  };

  const handleFileUpload = (
    files: File[],
    source: "scan" | "documents" | "camera" | "photos",
  ) => {
    const maxFileSize = 10 * 1024 * 1024; // 10MB limit
    const maxFiles = 5; // Maximum 5 files

    // Validate file count
    if (leaveFormData.attachments.length + files.length > maxFiles) {
      alert(
        `Maximum ${maxFiles} files allowed. You currently have ${leaveFormData.attachments.length} files.`,
      );
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Simulate file upload and create attachment objects
    const newAttachments = validFiles.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      url: URL.createObjectURL(file), // In real app, this would be upload URL
      source: source,
    }));

    setLeaveFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));

    // Show success message
    const sourceLabel = {
      scan: "Scanned document",
      documents: "Document",
      camera: "Photo",
      photos: "Photo",
    }[source];

    alert(
      `${validFiles.length} ${sourceLabel}${validFiles.length > 1 ? "s" : ""} uploaded successfully!`,
    );
  };

  const handleRemoveAttachment = (id: string) => {
    setLeaveFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));

    // Success feedback
    const successMessage =
      validFiles.length === 1
        ? `"${validFiles[0].name}" uploaded successfully`
        : `${validFiles.length} files uploaded successfully`;

    // Show success notification (in real app, you'd use a toast/notification system)
    console.log(successMessage);
  };

  const handleSalaryAdvanceSubmit = () => {
    // Validate required fields
    if (!salaryAdvanceFormData.title.trim()) {
      alert("Please enter a title for your salary advance request.");
      return;
    }

    if (
      !salaryAdvanceFormData.amount ||
      parseFloat(salaryAdvanceFormData.amount) <= 0
    ) {
      alert("Please enter a valid amount for your salary advance.");
      return;
    }

    if (!salaryAdvanceFormData.startDate) {
      alert("Please select a start date.");
      return;
    }

    // Create submission data
    const submissionData = {
      id: Date.now().toString(),
      title: salaryAdvanceFormData.title,
      amount: parseFloat(salaryAdvanceFormData.amount),
      startDate: salaryAdvanceFormData.startDate,
      duration: salaryAdvanceFormData.duration,
      notes: salaryAdvanceFormData.notes,
      attachmentCount: salaryAdvanceFormData.attachments.length,
      attachments: salaryAdvanceFormData.attachments.map((att) => ({
        name: att.name,
        size: att.size,
        type: att.type,
        source: att.source,
      })),
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    // Here you would typically send this to your backend API
    console.log("Salary Advance Request Submitted:", submissionData);

    // Reset form
    setSalaryAdvanceFormData({
      title: "",
      amount: "",
      startDate: "",
      duration: "1-month",
      notes: "",
      attachments: [],
    });

    // Close modal
    setIsSalaryAdvanceModalOpen(false);

    // Show success message
    alert(
      `Salary advance request for $${submissionData.amount} submitted successfully! Reference ID: ${submissionData.id}`,
    );
  };

  const handleSalaryAdvanceAttachment = (
    type: "scan" | "documents" | "camera" | "photos",
  ) => {
    setIsAttachmentModalOpen(false);

    // Create file input element dynamically
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";

    // Set file type constraints based on attachment type
    switch (type) {
      case "scan":
      case "documents":
        input.accept = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png";
        break;
      case "camera":
        input.accept = "image/*";
        input.capture = "environment"; // Use rear camera
        break;
      case "photos":
        input.accept = "image/*";
        break;
    }

    input.multiple = true; // Allow multiple file selection

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleSalaryAdvanceFileUpload(Array.from(files), type);
      }
      document.body.removeChild(input);
    };

    document.body.appendChild(input);
    input.click();
  };

  const handleSalaryAdvanceFileUpload = (
    files: File[],
    source: "scan" | "documents" | "camera" | "photos",
  ) => {
    const maxFileSize = 10 * 1024 * 1024; // 10MB limit
    const maxFiles = 5; // Maximum 5 files

    // Validate file count
    if (salaryAdvanceFormData.attachments.length + files.length > maxFiles) {
      alert(
        `Maximum ${maxFiles} files allowed. You currently have ${salaryAdvanceFormData.attachments.length} files.`,
      );
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > maxFileSize) {
        alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // Create attachment objects
    const newAttachments = validFiles.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      url: URL.createObjectURL(file),
      source: source,
    }));

    setSalaryAdvanceFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));

    // Success feedback
    const successMessage =
      validFiles.length === 1
        ? `"${validFiles[0].name}" uploaded successfully`
        : `${validFiles.length} files uploaded successfully`;

    console.log(successMessage);
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
                  } else if (card.id === "ot-request") {
                    setIsOTRequestModalOpen(true);
                  } else if (card.id === "salary-request") {
                    setIsSalaryAdvanceModalOpen(true);
                  } else if (card.id === "reimburse-request") {
                    setIsReimburseRequestModalOpen(true);
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
        <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="flex-shrink-0 pb-4">
            <DialogTitle className="text-xl font-bold text-[#283C50]">
              Leave Request
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2 space-y-6 pb-8">
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
                    placeholder="dd-mm-yyyy"
                    className="h-12 input-focus-safe focus:ring-2 focus:ring-[#4766E5] focus:border-[#4766E5]"
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
                    placeholder="dd-mm-yyyy"
                    className="h-12 input-focus-safe focus:ring-2 focus:ring-[#4766E5] focus:border-[#4766E5]"
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
                      className="h-[80px] resize-none input-focus-safe focus:ring-2 focus:ring-[#4766E5] focus:border-[#4766E5]"
                    />
                  </div>
                )}
              </div>

              {/* Attachment Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-[#283C50]">
                    Attachments
                  </Label>
                  {leaveFormData.attachments.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {leaveFormData.attachments.length}/5 files
                    </span>
                  )}
                </div>

                {/* Uploaded Files Display */}
                {leaveFormData.attachments.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {leaveFormData.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          {/* File Icon */}
                          <div className="flex-shrink-0">
                            {attachment.type.startsWith("image/") ? (
                              <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-green-600"
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
                            ) : (
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <svg
                                  className="w-4 h-4 text-blue-600"
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
                            )}
                          </div>

                          {/* File Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#283C50] truncate">
                              {attachment.name}
                            </p>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{formatFileSize(attachment.size)}</span>
                              <span>•</span>
                              <span className="capitalize">
                                {attachment.source}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Preview and Remove Buttons */}
                        <div className="flex items-center space-x-2 ml-2">
                          {attachment.type.startsWith("image/") && (
                            <button
                              onClick={() =>
                                window.open(attachment.url, "_blank")
                              }
                              className="p-1 text-gray-400 hover:text-[#4766E5] transition-colors"
                              title="Preview image"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleRemoveAttachment(attachment.id)
                            }
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove file"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Attachment Button */}
                <button
                  onClick={() => setIsAttachmentModalOpen(true)}
                  disabled={leaveFormData.attachments.length >= 5}
                  className={`w-full border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                    leaveFormData.attachments.length >= 5
                      ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                      : "border-blue-300 bg-blue-50/20 hover:border-[#4766E5] hover:bg-blue-50 hover:shadow-sm active:scale-[0.99]"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <svg
                      className={`w-8 h-8 ${
                        leaveFormData.attachments.length >= 5
                          ? "text-gray-300"
                          : "text-gray-400"
                      }`}
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
                    <span
                      className={`text-sm ${
                        leaveFormData.attachments.length >= 5
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {leaveFormData.attachments.length >= 5
                        ? "Maximum files reached (5/5)"
                        : "Click to add attachments"}
                    </span>
                    {leaveFormData.attachments.length < 5 && (
                      <span className="text-xs text-gray-400">
                        Scan, Documents, Camera, or Photos
                      </span>
                    )}
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
                  <button
                    onClick={() => setIsLeaveBalanceInfoOpen(true)}
                    className="text-[#4766E5] text-sm hover:underline transition-colors"
                  >
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

          <div className="mt-6 pt-4 pb-6 flex flex-row justify-start space-x-2 border-t">
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
        <DialogContent className="max-w-4xl h-[80vh] max-h-[80vh] overflow-hidden p-0 flex flex-col">
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

            <div className="flex items-center flex-1 justify-end pr-16">
              <div className="flex bg-white rounded-lg p-1 border">
                <button
                  onClick={() => setCalendarView("day")}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    calendarView === "day"
                      ? "bg-[#4766E5] text-white"
                      : "text-[#283C50] hover:bg-gray-100"
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setCalendarView("list")}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
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
          <div className="p-6 flex-1 min-h-0 overflow-y-auto">
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
                      <div className="w-16 h-16 bg-[#283C50] rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-semibold">
                          SG
                        </span>
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
                      <p className="text-gray-600 text-sm">
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
                <div className="min-h-[400px]">
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
                          <div className="w-12 h-12 bg-[#283C50] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">
                              SG
                            </span>
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
                            <p className="text-gray-600 text-sm">
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
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Leave Balance Info Modal */}
      <Dialog
        open={isLeaveBalanceInfoOpen}
        onOpenChange={setIsLeaveBalanceInfoOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] max-h-[80vh] overflow-hidden p-0 flex flex-col [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Leave Balance Summary</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#F8F9FA] border-b relative">
            {/* Left - Back Button */}
            <button
              onClick={() => setIsLeaveBalanceInfoOpen(false)}
              className="flex items-center text-[#4766E5] text-sm font-medium hover:text-[#4766E5]/80 transition-colors"
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

            {/* Center - Title */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-lg font-semibold text-[#283C50]">
                Leave Balance Summary
              </h1>
            </div>

            {/* Right - Close Button */}
            <button
              onClick={() => setIsLeaveBalanceInfoOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 overflow-y-auto bg-gray-50">
            {/* Date Header */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#283C50] mb-4">
                As on 18 Jun 2025
              </h2>

              {/* Policy Information */}
              <div className="space-y-3 text-sm text-gray-700 mb-6">
                <p>
                  <strong>1.</strong> For 12 months of the current calendar year
                  2025.
                </p>
                <p>
                  <strong>2.</strong> For continuous months in service, since
                  DOJ (Date of joining) - 30 May 2025.
                </p>
                <p>
                  <strong>3.</strong> Earned leave Carried Forward from last
                  year 2024 - 5.83 Days.
                </p>
                <p>
                  <strong>4.</strong> Earned leave Opening Balance (added
                  manually, if Any) - 0 Days.
                </p>
                <p>
                  <strong>5.</strong> Figures below, are inclusive of carried
                  forward & opening balance Earned leaves (SI no 3 & 4)
                </p>
              </div>
            </div>

            {/* Leave Balance Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {/* Table Header */}
              <div className="bg-[#4766E5] text-white">
                <div className="grid grid-cols-4 gap-4 p-4 font-semibold">
                  <div>TYPE</div>
                  <div className="text-center">ACCUMULATED</div>
                  <div className="text-center">USED</div>
                  <div className="text-center">AVAILABLE</div>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y">
                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50">
                  <div className="font-medium text-[#283C50]">Earned</div>
                  <div className="text-center">0</div>
                  <div className="text-center">0</div>
                  <div className="text-center font-semibold">9.99</div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4">
                  <div className="font-medium text-[#283C50]">Sick</div>
                  <div className="text-center">5</div>
                  <div className="text-center">1</div>
                  <div className="text-center font-semibold">4</div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50">
                  <div className="font-medium text-[#283C50]">Casual</div>
                  <div className="text-center">0</div>
                  <div className="text-center">2</div>
                  <div className="text-center font-semibold">2.16</div>
                </div>

                <div className="grid grid-cols-4 gap-4 p-4">
                  <div className="font-medium text-[#283C50]">Other</div>
                  <div className="text-center">6</div>
                  <div className="text-center">0</div>
                  <div className="text-center font-semibold">6</div>
                </div>
              </div>

              {/* Total Bar */}
              <div className="bg-[#4766E5] text-white p-4">
                <div className="text-right">
                  <span className="text-xl font-bold">22.15 Days</span>
                </div>
              </div>
            </div>

            {/* Employee Leave Rules */}
            <div className="mb-6">
              <button
                onClick={() => setIsLeaveRulesOpen(true)}
                className="flex items-center justify-between w-full text-left text-[#4766E5] font-medium hover:text-[#4766E5]/80 transition-colors"
              >
                <span>Employee Leave Rules</span>
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

            {/* List of Upcoming Leaves */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-bold text-[#283C50] mb-4">
                  List of Upcoming leaves:
                </h3>

                {/* Tabs */}
                <div className="flex border-b">
                  <button
                    onClick={() => setSelectedLeaveTab("approved")}
                    className={`px-4 py-2 border-b-2 font-medium rounded-t transition-colors ${
                      selectedLeaveTab === "approved"
                        ? "border-gray-300 bg-gray-100 text-gray-700"
                        : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Approved
                  </button>
                  <button
                    onClick={() => setSelectedLeaveTab("pending")}
                    className={`px-4 py-2 border-b-2 font-medium rounded-t transition-colors ${
                      selectedLeaveTab === "pending"
                        ? "border-gray-300 bg-gray-100 text-gray-700"
                        : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => setSelectedLeaveTab("availed")}
                    className={`px-4 py-2 border-b-2 font-medium rounded-t transition-colors ${
                      selectedLeaveTab === "availed"
                        ? "border-gray-300 bg-gray-100 text-gray-700"
                        : "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    }`}
                  >
                    Availed/Taken
                  </button>
                </div>
              </div>

              {/* Table Header */}
              <div className="bg-[#4766E5] text-white">
                <div className="grid grid-cols-5 gap-4 p-3 text-sm font-semibold">
                  <div>Start Date</div>
                  <div>End Date</div>
                  <div>Status</div>
                  <div>approved by</div>
                  <div>Days</div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-32 h-32 mx-auto mb-4 relative">
                    {/* Illustration placeholder */}
                    <div className="w-full h-full bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full flex items-center justify-center">
                      <div className="w-20 h-20 bg-blue-400 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
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
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#283C50] mb-2">
                  No Data Found
                </h3>
                {selectedLeaveTab === "approved" && (
                  <p className="text-gray-600">
                    No approved leave requests found
                  </p>
                )}
                {selectedLeaveTab === "pending" && (
                  <p className="text-gray-600">
                    No pending leave requests found
                  </p>
                )}
                {selectedLeaveTab === "availed" && (
                  <p className="text-gray-600">
                    No availed/taken leave requests found
                  </p>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Leave Rules Modal */}
      <Dialog open={isLeaveRulesOpen} onOpenChange={setIsLeaveRulesOpen}>
        <DialogContent className="max-w-4xl h-[85vh] max-h-[85vh] overflow-hidden p-0 flex flex-col [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Leave Rules</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center px-4 py-3 bg-[#F8F9FA] border-b">
            <button
              onClick={() => setIsLeaveRulesOpen(false)}
              className="flex items-center text-[#4766E5] text-sm font-medium hover:text-[#4766E5]/80 transition-colors mr-4"
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
            <h1 className="text-lg font-semibold text-[#283C50] flex-1 text-center">
              Leave Rules
            </h1>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 overflow-y-auto bg-white">
            {/* Leave Management Rules */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#283C50] mb-6">
                Leave Management Rules
              </h2>

              {/* Leave Types */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-4">
                  Leave Types
                </h3>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Earn Leave
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Casual Leave
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Sick Leave
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Other Leave
                  </li>
                </ul>
              </div>

              {/* Leave Assignment */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-6">
                  Leave Assignment
                </h3>

                {/* On Employee Creation */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-3">
                    On Employee Creation
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    When a new employee is created in the application, we assign
                    leaves based on the employee's branch leave rules.
                  </p>
                </div>

                {/* On Employee Update */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-3">
                    On Employee Update
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed mb-3">
                    When an employee is updated, we check if the employee has
                    added an application join date.
                  </p>
                  <ul className="space-y-2 text-lg ml-4">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      If yes, set leave balance based on it.
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      If no, leave balance remains unchanged.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Leave Balance Rules for Joined Employees */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-6">
                  Leave Balance Rules for Joined Employees
                </h3>

                {/* Probation Period Status */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-4">
                    Probation Period Status
                  </h4>

                  {/* If probation period is ON */}
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      <span className="text-lg">
                        If the probation period is <strong>ON</strong>:
                      </span>
                    </div>
                    <div className="ml-6 space-y-3">
                      <div className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
                        <p className="text-lg text-gray-700">
                          Check if the employee's join date is before or after
                          the current date.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
                        <div>
                          <p className="text-lg text-gray-700 mb-2">
                            If before:
                          </p>
                          <div className="ml-4 space-y-3">
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                Check if the probation period is completed:
                              </p>
                            </div>
                            <div className="ml-8 space-y-2">
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  If completed, count the months after
                                  completion and add to earn and casual leave
                                  balance.
                                </p>
                              </div>
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  Sick and other leave will follow branch rules.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                If not completed:
                              </p>
                            </div>
                            <div className="ml-8 space-y-2">
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  Earn and casual leave balance is{" "}
                                  <strong>0</strong>.
                                </p>
                              </div>
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  Transfer opening balance to earn leave, sick
                                  and other leave balance is <strong>0</strong>.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                        <div>
                          <p className="text-lg text-gray-700 mb-2">
                            If the probation period is <strong>OFF</strong>:
                          </p>
                          <div className="ml-4 space-y-2">
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                Check the current month to the date of joining
                                and add the earn and casual leave balance.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                Sick and other leave are added based on branch
                                rules.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <p className="text-lg text-blue-800">
                      <strong>NOTE:</strong> Sick and other leave follow branch
                      rules.
                    </p>
                  </div>
                </div>
              </div>

              {/* Leave Approval Process */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-6">
                  Leave Approval Process
                </h3>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When an employee requests leave for 3 days and it is approved,
                  the following rules apply:
                </p>

                <ul className="space-y-3 text-lg mb-6">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                    Count week offs and holidays.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                    If the employee is present on leave dates, they will be
                    counted as a present for those dates.
                  </li>
                </ul>

                {/* Example */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-4">
                    Example:
                  </h4>

                  <p className="text-lg text-gray-700 mb-4">
                    If an employee adds leave for:
                  </p>

                  <ul className="space-y-2 text-lg mb-6 ml-4">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      10-02-2024 [SATURDAY]
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      11-02-2024 [SUNDAY]
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      12-02-2024 [MONDAY]
                    </li>
                  </ul>

                  <p className="text-lg text-gray-700 mb-4">
                    In this case, we count only <strong>2 days of leave</strong>{" "}
                    because 11-02-2024 is a holiday (Sunday).
                  </p>

                  <p className="text-lg text-gray-700 mb-6">
                    If the employee is present on 12-02-2024 (Monday), then only{" "}
                    <strong>1 day of leave</strong> will be counted.
                  </p>

                  {/* Leave calculation rules */}
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Earned Leave (EL/PL)</strong>: 0.83 days per
                        continuous month worked, Added on last day of every
                        Month.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Casual Leave (CL)</strong>: 0.83 days per
                        continuous month worked, Added on last day of every
                        Month.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Sick Leaves (SL)</strong>: for 0.42 month of
                        continuous service, Added on 1st day of the current
                        financial year.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Other Leaves (OL)</strong>: for 0.5 month of
                        continuous service, Added on 1st day of the current
                        financial year.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>
                          Earned and Casual leaves are added on last day of the
                          month. Click here to check all leave rules.
                        </strong>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* OT Request Modal */}
      <Dialog
        open={isOTRequestModalOpen}
        onOpenChange={setIsOTRequestModalOpen}
      >
        <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto [&>button]:hidden">
          <DialogHeader className="flex-shrink-0 sticky top-0 bg-white z-10 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#283C50]">
                OT Request
              </DialogTitle>
              <button
                onClick={() => setIsOTRequestModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </DialogHeader>

          {/* Company Name Display */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-[#4766E5] text-lg font-medium">
              Liberty Righrise Pvt Ltd
            </p>
          </div>

          <div className="space-y-6 pb-8 max-w-2xl">
            {/* Title Field */}
            <div className="space-y-2">
              <Input
                placeholder="Title"
                className="w-full h-12 input-focus-safe focus:ring-2 focus:ring-[#4766E5] focus:border-[#4766E5]"
              />
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                <span className="text-base text-[#283C50] font-medium">
                  Start date
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-[#4766E5] text-base font-medium">
                    18 Jun 2025
                  </span>
                  <svg
                    className="w-5 h-5 text-[#4766E5]"
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

            {/* Notes (Optional) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-5 h-5 text-[#283C50]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-base text-[#283C50] font-medium">
                    Notes (Optional)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#4766E5] text-base font-medium">
                    None
                  </span>
                  <svg
                    className="w-5 h-5 text-[#4766E5]"
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

            {/* Add Attachment */}
            <div className="space-y-2">
              <button
                onClick={() => setIsAttachmentModalOpen(true)}
                className="flex items-center space-x-3 text-[#4766E5] text-base w-full text-left font-medium"
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
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <span>Add attachment</span>
              </button>
            </div>

            {/* Camera Icon - Attachment Preview Area */}
            <div className="flex justify-center py-8">
              <div className="w-20 h-20 bg-black rounded-lg flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white"
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
            </div>
          </div>

          <div className="mt-6 pt-4 flex flex-row justify-start space-x-2 border-t">
            <Button className="bg-[#4766E5] hover:bg-[#4766E5]/90 h-12 px-8">
              Submit OT Request
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsOTRequestModalOpen(false)}
              className="h-12 px-8"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Salary Advance Request Modal */}
      <Dialog
        open={isSalaryAdvanceModalOpen}
        onOpenChange={setIsSalaryAdvanceModalOpen}
      >
        <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto [&>button]:hidden">
          <DialogHeader className="flex-shrink-0 sticky top-0 bg-white z-10 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#283C50]">
                Salary Advance Request
              </DialogTitle>
              <button
                onClick={() => setIsSalaryAdvanceModalOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </DialogHeader>

          {/* Company Name Display */}
          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-[#4766E5] text-lg font-medium">
              Liberty Highrise Pvt Ltd
            </p>
          </div>

          <div className="space-y-4 pb-8 max-w-2xl">
            {/* Title Field */}
            <div className="space-y-2">
              <Input
                placeholder="Title"
                value={salaryAdvanceFormData.title || ""}
                onChange={(e) =>
                  setSalaryAdvanceFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full h-12 bg-gray-100 border-0 text-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-[#4766E5] focus:bg-white"
              />
            </div>

            {/* Amount/Total Field */}
            <div className="space-y-2">
              <Input
                placeholder="Amount/Total"
                type="number"
                value={salaryAdvanceFormData.amount}
                onChange={(e) =>
                  setSalaryAdvanceFormData((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                className="w-full h-12 bg-gray-100 border-0 text-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-[#4766E5] focus:bg-white"
              />
            </div>

            {/* Start Date Field */}
            <div className="space-y-2">
              <Input
                type="date"
                value={salaryAdvanceFormData.startDate}
                onChange={(e) =>
                  setSalaryAdvanceFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                className="w-full h-12 bg-gray-100 border-0 text-gray-900 focus:ring-2 focus:ring-[#4766E5] focus:bg-white [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
            </div>

            {/* Duration Field */}
            <div className="space-y-2">
              <Select
                value={salaryAdvanceFormData.duration || "1-month"}
                onValueChange={(value) =>
                  setSalaryAdvanceFormData((prev) => ({
                    ...prev,
                    duration: value,
                  }))
                }
              >
                <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-[#4766E5] focus:ring-2 focus:ring-[#4766E5] focus:bg-white">
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="12-months">12 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes Section - Collapsible */}
            <div className="space-y-2">
              <button
                onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                className="w-full flex items-center justify-between p-3 bg-gray-100 rounded-lg text-left"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-gray-900 font-medium">Notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#4766E5]">
                    {salaryAdvanceFormData.notes ? "Added" : "None"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-[#4766E5] transition-transform ${
                      isNotesExpanded ? "rotate-180" : ""
                    }`}
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
                <div className="mt-2">
                  <Textarea
                    placeholder="Add any additional information or justification for your salary advance request..."
                    value={salaryAdvanceFormData.notes}
                    onChange={(e) =>
                      setSalaryAdvanceFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className="w-full min-h-[100px] resize-none focus:ring-2 focus:ring-[#4766E5] focus:border-[#4766E5]"
                  />
                </div>
              )}
            </div>

            {/* Add Attachment Button */}
            <div className="space-y-3">
              <button
                onClick={() => setIsAttachmentModalOpen(true)}
                className="flex items-center gap-3 text-[#4766E5] hover:bg-blue-50 p-2 rounded-lg transition-colors"
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
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <span className="font-medium">Add attachment</span>
              </button>

              {/* Attachment List */}
              {salaryAdvanceFormData.attachments.length > 0 && (
                <div className="space-y-2 mt-3">
                  {salaryAdvanceFormData.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded">
                          <svg
                            className="w-4 h-4 text-blue-600"
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
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(attachment.size / 1024 / 1024).toFixed(2)} MB •{" "}
                            {attachment.source}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSalaryAdvanceFormData((prev) => ({
                            ...prev,
                            attachments: prev.attachments.filter(
                              (a) => a.id !== attachment.id,
                            ),
                          }));
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Attachment List */}
              {salaryAdvanceFormData.attachments.length > 0 && (
                <div className="space-y-2">
                  {salaryAdvanceFormData.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded">
                          <svg
                            className="w-4 h-4 text-blue-600"
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
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(attachment.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setSalaryAdvanceFormData((prev) => ({
                            ...prev,
                            attachments: prev.attachments.filter(
                              (a) => a.id !== attachment.id,
                            ),
                          }));
                        }}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 flex flex-row justify-start space-x-2 border-t">
            <Button
              onClick={handleSalaryAdvanceSubmit}
              className="bg-[#4766E5] hover:bg-[#4766E5]/90 h-12 px-8"
            >
              Submit Advance Request
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsSalaryAdvanceModalOpen(false)}
              className="h-12 px-8"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attachment Options Modal */}
      <Dialog
        open={isAttachmentModalOpen}
        onOpenChange={setIsAttachmentModalOpen}
      >
        <DialogContent className="max-w-md [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="sr-only">
              Select Attachment Source
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-0">
            {/* Scan Option */}
            <button
              onClick={() => handleSalaryAdvanceAttachment("scan")}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#4766E5]"
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
              <span className="text-lg text-[#4766E5] font-medium">Scan</span>
            </button>

            {/* Documents Option */}
            <button
              onClick={() => handleSalaryAdvanceAttachment("documents")}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#4766E5]"
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
              <span className="text-lg text-[#4766E5] font-medium">
                Documents
              </span>
            </button>

            {/* Camera Option */}
            <button
              onClick={() => handleSalaryAdvanceAttachment("camera")}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#4766E5]"
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
              <span className="text-lg text-[#4766E5] font-medium">Camera</span>
            </button>

            {/* Photos Option */}
            <button
              onClick={() => handleSalaryAdvanceAttachment("photos")}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-[#4766E5]"
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
              <span className="text-lg text-[#4766E5] font-medium">Photos</span>
            </button>
          </div>

          {/* Cancel Button */}
          <div className="mt-4 pt-4">
            <button
              onClick={() => setIsAttachmentModalOpen(false)}
              className="w-full p-4 text-[#4766E5] text-lg font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
