import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LeaveBalance() {
  const [isLeaveBalanceModalOpen, setIsLeaveBalanceModalOpen] = useState(false);
  const [selectedLeaveTab, setSelectedLeaveTab] = useState<
    "approved" | "pending" | "availed"
  >("approved");
  const leaveData = [
    {
      label: "EARNED",
      value: "9.99",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-b-blue-500",
    },
    {
      label: "SICK",
      value: "4",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-b-purple-500",
    },
    {
      label: "CASUAL",
      value: "2.16",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-b-green-500",
    },
    {
      label: "OTHER",
      value: "6",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-b-orange-500",
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
              Leave Balance
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4766E5] hover:text-[#4766E5]/80"
              onClick={() => setIsLeaveBalanceModalOpen(true)}
            >
              View Detail
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Leave Balance Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
            {leaveData.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg",
                  "min-h-[100px] border-b-4 transition-transform hover:scale-105",
                  item.bgColor,
                  item.borderColor,
                )}
              >
                <div className={cn("text-3xl font-bold mb-2", item.color)}>
                  {item.value}
                </div>
                <div className="text-xs text-gray-600 text-center font-medium uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Status Information */}
          <div className="space-y-3 mt-auto">
            {/* Status Badges */}
            <div className="flex items-center gap-2 justify-center">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 font-medium"
              >
                3 Approved
              </Badge>
              <span className="text-gray-400">●</span>
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-600 font-medium"
              >
                0 Pending
              </Badge>
            </div>

            {/* Carried Forward Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-gray-700 leading-relaxed text-center">
                <span className="font-semibold text-blue-600">5.83</span> unused
                leaves are carried forward from last year and added in{" "}
                <span className="font-semibold">Earn Leave (EL)</span> Balance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leave Balance Summary Modal */}
      <Dialog
        open={isLeaveBalanceModalOpen}
        onOpenChange={setIsLeaveBalanceModalOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh] max-h-[80vh] overflow-hidden p-0 flex flex-col [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Leave Balance Summary</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#F8F9FA] border-b">
            <h1 className="text-lg font-semibold text-[#283C50]">
              Leave Balance Summary
            </h1>
            <button
              onClick={() => setIsLeaveBalanceModalOpen(false)}
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
              <button className="flex items-center justify-between w-full text-left text-[#4766E5] font-medium hover:text-[#4766E5]/80 transition-colors">
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
                    className={`px-4 py-2 border-b-2 font-medium rounded-t transition-colors ${
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
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-[#283C50] mb-2">
                    No leaves found
                  </h4>
                  <p className="text-gray-600 text-sm">
                    You have no {selectedLeaveTab} leaves to show
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
