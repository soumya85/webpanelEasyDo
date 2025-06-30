import React, { useState, useMemo } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowLeft,
  Search,
  Settings2,
  Phone,
  MessageCircle,
  MoreVertical,
  ChevronDown,
  MapPin,
  Check,
  Plus,
  Calendar,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SalesRegisterModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

// Mock employee data
const employeeData = [
  {
    id: 1,
    name: "ABHIJIT MONDAL",
    position: "Jetty Sircar",
    branch: "Haldia",
    doj: "Apr 09, 2024",
    authority: 3,
    avatar: "/api/placeholder/40/40",
    initials: "AM",
    reportingManager: "Nayanjyoti Mandal",
    status: "accepted",
    rating: 0,
  },
  {
    id: 2,
    name: "Abhijit Mukherjee",
    position: "Operation Executive",
    branch: "Head office",
    doj: "Jan 01, 2017",
    authority: 3,
    avatar: "/api/placeholder/40/40",
    initials: "AM",
    reportingManager: "Debashis Debnath",
    status: "accepted",
    rating: 0,
  },
  {
    id: 3,
    name: "ABHIRAM MOHAPATRA",
    position: "Supervisor",
    branch: "Paradip",
    doj: "N/A",
    authority: 3,
    avatar: null,
    initials: "AM",
    reportingManager: "Digambar Khuntia",
    status: "accepted",
    rating: 0,
  },
  {
    id: 4,
    name: "AHSAN RAZA",
    position: "Manager",
    branch: "Head office",
    doj: "Mar 15, 2023",
    authority: 2,
    avatar: "/api/placeholder/40/40",
    initials: "AR",
    reportingManager: "Bhaskar Ghosh",
    status: "accepted",
    rating: 0,
  },
  {
    id: 5,
    name: "Bholanath Pal",
    position: "Office Boy",
    branch: "Head office",
    doj: "Feb 14, 2022",
    authority: 3,
    avatar: null,
    initials: "BP",
    reportingManager: "Digambar Khuntia",
    status: "accepted",
    rating: 0,
  },
];

// Mock branch data
const branchData = [
  {
    id: "all",
    name: "All Branches",
    description: "Manage/View all the branches",
    address: "",
  },
  {
    id: "head-office",
    name: "Head office",
    description: "",
    address:
      "104, 3rd Floor , Shyama Prasad Mukherjee Road, Hazra, Kalighat, Kalighat, Kolkata, West Bengal 700026, India",
  },
  {
    id: "haldia",
    name: "Haldia",
    description: "",
    address:
      "33GG+34V, Sukanta Nagar, WARD NO:15, Haldia, West Bengal 721657, India",
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad office",
    description: "",
    address: "C/142, Vishwas City 1, Sola, Ahmedabad, Gujarat 380061, India",
  },
  {
    id: "paradip",
    name: "Paradip",
    description: "",
    address: "7J9X+5GG, Paradeep, Odisha 754142, India",
  },
  {
    id: "new-delhi",
    name: "New Delhi",
    description: "",
    address:
      "New Delhi,405, District Centre, Janakpuri, New Delhi, Delhi, 110058, India",
  },
];

export const SalesRegisterModal: React.FC<SalesRegisterModalProps> = ({
  open,
  onClose,
  onBackToReports,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("accepted");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [sortBy, setSortBy] = useState("alphabetically");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showBranchSheet, setShowBranchSheet] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 gap-0 [&>button]:hidden !translate-y-[-60%] !top-[40%]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10 rounded-t-lg -mt-[1.5rem] -mx-[1.5rem] px-[2rem] pt-[2rem]">
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

        <div className="p-4 space-y-6">
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
