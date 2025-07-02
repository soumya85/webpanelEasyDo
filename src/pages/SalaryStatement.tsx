import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "lucide-react";

// Mock data for demonstration
const employees = [
  { id: "e1", name: "John Doe" },
  { id: "e2", name: "Jane Smith" },
  { id: "e3", name: "Alex Johnson" },
];

const salaryStatements = {
  e1: [
    { month: "March 2025", status: "Paid" },
    { month: "April 2025", status: "Paid" },
    { month: "May 2025", status: "Pending" },
    { month: "June 2025", status: "Paid" },
  ],
  e2: [
    { month: "March 2025", status: "Paid" },
    { month: "April 2025", status: "Paid" },
    { month: "May 2025", status: "Paid" },
    { month: "June 2025", status: "Paid" },
  ],
  e3: [
    { month: "March 2025", status: "Pending" },
    { month: "April 2025", status: "Paid" },
    { month: "May 2025", status: "Paid" },
    { month: "June 2025", status: "Pending" },
  ],
};

export default function SalaryStatement() {
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");

  const statements = selectedEmployee ? salaryStatements[selectedEmployee] || [] : [];

  return (
    <main className="flex-1 min-h-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Salary Statement</h1>
      </header>
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <Card className="bg-white border shadow-sm">
          <CardContent className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full md:w-1/2">
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
            {selectedEmployee && (
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border rounded-lg">
                  <thead>
                    <tr className="bg-indigo-50 text-indigo-800 text-sm">
                      <th className="py-3 px-4 text-left font-semibold">Month</th>
                      <th className="py-3 px-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statements.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="text-center text-gray-400 py-8">
                          No salary statements found.
                        </td>
                      </tr>
                    ) : (
                      statements.map((s, idx) => (
                        <tr key={s.month + idx} className="border-t hover:bg-blue-50 transition">
                          <td className="py-2 px-4">{s.month}</td>
                          <td className="py-2 px-4">
                            <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                              s.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
