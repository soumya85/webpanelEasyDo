import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";

interface SalaryAdvanceFormData {
  title: string;
  amount: string;
  startDate: string;
  duration: string;
  notes: string;
  attachments: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    source: "scan" | "documents" | "camera" | "photos";
  }>;
}

interface SalaryAdvanceRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: SalaryAdvanceFormData) => void;
  companyName?: string;
}

export function SalaryAdvanceRequestModal({
  open,
  onOpenChange,
  onSubmit,
  companyName = "Liberty Righrise Pvt Ltd",
}: SalaryAdvanceRequestModalProps) {
  const { t } = useGlobalTranslation();

  const [formData, setFormData] = useState<SalaryAdvanceFormData>({
    title: "",
    amount: "",
    startDate: "",
    duration: "1-month",
    notes: "",
    attachments: [],
  });

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.title.trim()) {
      alert("Please enter a title for your salary advance request.");
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert("Please enter a valid amount for your salary advance.");
      return;
    }

    if (!formData.startDate) {
      alert("Please select a start date.");
      return;
    }

    // Create submission data
    const submissionData = {
      id: Date.now().toString(),
      title: formData.title,
      amount: parseFloat(formData.amount),
      startDate: formData.startDate,
      duration: formData.duration,
      notes: formData.notes,
      attachmentCount: formData.attachments.length,
      attachments: formData.attachments.map((att) => ({
        name: att.name,
        size: att.size,
        type: att.type,
        source: att.source,
      })),
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    // Call the onSubmit callback if provided
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Default behavior
      console.log("Salary Advance Request Submitted:", submissionData);
      alert(
        `Salary advance request for $${submissionData.amount} submitted successfully! Reference ID: ${submissionData.id}`,
      );
    }

    // Reset form
    setFormData({
      title: "",
      amount: "",
      startDate: "",
      duration: "1-month",
      notes: "",
      attachments: [],
    });

    // Close modal
    onOpenChange(false);
  };

  const handleAttachment = (
    type: "scan" | "documents" | "camera" | "photos",
  ) => {
    // Create file input element
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;

    // Set accepted file types based on attachment type
    switch (type) {
      case "scan":
        input.accept = ".pdf,.jpg,.jpeg,.png";
        break;
      case "documents":
        input.accept = ".pdf,.doc,.docx,.txt";
        break;
      case "camera":
      case "photos":
        input.accept = "image/*";
        break;
    }

    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        handleFileUpload(Array.from(files), type);
      }
    };

    input.click();
  };

  const handleFileUpload = (
    files: File[],
    source: "scan" | "documents" | "camera" | "photos",
  ) => {
    const maxFiles = 10;
    const maxSizePerFile = 10 * 1024 * 1024; // 10MB

    // Validate file count
    if (formData.attachments.length + files.length > maxFiles) {
      alert(
        `Maximum ${maxFiles} files allowed. You currently have ${formData.attachments.length} files.`,
      );
      return;
    }

    // Validate file sizes and create attachment objects
    const newAttachments = files
      .filter((file) => {
        if (file.size > maxSizePerFile) {
          alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
          return false;
        }
        return true;
      })
      .map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        name: file.name,
        size: file.size,
        type: file.type,
        source,
      }));

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  const removeAttachment = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((att) => att.id !== id),
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto [&>button]:hidden">
        <DialogHeader className="flex-shrink-0 sticky top-0 bg-white z-10 pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-[#283C50]">
              Salary Advance Request
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

        {/* Company Name Display */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-[#4766E5] text-lg font-medium">{companyName}</p>
        </div>

        <div className="space-y-4 pb-2 max-w-2xl">
          {/* Title Field */}
          <div className="space-y-2">
            <Input
              placeholder="Title"
              value={formData.title || ""}
              onChange={(e) =>
                setFormData((prev) => ({
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
              placeholder={t("amountTotal")}
              type="text"
              value={formData.amount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
              className="w-full h-12 bg-gray-100 border-0 text-gray-500 placeholder-gray-400 focus:ring-2 focus:ring-[#4766E5] focus:bg-white"
            />
          </div>

          {/* Start Date Field */}
          <div className="flex items-center gap-4">
            <label className="text-base font-medium text-[#283C50] min-w-[100px]">
              Start Date
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
              className="flex-1 h-12 bg-gray-100 border-0 text-gray-900 focus:ring-2 focus:ring-[#4766E5] focus:bg-white [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
          </div>

          {/* Duration Field */}
          <div className="space-y-2">
            <Select
              value={formData.duration || "1-month"}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  duration: value,
                }))
              }
            >
              <SelectTrigger className="w-full h-12 bg-gray-100 border-0 text-gray-500 focus:ring-2 focus:ring-[#4766E5] focus:bg-white">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-month">1 Month</SelectItem>
                <SelectItem value="2-months">2 Months</SelectItem>
                <SelectItem value="3-months">3 Months</SelectItem>
                <SelectItem value="6-months">6 Months</SelectItem>
                <SelectItem value="12-months">12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-[#283C50]">
                Notes
              </label>
              <span className="text-[#4766E5]">
                {formData.notes ? "Added" : "None"}
              </span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <button
                onClick={() => {
                  const notesSection = document.getElementById("notes-section");
                  if (notesSection) {
                    notesSection.style.display =
                      notesSection.style.display === "none" ? "block" : "none";
                  }
                }}
                className="text-gray-500 text-sm hover:text-[#4766E5] transition-colors"
              >
                {formData.notes ? "Edit notes" : "Add notes"}
              </button>
              <div
                id="notes-section"
                style={{ display: "none" }}
                className="mt-3"
              >
                <Textarea
                  placeholder="Add any additional information or justification for your salary advance request..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  className="w-full bg-white border-gray-300 focus:border-[#4766E5] focus:ring-2 focus:ring-[#4766E5] resize-none"
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-base font-medium text-[#283C50]">
                Attachments
              </label>
              <span className="text-[#4766E5]">
                {formData.attachments.length}/10
              </span>
            </div>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleAttachment("scan")}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#4766E5] hover:bg-[#4766E5]/5 transition-all"
                >
                  <div className="w-6 h-6 bg-[#4766E5]/10 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#4766E5]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Scan</span>
                </button>
                <button
                  onClick={() => handleAttachment("documents")}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#4766E5] hover:bg-[#4766E5]/5 transition-all"
                >
                  <div className="w-6 h-6 bg-[#4766E5]/10 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#4766E5]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Documents</span>
                </button>
                <button
                  onClick={() => handleAttachment("camera")}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#4766E5] hover:bg-[#4766E5]/5 transition-all"
                >
                  <div className="w-6 h-6 bg-[#4766E5]/10 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#4766E5]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Camera</span>
                </button>
                <button
                  onClick={() => handleAttachment("photos")}
                  className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#4766E5] hover:bg-[#4766E5]/5 transition-all"
                >
                  <div className="w-6 h-6 bg-[#4766E5]/10 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-[#4766E5]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium">Photos</span>
                </button>
              </div>

              {/* Attachment List */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2 mt-3">
                  {formData.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center justify-between p-2 bg-white rounded border"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#4766E5]/10 rounded flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-[#4766E5]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attachment.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(attachment.size)} •{" "}
                            {attachment.source}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeAttachment(attachment.id)}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button
            onClick={handleSubmit}
            className="bg-[#4766E5] hover:bg-[#4766E5]/90 text-white h-12 px-8"
          >
            Submit Request
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-12 px-8 border-zinc-50/5 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Card component for triggering the modal
interface SalaryAdvanceRequestCardProps {
  onClick?: () => void;
  className?: string;
}

export function SalaryAdvanceRequestCard({
  onClick,
  className = "",
}: SalaryAdvanceRequestCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 h-20 sm:h-24 group cursor-pointer ${className}`}
    >
      <div className="w-6 h-6 sm:w-8 sm:h-8 mb-1 sm:mb-2 flex-shrink-0">
        <img
          src="/Salaryadvance_request-icon.png"
          alt="Salary Adv. Request"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
        />
      </div>
      <span className="text-xs font-medium text-gray-800 text-center leading-tight">
        Salary Adv. Request
      </span>
    </div>
  );
}

// Combined system component
interface SalaryAdvanceRequestSystemProps {
  onSubmit?: (data: SalaryAdvanceFormData) => void;
  companyName?: string;
  className?: string;
}

export function SalaryAdvanceRequestSystem({
  onSubmit,
  companyName,
  className,
}: SalaryAdvanceRequestSystemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SalaryAdvanceRequestCard
        onClick={() => setIsModalOpen(true)}
        className={className}
      />
      <SalaryAdvanceRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={onSubmit}
        companyName={companyName}
      />
    </>
  );
}

export type { SalaryAdvanceFormData };
