import React, { useState, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  Plus,
  Inbox,
  GripVertical,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TaskIcon } from "@/components/ui/task-icon";
import { MeetIcon } from "@/components/ui/meet-icon";
import { cn } from "@/lib/utils";

// Available card types
interface CardType {
  id: string;
  title: string;
  type: string;
  icon: string | "task-icon" | "meet-icon";
  description: string;
}

const availableCards: CardType[] = [
  {
    id: "task-1",
    title: "My Tasks",
    type: "myTask",
    icon: "task-icon",
    description: "View and manage your personal tasks",
  },
  {
    id: "task-2",
    title: "Delegated Tasks",
    type: "delegatedTask",
    icon: "task-icon",
    description: "Track tasks you've assigned to others",
  },
  {
    id: "meetings-1",
    title: "Meetings",
    type: "meetings",
    icon: "meet-icon",
    description: "Your scheduled meetings and appointments",
  },
  {
    id: "approvals-1",
    title: "Pending Approvals",
    type: "approvals",
    icon: "⚠️",
    description: "Items awaiting your approval",
  },
  {
    id: "notes-1",
    title: "Personal Notes",
    type: "notes",
    icon: "📝",
    description: "Your personal notes and reminders",
  },
  {
    id: "chat-1",
    title: "Team Chat",
    type: "chat",
    icon: "💬",
    description: "Chat with your team members",
  },
  {
    id: "notice-1",
    title: "Notice Board",
    type: "notice",
    icon: "📢",
    description: "Company notices and announcements",
  },
  {
    id: "attendance-1",
    title: "Monthly Attendance Summary",
    type: "attendance",
    icon: "📊",
    description: "Your monthly attendance statistics",
  },
  {
    id: "salary-1",
    title: "Salary Snapshot",
    type: "salary",
    icon: "💰",
    description: "Current salary and payroll information",
  },
  {
    id: "performance-1",
    title: "My Performance",
    type: "performance",
    icon: "⭐",
    description: "Your performance ratings and reviews",
  },
  {
    id: "leave-1",
    title: "Leave Balance",
    type: "leave",
    icon: "🏖️",
    description: "Available leave days and requests",
  },
  {
    id: "expenses-1",
    title: "Expense Reports",
    type: "expenses",
    icon: "💳",
    description: "Submit and track expense reports",
  },
  {
    id: "timesheet-1",
    title: "Timesheet",
    type: "timesheet",
    icon: "⏰",
    description: "Log and manage your working hours",
  },
  {
    id: "training-1",
    title: "Training & Development",
    type: "training",
    icon: "🎓",
    description: "Available courses and skill development",
  },
  {
    id: "work-status-1",
    title: "My Daily Work Status",
    type: "workStatus",
    icon: "⏱️",
    description: "Track your daily work hours, punch times, and attendance",
  },
  {
    id: "chat-activity-1",
    title: "Recent Chat Activity",
    type: "chatActivity",
    icon: "💬",
    description: "View recent messages and team communications",
  },
  {
    id: "today-1",
    title: "Today",
    type: "today",
    icon: "📅",
    description: "Your daily schedule, tasks, and calendar overview",
  },
  {
    id: "quick-notes-1",
    title: "Quick Notes",
    type: "quickNotes",
    icon: "📝",
    description: "Add and manage quick notes and reminders",
  },
];

interface DemoCard extends CardType {
  collapsed?: boolean;
}

