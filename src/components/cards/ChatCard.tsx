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
    <DashboardCard
      id={id}
      index={index}
      className={cn("bg-white rounded-xl border-b-4 border-[#4766E5]")}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 shadow-sm">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#283C50]">
              Recent Chat Activity
            </h3>
            <p className="text-sm text-gray-600 mt-1">Unread Messages</p>
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#4766E5] mb-1">14</div>
          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            New
          </Badge>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto">
        {chatActivities.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-4 p-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200"
          >
            <Avatar className="h-10 w-10 ring-2 ring-blue-100">
              <AvatarImage src={chat.avatar} />
              <AvatarFallback className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                {chat.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="text-sm font-semibold text-gray-900 truncate">
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
              <div className="text-sm text-gray-700 truncate font-medium leading-relaxed">
                {chat.message}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full mt-6 h-10 text-sm font-semibold text-gray-700 hover:opacity-90 transition-all duration-300"
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
