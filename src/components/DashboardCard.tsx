import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface DashboardCardProps {
  id: string;
  index: number;
  children: React.ReactNode;
  className?: string;
  isDragDisabled?: boolean;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  id,
  index,
  children,
  className,
  isDragDisabled = false,
}) => {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            "relative group transition-all duration-300",
            snapshot.isDragging &&
              "rotate-3 scale-105 shadow-2xl ring-2 ring-blue-400 ring-opacity-75",
            className,
          )}
        >
          {/* Drag Handle */}
          <div
            {...provided.dragHandleProps}
            className={cn(
              "absolute -top-2 left-1/2 transform -translate-x-1/2 z-10",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              "bg-white shadow-lg rounded-full p-2 border border-gray-200",
              "cursor-grab active:cursor-grabbing",
              snapshot.isDragging && "opacity-100",
            )}
          >
            <GripVertical className="w-4 h-4 text-gray-500" />
          </div>

          {/* Card Content */}
          <div
            className={cn(
              "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
              "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
              "p-4 flex flex-col min-h-[320px] max-h-[400px] transition-all duration-300",
              "hover:shadow-lg",
              snapshot.isDragging && "shadow-2xl",
            )}
          >
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
};
