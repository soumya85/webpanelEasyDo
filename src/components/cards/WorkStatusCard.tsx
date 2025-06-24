import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertTriangle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";

interface WorkStatusCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const WorkStatusCard: React.FC<WorkStatusCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [punchStatus, setPunchStatus] = useState("NOT PUNCHED IN");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handlePunchIn = () => {
    setPunchStatus("PUNCHED IN");
  };

  return (
    <DashboardCard id={id} index={index}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-indigo-50">
            <Clock className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-sm font-semibold text-[#283C50]">
            My Daily Work Status
          </h3>
        </div>

        <div className="flex-1">
          {/* Office Hours Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                Office Hours
              </span>
            </div>
            <div className="text-sm text-blue-700">09:00 AM To 06:00 PM</div>
          </div>

          {/* Punch Status Section */}
          <div className="mb-3">
            <div className="text-sm font-medium text-gray-700 mb-2">
              Punch Status
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
              <div className="text-red-700 font-semibold">{punchStatus}</div>
            </div>
          </div>

          {/* Punch In Button */}
          {punchStatus === "NOT PUNCHED IN" && (
            <Button
              onClick={handlePunchIn}
              className="w-full mb-3 bg-green-600 hover:bg-green-700 text-white font-medium py-3"
            >
              <Play className="w-4 h-4 mr-2" />
              PUNCH IN
            </Button>
          )}

          <div className="text-xs text-gray-500 text-center mb-3">
            Punch actions are tracked for attendance
          </div>

          {/* Warning Message */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
            <div className="flex items-start gap-2 text-orange-700 text-sm">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-medium">
                  Attendance is locked @11:31 AM.
                </span>
                <span className="block">
                  For Punch-in, Click above try request for Approval, to yr
                  Reporting Manager...
                </span>
              </div>
            </div>
          </div>

          {/* Location Timeline Section */}
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Location Timeline
            </div>
            <div className="text-xs text-gray-500 mb-2">
              (Tracked ONLY between Punch-in & Punch-out as per Mandate of the
              company)
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2">
            Click Here For More Detail
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};
