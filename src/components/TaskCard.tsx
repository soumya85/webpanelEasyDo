import React from "react";
import { Briefcase, Umbrella, Video, CheckCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  time?: string;
  endTime?: string;
  type: "leave" | "review" | "meeting" | "multiday";
  status: "new" | "review" | "skipped" | "no-action" | "casual-leave";
  category?: "g-task" | "d-task";
  duration?: string;
  avatar?: string;
  notifications?: number;
  progress?: number;
  company?: string;
}

interface TaskCardProps {
  task: TaskItem;
  className?: string;
}

export function TaskCard({ task, className }: TaskCardProps) {
  const getCardBgColor = () => {
    switch (task.type) {
      case "leave":
        return "bg-red-300 border-r-0";
      case "review":
        return "bg-blue-300 border-r-0";
      case "multiday":
        return "bg-blue-300 border-r-0";
      case "meeting":
        return "bg-orange-300 border-r-0";
      default:
        return "bg-gray-200 border-r-0";
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "casual-leave":
        return (
          <Badge className="bg-black text-white text-xs px-2 py-1">
            Casual Leave
          </Badge>
        );
      case "review":
        return (
          <Badge className="bg-red-500 text-white text-xs px-2 py-1">
            REVIEW
          </Badge>
        );
      case "new":
        return (
          <Badge className="bg-red-500 text-white text-xs px-2 py-1">NEW</Badge>
        );
      case "skipped":
        return (
          <Badge className="bg-red-500 text-white text-xs px-2 py-1">
            SKIPPED
          </Badge>
        );
      case "no-action":
        return (
          <Badge className="bg-gray-500 text-white text-xs px-2 py-1">
            No Action
          </Badge>
        );
      default:
        return null;
    }
  };

  const getCategoryBadge = () => {
    switch (task.category) {
      case "g-task":
        return (
          <Badge className="bg-black text-white border border-gray-600 text-xs px-2 py-1">
            G.Task
          </Badge>
        );
      case "d-task":
        return (
          <Badge className="bg-black text-white border border-gray-600 text-xs px-2 py-1">
            D.Task
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTaskIcon = () => {
    switch (task.type) {
      case "leave":
        return <Umbrella className="w-5 h-5 text-black" />;
      case "review":
        return <CheckCircle className="w-5 h-5 text-black" />;
      case "multiday":
        return <Users className="w-5 h-5 text-white" />;
      case "meeting":
        return <Video className="w-5 h-5 text-black" />;
      default:
        return null;
    }
  };

  return (
    <Card
      className={cn(
        "relative p-4 rounded-lg shadow-sm",
        getCardBgColor(),
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {/* Avatar or Icon */}
        <div className="w-12 h-12 flex-shrink-0">
          {task.avatar ? (
            <Avatar className="w-12 h-12">
              <AvatarImage src={task.avatar} />
              <AvatarFallback className="bg-gray-500">
                {getTaskIcon()}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div
              className={cn(
                "w-12 h-12 rounded flex items-center justify-center",
                task.type === "leave" && "bg-red-200",
                task.type === "review" && "bg-blue-200",
                task.type === "multiday" && "bg-gray-800",
                task.type === "meeting" && "bg-orange-200",
              )}
            >
              {task.type === "leave" && (
                <Umbrella className="w-6 h-6 text-black" />
              )}
              {task.type === "review" && (
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
              {task.type === "multiday" && (
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  👤
                </div>
              )}
              {task.type === "meeting" && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback className="bg-gray-600 text-white text-xs">
                    SG
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">
            {task.title}
          </h3>
          <p className="text-sm text-gray-800 mt-1 leading-tight">
            {task.description}
          </p>
          {task.time && (
            <p className="text-sm text-gray-700 mt-1">{task.time}</p>
          )}

          {/* Status and Category Badges */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            {getStatusBadge()}
            {getCategoryBadge()}
          </div>

          {/* Progress Bar for multiday tasks */}
          {task.type === "multiday" && (
            <div className="w-full h-1.5 bg-red-500 mt-3 rounded"></div>
          )}

          {/* Progress Bar for meetings */}
          {task.type === "meeting" && (
            <div className="w-full h-1.5 bg-gray-500 mt-3 rounded"></div>
          )}
        </div>

        {/* Right side elements */}
        <div className="flex flex-col items-end gap-2">
          {/* Duration badge for multiday tasks */}
          {task.duration && (
            <Badge className="bg-green-600 text-white text-xs px-2 py-1 rounded">
              {task.duration}
            </Badge>
          )}

          {/* Notification count for meetings */}
          {task.notifications && (
            <Badge className="bg-blue-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center p-0">
              {task.notifications}
            </Badge>
          )}

          {/* Action icons */}
          <div className="flex items-center gap-1 mt-2">
            {task.type === "leave" && (
              <Briefcase className="w-4 h-4 text-black" />
            )}
            {task.type === "meeting" && (
              <Video className="w-4 h-4 text-black" />
            )}
            {(task.type === "review" || task.type === "multiday") && (
              <div className="flex gap-1">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
