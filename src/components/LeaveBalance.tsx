import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LeaveBalance() {
  const leaveData = [
    {
      label: "EARNED",
      value: "9.99",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-b-blue-500",
    },
    {
      label: "SICK",
      value: "4",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-b-purple-500",
    },
    {
      label: "CASUAL",
      value: "2.16",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-b-green-500",
    },
    {
      label: "OTHER",
      value: "6",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-b-orange-500",
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
              Leave Balance
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

          {/* Leave Balance Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 flex-1">
            {leaveData.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-lg",
                  "min-h-[100px] border-b-4 transition-transform hover:scale-105",
                  item.bgColor,
                  item.borderColor,
                )}
              >
                <div className={cn("text-3xl font-bold mb-2", item.color)}>
                  {item.value}
                </div>
                <div className="text-xs text-gray-600 text-center font-medium uppercase tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Status Information */}
          <div className="space-y-3 mt-auto">
            {/* Status Badges */}
            <div className="flex items-center gap-2 justify-center">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 font-medium"
              >
                3 Approved
              </Badge>
              <span className="text-gray-400">●</span>
              <Badge
                variant="secondary"
                className="bg-gray-100 text-gray-600 font-medium"
              >
                0 Pending
              </Badge>
            </div>

            {/* Carried Forward Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-gray-700 leading-relaxed text-center">
                <span className="font-semibold text-blue-600">5.83</span> unused
                leaves are carried forward from last year and added in{" "}
                <span className="font-semibold">Earn Leave (EL)</span> Balance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
