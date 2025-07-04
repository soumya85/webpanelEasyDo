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
        {/* Pie Chart Section */}
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Blue segment (10/15 = 66.67%) */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="8"
                strokeDasharray={`${(10 / 15) * 175.93} 175.93`}
                strokeDashoffset="0"
              />
              {/* Purple segment (5/15 = 33.33%) */}
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#A855F7"
                strokeWidth="8"
                strokeDasharray={`${(5 / 15) * 175.93} 175.93`}
                strokeDashoffset={`-${(10 / 15) * 175.93}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs font-bold text-purple-600">5</div>
                <div className="text-xs font-bold text-blue-600">10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-xs text-blue-600 font-medium">
            Completed Tasks
          </div>
          <div className="text-xs text-gray-500 font-medium">All Time</div>
        </div>

        {/* Main Number */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-blue-600 border-b-2 border-blue-600 inline-block pb-1">
            15
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">10</div>
            <div className="text-xs text-blue-600 font-medium">On Time</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">5</div>
            <div className="text-xs text-purple-600 font-medium">Delayed</div>
          </div>
          <div>
            <div className="text-lg font-bold text-red-500">0</div>
            <div className="text-xs text-red-500 font-medium">Skipped</div>
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
