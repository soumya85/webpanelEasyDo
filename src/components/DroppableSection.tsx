import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";

interface DroppableSectionProps {
  sectionId: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DroppableSection: React.FC<DroppableSectionProps> = ({
  sectionId,
  title,
  children,
  className,
}) => {
  return (
    <div className="mb-12">
      <h2 className="text-lg font-semibold text-[#283C50] mb-4">{title}</h2>
      <Droppable droppableId={sectionId} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "grid gap-6 min-h-[200px] transition-all duration-300",
              // Responsive grid columns based on section
              sectionId === "quick-overview" &&
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
              sectionId === "productivity" && "grid-cols-1 lg:grid-cols-2",
              sectionId === "information-hub" &&
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
              // Drag over styles
              snapshot.isDraggingOver &&
                "bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4",
              className,
            )}
          >
            {children}
            {provided.placeholder}
            {snapshot.isDraggingOver && children === null && (
              <div className="col-span-full flex items-center justify-center min-h-[320px] border-2 border-dashed border-blue-300 rounded-lg bg-blue-50 text-blue-600 font-medium">
                Drop card here
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
