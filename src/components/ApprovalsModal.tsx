import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  UserCheck,
  DollarSign,
  Clock,
  FileText,
  FileCheck,
  UserPlus,
  Settings,
  CreditCard,
  Plane,
  HandCoins,
} from "lucide-react";

interface ApprovalsModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

interface ApprovalCard {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  onClick?: () => void;
}

const adminApprovals: ApprovalCard[] = [
  {
    id: "leave",
    title: "Leave Request",
    icon: UserCheck,
    count: 1,
  },
  {
    id: "salary",
    title: "Salary Adv. Request",
    icon: DollarSign,
  },
  {
    id: "overtime",
    title: "Overtime Request",
    icon: Clock,
  },
  {
    id: "quotation",
    title: "Quotation Approval",
    icon: FileText,
  },
  {
    id: "contract",
    title: "Contract Approval",
    icon: FileCheck,
  },
  {
    id: "punchin",
    title: "Punch-in Approval",
    icon: UserPlus,
    count: 1,
  },
];

const employeeExpenseApprovals: ApprovalCard[] = [
  {
    id: "operational",
    title: "Operational",
    icon: Settings,
  },
  {
    id: "general",
    title: "General",
    icon: CreditCard,
  },
  {
    id: "travel",
    title: "Travel",
    icon: Plane,
  },
];

const vendorPayments: ApprovalCard[] = [
  {
    id: "payment",
    title: "Payment Request",
    icon: HandCoins,
  },
];

export const ApprovalsModal: React.FC<ApprovalsModalProps> = ({
  open,
  onClose,
  onBackToReports,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last Month");

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

        <div className="p-4 space-y-6">
          {/* Title */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Approval Report
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

          {/* Approval Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Approval Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Total Approval Requests
                </span>
                <span className="text-gray-900 font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Approved</span>
                <span className="text-gray-900 font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Pending</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Rejected</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
            </div>

            {/* Approval Status Chart */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-8">
                <div className="h-64 w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={approvalStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {approvalStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#4A90E2] rounded-sm"></div>
                    <span className="text-sm text-gray-700">Approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#F5A623] rounded-sm"></div>
                    <span className="text-sm text-gray-700">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#D0021B] rounded-sm"></div>
                    <span className="text-sm text-gray-700">Rejected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approval Insights Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Approval Insights
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4 shadow-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-gray-700 font-medium">Average</div>
                  <div className="text-gray-700 font-medium">Time For</div>
                  <div className="text-gray-700 font-medium">Approved</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 font-semibold">47 Mins</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-gray-700 font-medium">Last</div>
                  <div className="text-gray-700 font-medium">Month</div>
                  <div className="text-gray-700 font-medium">Total</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 font-semibold">3</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-gray-700 font-medium">Highest</div>
                  <div className="text-gray-700 font-medium">Sent</div>
                  <div className="text-gray-700 font-medium">Approval</div>
                  <div className="text-gray-700 font-medium">Category</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 font-semibold">
                    Leave request,Punchin
                  </div>
                  <div className="text-gray-900 font-semibold">approval</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-gray-700 font-medium">Lowest</div>
                  <div className="text-gray-700 font-medium">Sent</div>
                  <div className="text-gray-700 font-medium">Approval</div>
                  <div className="text-gray-700 font-medium">Category</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 font-semibold">General</div>
                  <div className="text-gray-900 font-semibold">
                    request,Advance
                  </div>
                  <div className="text-gray-900 font-semibold">
                    salary,Travel
                  </div>
                  <div className="text-gray-900 font-semibold">
                    expense,Operational
                  </div>
                  <div className="text-gray-900 font-semibold">
                    expense,Vendor
                  </div>
                  <div className="text-gray-900 font-semibold">
                    quotation,Contract
                  </div>
                  <div className="text-gray-900 font-semibold">
                    approval,Release
                  </div>
                  <div className="text-gray-900 font-semibold">
                    payment,Overtime
                  </div>
                  <div className="text-gray-900 font-semibold">request</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-gray-700 font-medium">Compare</div>
                  <div className="text-gray-700 font-medium">To Last</div>
                  <div className="text-gray-700 font-medium">Period</div>
                </div>
                <div className="text-right">
                  <div className="text-gray-900 font-semibold">
                    33.33% (decrease)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Approvals By Category Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Approvals By Category
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  General Expense
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Leave Request</span>
                <span className="text-gray-900 font-semibold">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Advance Salary
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Travel Expense
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Operational Expense
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Quotation Approval
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Contract Approval
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Vendor Payment Request
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Overtime Request
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Punch-in Approval
                </span>
                <span className="text-gray-900 font-semibold">1</span>
              </div>
            </div>

            {/* Category Chart */}
            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              <div className="flex items-center gap-8">
                <div className="h-64 w-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={approvalsCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {approvalsCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {approvalsCategoryData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-4 h-3 rounded-sm"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-xs text-gray-700">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Special Approval Details Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Special Approval Details
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 shadow-md">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-300 mb-4">
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Employee Name
                </span>
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Type
                </span>
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Approval Date
                </span>
              </div>

              {/* Table Content */}
              <div className="space-y-4">
                {approvalDetails.map((detail, index) => (
                  <div key={index} className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 py-2">
                      <span className="text-sm text-gray-900 text-center font-medium">
                        {detail.employeeName}
                      </span>
                      <span className="text-sm text-gray-900 text-center font-medium">
                        {detail.type}
                      </span>
                      <span className="text-sm text-gray-900 text-center font-medium">
                        {detail.approvalDate}
                      </span>
                    </div>

                    {/* Detailed View */}
                    <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-200">
                      <span className="text-sm font-semibold text-gray-700">
                        Approval Date
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        Notes
                      </span>
                      <span className="text-sm font-semibold text-gray-700">
                        Approved By
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 py-2">
                      <span className="text-sm text-gray-900">
                        {detail.approvalDate}
                      </span>
                      <span className="text-sm text-gray-900">
                        {detail.notes}
                      </span>
                      <span className="text-sm text-gray-900">
                        {detail.approvedBy}
                      </span>
                    </div>

                    {index < approvalDetails.length - 1 && (
                      <div className="border-b border-gray-200 my-4"></div>
                    )}
                  </div>
                ))}
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
