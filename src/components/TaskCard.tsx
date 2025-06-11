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
  type: "leave" | "review" | "meeting" | "multiday" | "tasks-review";
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
  // Render tasks-review card with exact Figma design
  if (task.type === "tasks-review") {
    return (
      <div
        style={{
          width: "436px",
          height: "108px",
          borderRadius: "8px",
          borderRight: "6px solid #96B9E7",
          background: "#C1D3F7",
          position: "relative",
        }}
        className={cn("", className)}
      >
        {/* Circular Image */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/25f0c65eaacda0f951d53020f0d839aa081ae066?placeholderIfAbsent=true"
          style={{
            width: "51px",
            height: "51px",
            flexShrink: 0,
            aspectRatio: "1/1",
            borderRadius: "53px",
            position: "absolute",
            left: "10px",
            top: "12px",
          }}
          alt="Image_1_34"
        />

        {/* Main Title */}
        <div
          style={{
            display: "flex",
            width: "358px",
            height: "38px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: 0,
            color: "#181818",
            fontFamily: "Inter",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "normal",
            position: "absolute",
            left: "73px",
            top: "6px",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: "700",
              fontSize: "18px",
              color: "rgba(24,24,24,1)",
            }}
          >
            Tasks, pending review.
          </span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            width: "418px",
            height: "31px",
            flexDirection: "column",
            justifyContent: "center",
            flexShrink: 0,
            color: "#2C2D31",
            fontFamily: "Inter",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "normal",
            position: "absolute",
            left: "74px",
            top: "38px",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
              fontWeight: "400",
              fontSize: "14px",
              color: "rgba(44,45,49,1)",
            }}
          >
            Pending review tasks.
          </span>
        </div>

        {/* Review Button */}
        <div
          style={{
            display: "inline-flex",
            padding: "4px 0px 23px 4px",
            justifyContent: "flex-end",
            alignItems: "center",
            background: "rgba(0, 0, 0, 0.00)",
            position: "absolute",
            left: "70px",
            top: "74px",
            width: "69px",
            height: "47px",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "20px",
              padding: "7px 5px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "4.5px",
              border: "1px solid #F33B31",
              background: "#FF3D30",
              position: "absolute",
              left: "4px",
              top: "4px",
              width: "65px",
            }}
          >
            <div
              style={{
                color: "#FFF",
                fontFamily: "Inter",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "normal",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily:
                    "Inter, -apple-system, Roboto, Helvetica, sans-serif",
                  fontWeight: "400",
                  fontSize: "14px",
                  color: "rgba(255,255,255,1)",
                }}
              >
                REVIEW
              </span>
            </div>
          </div>
        </div>

        {/* Right Image Placeholder */}
        <img
          style={{
            width: "17px",
            height: "17px",
            flexShrink: 0,
            aspectRatio: "1/1",
            position: "absolute",
            left: "398px",
            top: "79px",
          }}
          src=""
          alt=""
        />
      </div>
    );
  }
  // Render leave card with exact Figma design
  if (task.type === "leave") {
    return (
      <div
        className={cn(
          "relative rounded-lg shadow-sm overflow-hidden",
          "w-full h-[108px] max-w-[436px]",
          className,
        )}
        style={{
          background: "#FD7F80",
          borderRight: "6px solid #E34441",
        }}
      >
        <div
          className="absolute w-[51px] h-[52px] flex-shrink-0 rounded-full bg-white flex flex-col items-center justify-center border-2 border-gray-200"
          style={{
            left: "10px",
            top: "12px",
          }}
        >
          <div className="w-8 h-6 bg-gradient-to-r from-green-500 to-white rounded-sm mb-1 relative">
            <div className="absolute inset-0 bg-green-500 w-1/2"></div>
            <div className="absolute right-0 top-0 w-1/2 h-full bg-white"></div>
          </div>
          <div className="text-red-600 text-[8px] font-bold">ALERT</div>
        </div>
        {/* Company Logo */}
        <img
          src="/liberty-logo.png"
          alt="Liberty Highrise company logo"
          className="absolute w-[51px] h-[52px] flex-shrink-0 object-contain rounded-full"
          style={{
            left: "10px",
            top: "12px",
          }}
        />

        {/* Title */}
        <div
          className="absolute flex flex-col justify-center flex-shrink-0"
          style={{
            width: "358px",
            height: "38px",
            left: "73px",
            top: "6px",
            color: "#181818",
            fontFamily: "Inter",
            fontSize: "18px",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          You are on leave
        </div>

        {/* Umbrella Icon */}
        <svg
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute flex-shrink-0"
          style={{
            width: "18px",
            height: "20px",
            left: "76px",
            top: "46px",
            fill: "#000",
          }}
        >
          <path
            d="M8.40723 2.89355V1.00391C8.40723 0.798828 8.47754 0.625977 8.61816 0.485352C8.75879 0.338867 8.93164 0.265625 9.13672 0.265625C9.3418 0.265625 9.51465 0.338867 9.65527 0.485352C9.7959 0.625977 9.86621 0.798828 9.86621 1.00391V2.89355H8.40723ZM1.10352 11.4189C0.880859 11.4189 0.702148 11.3398 0.567383 11.1816C0.438477 11.0234 0.374023 10.8242 0.374023 10.584C0.374023 9.88672 0.485352 9.1543 0.708008 8.38672C0.930664 7.61328 1.27051 6.86035 1.72754 6.12793C2.18457 5.39551 2.75879 4.7334 3.4502 4.1416C4.14746 3.5498 4.96777 3.07812 5.91113 2.72656C6.86035 2.375 7.93555 2.19922 9.13672 2.19922C10.3379 2.19922 11.4102 2.375 12.3535 2.72656C13.2969 3.07812 14.1172 3.5498 14.8145 4.1416C15.5117 4.7334 16.0859 5.39551 16.5371 6.12793C16.9941 6.86035 17.334 7.61328 17.5566 8.38672C17.7852 9.1543 17.8994 9.88672 17.8994 10.584C17.8994 10.8242 17.832 11.0234 17.6973 11.1816C17.5625 11.3398 17.3867 11.4189 17.1699 11.4189C17.041 11.4189 16.915 11.3809 16.792 11.3047C16.6748 11.2227 16.5664 11.1084 16.4668 10.9619C16.1797 10.5166 15.8721 10.1973 15.5439 10.0039C15.2217 9.80469 14.8525 9.70508 14.4365 9.70508C14.0264 9.70508 13.6748 9.80469 13.3818 10.0039C13.0889 10.1973 12.8135 10.5137 12.5557 10.9531C12.3799 11.2637 12.1748 11.4189 11.9404 11.4189C11.6885 11.4189 11.4805 11.2637 11.3164 10.9531C11.082 10.5488 10.7656 10.2324 10.3672 10.0039C9.96875 9.76953 9.55859 9.65234 9.13672 9.65234C8.71484 9.65234 8.30469 9.76953 7.90625 10.0039C7.50781 10.2324 7.19141 10.5488 6.95703 10.9531C6.78711 11.2637 6.5791 11.4189 6.33301 11.4189C6.09863 11.4189 5.89062 11.2637 5.70898 10.9531C5.45703 10.5137 5.18457 10.1973 4.8916 10.0039C4.59863 9.80469 4.24707 9.70508 3.83691 9.70508C3.4209 9.70508 3.04883 9.80469 2.7207 10.0039C2.39844 10.1973 2.09082 10.5166 1.79785 10.9619C1.7041 11.1084 1.5957 11.2227 1.47266 11.3047C1.35547 11.3809 1.23242 11.4189 1.10352 11.4189ZM7.07129 20.5859C6.54395 20.5859 6.06934 20.4629 5.64746 20.2168C5.22559 19.9707 4.8916 19.6367 4.64551 19.2148C4.39941 18.793 4.27637 18.3154 4.27637 17.7822C4.27637 17.5303 4.34375 17.3252 4.47852 17.167C4.61328 17.0088 4.78906 16.9297 5.00586 16.9297C5.22852 16.9297 5.41016 17.0088 5.55078 17.167C5.69141 17.3252 5.76172 17.5303 5.76172 17.7822C5.76172 18.1689 5.88477 18.4854 6.13086 18.7314C6.37695 18.9775 6.69043 19.1006 7.07129 19.1006C7.46387 19.1006 7.7832 18.9775 8.0293 18.7314C8.28125 18.4854 8.40723 18.1689 8.40723 17.7822V9.23047H9.86621V17.7822C9.86621 18.3154 9.74316 18.793 9.49707 19.2148C9.25098 19.6367 8.91699 19.9707 8.49512 20.2168C8.07324 20.4629 7.59863 20.5859 7.07129 20.5859Z"
            fill="black"
          />
        </svg>

        {/* Company Name */}
        <div
          className="absolute flex flex-col justify-center flex-shrink-0"
          style={{
            width: "418px",
            height: "31px",
            left: "101px",
            top: "38px",
            color: "#000",
            fontFamily: "Inter",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "normal",
          }}
        >
          Liberty Highrise Pvt Ltd
        </div>

        {/* Casual Leave Badge */}
        <div
          className="absolute inline-flex justify-end items-center"
          style={{
            left: "70px",
            top: "74px",
            width: "69px",
            height: "47px",
            padding: "0px 0px 23.59px 3.637px",
            background: "rgba(0, 0, 0, 0.00)",
          }}
        >
          <div
            className="absolute flex items-center gap-2"
            style={{
              left: "4px",
              top: "-1px",
              width: "309px",
              height: "24px",
              padding: "7px 5px",
              borderRadius: "4.5px",
              border: "1px solid #000",
              background: "#000",
            }}
          >
            <span
              style={{
                color: "#FFF",
                fontFamily: "Inter",
                fontSize: "14px",
                fontWeight: "400",
                lineHeight: "normal",
              }}
            >
              Casual Leave
            </span>
          </div>
        </div>

        {/* Briefcase Icon */}
        <svg
          width="23"
          height="20"
          viewBox="0 0 23 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute flex-shrink-0"
          style={{
            width: "23px",
            height: "19px",
            left: "395px",
            top: "75px",
            fill: "#000",
          }}
        >
          <path
            d="M10.1133 12.918H13.1504C13.873 12.918 14.2344 12.5632 14.2344 11.8535V11.0625C15.1914 10.9974 16.1484 10.8867 17.1055 10.7305C18.0625 10.5742 19.026 10.3691 19.9961 10.1152C20.9661 9.85482 21.946 9.53581 22.9355 9.1582V7.54688C21.7181 8.08073 20.4941 8.50716 19.2637 8.82617C18.0397 9.14518 16.793 9.37305 15.5234 9.50977C14.2604 9.64648 12.9616 9.71484 11.627 9.71484C10.2988 9.71484 9 9.64648 7.73047 9.50977C6.46745 9.37305 5.2207 9.14518 3.99023 8.82617C2.76628 8.50716 1.54557 8.08073 0.328125 7.54688V9.1582C1.31771 9.53581 2.29753 9.85482 3.26758 10.1152C4.23763 10.3691 5.20117 10.5742 6.1582 10.7305C7.11523 10.8867 8.07227 10.9974 9.0293 11.0625V11.8535C9.0293 12.5632 9.39062 12.918 10.1133 12.918ZM3.3457 19.4121C2.3431 19.4121 1.58789 19.1647 1.08008 18.6699C0.578776 18.1816 0.328125 17.4362 0.328125 16.4336V6.93164C0.328125 5.92904 0.578776 5.18359 1.08008 4.69531C1.58789 4.20052 2.3431 3.95312 3.3457 3.95312H19.918C20.9271 3.95312 21.6823 4.20052 22.1836 4.69531C22.6849 5.18359 22.9355 5.92904 22.9355 6.93164V16.4336C22.9355 17.4362 22.6849 18.1816 22.1836 18.6699C21.6823 19.1647 20.9271 19.4121 19.918 19.4121H3.3457ZM6.67578 4.80273V3.18164C6.67578 2.26367 6.92318 1.58659 7.41797 1.15039C7.91276 0.707682 8.57682 0.486328 9.41016 0.486328H13.8438C14.7292 0.486328 15.4062 0.707682 15.875 1.15039C16.3438 1.58659 16.5781 2.26367 16.5781 3.18164V4.7832H15.0645V3.07422C15.0645 2.70312 14.9603 2.41667 14.752 2.21484C14.5436 2.01302 14.2507 1.91211 13.873 1.91211H9.39062C9.00651 1.91211 8.71029 2.01302 8.50195 2.21484C8.29362 2.41667 8.18945 2.70312 8.18945 3.07422V4.80273H6.67578Z"
            fill="black"
          />
        </svg>

        {/* Umbrella Icon */}
        <svg
          width="18"
          height="21"
          viewBox="0 0 18 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute flex-shrink-0"
          style={{
            width: "18px",
            height: "20px",
            left: "76px",
            top: "46px",
            fill: "#000",
          }}
        >
          <path
            d="M8.40723 2.89355V1.00391C8.40723 0.798828 8.47754 0.625977 8.61816 0.485352C8.75879 0.338867 8.93164 0.265625 9.13672 0.265625C9.3418 0.265625 9.51465 0.338867 9.65527 0.485352C9.7959 0.625977 9.86621 0.798828 9.86621 1.00391V2.89355H8.40723ZM1.10352 11.4189C0.880859 11.4189 0.702148 11.3398 0.567383 11.1816C0.438477 11.0234 0.374023 10.8242 0.374023 10.584C0.374023 9.88672 0.485352 9.1543 0.708008 8.38672C0.930664 7.61328 1.27051 6.86035 1.72754 6.12793C2.18457 5.39551 2.75879 4.7334 3.4502 4.1416C4.14746 3.5498 4.96777 3.07812 5.91113 2.72656C6.86035 2.375 7.93555 2.19922 9.13672 2.19922C10.3379 2.19922 11.4102 2.375 12.3535 2.72656C13.2969 3.07812 14.1172 3.5498 14.8145 4.1416C15.5117 4.7334 16.0859 5.39551 16.5371 6.12793C16.9941 6.86035 17.334 7.61328 17.5566 8.38672C17.7852 9.1543 17.8994 9.88672 17.8994 10.584C17.8994 10.8242 17.832 11.0234 17.6973 11.1816C17.5625 11.3398 17.3867 11.4189 17.1699 11.4189C17.041 11.4189 16.915 11.3809 16.792 11.3047C16.6748 11.2227 16.5664 11.1084 16.4668 10.9619C16.1797 10.5166 15.8721 10.1973 15.5439 10.0039C15.2217 9.80469 14.8525 9.70508 14.4365 9.70508C14.0264 9.70508 13.6748 9.80469 13.3818 10.0039C13.0889 10.1973 12.8135 10.5137 12.5557 10.9531C12.3799 11.2637 12.1748 11.4189 11.9404 11.4189C11.6885 11.4189 11.4805 11.2637 11.3164 10.9531C11.082 10.5488 10.7656 10.2324 10.3672 10.0039C9.96875 9.76953 9.55859 9.65234 9.13672 9.65234C8.71484 9.65234 8.30469 9.76953 7.90625 10.0039C7.50781 10.2324 7.19141 10.5488 6.95703 10.9531C6.78711 11.2637 6.5791 11.4189 6.33301 11.4189C6.09863 11.4189 5.89062 11.2637 5.70898 10.9531C5.45703 10.5137 5.18457 10.1973 4.8916 10.0039C4.59863 9.80469 4.24707 9.70508 3.83691 9.70508C3.4209 9.70508 3.04883 9.80469 2.7207 10.0039C2.39844 10.1973 2.09082 10.5166 1.79785 10.9619C1.7041 11.1084 1.5957 11.2227 1.47266 11.3047C1.35547 11.3809 1.23242 11.4189 1.10352 11.4189ZM7.07129 20.5859C6.54395 20.5859 6.06934 20.4629 5.64746 20.2168C5.22559 19.9707 4.8916 19.6367 4.64551 19.2148C4.39941 18.793 4.27637 18.3154 4.27637 17.7822C4.27637 17.5303 4.34375 17.3252 4.47852 17.167C4.61328 17.0088 4.78906 16.9297 5.00586 16.9297C5.22852 16.9297 5.41016 17.0088 5.55078 17.167C5.69141 17.3252 5.76172 17.5303 5.76172 17.7822C5.76172 18.1689 5.88477 18.4854 6.13086 18.7314C6.37695 18.9775 6.69043 19.1006 7.07129 19.1006C7.46387 19.1006 7.7832 18.9775 8.0293 18.7314C8.28125 18.4854 8.40723 18.1689 8.40723 17.7822V9.23047H9.86621V17.7822C9.86621 18.3154 9.74316 18.793 9.49707 19.2148C9.25098 19.6367 8.91699 19.9707 8.49512 20.2168C8.07324 20.4629 7.59863 20.5859 7.07129 20.5859Z"
            fill="black"
          />
        </svg>
      </div>
    );
  }

  // Original design for other card types
  const getCardBgColor = () => {
    switch (task.type) {
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
            {task.type === "review" && (
              <CheckCircle className="w-5 h-5 text-gray-700" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
