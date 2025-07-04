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
      <DialogContent className="max-w-lg max-h-[95vh] sm:max-h-[90vh] overflow-y-auto [&>button]:hidden p-6">
        <DialogHeader className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Salary Advance Request
            </DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg
                className="w-5 h-5 text-gray-400"
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
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-[#4766E5] font-medium">{companyName}</p>
        </div>

        <div className="space-y-4">
          {/* Title Field */}
          <Input
            placeholder="Title"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="w-full h-12 bg-gray-50 border-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:bg-white focus:border focus:border-gray-300"
          />

          {/* Amount/Total Field */}
          <Input
            placeholder="Amount/Total"
            type="text"
            value={formData.amount}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                amount: e.target.value,
              }))
            }
            className="w-full h-12 bg-gray-50 border-0 text-gray-900 placeholder-gray-400 focus:ring-0 focus:bg-white focus:border focus:border-gray-300"
          />

          {/* Start Date Field */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 min-w-[80px]">
              Start Date
            </label>
            <div className="relative flex-1">
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value,
                  }))
                }
                placeholder="dd-mm-yyyy"
                className="w-full h-12 bg-gray-50 border-0 text-gray-900 focus:ring-0 focus:bg-white focus:border focus:border-gray-300 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              />
              <svg
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
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
            </div>
          </div>

          {/* Duration Field */}
          <Select
            value={formData.duration || "1-month"}
            onValueChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                duration: value,
              }))
            }
          >
            <SelectTrigger className="w-full h-12 bg-gray-50 border-0 text-gray-900 focus:ring-0 focus:bg-white focus:border focus:border-gray-300">
              <SelectValue placeholder="1 Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-month">1 Month</SelectItem>
              <SelectItem value="2-months">2 Months</SelectItem>
              <SelectItem value="3-months">3 Months</SelectItem>
              <SelectItem value="6-months">6 Months</SelectItem>
              <SelectItem value="12-months">12 Months</SelectItem>
            </SelectContent>
          </Select>

          {/* Notes Section */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => {
                const notesSection = document.getElementById("notes-section");
                if (notesSection) {
                  notesSection.style.display =
                    notesSection.style.display === "none" ? "block" : "none";
                }
              }}
              className="flex items-center gap-2 text-gray-700 hover:text-[#4766E5] transition-colors"
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span className="font-medium">Notes</span>
            </button>
            <span className="text-sm text-[#4766E5] font-medium">
              {formData.notes ? "Added" : "None"}
            </span>
          </div>
          <div
            id="notes-section"
            style={{ display: "none" }}
            className="space-y-2"
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
              className="w-full bg-gray-50 border-0 text-gray-900 focus:ring-0 focus:bg-white focus:border focus:border-gray-300 resize-none"
              rows={4}
            />
          </div>

          {/* Attachments Section */}
          <div className="flex items-center justify-between py-2">
            <button
              onClick={() => handleAttachment("documents")}
              className="flex items-center gap-2 text-[#4766E5] hover:text-[#4766E5]/80 transition-colors"
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
          </div>

          {/* Attachment List */}
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              {formData.attachments.map((attachment) => (
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
                        {formatFileSize(attachment.size)} • {attachment.source}
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

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4">
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-[#4766E5] hover:bg-[#4766E5]/90 text-white h-12 font-medium"
          >
            Submit Advance Request
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-12 px-6 border-gray-300 text-gray-600 hover:bg-gray-50 font-medium"
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
