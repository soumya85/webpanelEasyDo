import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Users, BarChart2, TrendingUp, UserCheck, FileText, User, Briefcase, DollarSign } from "lucide-react";

// Mock data for demonstration
const branches = [
  { id: "b1", name: "Main Branch", staffCount: 12 },
  { id: "b2", name: "North Branch", staffCount: 8 },
  { id: "b3", name: "South Branch", staffCount: 5 },
];

const periods = [
  { id: "this_month", label: "This Month" },
  { id: "last_month", label: "Last Month" },
  { id: "custom", label: "Custom" },
];

// Mock stats
const stats = {
  totalSales: 120000,
  invoiceCount: 45,
  clientCount: 30,
  newClients: 5,
  salesPersonStats: [
    { name: "John Doe", sales: 40000 },
    { name: "Jane Smith", sales: 35000 },
    { name: "Alex Johnson", sales: 25000 },
  ],
  jobs: [
    { name: "Website Dev", avg: 15000, highest: 25000, lowest: 8000 },
    { name: "SEO", avg: 7000, highest: 12000, lowest: 4000 },
  ],
  insights: {
    totalClients: 30,
    highestAmountPaid: 40000,
    highestCompletedJobBy: "Jane Smith",
  },
  salesLog: [
    { date: "2025-06-28", invoice: "INV-001", client: "Acme Corp", amount: 12000, status: "Paid" },
    { date: "2025-06-29", invoice: "INV-002", client: "Globex Inc", amount: 18000, status: "Unpaid" },
    { date: "2025-06-30", invoice: "INV-003", client: "Demo Ltd", amount: 22000, status: "Paid" },
  ],
};

export default function SalesRegisterInvoice() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState(periods[0].id);

  // For custom period
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  // Find selected branch details
  const branch = branches.find(b => b.id === selectedBranch);

  // Chart placeholder (replace with real chart library in production)
  const ChartPlaceholder = ({ height = 120 }: { height?: number }) => (
    <div className="w-full flex items-center justify-center bg-gradient-to-r from-blue-100 via-indigo-100 to-blue-50 rounded-lg" style={{ height }}>
      <BarChart2 className="w-16 h-16 text-blue-400 opacity-40" />
      <span className="ml-2 text-blue-400 font-bold opacity-40">[Graph]</span>
    </div>
  );

  return (
    <main className="flex-1 min-h-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Sales Register Invoice</h1>
          <nav className="text-xs text-gray-500 mt-1">
            <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
              Company Dashboard
            </span>
            <span className="mx-1">/</span>
            <span className="text-indigo-700">Sales Register Invoice</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Branch & Period Selection */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="flex items-center gap-2 w-full md:w-1/3">
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
            <div className="flex items-center gap-2 w-full md:w-1/3">
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
              <div className="flex gap-2 w-full md:w-1/3">
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
                  <div className="text-xs text-gray-500">Total Sales</div>
                  <div className="font-bold text-xl text-green-700">₹{stats.totalSales.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">No. of Invoices</div>
                  <div className="font-bold text-xl text-blue-700">{stats.invoiceCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">No. of Clients</div>
                  <div className="font-bold text-xl text-indigo-700">{stats.clientCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">New Clients</div>
                  <div className="font-bold text-xl text-purple-700">{stats.newClients}</div>
                </div>
              </div>
              <ChartPlaceholder />
            </CardContent>
          </Card>
        </div>

        {/* Section 3: Sales Person Status Graph */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-7 h-7 text-indigo-500" />
              <div className="text-lg font-bold text-gray-800">Sales Person Status</div>
            </div>
            {/* Replace with real chart */}
            <ChartPlaceholder height={100} />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.salesPersonStats.map((sp) => (
                <div key={sp.name} className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-700">{sp.name}</span>
                  <span className="ml-auto font-semibold text-green-700">₹{sp.sales.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Jobs Status */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-7 h-7 text-yellow-500" />
              <div className="text-lg font-bold text-gray-800">Jobs Status</div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-800">
                    <th className="py-2 px-4 text-left font-semibold">Job</th>
                    <th className="py-2 px-4 text-left font-semibold">Average Sales</th>
                    <th className="py-2 px-4 text-left font-semibold">Highest Sales</th>
                    <th className="py-2 px-4 text-left font-semibold">Lowest Sales</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.jobs.map((job) => (
                    <tr key={job.name} className="border-t hover:bg-blue-50 transition">
                      <td className="py-2 px-4">{job.name}</td>
                      <td className="py-2 px-4">₹{job.avg.toLocaleString()}</td>
                      <td className="py-2 px-4">₹{job.highest.toLocaleString()}</td>
                      <td className="py-2 px-4">₹{job.lowest.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                <Users className="w-4 h-4 text-blue-400" />
                Total Clients: <span className="font-semibold text-gray-700">{stats.insights.totalClients}</span>
              </li>
              <li className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-green-400" />
                Highest Amount Paid by Client: <span className="font-semibold text-gray-700">₹{stats.insights.highestAmountPaid.toLocaleString()}</span>
              </li>
              <li className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                Highest Completed Job by Employee: <span className="font-semibold text-gray-700">{stats.insights.highestCompletedJobBy}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 6: Sales Register Log */}
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-7 h-7 text-gray-500" />
              <div className="text-lg font-bold text-gray-800">Sales Register Log</div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 text-indigo-800">
                    <th className="py-2 px-4 text-left font-semibold">Date</th>
                    <th className="py-2 px-4 text-left font-semibold">Invoice</th>
                    <th className="py-2 px-4 text-left font-semibold">Client</th>
                    <th className="py-2 px-4 text-left font-semibold">Amount</th>
                    <th className="py-2 px-4 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.salesLog.map((log, idx) => (
                    <tr key={log.invoice + idx} className="border-t hover:bg-blue-50 transition">
                      <td className="py-2 px-4">{log.date}</td>
                      <td className="py-2 px-4">{log.invoice}</td>
                      <td className="py-2 px-4">{log.client}</td>
                      <td className="py-2 px-4">₹{log.amount.toLocaleString()}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                          log.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
