import React from "react";
import { StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";

interface NotesCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const NotesCard: React.FC<NotesCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const { t } = useTranslation();

  const notes = [
    {
      text: t("followUpOnClientProposal"),
      time: t("addedHoursAgo").replace("{hours}", "3"),
    },
    { text: t("reviewQ4BudgetAllocation"), time: t("addedYesterday") },
    {
      text: t("updateTeamOnProjectTimeline"),
      time: t("addedDaysAgo").replace("{days}", "3"),
    },
  ];

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-yellow-50">
          <StickyNote className="w-5 h-5 text-yellow-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50] flex-1">
          {t("quickNotes")}
        </h3>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {/* Notes Items */}
        <div className="space-y-0 text-xs max-h-60 overflow-y-auto">
          {notes.map((note, idx) => (
            <div
              key={idx}
              className="group hover:bg-gray-50 transition-colors duration-200 rounded-lg"
            >
              <div className="px-3 py-3">
                <div className="text-gray-800 font-medium leading-relaxed mb-1">
                  {note.text}
                </div>
                <div className="text-gray-500 text-xs">{note.time}</div>
              </div>
              {idx < notes.length - 1 && (
                <div className="mx-3">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                </div>
              )}
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
          {t("addNewNote")}
        </Button>
      </div>
    </DashboardCard>
  );
};
