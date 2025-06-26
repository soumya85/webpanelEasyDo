import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { ArrowLeft } from "lucide-react";

interface ApprovalsModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

export const ApprovalsModal: React.FC<ApprovalsModalProps> = ({
  open,
  onClose,
  onBackToReports,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 [&>button]:hidden">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Approvals</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBackToReports} className="p-1">
              <ArrowLeft className="w-5 h-5 text-blue-500" />
            </button>
            <span className="text-blue-500 text-sm font-medium">
              Back To Report
            </span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">Approvals</h1>
          <div className="w-6"></div>
        </div>

        {/* Blank Content Area */}
        <div className="p-4 min-h-[400px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg">Approvals content will be displayed here</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
