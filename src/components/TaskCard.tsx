import React from "react";
import { Briefcase, Upload, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
        return "bg-red-300";
      case "review":
        return "bg-blue-300";
      case "multiday":
        return "bg-blue-300";
      case "meeting":
        return "bg-orange-300";
      default:
        return "bg-gray-200";
    }
  };

  const getAvatarColor = () => {
    switch (task.type) {
      case "leave":
        return "bg-blue-500";
      case "review":
        return "bg-purple-500";
      case "multiday":
        return "bg-blue-600";
      case "meeting":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "casual-leave":
        return (
          <Badge className="bg-black text-white text-xs px-3 py-1 rounded">
            Casual Leave
          </Badge>
        );
      case "review":
        return (
          <Badge className="bg-red-500 text-white text-xs px-3 py-1 rounded">
            REVIEW
          </Badge>
        );
      case "new":
        return (
          <Badge className="bg-red-500 text-white text-xs px-3 py-1 rounded">
            NEW
          </Badge>
        );
      case "skipped":
        return (
          <Badge className="bg-red-500 text-white text-xs px-3 py-1 rounded">
            SKIPPED
          </Badge>
        );
      case "no-action":
        return (
          <Badge className="bg-gray-500 text-white text-xs px-3 py-1 rounded">
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
          <Badge className="bg-black text-white text-xs px-3 py-1 rounded">
            G.Task
          </Badge>
        );
      case "d-task":
        return (
          <Badge className="bg-black text-white text-xs px-3 py-1 rounded">
            D.Task
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className={cn(
        "relative p-4 rounded-xl shadow-sm",
        getCardBgColor(),
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
            getAvatarColor(),
          )}
        >
          {task.type === "leave" && (
            <div className="text-white text-xl">☂️</div>
          )}
          {task.type === "review" && (
            <CheckCircle className="w-6 h-6 text-white" />
          )}
          {task.type === "multiday" && (
            <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold">
              👤
            </div>
          )}
          {task.type === "meeting" && (
            <div className="text-white text-xl">👤</div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 leading-tight mb-1">
            {task.title}
          </h3>
          <p className="text-sm text-gray-800 leading-tight mb-2">
            {task.description}
          </p>
          {task.time && (
            <p className="text-sm text-gray-700 mb-3">{task.time}</p>
          )}

          {/* Status and Category Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {getStatusBadge()}
            {getCategoryBadge()}
          </div>

          {/* Progress Bar for multiday tasks */}
          {task.type === "multiday" && (
            <div className="w-full h-1 bg-red-500 mt-3 rounded"></div>
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

          {/* Action icons */}
          <div className="flex items-center gap-2 mt-auto">
            {task.type === "leave" && (
              <>
                <Upload className="w-5 h-5 text-gray-700" />
                <Briefcase className="w-5 h-5 text-gray-700" />
              </>
            )}
            {task.type === "review" && (
              <CheckCircle className="w-5 h-5 text-gray-700" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
