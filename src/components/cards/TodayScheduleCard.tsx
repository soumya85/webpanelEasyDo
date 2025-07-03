import { Card } from "@/components/ui/card";
import { Users, CheckCircle2, XCircle } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
interface TodayScheduleCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}
export const TodayScheduleCard: React.FC<TodayScheduleCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      {/* Header: Date and Tabs */}
      <div className="px-6 pt-5 pb-3 border-b flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <div>
          <div className="text-lg font-bold text-indigo-800">Today</div>
          <div className="flex gap-2 mt-2">
            <button className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">
              All
            </button>
            <button className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
              My Task 3
            </button>
            <button className="bg-gray-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full">
              Delegated Task 0
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-blue-700">
            Sun, 2 Feb 2025
          </span>
          <span className="text-xs text-gray-500">Feb 2025 ▼</span>
        </div>
      </div>
      {/* Calendar Row */}
      <div className="flex gap-3 px-6 py-2 border-b bg-white">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={`day-${i}-${d}`}
            className={`flex flex-col items-center w-8 ${i === 0 ? "text-white bg-blue-600 rounded-lg" : "text-gray-700"}`}
          >
            <span className="text-xs">{d}</span>
            <span className="font-bold">{2 + i}</span>
            <span className="text-[10px] text-red-400">
              {i === 0
                ? "+10"
                : i === 1
                  ? "+7"
                  : i === 2 || i === 3
                    ? "+5"
                    : i === 4
                      ? "+13"
                      : i === 5
                        ? "+6"
                        : "+1"}
            </span>
          </div>
        ))}
      </div>
      {/* MultiDay Section */}
      <div className="px-6 py-4 bg-[#F8FAFF]">
        <div className="text-xs text-gray-500 mb-2 font-semibold">MultiDay</div>
        {/* Task Card 1 */}
        <div className="bg-blue-100 rounded-xl p-4 mb-4 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-1 border border-gray-200">
              <Users className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-1 font-semibold text-base text-black truncate">
              (Important) code review for...
            </div>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              114d
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-1">
            <span>01 Feb 12:35 PM - 04 Feb 12:26 PM</span>
            <span className="text-gray-500">
              Shibyjyoti Android : Shibyjyoti Sarkar...
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              NEW
            </span>
            <span className="bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded">
              G.Task
            </span>
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              SKIPPED
            </span>
          </div>
          <div className="flex justify-end mt-2 gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        {/* Task Card 2 */}
        <div className="bg-blue-100 rounded-xl p-4 mb-4 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-1 border border-gray-200">
              <Users className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-1 font-semibold text-base text-black truncate">
              Analyze customer satisfac...
            </div>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              114d
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-1">
            <span>01 Feb 12:40 PM - 05 Feb 1:40 PM</span>
            <span className="text-gray-500">
              Shibyjyoti IOS : Task Reminder
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              NEW
            </span>
            <span className="bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded">
              Group Task
            </span>
          </div>
          <div className="flex justify-end mt-2 gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        {/* Task Card 3 */}
        <div className="bg-blue-100 rounded-xl p-4 mb-2 flex flex-col gap-1 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-1 border border-gray-200">
              <Users className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-1 font-semibold text-base text-black truncate">
              Review and update month...
            </div>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              113d
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-1">
            <span>01 Feb 3:15 PM - 05 Feb 3:15 PM</span>
            <span className="text-gray-500">
              Shibyjyoti Android : Soumyadeep G...
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              NEW
            </span>
            <span className="bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded">
              G.Task
            </span>
            <span className="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded">
              SKIPPED
            </span>
          </div>
          <div className="flex justify-end mt-2 gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};
