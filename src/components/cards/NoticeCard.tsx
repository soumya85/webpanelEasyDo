import React from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";

interface NoticeCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const NoticeCard: React.FC<NoticeCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  const noticeItems = [
    {
      title: "Holiday Notice - Diwali Celebration",
      content: "Office will remain closed on October 24th for Diwali...",
      date: "1 day ago",
    },
    {
      title: "New Health Insurance Policy Updates",
      content:
        "Important updates regarding the company health insurance policy...",
      date: "3 days ago",
    },
  ];

  return (
    <DashboardCard id={id} index={index}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-red-50">
          <Bell className="w-5 h-5 text-red-600" />
        </div>
        <h3 className="text-sm font-semibold text-[#283C50]">Notice Board</h3>
      </div>

      <div className="text-xs text-gray-600 mb-3">
        You're viewing for: All Branch
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {noticeItems.map((notice, idx) => (
          <div
            key={idx}
            className="border-b border-gray-100 pb-2 last:border-b-0"
          >
            <div className="text-xs font-medium text-gray-900 mb-1">
              {notice.title}
            </div>
            <div className="text-xs text-gray-600 mb-1">{notice.content}</div>
            <div className="text-xs text-gray-500">{notice.date}</div>
          </div>
        ))}
      </div>

      <Button
        className="w-full mt-4 h-8 text-xs text-gray-700 hover:opacity-90"
        style={{
          backgroundColor: "#eff5ff",
          borderColor: "#bfdbfe",
          borderWidth: "1px",
        }}
      >
        View All Notices
      </Button>
    </DashboardCard>
  );
};
