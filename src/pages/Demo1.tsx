import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Plus, Inbox, GripVertical, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Available card types
interface CardType {
  id: string;
  title: string;
  type: string;
  icon: string;
  description: string;
}

const availableCards: CardType[] = [
  {
    id: "task-1",
    title: "My Tasks",
    type: "myTask",
    icon: "📋",
    description: "View and manage your personal tasks"
  },
  {
    id: "task-2", 
    title: "Delegated Tasks",
    type: "delegatedTask", 
    icon: "👥",
    description: "Track tasks you've assigned to others"
  },
  {
    id: "meetings-1",
    title: "Meetings",
    type: "meetings",
    icon: "📅", 
    description: "Your scheduled meetings and appointments"
  },
  {
    id: "approvals-1",
    title: "Pending Approvals",
    type: "approvals",
    icon: "⚠️",
    description: "Items awaiting your approval"
  },
  {
    id: "notes-1",
    title: "Personal Notes",
    type: "notes", 
    icon: "📝",
    description: "Your personal notes and reminders"
  },
  {
    id: "chat-1",
    title: "Team Chat",
    type: "chat",
    icon: "💬",
    description: "Chat with your team members"
  },
  {
    id: "performance-1",
    title: "Performance Metrics",
    type: "performance",
    icon: "📊",
    description: "View your performance analytics"
  },
  {
    id: "attendance-1",
    title: "Attendance",
    type: "attendance", 
    icon: "🕐",
    description: "Track your attendance records"
  }
];

interface DemoCard extends CardType {
  collapsed?: boolean;
}

