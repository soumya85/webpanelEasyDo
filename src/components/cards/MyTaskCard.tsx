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

        {/* Details */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 font-bold">{t("overdue")}</span>
            <span className="font-semibold text-red-500">69</span>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-bold">{t("inProgress")}</span>
            <span className="font-semibold text-green-500">20</span>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-bold">{t("noAction")}</span>
            <span className="font-semibold text-gray-800">0</span>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mt-3 space-y-2">
          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            {/* Overdue Progress (Red) */}
            <div
              className="absolute left-0 top-0 h-full bg-red-500 transition-all duration-300"
              style={{ width: `${(69 / (69 + 20)) * 100}%` }}
            />
            {/* In Progress (Green) */}
            <div
              className="absolute top-0 h-full bg-green-500 transition-all duration-300"
              style={{
                left: `${(69 / (69 + 20)) * 100}%`,
                width: `${(20 / (69 + 20)) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-red-500 font-medium">69</span>
            <span className="text-green-500 font-medium">20</span>
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
