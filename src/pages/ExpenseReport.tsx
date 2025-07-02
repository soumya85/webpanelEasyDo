import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Calendar, Users, BarChart2, TrendingUp, User, Briefcase, DollarSign, PieChart, LineChart, CheckCircle2, Clock, XCircle
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
  totalAmount: 90000,
  paidOut: 70000,
  pendingOut: 20000,
  expensesByStatus: {
    approved: 60,
    pending: 25,
    rejected: 15,
  },
  insights: {
    highestCategory: "Travel",
    lowestCategory: "General",
    allCategories: [
      { name: "Travel", amount: 35000 },
      { name: "Operational", amount: 25000 },
      { name: "Reimbursement", amount: 15000 },
      { name: "General", amount: 5000 },
    ],
    compareToLastMonth: "+12%",
  },
  approvedByCategory: [
    { name: "Advance Payment", amount: 12000 },
    { name: "Payment", amount: 18000 },
    { name: "Travel", amount: 35000 },
    { name: "Operational", amount: 25000 },
    { name: "Reimbursement", amount: 15000 },
    { name: "Quotation", amount: 8000 },
    { name: "Contact", amount: 4000 },
    { name: "General", amount: 5000 },
  ],
  lastFourMonths: [
    { month: "Mar", amount: 20000 },
    { month: "Apr", amount: 25000 },
    { month: "May", amount: 22000 },
    { month: "Jun", amount: 23000 },
  ],
};

export default function ExpenseReport() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].id);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const branch = branches.find(b => b.id === selectedBranch);

  // Chart placeholders (replace with real chart library in production)
  const PieChartPlaceholder = () => (
    <div className="w-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-50 rounded-lg" style={{ height: 120 }}>
      <PieChart className="w-16 h-16 text-blue-400 opacity-40" />
      <span className="ml-2 text-blue-400 font-bold opacity-40">[Pie Chart]</span>
    </div>
  );
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
          <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Expense Report</h1>
          <nav className="text-xs text-gray-500 mt-1">
            <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
              Company Dashboard
            </span>
            <span className="mx-1">/</span>
            <span className="text-indigo-700">Expense Report</span>
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
          {/* Section 2: Amount Status */}
          <Card className="bg-white border shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="w-7 h-7 text-green-500" />
                <div className="text-lg font-bold text-gray-800">Amount Status</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-500">Total Amount</div>
                  <div className="font-bold text-xl text-green-700">₹{stats.totalAmount.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Paid Out Expenses</div>
                  <div className="font-bold text-xl text-blue-700">₹{stats.paidOut.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Pending Out Expenses</div>
                  <div className="font-bold text-xl text-orange-700">₹{stats.pendingOut.toLocaleString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Expenses by Status with Graph */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart2 className="w-7 h-7 text-indigo-500" />
              <div className="text-lg font-bold text-gray-800">Expenses by Status</div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-700">Approved</span>
                  <span className="ml-auto font-semibold text-green-700">{stats.expensesByStatus.approved}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="text-sm text-gray-700">Pending</span>
                  <span className="ml-auto font-semibold text-orange-700">{stats.expensesByStatus.pending}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-gray-700">Rejected</span>
                  <span className="ml-auto font-semibold text-red-700">{stats.expensesByStatus.rejected}%</span>
                </div>
              </div>
              <div className="flex-1">
                <PieChartPlaceholder />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Insights */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-7 h-7 text-pink-500" />
              <div className="text-lg font-bold text-gray-800">Insights</div>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Highest Spend Category:</span>
                <span className="text-blue-700">{stats.insights.highestCategory}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Lowest Spend Category:</span>
                <span className="text-gray-700">{stats.insights.lowestCategory}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Every Spend Category:</span>
                <span>
                  {stats.insights.allCategories.map((cat, idx) => (
                    <span key={cat.name} className="mr-2">
                      {cat.name} (<span className="text-gray-500">₹{cat.amount.toLocaleString()}</span>)
                      {idx < stats.insights.allCategories.length - 1 && ","}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Compare to Last Month:</span>
                <span className="text-green-700">{stats.insights.compareToLastMonth}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 6: Approved Expenses by Category */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-7 h-7 text-green-500" />
              <div className="text-lg font-bold text-gray-800">Approved Expenses by Category</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {stats.approvedByCategory.map((cat) => (
                <div key={cat.name} className="flex items-center gap-2 bg-blue-50 rounded-lg px-4 py-3">
                  <span className="font-semibold text-gray-700">{cat.name}</span>
                  <span className="ml-auto text-green-700 font-bold">₹{cat.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Last Section: Last Four Month Expenses Line Graph */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <LineChart className="w-7 h-7 text-indigo-500" />
              <div className="text-lg font-bold text-gray-800">Last Four Month Expenses</div>
            </div>
            <LineChartPlaceholder />
            <div className="flex gap-6 mt-4 justify-center">
              {stats.lastFourMonths.map((m) => (
                <div key={m.month} className="flex flex-col items-center">
                  <span className="text-xs text-gray-500">{m.month}</span>
                  <span className="font-semibold text-blue-700">₹{m.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
