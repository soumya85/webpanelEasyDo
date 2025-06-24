import React from "react";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardCard } from "../DashboardCard";

interface ChatCardProps {
  id: string;
  index: number;
}

export const ChatCard: React.FC<ChatCardProps> = ({ id, index }) => {
  const chatActivities = [
    {
      id: 1,
      name: "Sarah Johnson",
      message: "Can we schedule the meeting for tomorrow?",
      time: "5m ago",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Project Team Alpha",
      message: "The latest updates have been pushed to the develop...",
      time: "12m ago",
      avatar: "/placeholder.svg",
      isGroup: true,
    },
    {
      id: 3,
      name: "Mike Chen",
      message: "Thanks for the quick response!",
      time: "1h ago",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "HR Department",
      message: "Please review the updated policy document and prov...",
      time: "Yesterday",
      avatar: "/placeholder.svg",
      isGroup: true,
    },
  ];

  return (
    <DashboardCard id={id} index={index}>
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
          <div className="text-2xl font-bold text-[#4766E5]">14</div>
          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </Badge>
        </div>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto max-h-48">
        {chatActivities.slice(0, 3).map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-lg transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
          >
            <Avatar className="h-8 w-8 ring-2 ring-blue-100">
              <AvatarImage src={chat.avatar} />
              <AvatarFallback className="text-xs font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                {chat.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
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

      <Button
        className="w-full mt-4 h-8 text-xs font-semibold text-gray-700 hover:opacity-90 transition-all duration-300"
        style={{
          backgroundColor: "#eff5ff",
          borderColor: "#bfdbfe",
          borderWidth: "1px",
        }}
      >
        View All Chats
      </Button>
    </DashboardCard>
  );
};