// Function to get icon and color for each card type
const getCardIconConfig = (type: string) => {
  switch (type) {
    case "myTask":
      return {
        icon: "task-icon",
        bgColor: "bg-blue-100",
        iconColor: "text-blue-600",
      };
    case "delegatedTask":
      return {
        icon: "task-icon",
        bgColor: "bg-purple-100",
        iconColor: "text-purple-600",
      };
    case "meetings":
      return {
        icon: "meet-icon",
        bgColor: "bg-gray-100",
        iconColor: "text-gray-600",
      };
    case "approvals":
      return { icon: "⚠️", bgColor: "bg-red-100", iconColor: "text-red-600" };
    case "notes":
      return {
        icon: "📝",
        bgColor: "bg-yellow-100",
        iconColor: "text-yellow-600",
      };
    case "chat":
      return {
        icon: "💬",
        bgColor: "bg-green-100",
        iconColor: "text-green-600",
      };
    case "notice":
      return {
        icon: "📢",
        bgColor: "bg-orange-100",
        iconColor: "text-orange-600",
      };
    case "attendance":
      return {
        icon: "📊",
        bgColor: "bg-indigo-100",
        iconColor: "text-indigo-600",
      };
    case "salary":
      return {
        icon: "💰",
        bgColor: "bg-emerald-100",
        iconColor: "text-emerald-600",
      };
    case "performance":
      return {
        icon: "⭐",
        bgColor: "bg-amber-100",
        iconColor: "text-amber-600",
      };
    case "leave":
      return { icon: "🏖️", bgColor: "bg-cyan-100", iconColor: "text-cyan-600" };
    case "expenses":
      return { icon: "💳", bgColor: "bg-pink-100", iconColor: "text-pink-600" };
    case "timesheet":
      return {
        icon: "⏰",
        bgColor: "bg-violet-100",
        iconColor: "text-violet-600",
      };
    case "training":
      return { icon: "🎓", bgColor: "bg-teal-100", iconColor: "text-teal-600" };
    case "workStatus":
      return {
        icon: "⏱️",
        bgColor: "bg-slate-100",
        iconColor: "text-slate-600",
      };
    case "chatActivity":
      return { icon: "💬", bgColor: "bg-lime-100", iconColor: "text-lime-600" };
    case "today":
      return { icon: "📅", bgColor: "bg-sky-100", iconColor: "text-sky-600" };
    case "quickNotes":
      return { icon: "📝", bgColor: "bg-rose-100", iconColor: "text-rose-600" };
    default:
      return { icon: "📋", bgColor: "bg-gray-100", iconColor: "text-gray-600" };
  }
};

