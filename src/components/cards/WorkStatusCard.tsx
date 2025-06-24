import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";

interface WorkStatusCardProps {
  id: string;
  index: number;
}

export const WorkStatusCard: React.FC<WorkStatusCardProps> = ({
  id,
  index,
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
    <DashboardCard
      id={id}
      index={index}
      className={cn("bg-white rounded-xl border-b-4 border-[#4766E5]")}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-50">
          <Clock className="w-5 h-5 text-indigo-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          My Daily Work Status
        </h3>
      </div>

      <div className="text-center mb-4">
        <div className="text-2xl font-bold text-[#4766E5] mb-1">
          {formatTime(currentTime)}
        </div>
        <div className="text-xs text-gray-600">Monday 23 Jun, 2025</div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
          <span className="text-xs text-gray-600">Office Hours</span>
          <span className="text-xs font-semibold text-[#4766E5]">
            09:00 AM To 06:00 PM
          </span>
        </div>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Punch Status
          </div>
          <div className="text-lg font-bold text-red-600 mb-2">
            {punchStatus}
          </div>
        </div>
      </div>

      {punchStatus === "NOT PUNCHED IN" && (
        <Button
          onClick={handlePunchIn}
          className="w-full mb-3 h-10 text-gray-700 hover:opacity-90"
          style={{
            backgroundColor: "#eff5ff",
            borderColor: "#bfdbfe",
            borderWidth: "1px",
          }}
        >
          ⏰ PUNCH IN
        </Button>
      )}

      <div className="text-xs text-gray-500 text-center mb-3">
        Punch-in is tracked for attendance
      </div>

      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
        <div className="flex items-center gap-2 text-orange-600 text-xs">
          <Bell className="w-3 h-3" />
          <span className="font-medium">Attendance is locked @01:31 AM.</span>
        </div>
        <div className="text-xs text-orange-600 mt-1">
          For Punch-in: Click above for request for Approval to yr Reporting
          Manager...
        </div>
      </div>

      <div className="text-center">
        <div className="text-xs font-medium text-gray-700 mb-1">
          Location Timeline
        </div>
        <div className="text-xs text-gray-500">
          (Tracked ONLY between Punch-in & Punch-out as per Mandate of the
          company)
        </div>
        <Button
          className="w-full mt-2 h-8 text-xs text-gray-700 hover:opacity-90"
          style={{
            backgroundColor: "#eff5ff",
            borderColor: "#bfdbfe",
            borderWidth: "1px",
          }}
        >
          Click here for more Detail
        </Button>
      </div>
    </DashboardCard>
  );
};
