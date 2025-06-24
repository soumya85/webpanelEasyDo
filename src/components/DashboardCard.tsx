import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";
import { GripVertical, Expand, MoreVertical } from "lucide-react";
import { CardSize, CARD_SIZE_CONFIG } from "@/types/cardSize";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DashboardCardProps {
  id: string;
  index: number;
  children: React.ReactNode;
  className?: string;
  isDragDisabled?: boolean;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  id,
  index,
  children,
  className,
  isDragDisabled = false,
  size = "medium",
  onResize,
}) => {
  const [showResizeMenu, setShowResizeMenu] = useState(false);
  const sizeConfig = CARD_SIZE_CONFIG[size];

  const handleResize = (newSize: CardSize) => {
    if (onResize) {
      onResize(id, newSize);
    }
    setShowResizeMenu(false);
  };

  return (
    <Draggable draggableId={id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            "relative group transition-all duration-300",
            sizeConfig.gridSpan,
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

          {/* Resize Handle */}
          {onResize && (
            <div className="absolute -top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <DropdownMenu
                open={showResizeMenu}
                onOpenChange={setShowResizeMenu}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 bg-white shadow-lg border border-gray-200 hover:bg-gray-50"
                  >
                    <Expand className="w-3.5 h-3.5 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Resize Card
                  </div>
                  <DropdownMenuSeparator />
                  {(Object.keys(CARD_SIZE_CONFIG) as CardSize[]).map(
                    (sizeOption) => (
                      <DropdownMenuItem
                        key={sizeOption}
                        onClick={() => handleResize(sizeOption)}
                        className={cn(
                          "flex items-center gap-2 cursor-pointer",
                          size === sizeOption && "bg-blue-50 text-blue-700",
                        )}
                      >
                        <div
                          className={cn(
                            "w-3 h-3 border border-gray-300",
                            sizeOption === "small" && "w-2 h-2",
                            sizeOption === "medium" && "w-3 h-3",
                            sizeOption === "large" && "w-4 h-3",
                            sizeOption === "extra-large" && "w-5 h-3",
                            size === sizeOption &&
                              "border-blue-500 bg-blue-100",
                          )}
                        />
                        <span>{CARD_SIZE_CONFIG[sizeOption].displayName}</span>
                        {size === sizeOption && (
                          <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Card Content */}
          <div
            className={cn(
              "bg-white rounded-[10px] border-b-[6px] border-[#4766E5]",
              "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.10),0px_4px_8px_0px_rgba(0,0,0,0.05)]",
              "p-4 flex flex-col h-full transition-all duration-300",
              sizeConfig.minHeight,
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
