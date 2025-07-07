import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { CalendarDays, Clock, Users, Video } from "lucide-react";

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
      isToday: true,
      priority: "high",
      attendees: 8,
    },
    {
      type: t("clientReviewMeeting"),
      time: `${t("tomorrowAt")} 10:30 AM`,
      duration: `3 ${t("minutes")}`,
      isToday: false,
      priority: "medium",
      attendees: 5,
    },
  ];

  const totalMeetings = 7;
  const todayMeetings = meetings.filter((m) => m.isToday).length;

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 ring-1 ring-purple-100">
            <Video className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <MultilingualText
              as="h3"
              className="text-sm font-semibold text-[#283C50]"
            >
              {t("meetings")}
            </MultilingualText>
            <div className="text-xs text-gray-500 mt-0.5">
              <MultilingualText>
                {todayMeetings} {t("todayScheduled")}
              </MultilingualText>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-2 py-1 rounded-full font-medium">
            {t("live")}
          </Badge>
        </div>

        {/* Stats Section */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {totalMeetings}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              <MultilingualText>{t("scheduledMeetings")}</MultilingualText>
            </div>
          </div>

          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-600 font-medium">
                <MultilingualText>
                  {todayMeetings} {t("today")}
                </MultilingualText>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span className="text-gray-600 font-medium">
                <MultilingualText>
                  {totalMeetings - todayMeetings} {t("upcoming")}
                </MultilingualText>
              </span>
            </div>
          </div>
        </div>

        {/* Meeting Items */}
        <div className="space-y-3 flex-1 overflow-y-auto max-h-48 mb-4">
          {meetings.map((meeting, idx) => (
            <div
              key={idx}
              className="p-3 hover:bg-gradient-to-r hover:from-purple-25 hover:to-indigo-25 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-purple-200 hover:shadow-sm group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      meeting.isToday
                        ? "bg-green-500 animate-pulse"
                        : "bg-blue-500"
                    }`}
                  ></div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                      <MultilingualText>{meeting.type}</MultilingualText>
                    </span>
                    {meeting.priority === "high" && (
                      <Badge
                        variant="destructive"
                        className="text-xs px-1.5 py-0.5 text-white"
                      >
                        {t("high")}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <MultilingualText>{meeting.time}</MultilingualText>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{meeting.attendees}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-1 font-medium">
                    <MultilingualText>{meeting.duration}</MultilingualText>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Button className="w-full py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <CalendarDays className="w-4 h-4 mr-2" />
            <MultilingualText>{t("viewAllMeetings")}</MultilingualText>
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};
