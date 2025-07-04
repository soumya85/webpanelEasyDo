import React from "react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { TaskIcon } from "@/components/ui/task-icon";

interface DelegatedTaskCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const DelegatedTaskCard: React.FC<DelegatedTaskCardProps> = ({
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
        <div className="p-2 rounded-lg bg-purple-50">
          <TaskIcon size="md" className="text-purple-600" />
        </div>
        <MultilingualText
          as="h3"
          className="text-sm font-semibold text-[#283C50] flex-1"
        >
          {t("delegatedTask")}
        </MultilingualText>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="mb-2">
          <div className="text-3xl font-bold text-[#4766E5]">34</div>
          <div className="text-xs text-gray-600">
            {t("totalDelegatedTasks")}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-600">{t("pendingReview")}</span>
            <span className="font-semibold text-orange-500">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("completed")}</span>
            <span className="font-semibold text-green-500">22</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Weekly Progress</span>
            <span className="font-semibold text-[#4766E5]">65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#4766E5] h-2 rounded-full transition-all duration-300"
              style={{ width: "65%" }}
            ></div>
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
          {t("viewDelegatedTasks")}
        </Button>
      </div>
    </DashboardCard>
  );
};
