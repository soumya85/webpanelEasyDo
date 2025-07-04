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
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-green-50">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fd6f93891567641d1bb19c951c166916e%2F51d359c5891a4e05a53ecd2441dc52fd?format=webp&width=800"
            alt="Meet"
            className="w-5 h-5"
          />
        </div>
        <MultilingualText
          as="h3"
          className="text-sm font-semibold text-[#283C50] flex-1"
        >
          {t("meetings")}
        </MultilingualText>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="mb-2">
          <div className="text-3xl font-bold text-[#4766E5]">7</div>
          <div className="text-xs text-gray-600">
            <MultilingualText>{t("scheduledMeetings")}</MultilingualText>
          </div>
        </div>

        {/* Meeting Items */}
        <div className="space-y-2 text-xs max-h-40 overflow-y-auto">
          {meetings.map((meeting, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100 pb-1 last:border-b-0"
            >
              <div className="flex justify-between items-start">
                <span className="text-gray-800 font-medium">
                  <MultilingualText>{meeting.type}</MultilingualText>
                </span>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                <MultilingualText>{meeting.time}</MultilingualText>
              </div>
              <div className="text-gray-500 text-xs">
                <MultilingualText>{meeting.duration}</MultilingualText>
              </div>
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
          <MultilingualText>{t("viewAllMeetings")}</MultilingualText>
        </Button>
      </div>
    </DashboardCard>
  );
};
