import React, { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import { DroppableSection } from "@/components/DroppableSection";
import { CardFactory } from "@/components/CardFactory";
import { LayoutControls } from "@/components/LayoutControls";
import { cn } from "@/lib/utils";

const Dashboard: React.FC = () => {
  const {
    sections,
    moveCard,
    reorderCards,
    resizeCard,
    resetLayout,
    isLoading,
  } = useDashboardLayout();

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId } = result;

      // If dropped outside any droppable area
      if (!destination) {
        return;
      }

      // If dropped in the same position
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      // Handle different types of drops
      const destId = destination.droppableId;
      const sourceId = source.droppableId;

      // Check if destination is a row-based drop zone
      if (destId.includes("-row-") || destId.endsWith("-new-row")) {
        // Extract the base section ID (e.g., "quick-overview" from "quick-overview-row-1")
        const baseSectionId = destId.split("-")[0] + "-" + destId.split("-")[1]; // handles "quick-overview", "information-hub"
        const actualSectionId = baseSectionId.includes("information")
          ? "information-hub"
          : baseSectionId.includes("productivity")
            ? "productivity"
            : "quick-overview";

        if (destId.endsWith("-new-row")) {
          // Move to end of section (new row)
          const sectionCards =
            sections.find((s) => s.id === actualSectionId)?.cards || [];
          moveCard(draggableId, actualSectionId, sectionCards.length);
        } else {
          // Move to specific row position
          const rowMatch = destId.match(/-row-(\d+)/);
          if (rowMatch) {
            const rowIndex = parseInt(rowMatch[1]);
            // Calculate the position based on row and existing cards
            const sectionCards =
              sections.find((s) => s.id === actualSectionId)?.cards || [];

            // Group cards by rows to find the correct insertion index
            let insertIndex = 0;
            let currentRowWidth = 0;
            const maxRowWidth = 4;

            for (let i = 0; i < sectionCards.length; i++) {
              const card = sectionCards[i];
              let cardWidth = 1;
              if (card.size === "large") cardWidth = 2;
              if (card.size === "extra-large") cardWidth = 4;

              if (
                currentRowWidth + cardWidth > maxRowWidth &&
                currentRowWidth > 0
              ) {
                // Starting a new row
                if (insertIndex >= rowIndex) break;
                currentRowWidth = cardWidth;
                insertIndex++;
              } else {
                currentRowWidth += cardWidth;
              }

              if (insertIndex === rowIndex) {
                insertIndex = i + 1;
                break;
              }
            }

            moveCard(draggableId, actualSectionId, insertIndex);
          }
        }
      } else if (destId !== sourceId) {
        // Regular section move
        moveCard(draggableId, destId, destination.index);
      } else {
        // Reorder within the same section
        reorderCards(sourceId, source.index, destination.index);
      }
    },
    [moveCard, reorderCards, sections],
  );

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4766E5]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-6 pt-2">
        <h1 className="text-xl font-bold text-[#283C50] flex items-center gap-2">
          Good morning, Bhaskar! 👋
        </h1>
        {/* Layout Controls moved to header row */}
        <LayoutControls onReset={resetLayout} />
      </div>

      <div className="flex-1 overflow-auto px-6 pb-6">
        {/* Drag and Drop Context */}
        <DragDropContext onDragEnd={handleDragEnd}>
          {sections.map((section) => (
            <DroppableSection
              key={section.id}
              sectionId={section.id}
              title={section.title}
              cards={section.cards}
            >
              {section.cards.map((card, index) => (
                <CardFactory
                  key={card.id}
                  card={card}
                  index={index}
                  onResize={resizeCard}
                />
              ))}
            </DroppableSection>
          ))}
        </DragDropContext>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Enhanced Drag & Drop + Width Resize Instructions
          </h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>
              • Hover over any card to see the drag handle (top center) and
              width resize handle (right edge)
            </li>
            <li>
              • Drag cards between sections or within sections to reorganize -{" "}
              <strong>width is preserved</strong>
            </li>
            <li>
              • <strong>NEW:</strong> Drop cards on purple zones to create new
              rows within a section
            </li>
            <li>
              • <strong>NEW:</strong> Drop cards on green zones to add new rows
              at the end of a section
            </li>
            <li>
              • Drag the blue resize handle on the right edge to adjust card
              width (Small, Medium, Large, Extra Large)
            </li>
            <li>
              • All cards in the same row maintain equal height automatically
            </li>
            <li>
              • Your layout and card sizes are automatically saved and persist
              across sessions
            </li>
            <li>
              • Use the "Reset Layout" button to restore the default arrangement
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
