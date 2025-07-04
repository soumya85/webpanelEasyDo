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
          className="text-sm font-semibold text-[#4766E5] flex-1"
        >
          {t("pendingTasks")}
        </MultilingualText>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="mb-4">
          <div className="text-3xl font-bold text-[#4766E5]">69</div>
          <div className="w-8 h-1 bg-[#4766E5] rounded-full mt-1"></div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-3 gap-3 text-xs">
          <div className="text-center">
            <div className="text-lg font-bold text-red-500">69</div>
            <div className="text-red-500 font-medium">{t("overdue")}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">20</div>
            <div className="text-green-500 font-medium">{t("inProgress")}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">0</div>
            <div className="text-gray-800 font-medium">{t("noAction")}</div>
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
