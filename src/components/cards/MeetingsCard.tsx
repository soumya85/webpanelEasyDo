import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";

interface MeetingsCardProps {
  id: string;
  index: number;
}

export const MeetingsCard: React.FC<MeetingsCardProps> = ({ id, index }) => {
  const meetings = [
    {
      type: "Weekly Team Sync",
      time: "Today at 3:00 PM",
      duration: "5 minutes",
    },
    {
      type: "Client Review Meeting",
      time: "Tomorrow at 10:30 AM",
      duration: "3 minutes",
    },
  ];

  return (
    <DashboardCard id={id} index={index}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-green-50">
          <Calendar className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50] flex-1">
          Meetings This Week
        </h3>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="mb-2">
          <div className="text-3xl font-bold text-[#4766E5]">7</div>
          <div className="text-xs text-gray-600">Scheduled Meetings</div>
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
                  {meeting.type}
                </span>
              </div>
              <div className="text-gray-500 text-xs mt-1">{meeting.time}</div>
              <div className="text-gray-500 text-xs">{meeting.duration}</div>
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
          View All Meetings
        </Button>
      </div>
    </DashboardCard>
  );
};
