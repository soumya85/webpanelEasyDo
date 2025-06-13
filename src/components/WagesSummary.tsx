import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function WagesSummary() {
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
      amount: "��1,155.03",
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
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[#283C50] font-inter text-xl font-bold">
          Wages (May 2025)
        </h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#4766E5] hover:text-[#4766E5]/80"
        >
          View Detail
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>

      {/* Wages Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {wagesData.map((item, index) => (
          <Card
            key={item.label}
            className={cn(
              "bg-white border border-gray-200 shadow-sm transition-transform hover:scale-105",
              "border-l-4",
              item.borderColor,
            )}
          >
            <CardContent className={cn("p-6", item.bgColor)}>
              <div className="text-center">
                <div className="text-sm text-gray-600 font-medium mb-2">
                  {item.label}
                </div>
                <div className={cn("text-2xl font-bold", item.color)}>
                  {item.amount}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
