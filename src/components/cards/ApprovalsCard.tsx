import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";

interface ApprovalsCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const ApprovalsCard: React.FC<ApprovalsCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const { t } = useTranslation();

  const approvals = [
    {
      type: `${t("leaveRequest")} - John Doe`,
      status: t("urgent"),
      time: t("submittedDaysAgo").replace("{days}", "2"),
    },
    {
      type: `${t("expenseReport")} - Marketing`,
      status: t("review"),
      time: t("submittedDaysAgo").replace("{days}", "1"),
    },
  ];

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-red-50">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50] flex-1">
          Pending Approvals
        </h3>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="mb-2">
          <div className="text-3xl font-bold text-[#4766E5]">8</div>
          <div className="text-xs text-gray-600">
            Items Awaiting Your Approval
          </div>
        </div>

        {/* Approval Items */}
        <div className="space-y-2 text-xs max-h-40 overflow-y-auto">
          {approvals.map((approval, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100 pb-1 last:border-b-0"
            >
              <div className="flex justify-between items-start">
                <span className="text-gray-800 font-medium">
                  {approval.type}
                </span>
                <Badge
                  variant={
                    approval.status === "Urgent" ? "destructive" : "secondary"
                  }
                  className="text-xs"
                >
                  {approval.status}
                </Badge>
              </div>
              <div className="text-gray-500 text-xs mt-1">{approval.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-4 pt-2 border-t border-gray-100">
        <Button
          className="w-full h-8 text-xs text-gray-700 hover:opacity-90"
          style={{
            backgroundColor: "#eff5ff",
            borderColor: "#bfdbfe",
            borderWidth: "1px",
          }}
        >
          Review Approvals
        </Button>
      </div>
    </DashboardCard>
  );
};
