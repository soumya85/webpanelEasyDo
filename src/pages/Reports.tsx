import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  FileText,
  CheckSquare,
  HelpCircle,
  CreditCard,
  TrendingUp,
  ClipboardList
} from "lucide-react";

// Use Lucide icons directly for best performance and consistency
const reportItems = [
  {
    id: 1,
    title: "Attendance Report",
    icon: Calendar,
    color: "bg-blue-100 text-blue-700",
    route: "/attendance-report"
  },
  {
    id: 2,
    title: "Sales Register",
    icon: FileText,
    color: "bg-green-100 text-green-700",
    route: "/sales-register"
  },
  {
    id: 3,
    title: "Approvals",
    icon: CheckSquare,
    color: "bg-yellow-100 text-yellow-700",
    route: "/approvals-report"
  },
  {
    id: 4,
    title: "Operational Expenses",
    icon: HelpCircle,
    color: "bg-red-100 text-red-700",
    route: "/operational-expenses"
  },
  {
    id: 5,
    title: "Salary Statement",
    icon: CreditCard,
    color: "bg-indigo-100 text-indigo-700",
    route: "/salary-statement"
  },
  {
    id: 6,
    title: "Employee Performance Report",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-700",
    route: "/performance-report"
  },
  {
    id: 7,
    title: "Task Report",
    icon: ClipboardList,
    color: "bg-teal-100 text-teal-700",
    route: "/task-report"
  }
];

export default function Reports() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 overflow-auto bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen font-inter">
      {/* Header with subtle shadow and breadcrumb */}
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Reports</h1>
          <nav className="text-xs text-gray-500 mt-1">
            <span
              className="text-blue-700 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/company-dashboard")}
            >
              Company Dashboard
            </span>
            <span className="mx-1">/</span>
            <span className="text-indigo-700">Reports</span>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
          {reportItems.map((item) => (
            <Card
              key={item.id}
              onClick={() => item.route && navigate(item.route)}
              className="bg-white cursor-pointer border-0 shadow-lg hover:shadow-2xl transition group rounded-2xl ring-1 ring-indigo-50 hover:ring-indigo-200 focus:ring-2 focus:ring-indigo-400"
              tabIndex={0}
              aria-label={item.title}
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 ${item.color} shadow-md group-hover:scale-105 transition-transform`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-indigo-700 transition">
                  {item.title}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
