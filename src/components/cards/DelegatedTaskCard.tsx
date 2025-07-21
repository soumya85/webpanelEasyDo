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
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
        </div>
        <h3 className="text-sm font-semibold text-purple-600 uppercase tracking-wide">
          DELEGATED TASK
        </h3>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
                <div className="mb-4">
          <div className="text-4xl font-bold text-[#4766E5] mb-1">15</div>
          <div className="text-sm font-medium text-gray-700">
            Completed Tasks
          </div>
        </div>

                {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">On Time</span>
            <span className="font-semibold text-blue-500">10</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Delayed</span>
            <span className="font-semibold text-purple-500">5</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Skipped</span>
            <span className="font-semibold text-gray-500">0</span>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="mt-3 space-y-2">
          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            {/* On Time Progress (Blue) */}
            <div
              className="absolute left-0 top-0 h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${(10 / (10 + 5)) * 100}%` }}
            />
            {/* Delayed Progress (Purple) */}
            <div
              className="absolute top-0 h-full bg-purple-500 transition-all duration-300"
              style={{
                left: `${(10 / (10 + 5)) * 100}%`,
                width: `${(5 / (10 + 5)) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-blue-500 font-medium">10</span>
            <span className="text-purple-500 font-medium">5</span>
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
