import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar, User, Briefcase, Building2, Users, BarChart2, LineChart, CheckCircle2, Clock, XCircle, TrendingUp
} from "lucide-react";

// Mock data for demonstration
const companies = [
  { id: "c1", name: "Acme Corp" },
  { id: "c2", name: "Globex Inc" },
];
const branches = [
  { id: "b1", name: "Main Branch" },
  { id: "b2", name: "North Branch" },
  { id: "b3", name: "South Branch" },
];
const employees = [
  { id: "e1", name: "John Doe", designation: "Manager", department: "Sales", branch: "Main Branch" },
  { id: "e2", name: "Jane Smith", designation: "Executive", department: "Marketing", branch: "North Branch" },
  { id: "e3", name: "Alex Johnson", designation: "Developer", department: "IT", branch: "South Branch" },
];
const periods = [
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
  { id: "custom", label: "Custom" },
];

// Mock stats
const pendingStats = {
  total: 12,
  overdue: 3,
  inProgress: 6,
  noAction: 3,
};
const completedStats = {
  total: 20,
  onTime: 15,
  delayed: 3,
  skipped: 2,
};
const delegatedMonthly = [
  { month: "Mar", value: 5 },
  { month: "Apr", value: 8 },
  { month: "May", value: 7 },
  { month: "Jun", value: 10 },
];

export default function TaskReport() {
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].id);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id);
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0].id);

  const employee = employees.find(e => e.id === selectedEmployee);

  // Chart placeholder (replace with real chart library in production)
  const LineChartPlaceholder = () => (
    <div className="w-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-50 rounded-lg" style={{ height: 120 }}>
      <LineChart className="w-16 h-16 text-blue-400 opacity-40" />
      <span className="ml-2 text-blue-400 font-bold opacity-40">[Line Chart]</span>
    </div>
  );

  return (
    <main className="flex-1 min-h-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Task Report</h1>
          <nav className="text-xs text-gray-500 mt-1">
            <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
              Company Dashboard
            </span>
            <span className="mx-1">/</span>
            <span className="text-indigo-700">Task Report</span>
          </nav>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6 space-y-8">
        {/* Filters */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex items-center gap-2 w-full md:w-1/5">
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
              <div className="flex gap-2 w-full md:w-1/5">
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
            <div className="flex items-center gap-2 w-full md:w-1/5">
              <Building2 className="w-5 h-5 text-gray-400" />
              <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Select Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/5">
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
            <div className="flex items-center gap-2 w-full md:w-1/5">
              <User className="w-5 h-5 text-gray-400" />
              <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                <SelectTrigger className="w-full h-9 text-sm">
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map(e => (
                    <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Employee Details */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex items-center gap-4">
              <User className="w-12 h-12 text-blue-500" />
              <div>
                <div className="text-lg font-bold text-gray-800">{employee?.name}</div>
                <div className="text-sm text-gray-500">Designation: <span className="font-semibold">{employee?.designation}</span></div>
                <div className="text-sm text-gray-500">Department: <span className="font-semibold">{employee?.department}</span></div>
                <div className="text-sm text-gray-500">Branch: <span className="font-semibold">{employee?.branch}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Pending Task Section */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-7 h-7 text-orange-500" />
              <div className="text-lg font-bold text-gray-800">Pending Tasks</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-500">Total Tasks</div>
                <div className="font-bold text-xl text-blue-700">{pendingStats.total}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Overdue</div>
                <div className="font-bold text-xl text-red-700">{pendingStats.overdue}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">In Progress</div>
                <div className="font-bold text-xl text-indigo-700">{pendingStats.inProgress}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">No Action</div>
                <div className="font-bold text-xl text-gray-700">{pendingStats.noAction}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Completed Task Section */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-7 h-7 text-green-500" />
              <div className="text-lg font-bold text-gray-800">Completed Tasks</div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-500">Total Tasks</div>
                <div className="font-bold text-xl text-blue-700">{completedStats.total}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">On Time</div>
                <div className="font-bold text-xl text-green-700">{completedStats.onTime}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Delayed</div>
                <div className="font-bold text-xl text-orange-700">{completedStats.delayed}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Skipped</div>
                <div className="font-bold text-xl text-gray-700">{completedStats.skipped}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Delegated Task Insights */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-7 h-7 text-indigo-500" />
              <div className="text-lg font-bold text-gray-800">Delegated Task Insights (Monthly)</div>
            </div>
            <LineChartPlaceholder />
            <div className="flex gap-6 mt-4 justify-center">
              {delegatedMonthly.map((m) => (
                <div key={m.month} className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">{m.month}</span>
                  <span className="font-semibold text-blue-700">{m.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
