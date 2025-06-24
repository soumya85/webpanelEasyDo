import React from "react";
import { IndianRupee, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";

interface SalaryCardProps {
  id: string;
  index: number;
}

export const SalaryCard: React.FC<SalaryCardProps> = ({ id, index }) => {
  return (
    <DashboardCard id={id} index={index}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-50">
          <IndianRupee className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          Salary Snapshot
        </h3>
      </div>

      <div className="space-y-3 mb-4">
        {/* Green Card - Salary Amount */}
        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <div className="text-2xl font-bold text-green-600 mb-1">
            ₹ 50,000.00
          </div>
          <div className="text-sm font-medium text-green-700">Last Net Pay</div>
          <div className="text-xs text-green-600">vs previous month</div>
        </div>

        {/* Blue Card - Next Payslip */}
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Next Payslip
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">15</div>
          <div className="text-xs text-blue-600">Days Remaining</div>
        </div>

        {/* Bottom Row - Deduction Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Purple Card - Tax Deducted */}
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <div className="text-lg font-bold text-purple-600 mb-1">₹8,500</div>
            <div className="text-xs text-purple-700">Tax Deducted</div>
          </div>

          {/* Orange Card - PF Contribution */}
          <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
            <div className="text-lg font-bold text-orange-600 mb-1">₹2,200</div>
            <div className="text-xs text-orange-700">PF Contribution</div>
          </div>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <Button
          className="w-full h-8 text-xs text-white hover:opacity-90"
          style={{
            backgroundColor: "#30A853",
            borderColor: "#30A853",
            borderWidth: "1px",
          }}
        >
          Request Salary Advance
        </Button>
        <Button
          className="w-full h-8 text-xs text-gray-700 hover:opacity-90"
          style={{
            backgroundColor: "#eff5ff",
            borderColor: "#bfdbfe",
            borderWidth: "1px",
          }}
        >
          View All Payslips
        </Button>
      </div>
    </DashboardCard>
  );
};
