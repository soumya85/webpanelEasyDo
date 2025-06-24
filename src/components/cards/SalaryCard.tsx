import React from "react";
import { IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";

interface SalaryCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const SalaryCard: React.FC<SalaryCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
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

      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-lg font-bold text-green-600">₹ 50,000.00</div>
        </div>
        <div className="text-xs text-gray-600">• As on 23rd Jun 2025.</div>
        <div className="text-xs text-gray-600">
          • Your Next Payslip to be generated in{" "}
          <span className="font-semibold text-[#4766E5]">7 Days</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="space-y-2 mb-4">
          <div className="mt-2 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Deducted</span>
              <span className="text-red-600 font-semibold">₹8,500</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">PF Contribution</span>
              <span className="text-blue-600 font-semibold">₹2,200</span>
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
      </div>
    </DashboardCard>
  );
};
