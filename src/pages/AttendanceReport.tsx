import { useState } from "react";
import { Calendar, User, Search, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Mock data for demonstration
const employees = [
  { id: "e1", name: "John Doe" },
  { id: "e2", name: "Jane Smith" },
  { id: "e3", name: "Alex Johnson" },
];

const mockAttendance = [
  { date: "2025-06-28", status: "Present", inTime: "09:05", outTime: "18:00", remarks: "" },
  { date: "2025-06-29", status: "Absent", inTime: "", outTime: "", remarks: "Sick Leave" },
  { date: "2025-06-30", status: "Present", inTime: "09:10", outTime: "18:05", remarks: "" },
];

export default function AttendanceReport() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic (mock)
  const filteredAttendance = mockAttendance.filter((a) =>
    (!fromDate || a.date >= fromDate) &&
    (!toDate || a.date <= toDate)
  );

  return (
    <main className="flex-1 min-h-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Attendance Report</h1>
          <nav className="text-xs text-gray-500 mt-1">
            <span className="text-blue-700 font-semibold cursor-pointer hover:underline">
              HR Dashboard
            </span>
            <span className="mx-1">/</span>
            <span className="text-indigo-700">Attendance Report</span>
          </nav>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </header>

      {/* Filters */}
      <div className="max-w-5xl mx-auto p-6">
        <Card className="mb-6 bg-white border shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 w-full md:w-1/3">
              <User className="w-5 h-5 text-gray-400" />
              <select
                className="border rounded px-3 py-2 text-sm w-full"
                value={selectedEmployee}
                onChange={e => setSelectedEmployee(e.target.value)}
              >
                <option value="">All Employees</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <Input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                className="w-full"
                placeholder="From"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/4">
              <Calendar className="w-5 h-5 text-gray-400" />
              <Input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                className="w-full"
                placeholder="To"
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-1/4">
              <Search className="w-5 h-5 text-gray-400" />
              <Input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full"
                placeholder="Search remarks"
              />
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-indigo-50 text-indigo-800 text-sm">
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">In Time</th>
                <th className="py-3 px-4 text-left font-semibold">Out Time</th>
                <th className="py-3 px-4 text-left font-semibold">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-8">
                    No attendance records found.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((a, idx) => (
                  <tr key={a.date + idx} className="border-t hover:bg-blue-50 transition">
                    <td className="py-2 px-4">{a.date}</td>
                    <td className="py-2 px-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        a.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : a.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{a.inTime || "-"}</td>
                    <td className="py-2 px-4">{a.outTime || "-"}</td>
                    <td className="py-2 px-4">{a.remarks || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="ghost"
            size="icon"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            <ChevronLeft />
          </Button>
          <span className="text-sm text-gray-600">Page {currentPage}</span>
          <Button
            variant="ghost"
            size="icon"
            disabled={filteredAttendance.length < 10}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </main>
  );
}
