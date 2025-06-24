import React from "react";
import { Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";

interface PerformanceCardProps {
  id: string;
  index: number;
}

export const PerformanceCard: React.FC<PerformanceCardProps> = ({
  id,
  index,
}) => {
  return (
    <DashboardCard id={id} index={index}>
      {/* Header with gradient icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/20">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-sm font-bold text-slate-800 tracking-tight">
          My Performance
        </h3>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Rating display with enhanced styling */}
        <div className="text-center mb-6 p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200/50 shadow-sm">
          <div className="flex justify-center mb-3 gap-1">
            {[1, 2, 3, 4].map((star) => (
              <Star
                key={star}
                className="w-6 h-6 text-yellow-500 fill-current drop-shadow-sm"
              />
            ))}
            <Star className="w-6 h-6 text-gray-300" />
          </div>
          <div className="text-4xl font-black text-indigo-700 mb-2 tracking-tight">
            4.4
          </div>
          <div className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full inline-block">
            Average over 23 task reviews
          </div>
        </div>

        {/* Encouragement message */}
        <div className="text-center mb-6 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200">
          <div className="text-lg font-bold text-green-700 mb-1">
            Nice, Keep it up! 💪
          </div>
          <div className="text-sm text-green-600">You're doing great!</div>
        </div>

        {/* Achievement badge */}
        <div className="text-center mb-6 p-6 rounded-2xl bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border border-yellow-200 shadow-sm">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mb-3 shadow-lg shadow-yellow-500/25">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div className="text-sm font-bold text-slate-800 mb-1">
            Employee of the Month
          </div>
          <div className="text-xs font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full inline-block">
            June 2025
          </div>
        </div>

        {/* Action button */}
        <Button className="w-full h-10 text-sm font-semibold text-slate-700 bg-gradient-to-r from-slate-100 to-gray-100 hover:from-slate-200 hover:to-gray-200 border border-slate-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01] mt-auto">
          View Performance Details
        </Button>
      </div>
    </DashboardCard>
  );
};
