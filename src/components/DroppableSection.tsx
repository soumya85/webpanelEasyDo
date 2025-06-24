import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { cn } from "@/lib/utils";
import { DashboardCard } from "@/hooks/useDashboardLayout";

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
  // Group cards into rows based on their cumulative width
  const getCardRows = () => {
    const rows: DashboardCard[][] = [];
    let currentRow: DashboardCard[] = [];
    let currentRowWidth = 0;
    const maxRowWidth = 4; // Based on lg:grid-cols-4

    cards.forEach((card) => {
      // Calculate card width based on size
      let cardWidth = 1; // default for small/medium
      if (card.size === "large") cardWidth = 2;
      if (card.size === "extra-large") cardWidth = 4;

      // If adding this card would exceed row width, start a new row
      if (currentRowWidth + cardWidth > maxRowWidth && currentRow.length > 0) {
        rows.push([...currentRow]);
        currentRow = [card];
        currentRowWidth = cardWidth;
      } else {
        currentRow.push(card);
        currentRowWidth += cardWidth;
      }
    });

    // Add the last row if it has cards
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const cardRows = getCardRows();

  return (
    <div className="mb-12">
      <h2 className="text-lg font-semibold text-[#283C50] mb-4">{title}</h2>

      {/* Main section droppable for the entire section */}
      <Droppable droppableId={sectionId} direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "transition-all duration-300",
              // Drag over styles for the entire section
              snapshot.isDraggingOver &&
                "bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg p-4",
              className,
            )}
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
              )}
            >
              {children}
              {provided.placeholder}
            </div>

            {/* Drop zone indicator when dragging */}
            {snapshot.isDraggingOver && (
              <div className="mt-6 flex items-center justify-center h-20 border-2 border-dashed border-blue-400 rounded-lg bg-blue-50 text-blue-600 text-sm font-medium opacity-75">
                Drop card here to add to this section
              </div>
            )}

            {/* Additional drop zones between rows and at the end */}
            {cardRows.map((row, rowIndex) => (
              <Droppable
                key={`${sectionId}-row-${rowIndex}`}
                droppableId={`${sectionId}-row-${rowIndex}`}
                direction="horizontal"
                type="card-row"
              >
                {(rowProvided, rowSnapshot) => (
                  <div
                    ref={rowProvided.innerRef}
                    {...rowProvided.droppableProps}
                    className={cn(
                      "transition-all duration-200",
                      rowSnapshot.isDraggingOver &&
                        "bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-2 my-2",
                    )}
                  >
                    {rowSnapshot.isDraggingOver && (
                      <div className="flex items-center justify-center h-16 border-2 border-dashed border-purple-400 rounded-lg bg-purple-50 text-purple-600 text-sm font-medium">
                        Drop here to create new row
                      </div>
                    )}
                    {rowProvided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}

            {/* Final drop zone for adding new row at the end */}
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
                    "transition-all duration-200",
                    newRowSnapshot.isDraggingOver &&
                      "bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-2 mt-4",
                  )}
                >
                  {newRowSnapshot.isDraggingOver && (
                    <div className="flex items-center justify-center h-16 border-2 border-dashed border-green-400 rounded-lg bg-green-50 text-green-600 text-sm font-medium">
                      Drop here to add new row
                    </div>
                  )}
                  {newRowProvided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Droppable>
    </div>
  );
};
