import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  source: "scan" | "documents" | "camera" | "photos";
}

interface LeaveFormData {
  leaveType: string;
  startDate: string;
  endDate: string;
  firstHalfDay: boolean;
  secondHalfDay: boolean;
  notes: string;
  attachments: Attachment[];
}

interface LeaveRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: LeaveFormData) => void;
  className?: string;
}

export function LeaveRequestModal({
  open,
  onOpenChange,
  onSubmit,
  className,
}: LeaveRequestModalProps) {
  const { t } = useGlobalTranslation();
  const [isLeaveCalendarOpen, setIsLeaveCalendarOpen] = useState(false);
  const [isLeaveBalanceInfoOpen, setIsLeaveBalanceInfoOpen] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [selectedLeaveTab, setSelectedLeaveTab] = useState<
    "approved" | "pending" | "availed"
  >("approved");
  const [isLeaveRulesOpen, setIsLeaveRulesOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<"day" | "list">("day");
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)); // May 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 14)); // May 14, 2025
  const [leaveSelectedDate, setLeaveSelectedDate] = useState(new Date()); // Current date
  const [viewMode, setViewMode] = useState<"day" | "list">("day");

  const scanFileInputRef = useRef<HTMLInputElement>(null);
  const documentsFileInputRef = useRef<HTMLInputElement>(null);
  const cameraFileInputRef = useRef<HTMLInputElement>(null);
  const photosFileInputRef = useRef<HTMLInputElement>(null);

  const [leaveFormData, setLeaveFormData] = useState<LeaveFormData>({
    leaveType: "",
    startDate: "",
    endDate: "",
    firstHalfDay: false,
    secondHalfDay: false,
    notes: "",
    attachments: [],
  });

  const handleLeaveFormChange = (field: keyof LeaveFormData, value: any) => {
    setLeaveFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    setLeaveFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== attachmentId),
    }));
  };

  const handleFileUpload = (
    files: File[],
    source: "scan" | "documents" | "camera" | "photos",
  ) => {
    // File validation
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const maxFiles = 5 - leaveFormData.attachments.length;

    const validFiles = files.slice(0, maxFiles).filter((file) => {
      if (file.size > maxFileSize) {
        console.log(`File "${file.name}" is too large (max 10MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      console.log("No valid files to upload");
      return;
    }

    // Create attachment objects
    const newAttachments = validFiles.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      url: URL.createObjectURL(file),
      source: source,
    }));

    setLeaveFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));

    setIsAttachmentModalOpen(false);
  };

  const handleLeaveSubmit = () => {
    if (onSubmit) {
      onSubmit(leaveFormData);
    }

    // Reset form
    setLeaveFormData({
      leaveType: "",
      startDate: "",
      endDate: "",
      firstHalfDay: false,
      secondHalfDay: false,
      notes: "",
      attachments: [],
    });

    // Close modals and reset form
    onOpenChange(false);
    setIsNotesExpanded(false);
  };

  return (
    <>
      {/* Leave Request Modal - Web App Style */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={cn(
            "max-w-4xl max-h-[95vh] overflow-y-auto [&>button]:hidden",
            className,
          )}
        >
          <DialogHeader className="flex-shrink-0 pb-4">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#283C50]">
                Leave Request
              </DialogTitle>
              <button
                onClick={() => onOpenChange(false)}
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
                  className="w-full bg-[#4766E5] hover:bg-[#4766E5]/90 text-white h-12"
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
              className="bg-[#4766E5] hover:bg-[#4766E5]/90 text-white h-12 px-8"
            >
              <ReactiveMultilingualText translationKey="submitRequest" />
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-12 px-8"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attachment Modal */}
      <Dialog
        open={isAttachmentModalOpen}
        onOpenChange={setIsAttachmentModalOpen}
      >
        <DialogContent className="max-w-md [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Attachment Options</DialogTitle>
          </VisuallyHidden>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-[#283C50] mb-6 text-center">
              Choose Attachment Source
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Scan */}
              <button
                onClick={() => scanFileInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v1M7 4V3a1 1 0 011-1h8a1 1 0 011 1v1m-9 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Scan</span>
              </button>

              {/* Documents */}
              <button
                onClick={() => documentsFileInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
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
                <span className="text-sm font-medium text-gray-700">
                  Documents
                </span>
              </button>

              {/* Camera */}
              <button
                onClick={() => cameraFileInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-purple-600"
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
                <span className="text-sm font-medium text-gray-700">
                  Camera
                </span>
              </button>

              {/* Photos */}
              <button
                onClick={() => photosFileInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4766E5] hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-600"
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
                <span className="text-sm font-medium text-gray-700">
                  Photos
                </span>
              </button>
            </div>

            {/* Cancel Button */}
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => setIsAttachmentModalOpen(false)}
                className="px-8 py-2 text-blue-500 border-blue-500 hover:bg-blue-50"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden File Input Elements for Attachments */}
      <input
        ref={scanFileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFileUpload(Array.from(files), "scan");
          }
        }}
      />
      <input
        ref={documentsFileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFileUpload(Array.from(files), "documents");
          }
        }}
      />
      <input
        ref={cameraFileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFileUpload(Array.from(files), "camera");
          }
        }}
      />
      <input
        ref={photosFileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            handleFileUpload(Array.from(files), "photos");
          }
        }}
      />

      {/* Leave Calendar Modal - Complete Implementation */}
      <Dialog open={isLeaveCalendarOpen} onOpenChange={setIsLeaveCalendarOpen}>
        <DialogContent className="max-w-4xl h-[85vh] max-h-[85vh] overflow-hidden p-0 flex flex-col [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Leave Calendar</DialogTitle>
          </VisuallyHidden>

          {(() => {
            const monthNames = [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ];
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            const currentMonth = leaveSelectedDate.getMonth();
            const currentYear = leaveSelectedDate.getFullYear();
            const currentDay = leaveSelectedDate.getDate();

            const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
            const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
            const firstDayWeekday = firstDayOfMonth.getDay();
            const daysInMonth = lastDayOfMonth.getDate();

            const prevMonth = new Date(currentYear, currentMonth - 1, 0);
            const daysInPrevMonth = prevMonth.getDate();

            // Generate calendar dates
            const calendarDates = [];

            // Previous month dates
            for (let i = firstDayWeekday - 1; i >= 0; i--) {
              calendarDates.push({
                date: daysInPrevMonth - i,
                isCurrentMonth: false,
                isPrevMonth: true,
                isNextMonth: false,
              });
            }

            // Current month dates
            for (let i = 1; i <= daysInMonth; i++) {
              calendarDates.push({
                date: i,
                isCurrentMonth: true,
                isPrevMonth: false,
                isNextMonth: false,
              });
            }

            // Next month dates to fill the grid
            const remainingCells = 42 - calendarDates.length;
            for (let i = 1; i <= remainingCells; i++) {
              calendarDates.push({
                date: i,
                isCurrentMonth: false,
                isPrevMonth: false,
                isNextMonth: true,
              });
            }

            const navigateMonth = (direction: "prev" | "next") => {
              const newDate = new Date(leaveSelectedDate);
              if (direction === "prev") {
                newDate.setMonth(currentMonth - 1);
              } else {
                newDate.setMonth(currentMonth + 1);
              }
              setLeaveSelectedDate(newDate);
            };

            const selectDate = (date: number, isCurrentMonth: boolean) => {
              if (isCurrentMonth) {
                const newDate = new Date(currentYear, currentMonth, date);
                setLeaveSelectedDate(newDate);
              }
            };

            // Determine current date state
            const getDateState = () => {
              // Create a date string for comparison (YYYY-MM-DD format)
              const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(currentDay).padStart(2, "0")}`;

              // Define specific dates for different states
              const leaveDates = ["2025-05-14"]; // May 14, 2025
              const absentDates = ["2025-06-18"]; // June 18, 2025

              if (leaveDates.includes(dateString)) {
                return "leave";
              } else if (absentDates.includes(dateString)) {
                return "absent";
              } else {
                return "present";
              }
            };

            const dateState = getDateState();
            const isAbsentMonth = currentMonth === 5; // June - red dots

            return (
              <>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b bg-white relative">
                  {/* Left - Back Button */}
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

                  {/* Center - Title */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <h1 className="text-lg font-semibold text-gray-900">
                      Your Leave
                    </h1>
                  </div>

                  {/* Right - Day/List Toggle */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("day")}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        viewMode === "day"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Day
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`px-4 py-2 text-sm font-medium rounded-lg ${
                        viewMode === "list"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>

                {/* Content Section - conditional based on viewMode */}
                <div className="flex-1 overflow-y-auto bg-gray-50">
                  {viewMode === "day" ? (
                    <>
                      {/* Day View - Calendar Section */}
                      {/* Month Navigation */}
                      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
                        <button
                          onClick={() => navigateMonth("prev")}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-5 h-5"
                          >
                            <polyline points="15,18 9,12 15,6" />
                          </svg>
                        </button>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">
                            {monthNames[currentMonth]}
                          </div>
                          <div className="text-red-600 font-semibold">
                            {currentYear}
                          </div>
                        </div>
                        <button
                          onClick={() => navigateMonth("next")}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-5 h-5"
                          >
                            <polyline points="9,18 15,12 9,6" />
                          </svg>
                        </button>
                      </div>

                      {/* Current Date Display */}
                      <div className="text-center py-3 bg-white border-b">
                        <div className="text-blue-600 font-semibold">
                          {currentDay} {monthNames[currentMonth]} {currentYear}
                        </div>
                      </div>

                      {/* Calendar Grid */}
                      <div className="bg-white p-4">
                        {/* Weekday Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {dayNames.map((day) => (
                            <div
                              key={day}
                              className="text-center text-sm font-semibold text-gray-700 py-2"
                            >
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Dates */}
                        <div className="grid grid-cols-7 gap-1">
                          {calendarDates.map((dateObj, index) => {
                            const isSelected =
                              dateObj.isCurrentMonth &&
                              dateObj.date === currentDay;
                            const isSunday =
                              new Date(
                                currentYear,
                                currentMonth,
                                dateObj.date,
                              ).getDay() === 0;

                            // Determine dot color based on specific dates
                            let dotColor = "bg-green-500"; // default present
                            if (
                              currentMonth === 4 &&
                              dateObj.date === 14 &&
                              dateObj.isCurrentMonth
                            ) {
                              // May 14 - leave
                              dotColor = "bg-blue-500";
                            } else if (
                              currentMonth === 5 &&
                              dateObj.date === 18 &&
                              dateObj.isCurrentMonth
                            ) {
                              // June 18 - absent
                              dotColor = "bg-red-500";
                            } else if (
                              currentMonth === 5 &&
                              dateObj.isCurrentMonth
                            ) {
                              // Other June dates
                              dotColor = "bg-green-500";
                            }

                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  selectDate(
                                    dateObj.date,
                                    dateObj.isCurrentMonth,
                                  )
                                }
                                className={`text-center py-3 relative cursor-pointer hover:bg-gray-100 rounded ${
                                  isSelected
                                    ? "bg-blue-600 text-white rounded-lg"
                                    : dateObj.isCurrentMonth
                                      ? isSunday
                                        ? "text-red-600"
                                        : "text-gray-900"
                                      : "text-gray-400"
                                }`}
                              >
                                {dateObj.date}
                                <div
                                  className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${dotColor}`}
                                ></div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dynamic Bottom Content */}
                      <div className="p-4">
                        {dateState === "leave" && (
                          <div className="bg-white rounded-lg border p-4">
                            {/* Employee Info Row */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold text-sm">
                                    SG
                                  </span>
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900 text-base">
                                    Soumyadeep Goswami
                                  </div>
                                  <div className="text-sm text-gray-600">
                                    Liberty Righrise Pvt Ltd
                                  </div>
                                </div>
                              </div>
                              <div className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-md">
                                Approved
                              </div>
                            </div>

                            {/* Leave Type Row */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="text-lg font-bold text-gray-900">
                                Casual Leave
                              </div>
                              <div className="text-red-600 font-bold text-sm">
                                On Leave
                              </div>
                            </div>

                            {/* Leave Duration Row */}
                            <div className="flex items-center gap-2 mb-3">
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="w-4 h-4 text-gray-600"
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
                              <span className="font-bold text-gray-900">
                                1 day May 14
                              </span>
                            </div>

                            {/* Reporting Manager Row */}
                            <div className="text-sm text-gray-600 mb-2">
                              Reporting Manager -{" "}
                              <span className="font-semibold text-gray-900">
                                Amulya Kumar Kar
                              </span>
                            </div>

                            {/* Timestamp Row */}
                            <div className="text-sm text-gray-500">
                              12 May 2025, 08:14 PM
                            </div>
                          </div>
                        )}

                        {dateState === "present" && (
                          <div className="text-center py-8">
                            {/* Happy Illustration */}
                            <div className="mb-6 flex justify-center">
                              <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-r from-blue-100 to-pink-100 rounded-full flex items-center justify-center">
                                  <div className="text-6xl">👩‍💼</div>
                                </div>
                                <div className="absolute -top-2 -right-2 text-2xl">
                                  ✨
                                </div>
                                <div className="absolute -bottom-2 -left-2 text-2xl">
                                  ✨
                                </div>
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">
                              You are{" "}
                              <span className="text-green-600">Present</span> on{" "}
                              {currentDay} {monthNames[currentMonth]}{" "}
                              {currentYear} -{" "}
                              {
                                dayNames[
                                  new Date(
                                    currentYear,
                                    currentMonth,
                                    currentDay,
                                  ).getDay()
                                ]
                              }
                            </div>
                          </div>
                        )}

                        {dateState === "absent" && (
                          <div className="text-center py-8">
                            {/* Absent Illustration */}
                            <div className="mb-6 flex justify-center">
                              <div className="relative">
                                <div className="w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full flex items-center justify-center">
                                  <div className="text-6xl">🤷‍♀️</div>
                                </div>
                              </div>
                            </div>
                            <div className="text-lg font-semibold text-gray-900">
                              You are{" "}
                              <span className="text-red-600">Absent</span> on{" "}
                              {currentDay} {monthNames[currentMonth]}{" "}
                              {currentYear} -{" "}
                              {
                                dayNames[
                                  new Date(
                                    currentYear,
                                    currentMonth,
                                    currentDay,
                                  ).getDay()
                                ]
                              }
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    /* List View */
                    <>
                      {/* Month Navigation */}
                      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
                        <button
                          onClick={() => navigateMonth("prev")}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-5 h-5"
                          >
                            <polyline points="15,18 9,12 15,6" />
                          </svg>
                        </button>
                        <div className="text-center">
                          <div className="text-xl font-bold text-gray-900">
                            {monthNames[currentMonth]}
                          </div>
                          <div className="text-red-600 font-semibold">
                            {currentYear}
                          </div>
                        </div>
                        <button
                          onClick={() => navigateMonth("next")}
                          className="p-2 hover:bg-gray-100 rounded-lg"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="w-5 h-5"
                          >
                            <polyline points="9,18 15,12 9,6" />
                          </svg>
                        </button>
                      </div>

                      {/* Tabs */}
                      <div className="flex bg-gray-100 px-4">
                        <button
                          onClick={() => setSelectedLeaveTab("pending")}
                          className={`flex-1 px-4 py-3 text-sm font-semibold border-b-2 ${
                            selectedLeaveTab === "pending"
                              ? "border-black text-black"
                              : "border-transparent text-gray-600"
                          }`}
                        >
                          PENDING
                        </button>
                        <button
                          onClick={() => setSelectedLeaveTab("approved")}
                          className={`flex-1 px-4 py-3 text-sm font-semibold border-b-2 relative ${
                            selectedLeaveTab === "approved"
                              ? "border-black text-black"
                              : "border-transparent text-gray-600"
                          }`}
                        >
                          APPROVED
                          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            1
                          </span>
                        </button>
                        <button
                          onClick={() => setSelectedLeaveTab("denied")}
                          className={`flex-1 px-4 py-3 text-sm font-semibold border-b-2 ${
                            selectedLeaveTab === "denied"
                              ? "border-black text-black"
                              : "border-transparent text-gray-600"
                          }`}
                        >
                          DENIED
                        </button>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 overflow-y-auto">
                        {selectedLeaveTab === "approved" ? (
                          /* Approved Leave Requests */
                          <div className="p-4">
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-4">
                              {/* Header with employee info and status */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                      BG
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-bold text-gray-900 text-lg">
                                      BASKAR GHOSE
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                      Liberty Highrise Pvt Ltd
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Approved
                                </div>
                              </div>

                              {/* Leave type heading */}
                              <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Sick Leave
                              </h3>

                              {/* Leave duration */}
                              <div className="flex items-center gap-2 mb-3">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="w-4 h-4 text-red-500"
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
                                <span className="font-bold text-gray-900">
                                  2 days from Jun 18 to Jun 19
                                </span>
                              </div>

                              {/* Reporting Manager */}
                              <div className="text-gray-600 text-sm mb-3">
                                Reporting Manager -{" "}
                                <span className="font-semibold text-gray-900">
                                  Bhaskar Sir
                                </span>
                              </div>

                              {/* Timestamp */}
                              <div className="text-gray-500 text-sm">
                                17 Jun 2025, 10:46 PM
                              </div>
                            </div>

                            {/* Second leave request card */}
                            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-4">
                              {/* Header with employee info and status */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold text-sm">
                                      BG
                                    </span>
                                  </div>
                                  <div>
                                    <div className="font-bold text-gray-900 text-lg">
                                      BASKAR GHOSE
                                    </div>
                                    <div className="text-gray-600 text-sm">
                                      Liberty Highrise Pvt Ltd
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                  Rejected
                                </div>
                              </div>

                              {/* Leave type heading */}
                              <h3 className="text-lg font-bold text-gray-900 mb-3">
                                Sick Leave
                              </h3>

                              {/* Leave duration */}
                              <div className="flex items-center gap-2 mb-3">
                                <svg
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  className="w-4 h-4 text-red-500"
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
                                <span className="font-bold text-gray-900">
                                  1 day Jun 28
                                </span>
                              </div>

                              {/* Reporting Manager */}
                              <div className="text-gray-600 text-sm mb-3">
                                Reporting Manager -{" "}
                                <span className="font-semibold text-gray-900">
                                  Bhaskar Sir
                                </span>
                              </div>

                              {/* Timestamp */}
                              <div className="text-gray-500 text-sm">
                                28 Jun 2025, 08:52 AM
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Empty State for Pending/Denied */
                          <div className="flex-1 flex items-center justify-center p-8">
                            <div className="text-center">
                              <div className="text-gray-600">
                                {selectedLeaveTab === "pending" &&
                                  "No PENDING approval available"}
                                {selectedLeaveTab === "denied" &&
                                  "No DENIED approval available"}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </>
            );
          })()}
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
          <div className="flex items-center justify-between px-4 py-3 bg-[#F8F9FA] border-b">
            {/* Left - Title */}
            <h1 className="text-lg font-semibold text-[#283C50]">
              Leave Balance Summary
            </h1>

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
                    className={`px-4 py-2 border-b-2 font-medium rounded-colors ${
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
                  {selectedLeaveTab === "approved" &&
                    "No APPROVED leaves available"}
                  {selectedLeaveTab === "pending" &&
                    "No PENDING leaves available"}
                  {selectedLeaveTab === "availed" &&
                    "No AVAILED leaves available"}
                </h3>
                <p className="text-gray-600">
                  {selectedLeaveTab === "approved" &&
                    "No approved leave requests found"}
                  {selectedLeaveTab === "pending" &&
                    "No pending leave requests found"}
                  {selectedLeaveTab === "availed" &&
                    "No availed leave requests found"}
                </p>
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
    </>
  );
}
