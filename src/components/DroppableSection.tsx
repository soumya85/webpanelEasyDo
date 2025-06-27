import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { MultilingualText } from "@/components/MultilingualText";

// Import type only to avoid circular dependency
interface DashboardCard {
  id: string;
  size?: "small" | "medium" | "large" | "extra-large";
}

interface DroppableSectionProps {
  sectionId: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  cards?: DashboardCard[];
}

export const DroppableSection: React.FC<DroppableSectionProps> = ({
  sectionId,
  title,
  children,
  className,
  cards = [],
}) => {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-[#283C50] mb-4">{title}</h2>

      {/* Main section droppable */}
      <Droppable droppableId={sectionId} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn("transition-all duration-300", className)}
          >
            {/* Render existing cards in their grid layout */}
            <div
              className={cn(
                "grid gap-6 min-h-[200px] transition-all duration-300",
                "items-stretch", // Ensure all cards in a row have equal height
                // Universal responsive grid that supports dynamic column spans
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
                // Each row should have consistent height
                "auto-rows-fr",
                // Drag over styles
                snapshot.isDraggingOver &&
                  "bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4",
              )}
            >
              {children}
              {provided.placeholder}
            </div>

            {/* Drop zone for new row when dragging */}
            {snapshot.isDraggingOver && (
              <>
                <div className="mt-6 flex items-center justify-center h-20 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium opacity-75">
                  Drop card here to add to this section
                </div>

                {/* Additional drop zone for creating new row */}
                <Droppable
                  droppableId={`${sectionId}-new-row`}
                  direction="horizontal"
                  type="card-row"
                >
                  {(newRowProvided, newRowSnapshot) => (
                    <div
                      ref={newRowProvided.innerRef}
                      {...newRowProvided.droppableProps}
                      className={cn(
                        "mt-4 transition-all duration-200",
                        newRowSnapshot.isDraggingOver &&
                          "bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-2",
                      )}
                    >
                      {newRowSnapshot.isDraggingOver && (
                        <div className="flex items-center justify-center h-16 border-2 border-dashed border-green-400 rounded-lg bg-green-50 text-green-600 text-sm font-medium">
                          Drop here to start new row
                        </div>
                      )}
                      {newRowProvided.placeholder}
                    </div>
                  )}
                </Droppable>
              </>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
