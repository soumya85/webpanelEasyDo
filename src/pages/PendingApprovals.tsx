import { useNavigate } from "react-router-dom";
import {
  UserCheck,
  FileText,
  Clock,
  FileSignature,
  FileInput,
  BadgeCheck,
  Wallet,
  Plane,
  Briefcase,
  Receipt,
  HandCoins
} from "lucide-react";

const adminApprovals = [
  { label: "Leave Request", icon: UserCheck, route: "/approvals/leave" },
  { label: "Salary Advance Request", icon: FileText, route: "/approvals/salary-advance" },
  { label: "Overtime Request", icon: Clock, route: "/approvals/overtime" },
  { label: "Quotation Approval Request", icon: FileSignature, route: "/approvals/quotation" },
  { label: "Contract Approval", icon: FileInput, route: "/approvals/contract" },
  { label: "Punch In Approval", icon: BadgeCheck, route: "/approvals/punch-in" },
];

const employeeExpenseApprovals = [
  { label: "Operation", icon: Briefcase, route: "/approvals/expense/operation" },
  { label: "General", icon: Receipt, route: "/approvals/expense/general" },
  { label: "Travel", icon: Plane, route: "/approvals/expense/travel" },
];

const vendorPayments = [
  { label: "Payment Request", icon: HandCoins, route: "/approvals/vendor/payment" },
];

export default function PendingApprovals() {
  const navigate = useNavigate();

  return (
    <main className="flex-1 min-h-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 font-inter">
      <header className="bg-white border-b px-6 py-6 flex flex-col md:flex-row items-center justify-between shadow-sm sticky top-0 z-20">
        <h1 className="text-2xl font-extrabold text-indigo-800 tracking-tight">Pending Approvals</h1>
      </header>
      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Admin Approvals */}
        <section>
          <h2 className="text-lg font-bold text-blue-700 mb-4">Admin Approvals</h2>
          <div className="space-y-3">
            {adminApprovals.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 bg-white rounded-lg shadow hover:shadow-md px-4 py-3 text-left border border-blue-100 hover:border-blue-300 transition"
                onClick={() => navigate(item.route)}
              >
                <item.icon className="w-6 h-6 text-blue-500" />
                <span className="font-medium text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
        {/* Employee Expense Approvals */}
        <section>
          <h2 className="text-lg font-bold text-green-700 mb-4">Employee Expense Approvals</h2>
          <div className="space-y-3">
            {employeeExpenseApprovals.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 bg-white rounded-lg shadow hover:shadow-md px-4 py-3 text-left border border-green-100 hover:border-green-300 transition"
                onClick={() => navigate(item.route)}
              >
                <item.icon className="w-6 h-6 text-green-500" />
                <span className="font-medium text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
        {/* Vendor Payment */}
        <section>
          <h2 className="text-lg font-bold text-indigo-700 mb-4">Vendor Payment</h2>
          <div className="space-y-3">
            {vendorPayments.map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center gap-3 bg-white rounded-lg shadow hover:shadow-md px-4 py-3 text-left border border-indigo-100 hover:border-indigo-300 transition"
                onClick={() => navigate(item.route)}
              >
                <item.icon className="w-6 h-6 text-indigo-500" />
                <span className="font-medium text-gray-800">{item.label}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
