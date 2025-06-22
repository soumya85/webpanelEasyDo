import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Star, MoreHorizontal } from "lucide-react";
import AddEmployeeModal from "@/components/AddEmployeeModal";
import EmployeeProfileModal from "@/components/EmployeeProfileModal";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const branches = ["All", "Head Office", "New Delhi", "Haldia", "Paradip"];

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
    avatar: "AK",
    email: "amulya.kar@company.com",
    phone: "+91 9876543210",
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
    avatar: "AM",
    email: "amlan.mallick@company.com",
    phone: "+91 9876543211",
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
    avatar: "AB",
    email: "abhijit.mukherjee@company.com",
    phone: "+91 9876543212",
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
    avatar: "AN",
    email: "anukul.mondal@company.com",
    phone: "+91 9876543213",
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
    avatar: "AM",
    email: "abhiram.mohapatra@company.com",
    phone: "+91 9876543214",
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
    avatar: "AB",
    email: "abhijit.mondal@company.com",
    phone: "+91 9876543215",
  }
];

const getStatusCounts = (branch: string) => {
  const filtered = branch === "All" ? employees : employees.filter(e => e.branch === branch);
  const approved = filtered.filter(e => e.status === "approved").length;
  const rejected = filtered.filter(e => e.status === "rejected").length;
  const pending = filtered.filter(e => e.status === "pending").length;
  return { approved, rejected, pending };
};

export default function EmployeeRegister() {
  const [activeTab, setActiveTab] = useState("approved");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");

  const { approved, pending, rejected } = getStatusCounts(selectedBranch);

  const filteredEmployees = employees.filter(
    emp =>
      emp.status === activeTab &&
      (selectedBranch === "All" || emp.branch === selectedBranch) &&
      (emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.position.toLowerCase().includes(search.toLowerCase()) ||
        emp.branch.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="flex-1 w-full min-h-0 bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Employee Register</h1>
          <nav className="text-sm text-gray-500 mt-1">Company Dashboard / Employee Register</nav>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search employee, branch, or position"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          {/* Branch selection dropdown */}
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches.map(branch => (
                <SelectItem key={branch} value={branch}>{branch}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-5 h-5" /> Add Employee
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="px-8 pt-6">
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-100 rounded-lg w-full max-w-md">
            <TabsTrigger value="approved">
              Approved <Badge className="ml-2 bg-green-100 text-green-700">{approved}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending <Badge className="ml-2 bg-yellow-100 text-yellow-700">{pending}</Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected <Badge className="ml-2 bg-red-100 text-red-700">{rejected}</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Employee Cards */}
      <section className="px-8 py-8">
        {filteredEmployees.length === 0 ? (
          <div className="text-center text-gray-400 py-16 text-lg">No employees found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEmployees.map(employee => (
              <Card
                key={employee.id}
                className="hover:shadow-xl transition-shadow cursor-pointer group"
                onClick={() => setSelectedEmployee(employee)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14">
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-xl">
                        {employee.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-700">{employee.name}</h3>
                        <MoreHorizontal className="text-gray-400 w-5 h-5" />
                      </div>
                      <div className="text-sm text-gray-500">{employee.position}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-blue-100 text-blue-700">{employee.branch}</Badge>
                        <Badge className="bg-gray-100 text-gray-700">Authority: {employee.authority}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6 text-sm">
                    <div className="text-gray-600">
                      <span className="font-medium">DOB:</span>{" "}
                      <span className="text-gray-900">{employee.doj}</span>
                    </div>
                    <div>
                      <Badge className="bg-blue-50 text-blue-700 font-semibold">
                        Authority: {employee.authority}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-xs text-gray-400">Reporting:</span>{" "}
                      <span className="text-sm text-gray-700">{employee.reportingManager}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{employee.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Add Employee Modal */}
      <AddEmployeeModal open={showAddModal} onClose={() => setShowAddModal(false)} />

      {/* Employee Profile Modal */}
      {selectedEmployee && (
        <EmployeeProfileModal
          open={!!selectedEmployee}
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </main>
  );
}
