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
  const [isLeaveRulesOpen, setIsLeaveRulesOpen] = useState(false);
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
              <button
                onClick={() => setIsLeaveRulesOpen(true)}
                className="flex items-center justify-between w-full text-left text-[#4766E5] font-medium hover:text-[#4766E5]/80 transition-colors"
              >
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

      {/* Employee Leave Rules Modal */}
      <Dialog open={isLeaveRulesOpen} onOpenChange={setIsLeaveRulesOpen}>
        <DialogContent className="max-w-4xl h-[85vh] max-h-[85vh] overflow-hidden p-0 flex flex-col [&>button]:hidden">
          <VisuallyHidden>
            <DialogTitle>Leave Rules</DialogTitle>
          </VisuallyHidden>

          {/* Header */}
          <div className="flex items-center px-4 py-3 bg-[#F8F9FA] border-b">
            <button
              onClick={() => setIsLeaveRulesOpen(false)}
              className="flex items-center text-[#4766E5] text-sm font-medium hover:text-[#4766E5]/80 transition-colors mr-4"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-[#283C50] flex-1 text-center">
              Leave Rules
            </h1>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 overflow-y-auto bg-white">
            {/* Leave Management Rules */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#283C50] mb-6">
                Leave Management Rules
              </h2>

              {/* Leave Types */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-4">
                  Leave Types
                </h3>
                <ul className="space-y-2 text-lg">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Earn Leave
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Casual Leave
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Sick Leave
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                    Other Leave
                  </li>
                </ul>
              </div>

              {/* Leave Assignment */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-6">
                  Leave Assignment
                </h3>

                {/* On Employee Creation */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-3">
                    On Employee Creation
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    When a new employee is created in the application, we assign
                    leaves based on the employee's branch leave rules.
                  </p>
                </div>

                {/* On Employee Update */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-3">
                    On Employee Update
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed mb-3">
                    When an employee is updated, we check if the employee has
                    added an application join date.
                  </p>
                  <ul className="space-y-2 text-lg ml-4">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      If yes, set leave balance based on it.
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      If no, leave balance remains unchanged.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Leave Balance Rules for Joined Employees */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-6">
                  Leave Balance Rules for Joined Employees
                </h3>

                {/* Probation Period Status */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-4">
                    Probation Period Status
                  </h4>

                  {/* If probation period is ON */}
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      <span className="text-lg">
                        If the probation period is <strong>ON</strong>:
                      </span>
                    </div>
                    <div className="ml-6 space-y-3">
                      <div className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
                        <p className="text-lg text-gray-700">
                          Check if the employee's join date is before or after
                          the current date.
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 mt-2"></span>
                        <div>
                          <p className="text-lg text-gray-700 mb-2">
                            If before:
                          </p>
                          <div className="ml-4 space-y-3">
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                Check if the probation period is completed:
                              </p>
                            </div>
                            <div className="ml-8 space-y-2">
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  If completed, count the months after
                                  completion and add to earn and casual leave
                                  balance.
                                </p>
                              </div>
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  Sick and other leave will follow branch rules.
                                </p>
                              </div>
                            </div>
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                If not completed:
                              </p>
                            </div>
                            <div className="ml-8 space-y-2">
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  Earn and casual leave balance is{" "}
                                  <strong>0</strong>.
                                </p>
                              </div>
                              <div className="flex items-start">
                                <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                                <p className="text-lg text-gray-700">
                                  Transfer opening balance to earn leave, sick
                                  and other leave balance is <strong>0</strong>.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                        <div>
                          <p className="text-lg text-gray-700 mb-2">
                            If the probation period is <strong>OFF</strong>:
                          </p>
                          <div className="ml-4 space-y-2">
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                Check the current month to the date of joining
                                and add the earn and casual leave balance.
                              </p>
                            </div>
                            <div className="flex items-start">
                              <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                              <p className="text-lg text-gray-700">
                                Sick and other leave are added based on branch
                                rules.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Note */}
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <p className="text-lg text-blue-800">
                      <strong>NOTE:</strong> Sick and other leave follow branch
                      rules.
                    </p>
                  </div>
                </div>
              </div>

              {/* Leave Approval Process */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#4A5568] mb-6">
                  Leave Approval Process
                </h3>

                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  When an employee requests leave for 3 days and it is approved,
                  the following rules apply:
                </p>

                <ul className="space-y-3 text-lg mb-6">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                    Count week offs and holidays.
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-black rounded-full mr-3 mt-3"></span>
                    If the employee is present on leave dates, they will be
                    counted as a present for those dates.
                  </li>
                </ul>

                {/* Example */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-[#4A5568] mb-4">
                    Example:
                  </h4>

                  <p className="text-lg text-gray-700 mb-4">
                    If an employee adds leave for:
                  </p>

                  <ul className="space-y-2 text-lg mb-6 ml-4">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      10-02-2024 [SATURDAY]
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      11-02-2024 [SUNDAY]
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3"></span>
                      12-02-2024 [MONDAY]
                    </li>
                  </ul>

                  <p className="text-lg text-gray-700 mb-4">
                    In this case, we count only <strong>2 days of leave</strong>{" "}
                    because 11-02-2024 is a holiday (Sunday).
                  </p>

                  <p className="text-lg text-gray-700 mb-6">
                    If the employee is present on 12-02-2024 (Monday), then only{" "}
                    <strong>1 day of leave</strong> will be counted.
                  </p>

                  {/* Leave calculation rules */}
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Earned Leave (EL/PL)</strong>: 0.83 days per
                        continuous month worked, Added on last day of every
                        Month.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Casual Leave (CL)</strong>: 0.83 days per
                        continuous month worked, Added on last day of every
                        Month.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Sick Leaves (SL)</strong>: for 0.42 month of
                        continuous service, Added on 1st day of the current
                        financial year.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>Other Leaves (OL)</strong>: for 0.5 month of
                        continuous service, Added on 1st day of the current
                        financial year.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-[#283C50] rounded-full mr-3 mt-2"></span>
                      <div>
                        <strong>
                          Earned and Casual leaves are added on last day of the
                          month. Click here to check all leave rules.
                        </strong>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
