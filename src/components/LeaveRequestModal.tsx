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

                {/* Calendar Grid */}
                <div className="bg-white border rounded-lg overflow-hidden">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 bg-gray-50">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="p-3 text-center text-sm font-medium text-gray-600 border-r border-b last:border-r-0"
                        >
                          {day}
                        </div>
                      ),
                    )}
                  </div>

                  {/* Calendar days */}
                  <div className="grid grid-cols-7">
                    {Array.from({ length: 42 }, (_, index) => {
                      const currentDate = new Date(currentMonth);
                      const firstDay = new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        1,
                      );
                      const firstDayWeekday = firstDay.getDay();

                      const dayNumber = index - firstDayWeekday + 1;
                      const isValidDay =
                        dayNumber > 0 &&
                        dayNumber <=
                          new Date(
                            currentMonth.getFullYear(),
                            currentMonth.getMonth() + 1,
                            0,
                          ).getDate();

                      const isCurrentMonth =
                        currentDate.getMonth() === currentMonth.getMonth();
                      const isSelected =
                        isValidDay &&
                        dayNumber === selectedDate.getDate() &&
                        currentMonth.getMonth() === selectedDate.getMonth();

                      currentDate.setDate(isValidDay ? dayNumber : 1);

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            if (isValidDay) {
                              setSelectedDate(
                                new Date(
                                  currentMonth.getFullYear(),
                                  currentMonth.getMonth(),
                                  dayNumber,
                                ),
                              );
                            }
                          }}
                          className={`relative p-3 h-16 border-r border-b last:border-r-0 hover:bg-gray-50 transition-colors ${
                            !isCurrentMonth ? "text-gray-400" : "text-[#283C50]"
                          } ${isValidDay ? "cursor-pointer" : ""} ${
                            isSelected ? "bg-blue-100" : ""
                          }`}
                        >
                          {isValidDay && (
                            <>
                              <div className="text-sm font-medium">
                                {dayNumber}
                              </div>
                              {/* Sample leave indicators */}
                              {dayNumber === 14 && (
                                <div className="absolute bottom-1 left-1 w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                              {dayNumber === 25 && (
                                <div className="absolute bottom-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* List View */
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold text-[#283C50]">
                    Leave History
                  </h3>
                </div>
                <div className="p-8 text-center text-gray-500">
                  <p>No leave records found for the selected period.</p>
                </div>
              </div>
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
    </>
  );
}
