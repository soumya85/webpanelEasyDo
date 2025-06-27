import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useTranslation } from "@/hooks/useTranslation";

interface OperationalExpensesModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

// Sample data for the Last Four Month Expenses chart
const lastFourMonthsData = [
  { month: "Feb 2025", value: 0 },
  { month: "Mar 2025", value: 0 },
  { month: "Apr 2025", value: 0 },
  { month: "May 2025", value: 0 },
];

export const OperationalExpensesModal: React.FC<
  OperationalExpensesModalProps
> = ({ open, onClose, onBackToReports }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last Month");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 [&>button]:hidden">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Operational Expenses</DialogTitle>
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
            Operational Expenses
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Expense Report
            </h2>
          </div>

          {/* Period Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Period</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full h-12 border border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Last Quarter">Last Quarter</SelectItem>
                <SelectItem value="Last Year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search and Clear Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white h-12 rounded-full">
              Search
            </Button>
            <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white h-12 rounded-full">
              Clear
            </Button>
          </div>

          {/* Selection Card */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selection
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Branch</span>
                <span className="text-gray-900">Head office</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Employee</span>
                <span className="text-gray-900">Soumyadeep Goswami</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total staffs</span>
                <span className="text-gray-900">28</span>
              </div>
            </div>
          </div>

          {/* Amount Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Amount Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total Amount</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Total Paid Out Expenses
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Pending paid Out Expenses
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
            </div>
          </div>

          {/* Expense By Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Expense By Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Approved</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Pending</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Rejected</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>

              {/* Legend */}
              <div className="flex justify-end gap-6 mt-4 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#4A90E2] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#F5A623] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#E74C3C] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Rejected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Insights</h3>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-700 uppercase">
                  APPROVED EXPENSES : 0%
                </div>
                <div className="text-sm font-semibold text-gray-700 uppercase">
                  PENDING EXPENSES : 0%
                </div>
                <div className="text-sm font-semibold text-gray-700 uppercase">
                  REJECTED EXPENSES : 0%
                </div>
              </div>
            </div>
          </div>

          {/* Expense Insights Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Expense Insights
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Highest Spend Category
                </span>
                <span className="text-gray-900 font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Lowest Spend Category
                </span>
                <span className="text-gray-900 font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Average Spend Category
                </span>
                <span className="text-gray-900 font-semibold">0.000</span>
              </div>
              <div className="space-y-1">
                <div className="text-gray-700 font-medium">
                  Highest Spend By Employee
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Compared To Last Month
                </span>
                <span className="text-gray-900 font-semibold">0%</span>
              </div>
            </div>
          </div>

          {/* Approved Expense By Category Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Approved Expense By Category
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Advance Salary
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Payment</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Travel</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Operational</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Reimbursement</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Quotation</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Contract</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">General</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>

              {/* Category Legend */}
              <div className="grid grid-cols-2 gap-2 mt-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#A8E6A1] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Advance Salary</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#87CEEB] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#F5A623] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Travel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#4A90E2] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#E74C3C] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Reimbursement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#F8A5C2] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Quotation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#98FB98] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Contract</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#6495ED] rounded-sm"></div>
                  <span className="text-sm text-gray-700">General</span>
                </div>
              </div>
            </div>
          </div>

          {/* Last Four Month Expenses Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Last Four Month Expenses
            </h3>

            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={lastFourMonthsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <Bar dataKey="value" fill="#E5E7EB" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white h-12 rounded-full">
              Save in drive
            </Button>
            <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white h-12 rounded-full">
              Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