export default function Demo1() {
  const [mainCards, setMainCards] = useState<DemoCard[]>([
    { ...availableCards[0], collapsed: false },
    { ...availableCards[1], collapsed: false },
  ]);

  const [sidebarCards, setSidebarCards] = useState<DemoCard[]>([
    { ...availableCards[2], collapsed: true }, // Meetings
    { ...availableCards[3], collapsed: true }, // Pending Approvals
    { ...availableCards[6], collapsed: true }, // Notice Board
    { ...availableCards[7], collapsed: true }, // Monthly Attendance Summary
    { ...availableCards[8], collapsed: true }, // Salary Snapshot
    { ...availableCards[9], collapsed: true }, // My Performance
    { ...availableCards[15], collapsed: true }, // My Daily Work Status
    { ...availableCards[16], collapsed: true }, // Recent Chat Activity
    { ...availableCards[17], collapsed: true }, // Today
    { ...availableCards[18], collapsed: true }, // Quick Notes
  ]);

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      console.log("Drag ended:", result);

      const { destination, source, draggableId } = result;

      // If dropped outside any droppable area
      if (!destination) {
        console.log("No destination");
        return;
      }

      // If dropped in the same position
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        console.log("Same position");
        return;
      }

      console.log(
        "Moving from",
        source.droppableId,
        "to",
        destination.droppableId,
      );

      // Find the dragged card
      let draggedCard: DemoCard | undefined;
      if (source.droppableId === "main-area") {
        draggedCard = mainCards.find((card) => card.id === draggableId);
      } else if (source.droppableId === "sidebar") {
        draggedCard = sidebarCards.find((card) => card.id === draggableId);
      }

      if (!draggedCard) {
        console.log("Card not found");
        return;
      }

      console.log("Found dragged card:", draggedCard.title);

      // Moving from main to sidebar
      if (
        source.droppableId === "main-area" &&
        destination.droppableId === "sidebar"
      ) {
        console.log("Moving from main to sidebar");
        const newMainCards = mainCards.filter(
          (card) => card.id !== draggableId,
        );
        const newSidebarCards = [...sidebarCards];
        newSidebarCards.splice(destination.index, 0, {
          ...draggedCard,
          collapsed: true,
        });

        setMainCards(newMainCards);
        setSidebarCards(newSidebarCards);
      }
      // Moving from sidebar to main
      else if (
        source.droppableId === "sidebar" &&
        destination.droppableId === "main-area"
      ) {
        console.log("Moving from sidebar to main");
        const newSidebarCards = sidebarCards.filter(
          (card) => card.id !== draggableId,
        );
        const newMainCards = [...mainCards];
        newMainCards.splice(destination.index, 0, {
          ...draggedCard,
          collapsed: false,
        });

        setSidebarCards(newSidebarCards);
        setMainCards(newMainCards);
      }
      // Reordering within main area
      else if (
        source.droppableId === "main-area" &&
        destination.droppableId === "main-area"
      ) {
        console.log("Reordering in main area");
        const newMainCards = [...mainCards];
        const [removed] = newMainCards.splice(source.index, 1);
        newMainCards.splice(destination.index, 0, removed);
        setMainCards(newMainCards);
      }
      // Reordering within sidebar
      else if (
        source.droppableId === "sidebar" &&
        destination.droppableId === "sidebar"
      ) {
        console.log("Reordering in sidebar");
        const newSidebarCards = [...sidebarCards];
        const [removed] = newSidebarCards.splice(source.index, 1);
        newSidebarCards.splice(destination.index, 0, removed);
        setSidebarCards(newSidebarCards);
      }
    },
    [mainCards, sidebarCards],
  );

  const toggleCardCollapse = (cardId: string) => {
    setSidebarCards(
      sidebarCards.map((card) =>
        card.id === cardId ? { ...card, collapsed: !card.collapsed } : card,
      ),
    );
  };

  const addNewCard = () => {
    const usedCardIds = [...mainCards, ...sidebarCards].map((card) => card.id);
    const availableCard = availableCards.find(
      (card) => !usedCardIds.includes(card.id),
    );

    if (availableCard) {
      setSidebarCards([...sidebarCards, { ...availableCard, collapsed: true }]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-156px)] bg-gray-50 overflow-hidden">
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-auto">
          <Droppable droppableId="main-area">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={cn(
                  "min-h-[500px] p-6 rounded-lg border-2 border-dashed transition-all duration-200",
                  snapshot.isDraggingOver
                    ? "border-blue-400 bg-blue-50 shadow-inner ring-2 ring-blue-200"
                    : "border-gray-300 bg-white hover:border-gray-400",
                )}
              >
                <div className="flex flex-wrap gap-6">
                  {mainCards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={provided.draggableProps.style}
                          className={cn(
                            "w-full md:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] transition-all duration-200",
                            snapshot.isDragging && "rotate-2 scale-105 z-50",
                          )}
                        >
                          <Card
                            className={cn(
                              "h-full cursor-move select-none group",
                              snapshot.isDragging
                                ? "shadow-2xl ring-2 ring-blue-400 ring-opacity-50 bg-white"
                                : "shadow-md hover:shadow-lg hover:ring-1 hover:ring-gray-200",
                            )}
                          >
                            <CardHeader className="pb-3">
                              <div className="flex items-start justify-between mb-2">
                                {(() => {
                                  const config = getCardIconConfig(card.type);
                                  return (
                                    <div
                                      className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center",
                                        config.bgColor,
                                      )}
                                    >
                                      {config.icon === "task-icon" ? (
                                        <TaskIcon
                                          size="sm"
                                          className={config.iconColor}
                                        />
                                      ) : config.icon === "meet-icon" ? (
                                        <MeetIcon size="sm" className="" />
                                      ) : (
                                        <span className="text-sm">
                                          {config.icon}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })()}
                                <div
                                  {...provided.dragHandleProps}
                                  className="p-1 rounded hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
                                  title="Drag to reorder"
                                >
                                  <GripVertical className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                                </div>
                              </div>
                              <div>
                                <h3
                                  className="font-semibold text-gray-800 mb-1"
                                  style={{ fontSize: "15px" }}
                                >
                                  {card.title}
                                </h3>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm text-gray-600 mb-4">
                                {card.description}
                              </p>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-500 mb-2">
                                  Card Content Preview:
                                </p>
                                <div className="space-y-2">
                                  <div className="h-2 bg-gray-200 rounded"></div>
                                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
                {mainCards.length === 0 && (
                  <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg">
                    <p className="text-gray-400 text-lg">
                      Drop cards here to add them to your dashboard
                    </p>
                  </div>
                )}
                {mainCards.length > 0 && (
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-500">
                      💡 Tip: Drag cards by their grip handles (⋮⋮) to reorder
                      them or move between areas. You can also drag cards from
                      the right sidebar to the main area.
                    </p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>

        {/* Right Sidebar */}
        <div
          className={cn(
            "transition-all duration-300 bg-blue-100 border-l border-blue-200 flex flex-col shadow-lg",
            isSidebarExpanded ? "w-80" : "w-16",
          )}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-blue-200 bg-blue-50">
            <div className="flex items-center justify-between">
              {isSidebarExpanded && (
                <div className="flex items-center gap-2">
                  <Inbox className="h-6 w-6 text-blue-600" />
                  <h2 className="font-bold text-blue-900 text-lg">Data Hub</h2>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="text-blue-600 hover:bg-blue-200"
              >
                {isSidebarExpanded ? (
                  <ChevronRight className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5 rotate-90" />
                )}
              </Button>
            </div>
          </div>

          {isSidebarExpanded && (
            <>
              {/* Add Card Button */}
              <div className="p-4">
                <Button
                  onClick={addNewCard}
                  variant="outline"
                  className="w-full justify-start text-gray-700 border-gray-300 bg-white hover:bg-gray-50"
                  disabled={
                    sidebarCards.length + mainCards.length >=
                    availableCards.length
                  }
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
                      "flex-1 p-4 space-y-3 overflow-auto",
                      snapshot.isDraggingOver && "bg-blue-200",
                    )}
                  >
                    {sidebarCards.map((card, index) => (
                      <Draggable
                        key={card.id}
                        draggableId={card.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={provided.draggableProps.style}
                            className={cn(
                              "transition-all duration-200",
                              snapshot.isDragging && "rotate-2 scale-105",
                            )}
                          >
                            <Card
                              className={cn(
                                "bg-white cursor-move select-none border",
                                snapshot.isDragging
                                  ? "shadow-xl ring-2 ring-blue-400 ring-opacity-50"
                                  : "shadow-sm hover:shadow-md",
                              )}
                            >
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <button
                                      onClick={() =>
                                        toggleCardCollapse(card.id)
                                      }
                                      className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
                                    >
                                      {card.collapsed ? (
                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-400" />
                                      )}
                                    </button>
                                    {(() => {
                                      const config = getCardIconConfig(
                                        card.type,
                                      );
                                      return (
                                        <div
                                          className={cn(
                                            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                                            config.bgColor,
                                          )}
                                        >
                                          {config.icon === "task-icon" ? (
                                            <TaskIcon
                                              size="sm"
                                              className={config.iconColor}
                                            />
                                          ) : config.icon === "meet-icon" ? (
                                            <MeetIcon size="sm" className="" />
                                          ) : (
                                            <span className="text-xs">
                                              {config.icon}
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })()}
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                      {card.title}
                                    </span>
                                  </div>
                                  <div
                                    {...provided.dragHandleProps}
                                    className="flex-shrink-0 ml-2 p-1 hover:bg-gray-100 rounded"
                                  >
                                    <GripVertical className="h-4 w-4 text-gray-400" />
                                  </div>
                                </div>
                                {!card.collapsed && (
                                  <div className="mt-3 pl-6">
                                    <p className="text-xs text-gray-500 mb-2">
                                      {card.description}
                                    </p>
                                    <div className="space-y-1">
                                      <div className="h-1 bg-gray-200 rounded"></div>
                                      <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {sidebarCards.length === 0 && (
                      <div className="text-center text-gray-500 text-sm py-8">
                        Drag cards here to store them
                      </div>
                    )}
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
