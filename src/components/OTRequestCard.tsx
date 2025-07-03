import { cn } from "@/lib/utils";
import { useState } from "react";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface OTRequestCardProps {
  onClick?: () => void;
  className?: string;
}

interface OTRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: any) => void;
}

export const OTRequestCard = ({ onClick, className }: OTRequestCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex w-full h-[90px] sm:h-[95px] lg:h-[100px]",
        "px-1 sm:px-2 lg:px-3 py-3 sm:py-4 lg:py-5 justify-center items-center flex-shrink-0",
        "rounded-[8px] sm:rounded-[10px] border-b-[4px] sm:border-b-[6px] border-[#4766E5] bg-white",
        "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
        "cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-md",
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
        <div className="flex w-[20px] sm:w-[24px] lg:w-[28px] flex-col items-center justify-center flex-shrink-0">
          <img src="/OT_request-icon.png" alt="OT Request" />
        </div>
        <h3 className="text-[#283C50] font-inter font-bold text-xs lg:text-sm leading-[12px] sm:leading-[14px] lg:leading-[16px] text-center">
          OT Request
        </h3>
      </div>
    </div>
  );
};

interface AttachmentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  source: "scan" | "documents" | "camera" | "photos";
}

export const OTRequestModal = ({
  open,
  onOpenChange,
  onSubmit,
}: OTRequestModalProps) => {
  const [otRequestDate, setOtRequestDate] = useState<Date | undefined>();
  const [otDatePickerOpen, setOtDatePickerOpen] = useState(false);
  const [isNotesExpanded, setIsNotesExpanded] = useState(false);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const formData = {
      date: otRequestDate,
      notes: notes,
      attachments: attachments,
      title: "", // You can add title state if needed
    };

    onSubmit?.(formData);
    onOpenChange(false);

    // Reset form
    setOtRequestDate(undefined);
    setNotes("");
    setAttachments([]);
    setIsNotesExpanded(false);

    // Show success message
    alert("OT request submitted successfully!");
  };

  const handleAttachment = (
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
    if (attachments.length + files.length > maxFiles) {
      alert(
        `Maximum ${maxFiles} files allowed. You currently have ${attachments.length} files.`,
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
    const newAttachments: AttachmentFile[] = validFiles.map((file) => ({
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      url: URL.createObjectURL(file),
      source: source,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);

    // Success feedback
    const successMessage =
      validFiles.length === 1
        ? `"${validFiles[0].name}" uploaded successfully`
        : `${validFiles.length} files uploaded successfully`;

    console.log(successMessage);
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => {
      const attachment = prev.find((att) => att.id === id);
      if (attachment) {
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter((att) => att.id !== id);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto [&>button]:hidden">
          <DialogHeader className="flex-shrink-0 sticky top-0 bg-white z-10 pb-2">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-bold text-[#283C50]">
                OT Request
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
              <Popover
                open={otDatePickerOpen}
                onOpenChange={setOtDatePickerOpen}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-lg border hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-base text-[#283C50] font-medium">
                      Start date
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-[#4766E5] text-base font-medium">
                        {otRequestDate
                          ? format(otRequestDate, "dd MMM yyyy")
                          : "Select date"}
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
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 z-[9999] pointer-events-auto"
                  align="start"
                  side="bottom"
                  sideOffset={8}
                  avoidCollisions={true}
                  collisionPadding={20}
                  style={{
                    position: "fixed",
                    zIndex: 9999,
                    pointerEvents: "auto",
                  }}
                >
                  <div className="pointer-events-auto relative z-[9999]">
                    <Calendar
                      mode="single"
                      selected={otRequestDate}
                      onSelect={(date) => {
                        setOtRequestDate(date);
                        setOtDatePickerOpen(false);
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Notes (Optional) */}
            <div className="space-y-2">
              <button
                onClick={() => setIsNotesExpanded(!isNotesExpanded)}
                className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-lg border hover:bg-gray-100 transition-colors"
              >
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
                    {notes ? "Added" : "None"}
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
                    placeholder="Notes (Optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full min-h-[100px] input-focus-safe focus:ring-2 focus:ring-[#4766E5] focus:border-[#4766E5] resize-none"
                  />
                </div>
              )}
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
            <Button
              onClick={handleSubmit}
              className="bg-[#4766E5] hover:bg-[#4766E5]/90 text-white h-12 px-8"
            >
              <ReactiveMultilingualText translationKey="submitOTRequest" />
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Attachment</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              onClick={() => handleAttachment("camera")}
              className="h-20 flex flex-col gap-2"
            >
              <svg
                className="w-6 h-6"
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
              Camera
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAttachment("photos")}
              className="h-20 flex flex-col gap-2"
            >
              <svg
                className="w-6 h-6"
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
              Photos
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAttachment("scan")}
              className="h-20 flex flex-col gap-2"
            >
              <svg
                className="w-6 h-6"
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
              Scan
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAttachment("documents")}
              className="h-20 flex flex-col gap-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Documents
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Combined component for easy usage
interface OTRequestSystemProps {
  onSubmit?: (data: any) => void;
  className?: string;
}

export const OTRequestSystem = ({
  onSubmit,
  className,
}: OTRequestSystemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <OTRequestCard
        onClick={() => setIsModalOpen(true)}
        className={className}
      />
      <OTRequestModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={onSubmit}
      />
    </>
  );
};
