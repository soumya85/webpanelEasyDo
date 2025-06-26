import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { ArrowLeft } from "lucide-react";

interface TaskReportModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

export const TaskReportModal: React.FC<TaskReportModalProps> = ({
  open,
  onClose,
  onBackToReports,
}) => {
  const [period, setPeriod] = useState("");
  const [company, setCompany] = useState("Liberty Righrise Pvt Ltd");
  const [branch, setBranch] = useState("Head office");
  const [employee, setEmployee] = useState("Soumyadeep Goswami");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    setShowResults(true);
  };

  const handleClear = () => {
    setPeriod("");
    setShowResults(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 [&>button]:hidden">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Task Report</DialogTitle>
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
          <h1 className="text-lg font-semibold text-gray-900">Task Report</h1>
          <div className="w-6"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tasks Report Heading */}
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Tasks Report
          </h2>

          {/* Filter Form */}
          <div className="space-y-6 mb-8">
            {/* Period */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-900">
                Period
              </label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-full h-12 border-gray-300">
                  <SelectValue placeholder="Please select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                  <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                  <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-900">
                Company
              </label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger className="w-full h-12 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Liberty Righrise Pvt Ltd">
                    Liberty Righrise Pvt Ltd
                  </SelectItem>
                  <SelectItem value="Other Company">Other Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-900">
                Branch
              </label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="w-full h-12 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Head office">Head office</SelectItem>
                  <SelectItem value="Branch 1">Branch 1</SelectItem>
                  <SelectItem value="Branch 2">Branch 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Employee */}
            <div className="space-y-2">
              <label className="text-lg font-medium text-gray-900">
                Employee
              </label>
              <Select value={employee} onValueChange={setEmployee}>
                <SelectTrigger className="w-full h-12 border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Soumyadeep Goswami">
                    Soumyadeep Goswami
                  </SelectItem>
                  <SelectItem value="John Doe">John Doe</SelectItem>
                  <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                onClick={handleSearch}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-full text-lg"
              >
                Search
              </Button>
              <Button
                onClick={handleClear}
                variant="outline"
                className="bg-pink-500 hover:bg-pink-600 text-white border-pink-500 px-8 py-3 rounded-full text-lg"
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Company Info Card - Always shown */}
          <div className="bg-[#1e3a8a] text-white p-6 rounded-lg mb-6">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded">
                <img
                  src="/company-logo.svg"
                  alt="Liberty Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">
                  Liberty Righrise Pvt Ltd
                </h3>
                <p className="text-sm mb-1">
                  104, 3rd Floor , Shyama Prasad Mukherjee Road, Hazra,
                  Kalighat, Kalighat, Kolkata, West Bengal 700026, India
                </p>
                <p className="text-sm mb-2">
                  Email Id : accounts@libertyhighrise.com
                </p>
                <p className="text-sm">Office Time : 10:15 AM To 07:15 PM</p>
              </div>
            </div>
          </div>

          {/* Report Results */}
          {showResults && (
            <div className="space-y-6">
              {/* Report Header */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900">
                  Delegated Task Detail Report :
                  {period === "last-30-days"
                    ? " 28-May-2025 to 26-Jun-2025"
                    : " 01-Jun-2025 to 26-Jun-2025"}
                </h3>
              </div>

              {/* Employee Details Table */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 bg-white">
                  <div className="p-4 border-r border-gray-300">
                    <div className="font-medium text-gray-900">
                      Employee Name :
                    </div>
                  </div>
                  <div className="p-4 border-r border-gray-300">
                    <div className="text-gray-900">Soumyadeep Goswami</div>
                  </div>
                  <div className="p-4 border-r border-gray-300"></div>
                  <div className="p-4"></div>
                </div>

                <div className="grid grid-cols-4 bg-white border-t border-gray-300">
                  <div className="p-4 border-r border-gray-300">
                    <div className="font-medium text-gray-900">
                      Designation :
                    </div>
                  </div>
                  <div className="p-4 border-r border-gray-300">
                    <div className="text-gray-900">Web Designer</div>
                  </div>
                  <div className="p-4 border-r border-gray-300"></div>
                  <div className="p-4"></div>
                </div>

                <div className="grid grid-cols-4 bg-white border-t border-gray-300">
                  <div className="p-4 border-r border-gray-300">
                    <div className="font-medium text-gray-900">
                      Department :
                    </div>
                  </div>
                  <div className="p-4 border-r border-gray-300">
                    <div className="text-gray-900">
                      Transport, Logistics and Shipping
                    </div>
                  </div>
                  <div className="p-4 border-r border-gray-300"></div>
                  <div className="p-4"></div>
                </div>

                <div className="grid grid-cols-4 bg-white border-t border-gray-300">
                  <div className="p-4 border-r border-gray-300">
                    <div className="font-medium text-gray-900">Branch :</div>
                  </div>
                  <div className="p-4 border-r border-gray-300">
                    <div className="text-gray-900">Head office</div>
                  </div>
                  <div className="p-4 border-r border-gray-300"></div>
                  <div className="p-4"></div>
                </div>
              </div>

              {/* Pending Task Section */}
              <div className="bg-gray-100 p-3 rounded">
                <h4 className="text-lg font-medium text-gray-900">
                  Pending task
                </h4>
              </div>

              {/* Task Status List */}
              <div className="space-y-1">
                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <div className="font-medium text-gray-900">Total Task</div>
                  <div className="text-gray-900">: 0</div>
                </div>

                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span className="font-medium text-gray-900">Over Due</span>
                  </div>
                  <div className="text-gray-900">: 0</div>
                </div>

                <div className="flex items-center justify-between p-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span className="font-medium text-gray-900">
                      In Progress
                    </span>
                  </div>
                  <div className="text-gray-900">: 0</div>
                </div>

                <div className="flex items-center justify-between p-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span className="font-medium text-gray-900">No Action</span>
                  </div>
                  <div className="text-gray-900">: 0</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
