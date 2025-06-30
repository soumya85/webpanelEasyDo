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
  X,
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

  // Filter and sort employees
  const filteredEmployees = useMemo(() => {
    let filtered = employeeData.filter((emp) => {
      // Filter by status
      if (emp.status !== selectedStatus) return false;

      // Filter by branch
      if (
        selectedBranch !== "all" &&
        emp.branch.toLowerCase() !== getBranchName(selectedBranch).toLowerCase()
      )
        return false;

      // Filter by search query
      if (
        searchQuery &&
        !emp.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;

      return true;
    });

    // Sort employees
    if (sortBy === "alphabetically") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "doj") {
      filtered.sort(
        (a, b) => new Date(a.doj).getTime() - new Date(b.doj).getTime(),
      );
    } else if (sortBy === "authority") {
      filtered.sort((a, b) => a.authority - b.authority);
    }

    return filtered;
  }, [employeeData, selectedStatus, selectedBranch, searchQuery, sortBy]);

  // Get counts for status tabs
  const statusCounts = useMemo(() => {
    const counts = { accepted: 0, pending: 0, exit: 0 };
    employeeData.forEach((emp) => {
      if (counts.hasOwnProperty(emp.status)) {
        counts[emp.status as keyof typeof counts]++;
      }
    });
    return counts;
  }, [employeeData]);

  const getBranchName = (branchId: string) => {
    const branch = branchData.find((b) => b.id === branchId);
    return branch ? branch.name : "All Branches";
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

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
          <h1 className="text-lg font-semibold text-gray-900">Employee</h1>
          <Popover open={showSortDropdown} onOpenChange={setShowSortDropdown}>
            <PopoverTrigger asChild>
              <button className="p-1">
                <Settings2 className="w-5 h-5 text-blue-500" />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="bg-blue-50 p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Alphabetically</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">A</span>
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                      <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5"></div>
                    </div>
                    <span className="text-sm">Z</span>
                    <ArrowLeft className="w-4 h-4 rotate-90" />
                  </div>
                </div>

                <button
                  onClick={() => setSortBy("doj")}
                  className="flex items-center justify-between w-full p-3 bg-white rounded-lg"
                >
                  <span className="text-sm font-medium">Date Of Joining</span>
                  <Calendar className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setSortBy("authority")}
                  className="flex items-center justify-between w-full p-3 bg-white rounded-lg"
                >
                  <span className="text-sm font-medium">Authority</span>
                  <User className="w-5 h-5" />
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search Employee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-gray-100 border-none"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedStatus("accepted")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                selectedStatus === "accepted"
                  ? "bg-white text-gray-900 shadow-sm border"
                  : "bg-gray-100 text-gray-600",
              )}
            >
              ACCEPTED ({statusCounts.accepted})
            </button>
            <button
              onClick={() => setSelectedStatus("pending")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                selectedStatus === "pending"
                  ? "bg-white text-gray-900 shadow-sm border"
                  : "bg-gray-100 text-gray-600",
              )}
            >
              PENDING ({statusCounts.pending})
            </button>
            <button
              onClick={() => setSelectedStatus("exit")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium",
                selectedStatus === "exit"
                  ? "bg-white text-gray-900 shadow-sm border"
                  : "bg-gray-100 text-gray-600",
              )}
            >
              EXIT ({statusCounts.exit})
            </button>
          </div>

          {/* Branch Selector */}
          <button
            onClick={() => setShowBranchSheet(true)}
            className="w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg"
          >
            <span className="text-gray-900">
              {getBranchName(selectedBranch)}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {/* Employee List */}
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="bg-white border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12">
                      {employee.avatar ? (
                        <AvatarImage
                          src={employee.avatar}
                          alt={employee.name}
                        />
                      ) : (
                        <AvatarFallback className="bg-gray-400 text-white">
                          {employee.initials}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">
                          {employee.name}
                        </h3>
                        <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {employee.position}{" "}
                        <span className="text-blue-500">
                          ({employee.branch})
                        </span>
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-sm text-gray-600">
                          DOJ : {employee.doj}
                        </span>
                        <Badge variant="secondary" className="bg-gray-100">
                          Authority : {employee.authority}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2">
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="p-2">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600">
                    Reporting Manager: {employee.reportingManager}
                  </span>
                  <div className="flex items-center gap-1 px-3 py-1 border border-blue-200 rounded-full">
                    <span className="text-blue-500">★</span>
                    <span className="text-sm text-blue-500">
                      {employee.rating} (0)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Employee Button */}
          <button
            onClick={() => setShowAddEmployee(true)}
            className="fixed bottom-6 right-6 bg-black text-white rounded-full px-6 py-3 flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Employee
          </button>
        </div>

        {/* Branch Selection Sheet */}
        <Sheet open={showBranchSheet} onOpenChange={setShowBranchSheet}>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Branches</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              {branchData.map((branch) => (
                <button
                  key={branch.id}
                  onClick={() => {
                    setSelectedBranch(branch.id);
                    setShowBranchSheet(false);
                  }}
                  className="w-full text-left p-4 hover:bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">
                          {branch.name}
                        </h3>
                        {selectedBranch === branch.id && (
                          <Check className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                      {branch.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {branch.description}
                        </p>
                      )}
                      {branch.address && (
                        <p className="text-sm text-gray-500 mt-1">
                          {branch.address}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        {/* Add Employee Sheet */}
        <Sheet open={showAddEmployee} onOpenChange={setShowAddEmployee}>
          <SheetContent side="bottom" className="h-[90vh]">
            <SheetHeader>
              <div className="flex items-center justify-between">
                <button onClick={() => setShowAddEmployee(false)}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <SheetTitle>Add Employee</SheetTitle>
                <button className="text-blue-500 font-medium">Submit</button>
              </div>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              <select className="w-full p-4 bg-gray-100 rounded-lg border-none">
                <option>Head office</option>
              </select>

              <button className="w-full p-4 bg-gray-100 rounded-lg border-none text-left flex items-center justify-between">
                <span className="text-gray-600">Select Contact</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <Input placeholder="Name" className="bg-gray-100 border-none" />

              <div className="flex gap-2">
                <select className="p-4 bg-gray-100 rounded-lg border-none">
                  <option>IN +91</option>
                </select>
                <Input
                  placeholder="Mobile"
                  className="flex-1 bg-gray-100 border-none"
                />
              </div>

              <Input placeholder="Email" className="bg-gray-100 border-none" />
              <Input
                placeholder="Employee Code"
                className="bg-gray-100 border-none"
              />

              <div className="relative">
                <Input
                  placeholder="Date Of Birth"
                  className="bg-gray-100 border-none pr-12"
                />
                <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <Input
                placeholder="Designation"
                className="bg-gray-100 border-none"
              />

              <select className="w-full p-4 bg-gray-100 rounded-lg border-none">
                <option>Role</option>
              </select>

              <p className="text-sm text-gray-600">
                Note: Access rights will be granted base on role of the employee
              </p>

              <select className="w-full p-4 bg-gray-100 rounded-lg border-none">
                <option>Reporting Manager</option>
              </select>

              <p className="text-sm text-gray-600">
                Note: Attendance, approvals request will be send reporting
                manager when it is send directly from company dashboard.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </DialogContent>
    </Dialog>
  );
};
