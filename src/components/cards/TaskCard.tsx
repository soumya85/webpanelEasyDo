import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { TaskIcon } from "@/components/ui/task-icon";

interface TaskCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const [activeTaskTab, setActiveTaskTab] = useState("MY_TASK");
  const { t } = useTranslation();

  const taskTabsData = {
    MY_TASK: {
      value: "472",
      subtitle: t("totalPendingTasks"),
      details: [
        { label: t("overdue"), value: "23", color: "text-red-500" },
        { label: t("dueToday"), value: "18", color: "text-orange-500" },
      ],
      progress: 85,
      action: t("viewAllMyTasks"),
    },
    DELEGATED_TASK: {
      value: "34",
      subtitle: t("totalDelegatedTasks"),
      details: [
        { label: t("pendingReview"), value: "12", color: "text-orange-500" },
        { label: t("completed"), value: "22", color: "text-green-500" },
      ],
      progress: 65,
      action: t("viewDelegatedTasks"),
    },
  };

  const currentTabData = taskTabsData[activeTaskTab];

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
          {t("taskAtGlance")}
        </MultilingualText>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
        <button
          onClick={() => setActiveTaskTab("MY_TASK")}
          className={cn(
            "flex-1 text-xs font-medium py-2 px-3 rounded-md transition-all duration-200",
            activeTaskTab === "MY_TASK"
              ? "bg-white text-[#4766E5] shadow-sm"
              : "text-gray-600 hover:text-gray-800",
          )}
        >
          <MultilingualText>{t("myTask")}</MultilingualText>
        </button>
        <button
          onClick={() => setActiveTaskTab("DELEGATED_TASK")}
          className={cn(
            "flex-1 text-xs font-medium py-2 px-3 rounded-md transition-all duration-200",
            activeTaskTab === "DELEGATED_TASK"
              ? "bg-white text-[#4766E5] shadow-sm"
              : "text-gray-600 hover:text-gray-800",
          )}
        >
          <MultilingualText>{t("delegatedTask")}</MultilingualText>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="mb-2">
          <div className="text-3xl font-bold text-[#4766E5]">
            {currentTabData.value}
          </div>
          <div className="text-xs text-gray-600">{currentTabData.subtitle}</div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-xs">
          {currentTabData.details?.map((detail, idx) => (
            <div key={idx} className="flex justify-between">
              <span className="text-gray-600">{detail.label}</span>
              <span className={cn("font-semibold", detail.color)}>
                {detail.value}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">Weekly Progress</span>
            <span className="font-semibold text-[#4766E5]">
              {currentTabData.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#4766E5] h-2 rounded-full transition-all duration-300"
              style={{ width: `${currentTabData.progress}%` }}
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
          {currentTabData.action}
        </Button>
      </div>
    </DashboardCard>
  );
};
