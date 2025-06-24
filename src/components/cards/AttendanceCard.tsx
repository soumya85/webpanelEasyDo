import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";

interface AttendanceCardProps {
  id: string;
  index: number;
}

export const AttendanceCard: React.FC<AttendanceCardProps> = ({
  id,
  index,
}) => {
  return (
    <DashboardCard id={id} index={index}>
      {/* Header with gradient icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          Monthly Attendance Summary
        </h3>
      </div>

      {/* Period indicator */}
      <div className="p-4 mb-6 rounded-xl bg-gradient-to-r from-slate-50 to-gray-100 border border-slate-200">
        <div className="text-lg font-bold text-slate-800 mb-1">June 2025</div>
        <div className="text-sm text-slate-600">
          <span className="font-semibold">Total Days:</span> 30 |{" "}
          <span className="font-semibold">Working Days:</span> 22
        </div>
      </div>

      {/* Attendance stats with beautiful cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-black text-green-700 mb-1">22</div>
          <div className="text-xs font-semibold text-green-600 uppercase tracking-wide">
            Present
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-rose-100 border border-red-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-black text-red-700 mb-1">0</div>
          <div className="text-xs font-semibold text-red-600 uppercase tracking-wide">
            Absent
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-sky-100 border border-blue-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-black text-blue-700 mb-1">5</div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
            Sunday
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-black text-orange-700 mb-1">3</div>
          <div className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
            Holiday
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-black text-purple-700 mb-1">0</div>
          <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
            Late
          </div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <div className="text-2xl font-black text-pink-700 mb-1">0</div>
          <div className="text-xs font-semibold text-pink-600 uppercase tracking-wide">
            Red Flag
          </div>
        </div>
      </div>

      {/* Action button */}
      <Button className="w-full h-10 text-sm font-semibold text-slate-700 bg-gradient-to-r from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 border border-slate-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01]">
        View Detailed Report
      </Button>
    </DashboardCard>
  );
};
