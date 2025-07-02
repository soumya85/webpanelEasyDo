import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar, Users, BarChart2, TrendingUp, User, Briefcase, CheckCircle2, Clock, XCircle, FileText, DollarSign, UserCheck
} from "lucide-react";

// Mock data for demonstration
const branches = [
  { id: "b1", name: "Main Branch", staffCount: 12 },
  { id: "b2", name: "North Branch", staffCount: 8 },
  { id: "b3", name: "South Branch", staffCount: 5 },
];

const employees = [
  { id: "e1", name: "John Doe" },
  { id: "e2", name: "Jane Smith" },
  { id: "e3", name: "Alex Johnson" },
];

const periods = [
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
  { id: "custom", label: "Custom" },
];

// Mock stats
const stats = {
  totalRequests: 120,
  approved: 80,
  pending: 25,
  rejected: 15,
  insights: {
    avgTimeApproved: "2.5 days",
    highestCategory: "Travel Expense",
    lowestCategory: "General Expense",
    highestByEmployee: "Jane Smith",
    compareToLast: "+8%",
  },
  byCategory: [
    { name: "General Expense", count: 20 },
    { name: "Advance Salary", count: 10 },
    { name: "Travel Expense", count: 25 },
    { name: "Operational Expense", count: 15 },
    { name: "Quotation Approval", count: 8 },
    { name: "Contract Approval", count: 7 },
    { name: "Vendor Payment Request", count: 12 },
    { name: "Overtime Request", count: 13 },
    { name: "Punch In Approval", count: 10 },
  ],
};

export default function Approvals() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [selectedEmployee, setSelectedEmployee] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].id);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const branch = branches.find(b => b.id === selectedBranch);

  // Chart placeholder (replace with real chart library in production)
  const BarChartPlaceholder = () => (
    <div className="w-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-50 rounded-lg" style={{ height: 120 }}>
      <BarChart2 className="w-16 h-16 text-blue-400 opacity-40" />
      <span className="ml-2 text-blue-400 font-bold opacity-40">[Bar Chart]</span>
    </div>
  );

  return (
    <main className="flex-1 min-h-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Approvals</h1>
          <nav className="text-xs text-gray-500 mt-1">
            <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
              Company Dashboard
            </span>
            <span className="mx-1">/</span>
            <span className="text-indigo-700">Approvals</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Branch, Employee & Period Selection */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex items-center gap-2 w-full md:w-1/4">
              <Briefcase className="w-5 h-5 text-gray-400" />
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map(b => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/4">
              <User className="w-5 h-5 text-gray-400" />
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="All Employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {employees.map(e => (
                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  {periods.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedPeriod === "custom" && (
              <div className="flex gap-2 w-full md:w-1/4">
                <Input
                  type="date"
                  value={customFrom}
                  onChange={e => setCustomFrom(e.target.value)}
                  className="h-9 text-sm"
                  placeholder="From"
                />
                <Input
                  type="date"
                  value={customTo}
                  onChange={e => setCustomTo(e.target.value)}
                  className="h-9 text-sm"
                  placeholder="To"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Section 1: Branch & Staff Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <Briefcase className="w-10 h-10 text-blue-500" />
              <div>
                <div className="text-lg font-bold text-gray-800">{branch?.name}</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Users className="w-4 h-4" /> Staff Count: <span className="font-semibold">{branch?.staffCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Section 2: Approval Status */}
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-7 h-7 text-green-500" />
                <div className="text-lg font-bold text-gray-800">Approval Status</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Total Requests</div>
                  <div className="font-bold text-xl text-blue-700">{stats.totalRequests}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Approved</div>
                  <div className="font-bold text-xl text-green-700">{stats.approved}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Pending</div>
                  <div className="font-bold text-xl text-orange-700">{stats.pending}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Rejected</div>
                  <div className="font-bold text-xl text-red-700">{stats.rejected}</div>
                </div>
              </div>
              <BarChartPlaceholder />
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Approval Insights */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-7 h-7 text-pink-500" />
              <div className="text-lg font-bold text-gray-800">Approval Insights</div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-gray-700">Average Time for Approved:</span>
                <span className="text-gray-700">{stats.insights.avgTimeApproved}</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                <span className="font-semibold text-gray-700">Highest Sent Approved Category:</span>
                <span className="text-blue-700">{stats.insights.highestCategory}</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="font-semibold text-gray-700">Lowest Sent Approval Category:</span>
                <span className="text-gray-700">{stats.insights.lowestCategory}</span>
              </li>
              <li className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-gray-700">Highest Sent by Employee:</span>
                <span className="text-gray-700">{stats.insights.highestByEmployee}</span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pink-400" />
                <span className="font-semibold text-gray-700">Compare to Last Period:</span>
                <span className="text-green-700">{stats.insights.compareToLast}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 4: Approval by Category */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="w-7 h-7 text-indigo-500" />
              <div className="text-lg font-bold text-gray-800">Approval by Category</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stats.byCategory.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 bg-blue-50 rounded-lg px-4 py-3">
                  <span className="font-semibold text-gray-700">{cat.name}</span>
                  <span className="ml-auto text-blue-700 font-bold">{cat.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
