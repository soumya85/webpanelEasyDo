import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";

interface AttendanceCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  return (
    <DashboardCard id={id} index={index}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-green-50">
          <Calendar className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">
          Monthly Attendance Summary
        </h3>
      </div>

      <div className="text-xs text-gray-600 mb-3">- June 2025</div>
      <div className="text-xs text-gray-600 mb-4">
        Total Days: 30 | Working Days: 22
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="text-lg font-bold text-green-600">22</div>
          <div className="text-xs text-green-600">Present</div>
        </div>
        <div className="text-center p-2 bg-red-50 rounded">
          <div className="text-lg font-bold text-red-600">0</div>
          <div className="text-xs text-red-600">Absent</div>
        </div>
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="text-lg font-bold text-blue-600">5</div>
          <div className="text-xs text-blue-600">Sunday</div>
        </div>
        <div className="text-center p-2 bg-orange-50 rounded">
          <div className="text-lg font-bold text-orange-600">3</div>
          <div className="text-xs text-orange-600">Holiday</div>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <div className="text-lg font-bold text-purple-600">0</div>
          <div className="text-xs text-purple-600">Late</div>
        </div>
        <div className="text-center p-2 bg-pink-50 rounded">
          <div className="text-lg font-bold text-pink-600">0</div>
          <div className="text-xs text-pink-600">Red Flag</div>
        </div>
      </div>

      <Button
        className="w-full h-8 text-xs text-gray-700 hover:opacity-90"
        style={{
          backgroundColor: "#eff5ff",
          borderColor: "#bfdbfe",
          borderWidth: "1px",
        }}
      >
        View Detailed Report
      </Button>
    </DashboardCard>
  );
};
