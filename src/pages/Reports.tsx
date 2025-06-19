
import { SidebarTrigger } from "@/components/ui/sidebar";
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

const reportItems = [
  {
    id: 1,
    title: "Attendance Report",
    icon: Calendar,
    color: "bg-blue-500",
    iconPath: "/icons/attendance-report.svg",
    route: "/attendance-report"
  },
  {
    id: 2,
    title: "Sales Register",
    icon: FileText,
    color: "bg-blue-500",
    iconPath: "/icons/sales-register.svg",
    route: "/sales-register"
  },
  {
    id: 3,
    title: "Approvals",
    icon: CheckSquare,
    color: "bg-blue-500",
    iconPath: "/icons/approvals.svg",
  },
  {
    id: 4,
    title: "Operational Expenses",
    icon: HelpCircle,
    color: "bg-blue-500",
    iconPath: "/icons/expenses.svg",
  },
  {
    id: 5,
    title: "Salary Statement",
    icon: CreditCard,
    color: "bg-blue-500",
    iconPath: "/icons/salary-statement.svg",
  },
  {
    id: 6,
    title: "Employee Performance Report",
    icon: TrendingUp,
    color: "bg-blue-500",
    iconPath: "/icons/performance-report.svg",
  },
  {
    id: 7,
    title: "Task Report",
    icon: ClipboardList,
    color: "bg-blue-500",
    iconPath: "/icons/task-report.svg",
  }
];

export default function Reports() {
  return (
    <main className="flex-1 overflow-auto">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          
          <h1 className="text-2xl font-semibold">Reports</h1>
        </div>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {reportItems.map((item) => (
            <Card
              key={item.id} style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)", borderBottomColor: "#2E4DCE" }}
              className="bg-white cursor-pointer border-b-4 "
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`w-16 h-16  flex items-center justify-center mb-4`}>
                  <img src={item.iconPath} alt={item.title} className="w-15 h-15" />
                </div>
                <h3 className="font-medium text-gray-900 text-sm">
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
