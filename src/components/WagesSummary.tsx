import { ChevronRight, Download, Mail, Eye, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function WagesSummary() {
  const [isWagesDetailModalOpen, setIsWagesDetailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"current" | "year" | "issued">(
    "current",
  );
  const [activeSubTab, setActiveSubTab] = useState<
    "timesheet" | "earnings" | "allowance" | "deductions"
  >("timesheet");
  const [selectedMonth, setSelectedMonth] = useState("JUN");
  const wagesData = [
    {
      label: "Earning",
      amount: "₹12,738.59",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-500",
    },
    {
      label: "Deduction",
      amount: "₹1,155.03",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-l-red-500",
    },
    {
      label: "Net Pay",
      amount: "₹11,583.56",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-500",
    },
  ];

  return (
    <div className="w-full h-full">
      {/* Card with background starting from title */}
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Wages (May 2025)
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4766E5] hover:text-[#4766E5]/80"
              onClick={() => setIsWagesDetailModalOpen(true)}
            >
              View Detail
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Wages Cards */}
          <div className="grid grid-cols-1 gap-4 flex-1">
            {wagesData.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg transition-transform hover:scale-105",
                  "border-l-4 min-h-[80px]",
                  item.bgColor,
                  item.borderColor,
                )}
              >
                <div className="flex flex-col">
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    {item.label}
                  </div>
                  <div className={cn("text-2xl font-bold", item.color)}>
                    {item.amount}
                  </div>
                </div>
                <div
                  className={cn("text-3xl font-light opacity-20", item.color)}
                >
                  {index === 0 ? "↗" : index === 1 ? "↘" : "→"}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 text-center">
              Salary processed for May 2025
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wages Detail Modal */}
      <Dialog
        open={isWagesDetailModalOpen}
        onOpenChange={setIsWagesDetailModalOpen}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="bg-white">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Payslip Summary
              </h2>
              <button
                onClick={() => setIsWagesDetailModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex bg-gray-100 border-b">
              <button
                className={cn(
                  "flex-1 py-3 px-4 text-center font-medium",
                  activeTab === "current"
                    ? "bg-white text-gray-900"
                    : "text-gray-600 hover:bg-gray-50",
                )}
                onClick={() => setActiveTab("current")}
              >
                Current
              </button>
              <button
                className={cn(
                  "flex-1 py-3 px-4 text-center font-medium",
                  activeTab === "year"
                    ? "bg-white text-gray-900"
                    : "text-gray-600 hover:bg-gray-50",
                )}
                onClick={() => setActiveTab("year")}
              >
                Year
              </button>
              <button
                className={cn(
                  "flex-1 py-3 px-4 text-center font-medium",
                  activeTab === "issued"
                    ? "bg-white text-gray-900"
                    : "text-gray-600 hover:bg-gray-50",
                )}
                onClick={() => setActiveTab("issued")}
              >
                Issued
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "current" && (
              <>
                {/* Current Month Display */}
                <div className="text-center py-4 bg-gray-50">
                  <h3 className="text-2xl font-bold text-blue-600">
                    June 2025
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  {/* Net Pay Circle Chart */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg
                        width="200"
                        height="200"
                        className="transform -rotate-90"
                      >
                        <circle
                          cx="100"
                          cy="100"
                          r="90"
                          stroke="#E5E7EB"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="90"
                          stroke="#3B82F6"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="480"
                          strokeDashoffset="60"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="90"
                          stroke="#EF4444"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="60"
                          strokeDashoffset="-420"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="text-2xl font-bold text-gray-900">
                          ₹ 13,290.00
                        </div>
                        <div className="text-gray-600">Net Pay</div>
                      </div>
                    </div>
                  </div>

                  {/* Earning and Deductions Summary */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-blue-600 rounded"></div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          ₹ 14,620.00 -
                        </div>
                        <div className="text-gray-600">Earning</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-500 rounded"></div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          ₹ 1,330.00 -
                        </div>
                        <div className="text-gray-600">Deductions</div>
                      </div>
                    </div>
                  </div>

                  {/* Status Information */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 bg-gray-400 rounded-sm"></span>
                      <span>As on 20th Jun 2025.</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-3 h-3 bg-gray-400 rounded-sm"></span>
                      <span>
                        Your Next Payslip to be generated in{" "}
                        <span className="font-bold text-gray-900">10 Days</span>
                      </span>
                    </div>
                  </div>

                  {/* Instant Salary Advance Loan Button */}
                  <button className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors">
                    Instant Salary Advance Loan
                  </button>

                  {/* Bottom Tab Navigation */}
                  <div className="border-t pt-4">
                    <div className="flex border-b">
                      <button
                        className={cn(
                          "py-2 px-4 font-medium",
                          activeSubTab === "timesheet"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900",
                        )}
                        onClick={() => setActiveSubTab("timesheet")}
                      >
                        Time sheet
                      </button>
                      <button
                        className={cn(
                          "py-2 px-4 font-medium",
                          activeSubTab === "earnings"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900",
                        )}
                        onClick={() => setActiveSubTab("earnings")}
                      >
                        Earnings
                      </button>
                      <button
                        className={cn(
                          "py-2 px-4 font-medium",
                          activeSubTab === "allowance"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900",
                        )}
                        onClick={() => setActiveSubTab("allowance")}
                      >
                        Allowance
                      </button>
                      <button
                        className={cn(
                          "py-2 px-4 font-medium",
                          activeSubTab === "deductions"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-600 hover:text-gray-900",
                        )}
                        onClick={() => setActiveSubTab("deductions")}
                      >
                        Deductions
                      </button>
                    </div>

                    {/* Time Sheet Content */}
                    {activeSubTab === "timesheet" && (
                      <div className="pt-4 space-y-4">
                        {/* Month Current Section */}
                        <div className="border-l-4 border-green-500 pl-4">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-bold text-gray-900">
                              Month (Current)
                            </h4>
                            <span className="font-bold">Jun 25</span>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Days</span>
                              <span className="font-medium">30 days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Working Days in Month
                              </span>
                              <span className="font-medium">24 Days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Week off + Holiday
                              </span>
                              <span className="font-medium">6 Days</span>
                            </div>
                          </div>
                        </div>

                        {/* Till Date Section */}
                        <div className="pt-4">
                          <h4 className="font-bold text-gray-900 mb-3">
                            Till Date (20, Jun)
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Total Days</span>
                              <span className="font-medium">20 days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Working Days
                              </span>
                              <span className="font-medium">16 days</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Week off + Holiday
                              </span>
                              <span className="font-medium">4 Days</span>
                            </div>
                          </div>
                        </div>

                        {/* Attendance Details */}
                        <div className="pt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Present</span>
                            <span className="font-medium">16.0 Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Late</span>
                            <span className="font-medium">2 Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Halfday</span>
                            <span className="font-medium">0 Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">OnTime</span>
                            <span className="font-medium">14.0 Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Absent</span>
                            <span className="font-medium">0.0 Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Paid Leave</span>
                            <span className="font-medium">0.0 Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Unpaid Leave</span>
                            <span className="font-medium">0 Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Overtime</span>
                            <span className="font-medium">0.00 Hours</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Other sub-tabs placeholder content */}
                    {activeSubTab === "earnings" && (
                      <div className="pt-4 text-center text-gray-500">
                        Earnings details will be shown here
                      </div>
                    )}
                    {activeSubTab === "allowance" && (
                      <div className="pt-4 text-center text-gray-500">
                        Allowance details will be shown here
                      </div>
                    )}
                    {activeSubTab === "deductions" && (
                      <div className="pt-4 text-center text-gray-500">
                        Deduction details will be shown here
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Year Tab Content */}
            {activeTab === "year" && (
              <div className="p-6">
                {/* Year Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    Your Approvals
                  </h3>
                  <span className="text-xl font-bold text-blue-600">2025</span>
                </div>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex gap-2">
                    {["JUN", "MAY", "APR", "MAR", "FEB", "JAN"].map((month) => (
                      <button
                        key={month}
                        className={cn(
                          "px-4 py-2 rounded-lg font-medium",
                          selectedMonth === month
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                        )}
                        onClick={() => setSelectedMonth(month)}
                      >
                        {month}
                      </button>
                    ))}
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Year Summary Card */}
                <div className="bg-white border rounded-lg p-6">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Chart Section */}
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <svg
                          width="160"
                          height="160"
                          className="transform -rotate-90"
                        >
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#E5E7EB"
                            strokeWidth="6"
                            fill="none"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#3B82F6"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray="380"
                            strokeDashoffset="50"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#EF4444"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray="50"
                            strokeDashoffset="-330"
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <div className="text-xl font-bold text-gray-900">
                            ₹ 13,290.00
                          </div>
                          <div className="text-sm text-gray-600">Net Pay</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">
                          Jun
                        </div>
                        <div className="text-2xl font-bold text-blue-600">
                          2025
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                          <span className="text-gray-700">Present</span>
                        </div>
                        <span className="font-medium">16.0 Days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                          <span className="text-gray-700">Earnings</span>
                        </div>
                        <span className="font-medium">₹ 13,290.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                          <span className="text-gray-700">Allowance</span>
                        </div>
                        <span className="font-medium">₹ 14,620.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                          <span className="text-gray-700">Other Add</span>
                        </div>
                        <span className="font-medium">₹ 0.00</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-red-600">Deductions</span>
                          </div>
                          <span className="font-medium text-red-600">
                            ₹ 1,330.00
                          </span>
                        </div>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                            <span className="text-gray-700 font-medium">
                              Net Pay
                            </span>
                          </div>
                          <span className="font-bold">₹ 13,290.00</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Raise Query Button */}
                  <button className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Raise Query
                  </button>
                </div>
              </div>
            )}

            {/* Issued Tab Content */}
            {activeTab === "issued" && (
              <div className="p-6">
                {/* Issued Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-blue-600">2024-25</h3>
                  <span className="text-lg font-medium text-gray-900">
                    5 Issued Payslip
                  </span>
                </div>

                {/* Payslip List */}
                <div className="space-y-4">
                  {[
                    { month: "May 25", amount: "₹ 20,000.00" },
                    { month: "Apr 25", amount: "₹ 15,000.00" },
                    { month: "Mar 25", amount: "₹ 15,000.00" },
                    { month: "Feb 25", amount: "₹ 14,412.00" },
                  ].map((payslip, index) => (
                    <div key={index} className="bg-white border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {payslip.month}
                          </h4>
                          <p className="text-lg font-bold text-gray-900 mt-1">
                            {payslip.amount}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          {/* Action Buttons */}
                          <button className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
                            <Download className="w-5 h-5" />
                          </button>
                          <button className="bg-gray-400 text-white p-3 rounded-lg hover:bg-gray-500 transition-colors">
                            <Mail className="w-5 h-5" />
                          </button>
                          {/* Payslip Preview */}
                          <div className="w-16 h-20 border rounded-lg bg-gray-50 flex items-center justify-center">
                            <Eye className="w-6 h-6 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