export default function Demo1() {
  const [mainCards, setMainCards] = useState<DemoCard[]>([
    availableCards[0], // Start with one card in main area
    availableCards[1]
  ]);
  
  const [sidebarCards, setSidebarCards] = useState<DemoCard[]>(
    availableCards.slice(2).map(card => ({ ...card, collapsed: true }))
  );

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    // Helper function to remove card from array
    const removeCard = (cards: DemoCard[], cardId: string) => 
      cards.filter(card => card.id !== cardId);

    // Helper function to add card to array
    const addCard = (cards: DemoCard[], card: DemoCard, index: number) => {
      const newCards = [...cards];
      newCards.splice(index, 0, card);
      return newCards;
    };

    // Find the dragged card
    let draggedCard: DemoCard | undefined;
    if (source.droppableId === "main-area") {
      draggedCard = mainCards.find(card => card.id === draggableId);
    } else if (source.droppableId === "sidebar") {
      draggedCard = sidebarCards.find(card => card.id === draggableId);
    }

    if (!draggedCard) return;

    // Moving from main to sidebar
    if (source.droppableId === "main-area" && destination.droppableId === "sidebar") {
      setMainCards(removeCard(mainCards, draggableId));
      setSidebarCards(addCard(sidebarCards, { ...draggedCard, collapsed: true }, destination.index));
    }
    // Moving from sidebar to main
    else if (source.droppableId === "sidebar" && destination.droppableId === "main-area") {
      setSidebarCards(removeCard(sidebarCards, draggableId));
      setMainCards(addCard(mainCards, { ...draggedCard, collapsed: false }, destination.index));
    }
    // Reordering within main area
    else if (source.droppableId === "main-area" && destination.droppableId === "main-area") {
      const newMainCards = [...mainCards];
      const [removed] = newMainCards.splice(source.index, 1);
      newMainCards.splice(destination.index, 0, removed);
      setMainCards(newMainCards);
    }
    // Reordering within sidebar
    else if (source.droppableId === "sidebar" && destination.droppableId === "sidebar") {
      const newSidebarCards = [...sidebarCards];
      const [removed] = newSidebarCards.splice(source.index, 1);
      newSidebarCards.splice(destination.index, 0, removed);
      setSidebarCards(newSidebarCards);
    }
  }, [mainCards, sidebarCards]);

  const toggleCardCollapse = (cardId: string, isInSidebar: boolean) => {
    if (isInSidebar) {
      setSidebarCards(sidebarCards.map(card => 
        card.id === cardId ? { ...card, collapsed: !card.collapsed } : card
      ));
    }
  };

  const addNewCard = () => {
    // Find cards not in main area or sidebar
    const usedCardIds = [...mainCards, ...sidebarCards].map(card => card.id);
    const availableCard = availableCards.find(card => !usedCardIds.includes(card.id));
    
    if (availableCard) {
      setSidebarCards([...sidebarCards, { ...availableCard, collapsed: true }]);
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Demo Dashboard</h1>
            <p className="text-gray-600">Drag cards between the main area and sidebar to organize your dashboard.</p>
          </div>

          <Droppable droppableId="main-area">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors",
                  snapshot.isDraggingOver ? "border-blue-400 bg-blue-50" : "border-gray-300 bg-white"
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mainCards.map((card, index) => (
                    <Draggable key={card.id} draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={cn(
                            "transition-shadow cursor-move",
                            snapshot.isDragging && "shadow-lg rotate-2"
                          )}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">{card.icon}</span>
                                <h3 className="font-semibold text-sm">{card.title}</h3>
                              </div>
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-xs text-gray-600">{card.description}</p>
                            <div className="mt-3 p-3 bg-gray-50 rounded text-xs text-gray-500">
                              Card content would go here...
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
                {mainCards.length === 0 && (
                  <div className="flex items-center justify-center h-32 text-gray-400">
                    <p>Drop cards here to add them to your dashboard</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>

        {/* Right Sidebar */}
        <div className={cn(
          "transition-all duration-300 bg-blue-100 border-l border-blue-200 flex flex-col",
          isSidebarExpanded ? "w-80" : "w-12"
        )}>
          {/* Sidebar Header */}
          <div className="p-4 border-b border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between">
              {isSidebarExpanded && (
                <div className="flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-blue-600" />
                  <h2 className="font-semibold text-blue-900">Inbox</h2>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="text-blue-600 hover:bg-blue-200"
              >
                {isSidebarExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4 rotate-90" />}
              </Button>
            </div>
          </div>

          {isSidebarExpanded && (
            <>
              {/* Add Card Button */}
              <div className="p-3">
                <Button
                  onClick={addNewCard}
                  variant="outline"
                  className="w-full justify-start text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
                  disabled={sidebarCards.length + mainCards.length >= availableCards.length}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add a card
                </Button>
              </div>

              {/* Sidebar Cards */}
              <Droppable droppableId="sidebar">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "flex-1 p-3 space-y-2",
                      snapshot.isDraggingOver && "bg-blue-200"
                    )}
                  >
                    {sidebarCards.map((card, index) => (
                      <Draggable key={card.id} draggableId={card.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "bg-white transition-shadow cursor-move",
                              snapshot.isDragging && "shadow-lg"
                            )}
                          >
                            <CardContent className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <button
                                    onClick={() => toggleCardCollapse(card.id, true)}
                                    className="flex-shrink-0"
                                  >
                                    {card.collapsed ? (
                                      <ChevronRight className="h-3 w-3 text-gray-400" />
                                    ) : (
                                      <ChevronDown className="h-3 w-3 text-gray-400" />
                                    )}
                                  </button>
                                  <span className="text-sm">{card.icon}</span>
                                  <span className="text-sm font-medium text-gray-700 truncate">
                                    {card.title}
                                  </span>
                                </div>
                                <div {...provided.dragHandleProps} className="flex-shrink-0 ml-2">
                                  <GripVertical className="h-3 w-3 text-gray-400" />
                                </div>
                              </div>
                              {!card.collapsed && (
                                <div className="mt-2 pl-5">
                                  <p className="text-xs text-gray-500">{card.description}</p>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </>
          )}
        </div>
      </DragDropContext>
    </div>
  );
}
