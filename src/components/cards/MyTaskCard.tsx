import React from "react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { TaskIcon } from "@/components/ui/task-icon";

interface MyTaskCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const MyTaskCard: React.FC<MyTaskCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const { t } = useTranslation();

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-blue-50">
          <TaskIcon size="md" className="text-blue-600" />
        </div>
        <MultilingualText
          as="h3"
          className="text-sm font-semibold text-[#283C50] flex-1"
        >
          {t("myTask")}
        </MultilingualText>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="mb-2 flex items-center gap-3">
          <div className="text-3xl font-bold text-[#4766E5]">69</div>
          <div className="text-sm font-bold text-gray-600">
            {t("totalPendingTasks")}
          </div>
        </div>

        {/* Progress Circles */}
        <div className="flex items-center justify-around mt-4">
          {/* Overdue Progress Circle */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <svg
                className="w-16 h-16 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-red-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="77.4, 100"
                  strokeLinecap="round"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-red-500">69</span>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-600 mt-1">
              {t("overdue")}
            </span>
          </div>

          {/* In Progress Circle */}
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <svg
                className="w-16 h-16 transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-green-500"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="22.4, 100"
                  strokeLinecap="round"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-green-500">20</span>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-600 mt-1">
              {t("inProgress")}
            </span>
          </div>
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
          {t("viewAllMyTasks")}
        </Button>
      </div>
    </DashboardCard>
  );
};
