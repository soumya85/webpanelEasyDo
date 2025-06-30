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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTranslation } from "@/hooks/useTranslation";

interface SalesRegisterModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

// Sample data for the bar chart
const chartData = [
  {
    month: "Apr",
    lastYear: 0.2,
    currentYear: 0,
  },
  {
    month: "May",
    lastYear: 0,
    currentYear: 0,
  },
  {
    month: "Jun",
    lastYear: 0,
    currentYear: 0,
  },
];

export const SalesRegisterModal: React.FC<SalesRegisterModalProps> = ({
  open,
  onClose,
  onBackToReports,
}) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState(t("lastMonth"));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto !p-0 !gap-0 [&>button]:hidden !translate-y-[-60%] !top-[40%]">
        <div className="-mt-6 -mx-6">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-white z-10 rounded-t-lg mx-6 mt-6">
            <div className="flex items-center gap-3">
              <button onClick={onBackToReports} className="p-1">
                <ArrowLeft className="w-5 h-5 text-blue-500" />
              </button>
              <span className="text-blue-500 text-sm font-medium">
                Back To Report
              </span>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              Sales Register
            </h1>
            <div className="w-6"></div>
          </div>

          <div className="p-4 space-y-6 mx-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Sales Register Invoice
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
                <SelectItem value={t("lastMonth")}>{t("lastMonth")}</SelectItem>
                <SelectItem value={t("lastQuarter")}>
                  {t("lastQuarter")}
                </SelectItem>
                <SelectItem value={t("lastYear")}>{t("lastYear")}</SelectItem>
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
                <span className="text-gray-700 font-medium">Total Sales</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  No of Invoices
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">No Of Clients</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  No Of New Clients
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <YAxis
                      domain={[0, 1]}
                      ticks={[
                        0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0,
                      ]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6B7280" }}
                    />
                    <Bar
                      dataKey="lastYear"
                      fill="#EF4444"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="currentYear"
                      fill="#10B981"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#EF4444] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Last Year :</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#10B981] rounded-sm"></div>
                  <span className="text-sm text-gray-700">Current Year :</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clients Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Clients Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 min-h-[120px] shadow-md">
              {/* Empty state - ready for client data */}
            </div>
          </div>

          {/* Sales Person Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Person Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 min-h-[120px] shadow-md">
              {/* Empty state - ready for sales person data */}
            </div>
          </div>

          {/* Jobs Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Jobs Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Average Sales</span>
                <span className="text-gray-900 font-semibold">0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Highest Sales</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Lowest Sales</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
            </div>
          </div>

          {/* Insights Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Insights</h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total Clients</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Highest amount paid by client
                </span>
                <span className="text-gray-900 font-semibold">-</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Highest completed job by employee
                </span>
                <span className="text-gray-900 font-semibold">(Rs 0)</span>
              </div>
            </div>
          </div>

          {/* Sales Register Log Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Register Log
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-300 mb-4">
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Client
                </span>
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Date
                </span>
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Amount
                </span>
              </div>

              {/* Empty state with space for data */}
              <div className="min-h-[100px] flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  No sales data available for this period
                </p>
              </div>

              {/* Table Footer */}
              <div className="border-t border-gray-300 pt-4 mt-4">
                <div className="grid grid-cols-3 gap-4 py-2 opacity-30">
                  <span className="text-sm font-semibold text-gray-900 text-center">
                    Client
                  </span>
                  <span className="text-sm font-semibold text-gray-900 text-center">
                    Date
                  </span>
                  <span className="text-sm font-semibold text-gray-900 text-center">
                    Amount
                  </span>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};