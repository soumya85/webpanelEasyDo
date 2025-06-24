import React from "react";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "../DashboardCard";

interface SalaryCardProps {
  id: string;
  index: number;
}

export const SalaryCard: React.FC<SalaryCardProps> = ({ id, index }) => {
  return (
    <DashboardCard id={id} index={index}>
      {/* Header with gradient icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
          <IndianRupee className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Salary Snapshot
        </h3>
      </div>

      {/* Main salary display with elegant styling */}
      <div className="relative p-6 mb-6 rounded-2xl bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border border-green-200/50 shadow-sm">
        <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <div className="text-3xl font-black text-green-700 mb-2 tracking-tight">
          ₹ 50,000.00
        </div>
        <div className="space-y-1">
          <div className="text-sm font-medium text-green-600">
            • As on 23rd Jun 2025
          </div>
          <div className="text-sm font-medium text-green-600">
            • Your Next Payslip in{" "}
            <span className="font-bold text-blue-600 px-2 py-1 bg-blue-100 rounded-lg">
              7 Days
            </span>
          </div>
        </div>
      </div>

      {/* Financial breakdown with modern cards */}
      <div className="space-y-3 mb-6">
        <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200/50 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-red-700">
              Tax Deducted
            </span>
            <span className="text-lg font-bold text-red-600 px-3 py-1 bg-red-100 rounded-lg">
              ₹8,500
            </span>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/50 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-blue-700">
              PF Contribution
            </span>
            <span className="text-lg font-bold text-blue-600 px-3 py-1 bg-blue-100 rounded-lg">
              ₹2,200
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons with modern styling */}
      <div className="space-y-3">
        <Button className="w-full h-10 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 rounded-xl shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 hover:scale-[1.02]">
          Request Salary Advance
        </Button>
        <Button className="w-full h-10 text-sm font-semibold text-slate-700 bg-gradient-to-r from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 border border-slate-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
          View All Payslips
        </Button>
      </div>
    </DashboardCard>
  );
};
