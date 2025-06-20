import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function WagesSummary() {
  const [isWagesDetailModalOpen, setIsWagesDetailModalOpen] = useState(false);
  const wagesData = [
    {
      label: "Earning",
      amount: "₹12,738.59",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-500",
    },
    {
      label: "Deduction",
      amount: "₹1,155.03",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-l-red-500",
    },
    {
      label: "Net Pay",
      amount: "₹11,583.56",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-500",
    },
  ];

  return (
    <div className="w-full h-full">
      {/* Card with background starting from title */}
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Wages (May 2025)
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4766E5] hover:text-[#4766E5]/80"
              onClick={() => setIsWagesDetailModalOpen(true)}
            >
              View Detail
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Wages Cards */}
          <div className="grid grid-cols-1 gap-4 flex-1">
            {wagesData.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg transition-transform hover:scale-105",
                  "border-l-4 min-h-[80px]",
                  item.bgColor,
                  item.borderColor,
                )}
              >
                <div className="flex flex-col">
                  <div className="text-sm text-gray-600 font-medium mb-1">
                    {item.label}
                  </div>
                  <div className={cn("text-2xl font-bold", item.color)}>
                    {item.amount}
                  </div>
                </div>
                <div
                  className={cn("text-3xl font-light opacity-20", item.color)}
                >
                  {index === 0 ? "↗" : index === 1 ? "↘" : "→"}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600 text-center">
              Salary processed for May 2025
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
