import React, { useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import { DroppableSection } from "@/components/DroppableSection";
import { CardFactory } from "@/components/CardFactory";
import { LayoutControls } from "@/components/LayoutControls";
import { cn } from "@/lib/utils";

const Dashboard: React.FC = () => {
  const { sections, moveCard, reorderCards, resetLayout, isLoading } =
    useDashboardLayout();

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

      // If moved to a different section
      if (destination.droppableId !== source.droppableId) {
        moveCard(draggableId, destination.droppableId, destination.index);
      } else {
        // If reordered within the same section
        reorderCards(source.droppableId, source.index, destination.index);
      }
    },
    [moveCard, reorderCards],
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
            >
              {section.cards.map((card, index) => (
                <CardFactory key={card.id} card={card} index={index} />
              ))}
            </DroppableSection>
          ))}
        </DragDropContext>

        {/* Instructions */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            💡 Drag & Drop Instructions
          </h3>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Hover over any card to see the drag handle</li>
            <li>• Drag cards between sections to reorganize your dashboard</li>
            <li>
              • Your layout is automatically saved and persists across sessions
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
