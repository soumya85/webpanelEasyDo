
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MoreHorizontal, Star, MessageCircle } from "lucide-react";

interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  branch: string;
  authority: string;
  doj: string;
  reportingManager: string;
}

const employees = [
  {
    id: 1,
    name: "Amulya Kr Kar",
    position: "Chief Accountant",
    branch: "Head Office",
    authority: 2,
    doj: "April 4, 2016",
    reportingManager: "Bhaskar Ghosh",
    status: "approved",
    rating: 3.0,
    avatar: "AK"
  },
  {
    id: 2,
    name: "Amlan Mallick",
    position: "Branch Manager",
    branch: "New Delhi",
    authority: 2,
    doj: "N/A",
    reportingManager: "Bhaskar Ghosh",
    status: "approved",
    rating: 3.0,
    avatar: "AM"
  },
  {
    id: 3,
    name: "Abhijit Mukherjee",
    position: "Operation Executive",
    branch: "Head Office",
    authority: 3,
    doj: "May 4, 2010",
    reportingManager: "Debashis Debnath",
    status: "rejected",
    rating: 3.0,
    avatar: "AB"
  },
  {
    id: 4,
    name: "Anukul Mondal",
    position: "Supervisor",
    branch: "Haldia",
    authority: 3,
    doj: "May 4, 2010",
    reportingManager: "Nayanjyoti Mandal",
    status: "rejected",
    rating: 3.0,
    avatar: "AN"
  },
  {
    id: 5,
    name: "Abhiram Mohapatra",
    position: "Supervisor",
    branch: "Paradip",
    authority: 3,
    doj: "N/A",
    reportingManager: "Digambar Khuntia",
    status: "rejected",
    rating: 3.0,
    avatar: "AM"
  },
  {
    id: 6,
    name: "Abhijit Mondal",
    position: "Jetty Sircar",
    branch: "Haldia",
    authority: 3,
    doj: "May 4, 2024",
    reportingManager: "Nayanjyoti Mandal",
    status: "rejected",
    rating: 3.0,
    avatar: "AB"
  }
];

export default function EmployeeRegister() {
  const [activeTab, setActiveTab] = useState("approved");
  const { register, handleSubmit, reset } = useForm<EmployeeFormData>();

  const onSubmit = (data: EmployeeFormData) => {
    console.log("Employee data:", data);
    // Handle form submission
    reset();
  };

  const getStatusCounts = () => {
    const approved = employees.filter(emp => emp.status === "approved").length;
    const pending = employees.filter(emp => emp.status === "pending").length;
    const rejected = employees.filter(emp => emp.status === "rejected").length;
    return { approved, pending, rejected };
  };

  const { approved, pending, rejected } = getStatusCounts();
  const filteredEmployees = employees.filter(emp => emp.status === activeTab);

  return (
    <main className="flex-1 w-full h-full min-h-0">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <nav className="text-sm text-gray-600 mb-1">
              Company Dashboard / Employee Register
            </nav>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">Authority Level</span>
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="1">Level 1</SelectItem>
              <SelectItem value="2">Level 2</SelectItem>
              <SelectItem value="3">Level 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search Employee"
            className="pl-10 bg-gray-50 border-0"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex gap-6 border-b">
          <button
            onClick={() => setActiveTab("approved")}
            className={`pb-2 px-1 font-medium ${
              activeTab === "approved"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Approved ({approved})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-2 px-1 font-medium ${
              activeTab === "pending"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Pending ({pending})
          </button>
          <button
            onClick={() => setActiveTab("rejected")}
            className={`pb-2 px-1 font-medium ${
              activeTab === "rejected"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            Rejected ({rejected})
          </button>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id} className="p-6">
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {employee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        {employee.name}
                        {employee.status === "approved" && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                        {employee.status === "rejected" && (
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {employee.position} ( {employee.branch} )
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} className="text-gray-400" />
                    <MoreHorizontal size={16} className="text-gray-400" />
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Authority:</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {employee.authority}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">DOJ:</span>
                    <span className="text-gray-900">{employee.doj}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">
                    Reporting Manager: {employee.reportingManager}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Manager for:</span>
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white"></div>
                        <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center text-xs">
                          +2
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{employee.rating} (1)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
