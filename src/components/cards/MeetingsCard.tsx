import React from "react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";

interface MeetingsCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const MeetingsCard: React.FC<MeetingsCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const { t } = useTranslation();
  const meetings = [
    {
      type: t("weeklyTeamSync"),
      time: `${t("todayAt")} 3:00 PM`,
      duration: `5 ${t("minutes")}`,
    },
    {
      type: t("clientReviewMeeting"),
      time: `${t("tomorrowAt")} 10:30 AM`,
      duration: `3 ${t("minutes")}`,
    },
  ];

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
            {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-orange-600"></div>
        </div>
        <h3 className="text-sm font-semibold text-orange-600 uppercase tracking-wide">
          Meetings
        </h3>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
                <div className="mb-4">
          <div className="text-4xl font-bold text-[#4766E5] mb-1">7</div>
          <div className="text-sm font-medium text-gray-700">
            Scheduled Meetings
          </div>
        </div>

                {/* Meeting Items */}
        <div className="space-y-3 text-sm max-h-40 overflow-y-auto">
          <div className="space-y-2">
            <div className="font-medium text-gray-800">Weekly Team Sync</div>
            <div className="text-xs text-gray-500">Today at 3:00 PM</div>
            <div className="text-xs text-gray-500">5 minutes</div>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-800">Client Review Meeting</div>
            <div className="text-xs text-gray-500">Tomorrow at 10:30 AM</div>
            <div className="text-xs text-gray-500">3 minutes</div>
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
          <MultilingualText>{t("viewAllMeetings")}</MultilingualText>
        </Button>
      </div>
    </DashboardCard>
  );
};
