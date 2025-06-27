import React, { useCallback } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useDashboardLayout } from "@/hooks/useDashboardLayout";
import { DroppableSection } from "@/components/DroppableSection";
import { CardFactory } from "@/components/CardFactory";
import { LayoutControls } from "@/components/LayoutControls";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Dashboard: React.FC = () => {
  const {
    sections,
    moveCard,
    reorderCards,
    resizeCard,
    resetLayout,
    isLoading,
  } = useDashboardLayout();
  const { t } = useTranslation();

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t("goodMorning");
    if (hour < 17) return t("goodAfternoon");
    return t("goodEvening");
  };

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

      const destId = destination.droppableId;
      const sourceId = source.droppableId;

      // Handle new row drops
      if (destId.endsWith("-new-row")) {
        // Extract the base section ID
        const sectionId = destId.replace("-new-row", "");
        // Move to end of section to create new row
        const sectionCards =
          sections.find((s) => s.id === sectionId)?.cards || [];
        moveCard(draggableId, sectionId, sectionCards.length);
      } else if (destId !== sourceId) {
        // Move to different section
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
      <div className="h-full flex flex-col overflow-hidden">
        {/* Layout Controls */}
        <div className="flex justify-between items-center p-4 pb-2 border-b border-gray-200 flex-shrink-0">
          <LayoutControls onReset={resetLayout} />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2 px-6 pt-2">
        <MultilingualText
          as="h1"
          className="text-xl font-bold text-[#283C50] flex items-center gap-2"
        >
          {getGreeting()}, {t("bhaskarGhosh")}! 👋
        </MultilingualText>
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

        {/* Instructions Accordion */}
        <Accordion type="single" collapsible className="mt-8">
          <AccordionItem
            value="instructions"
            className="bg-blue-50 border border-blue-200 rounded-lg px-4"
          >
            <AccordionTrigger className="text-sm font-semibold text-blue-900 hover:no-underline">
              💡 Enhanced Drag & Drop + Width Resize Instructions
            </AccordionTrigger>
            <AccordionContent>
              <ul className="text-xs text-blue-800 space-y-1 pb-2">
                <li>
                  • Hover over any card to see the drag handle (top center) and
                  width resize handle (right edge)
                </li>
                <li>
                  • Drag cards between sections or within sections to reorganize
                  - <strong>width is preserved</strong>
                </li>
                <li>
                  ��� <strong>NEW:</strong> Drop cards on purple zones to create
                  new rows within a section
                </li>
                <li>
                  • <strong>NEW:</strong> Drop cards on green zones to add new
                  rows at the end of a section
                </li>
                <li>
                  • Drag the blue resize handle on the right edge to adjust card
                  width (Small, Medium, Large, Extra Large)
                </li>
                <li>
                  • All cards in the same row maintain equal height
                  automatically
                </li>
                <li>
                  • Your layout and card sizes are automatically saved and
                  persist across sessions
                </li>
                <li>
                  • Use the "Reset Layout" button to restore the default
                  arrangement
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Dashboard;
