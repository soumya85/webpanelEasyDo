import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Clock,
  Building2,
  Shield,
  CheckCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPunchedIn, setIsPunchedIn] = useState(true);
  const [punchInTime] = useState("10:29 AM (IST)");
  const [punchOutTime] = useState("07:15 PM");
  const [totalWorkHours] = useState("7 Hrs 51 Min");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrentDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const handlePunchAction = () => {
    setIsPunchedIn(!isPunchedIn);
  };

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-1.5 rounded-lg bg-indigo-50">
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-sm font-semibold text-[#283C50]">
            {t("myDailyWorkStatus")}
          </h3>
        </div>

        {/* Current Time and Status Row */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {/* Current Time */}
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">
              {formatCurrentTime(currentTime)}
            </div>
            <div className="text-xs text-gray-500">PM (IST)</div>
            <div className="text-xs text-gray-500">
              {formatCurrentDate(currentTime)}
            </div>
          </div>

          {/* Office Time */}
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">10:15 AM -</div>
            <div className="text-xs text-gray-500">07:15 PM</div>
            <div className="text-xs text-blue-600 font-medium">
              {t("officeHours")}
            </div>
            <div className="text-xs text-gray-500">(IST)</div>
          </div>

          {/* Branch Status */}
          <div className="text-center">
            <Building2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
            <div className="text-xs text-green-600 font-medium">Branch</div>
            <div className="text-xs text-green-600">Open</div>
          </div>

          {/* Attendance Status */}
          <div className="text-center">
            <Shield className="w-6 h-6 text-red-600 mx-auto mb-1" />
            <div className="text-xs text-red-600 font-medium">Attendance</div>
            <div className="text-xs text-red-600">Locked</div>
          </div>
        </div>

        {/* Central Punch Button */}
        <div className="flex justify-center mb-1">
          <div className="relative">
            <div
              className={cn(
                "w-12 h-12 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors",
                isPunchedIn
                  ? "border-red-300 bg-red-50"
                  : "border-green-300 bg-green-50",
              )}
              onClick={handlePunchAction}
            >
              <div className="text-center">
                <div className="w-4 h-4 mx-auto flex items-center justify-center">
                  {isPunchedIn ? (
                    <ArrowUp className="w-3 h-3 text-red-600" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-green-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "text-[10px] font-medium",
                    isPunchedIn ? "text-red-600" : "text-green-600",
                  )}
                >
                  {isPunchedIn ? "Out" : "In"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Punch Times Row */}
        <div className="grid grid-cols-3 gap-1 mb-1">
          {/* Punch In */}
          <div className="text-center">
            <div className="w-4 h-4 mx-auto mb-0.5 bg-blue-50 rounded-full flex items-center justify-center">
              <ArrowDown className="w-2 h-2 text-blue-600" />
            </div>
            <div className="text-[10px] font-medium text-gray-900">
              {punchInTime}
            </div>
            <div className="text-[9px] text-blue-600">Punch-in</div>
          </div>

          {/* Punch Out */}
          <div className="text-center">
            <div className="w-4 h-4 mx-auto mb-0.5 bg-blue-50 rounded-full flex items-center justify-center">
              <ArrowUp className="w-2 h-2 text-blue-600" />
            </div>
            <div className="text-[10px] font-medium text-gray-500">--:--</div>
            <div className="text-[9px] text-blue-600">Punch-out</div>
          </div>

          {/* Total Work */}
          <div className="text-center">
            <div className="w-4 h-4 mx-auto mb-0.5 bg-blue-50 rounded-full flex items-center justify-center">
              <Clock className="w-2 h-2 text-blue-600" />
            </div>
            <div className="text-[10px] font-medium text-gray-900">
              {totalWorkHours}
            </div>
            <div className="text-[9px] text-blue-600">Total Work</div>
          </div>
        </div>

        {/* Status Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-1.5">
          <div className="flex items-center gap-1 text-green-700">
            <CheckCircle className="w-3 h-3 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-medium">You're Present today</span>
              <div className="text-[10px]">Branch</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};
