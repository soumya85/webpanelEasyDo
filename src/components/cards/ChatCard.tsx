import React from "react";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";

interface ChatCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const ChatCard: React.FC<ChatCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  // Function to generate initials from name
  const getInitials = (name: string): string => {
    // Remove special characters and extra text like phone numbers
    const cleanName = name.replace(/[~\(\)+0-9]/g, "").trim();
    const words = cleanName.split(" ").filter((word) => word.length > 0);

    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    } else if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return "AI"; // fallback for AI/system messages
  };

  const chatActivities = [
    {
      id: 1,
      name: "Amulya Kumar Kar",
      message: "🏃 Attendance notification sent",
      time: "5m ago",
      avatar: "/placeholder.svg",
      unreadCount: 3,
    },
    {
      id: 2,
      name: "Suresh Gupta",
      message: "Meeting scheduled for 3 PM today",
      time: "12m ago",
      avatar: "/placeholder.svg",
      unreadCount: 1,
    },
    {
      id: 3,
      name: "Priya Sharma",
      message: "Can you review the document?",
      time: "25m ago",
      avatar: "/placeholder.svg",
      unreadCount: 2,
    },
    {
      id: 4,
      name: "Rajesh Kumar",
      message: "Thanks for the update!",
      time: "45m ago",
      avatar: "/placeholder.svg",
      unreadCount: 1,
    },
    {
      id: 5,
      name: "QA Testing Team",
      message: "New build is ready for testing",
      time: "1h ago",
      avatar: "/placeholder.svg",
      isGroup: true,
      unreadCount: 5,
    },
    {
      id: 6,
      name: "Anjali Verma",
      message: "Sure, I'll send it by EOD",
      time: "1h ago",
      avatar: "/placeholder.svg",
      unreadCount: 1,
    },
    {
      id: 7,
      name: "Vikram Singh",
      message: "Let's schedule a call tomorrow",
      time: "2h ago",
      avatar: "/placeholder.svg",
      unreadCount: 2,
    },
    {
      id: 8,
      name: "Neha Patel",
      message: "The files are ready for download",
      time: "3h ago",
      avatar: "/placeholder.svg",
      unreadCount: 4,
    },
    {
      id: 9,
      name: "Marketing Team",
      message: "Campaign results are looking great!",
      time: "4h ago",
      avatar: "/placeholder.svg",
      isGroup: true,
      unreadCount: 3,
    },
    {
      id: 10,
      name: "Deepak Joshi",
      message: "Great work on the presentation!",
      time: "5h ago",
      avatar: "/placeholder.svg",
      unreadCount: 2,
    },
    {
      id: 11,
      name: "Kavita Rao",
      message: "Documents uploaded to shared folder",
      time: "6h ago",
      avatar: "/placeholder.svg",
      unreadCount: 1,
    },
    {
      id: 12,
      name: "Aditi Kapoor",
      message: "Budget approval received",
      time: "Yesterday",
      avatar: "/placeholder.svg",
      unreadCount: 1,
    },
  ];

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-blue-50">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-sm font-semibold text-[#283C50] flex-1">
            Recent Chat Activity
          </h3>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-gray-600">Unread Messages</div>
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-[#4766E5]">
              {chatActivities.reduce(
                (total, chat) => total + (chat.unreadCount || 0),
                0,
              )}
            </div>
            <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </Badge>
          </div>
        </div>

        <div className="space-y-3 flex-1 overflow-y-auto max-h-80 mb-4">
          {chatActivities.slice(0, 8).map((chat) => (
            <div
              key={chat.id}
              className="flex items-center gap-3 p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
            >
              <div className="relative">
                <Avatar className="h-8 w-8 ring-2 ring-blue-100">
                  <AvatarFallback className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    {getInitials(chat.name)}
                  </AvatarFallback>
                </Avatar>
                {chat.unreadCount && chat.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-xs font-semibold text-gray-900 truncate">
                    {chat.name}
                  </div>
                  {chat.isGroup && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-blue-100 text-blue-700"
                    >
                      Group
                    </Badge>
                  )}
                  <div className="text-xs text-gray-500 ml-auto font-medium">
                    {chat.time}
                  </div>
                </div>
                <div className="text-xs text-gray-700 truncate font-medium leading-relaxed">
                  {chat.message}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Button
            className="w-full py-2 text-sm font-medium text-gray-700 hover:opacity-90 transition-all duration-300"
            style={{
              backgroundColor: "#eff5ff",
              borderColor: "#bfdbfe",
              borderWidth: "1px",
            }}
          >
            View All Chats
          </Button>
        </div>
      </div>
    </DashboardCard>
  );
};
