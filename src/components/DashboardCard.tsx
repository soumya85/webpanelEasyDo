import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { CardSize, CARD_SIZE_CONFIG } from "@/types/cardSize";

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

          {/* Width Resize Handle */}
          {onResize && (
            <div
              className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-8 cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const startX = e.clientX;
                const cardElement = e.currentTarget.closest(
                  "[data-rbd-draggable-id]",
                ) as HTMLElement;
                if (!cardElement) return;

                const startWidth = cardElement.offsetWidth;
                const containerRect =
                  cardElement.parentElement?.getBoundingClientRect();
                if (!containerRect) return;

                const handleMouseMove = (moveEvent: MouseEvent) => {
                  const deltaX = moveEvent.clientX - startX;
                  const newWidth = startWidth + deltaX;
                  const containerWidth = containerRect.width;

                  // Determine new size based on width relative to container
                  let newSize: CardSize = size || "medium";
                  const widthRatio = newWidth / (containerWidth / 4); // 4 columns max

                  if (widthRatio < 0.75) {
                    newSize = "small";
                  } else if (widthRatio < 1.5) {
                    newSize = "medium";
                  } else if (widthRatio < 3) {
                    newSize = "large";
                  } else {
                    newSize = "extra-large";
                  }

                  if (newSize !== size) {
                    onResize(id, newSize);
                  }
                };

                const handleMouseUp = () => {
                  document.removeEventListener("mousemove", handleMouseMove);
                  document.removeEventListener("mouseup", handleMouseUp);
                  document.body.style.cursor = "";
                  document.body.style.userSelect = "";
                };

                document.body.style.cursor = "ew-resize";
                document.body.style.userSelect = "none";
                document.addEventListener("mousemove", handleMouseMove);
                document.addEventListener("mouseup", handleMouseUp);
              }}
            >
              <div className="w-1 h-full bg-blue-500 rounded-full opacity-60 hover:opacity-100 transition-opacity" />
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
