import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";

interface SalaryStatementModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

// Sample salary slip data
const salarySlipData = [
  {
    month: "2025-05",
    status: "Salary slip saved in your drive.",
  },
  {
    month: "2025-02",
    status: "Salary slip saved in your drive.",
  },
  {
    month: "2025-03",
    status: "Salary slip saved in your drive.",
  },
  {
    month: "2025-04",
    status: "Salary slip saved in your drive.",
  },
];

export const SalaryStatementModal: React.FC<SalaryStatementModalProps> = ({
  open,
  onClose,
  onBackToReports,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const handleSearch = () => {
    // Search functionality
  };

  const handleClear = () => {
    setSelectedEmployee("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 [&>button]:hidden">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Salary Statement</DialogTitle>
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
          <h1 className="text-lg font-semibold text-gray-900">
            Salary Statement
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Title */}
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-gray-700">
              Salary Slip
            </h2>
          </div>

          {/* Employee Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">
              Employee
            </label>
            <Select
              value={selectedEmployee}
              onValueChange={setSelectedEmployee}
            >
              <SelectTrigger className="w-full h-12 border border-gray-300">
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soumyadeep-goswami">
                  Soumyadeep Goswami
                </SelectItem>
                <SelectItem value="bhaskar-ghosh">Bhaskar Ghosh</SelectItem>
                <SelectItem value="amulya-kumar-kar">
                  Amulya Kumar Kar
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search and Clear Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleSearch}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white h-12 rounded-full"
            >
              Search
            </Button>
            <Button
              onClick={handleClear}
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white h-12 rounded-full"
            >
              Clear
            </Button>
          </div>

          {/* Salary Slip Table - Only show when employee is selected */}
          {selectedEmployee && (
            <div className="space-y-4">
              {/* Table Header */}
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-lg font-semibold text-gray-900">
                    Month
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Status
                  </div>
                </div>
              </div>

              {/* Table Content */}
              <div className="space-y-0">
                {salarySlipData.map((slip, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50"
                  >
                    <div className="text-gray-700 font-medium">
                      {slip.month}
                    </div>
                    <div className="text-gray-600">{slip.status}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty state when no employee selected */}
          {!selectedEmployee && (
            <div className="min-h-[200px] flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-lg">
                  Please select an employee to view salary slips
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
