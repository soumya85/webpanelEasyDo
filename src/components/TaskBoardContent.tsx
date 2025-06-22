import { useState, useMemo, useEffect } from "react";
import { Task } from "@/types/task";
import { initialTasks } from "@/data/initialTasks";
import { AddTaskModal } from "@/components/AddTaskModal";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, LayoutGrid, List, Calendar as CalendarIcon, SlidersHorizontal, BarChart2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, startOfMonth, endOfMonth, addDays, isToday, differenceInCalendarDays, addMonths, addWeeks, addYears, isSameDay } from "date-fns";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

type SortOption = "created-desc" | "created-asc" | "due-date" | "priority" | "name";
type FilterOption = "all" | "high-priority" | "due-today" | "overdue" | "no-assignee" | "assigned-to-me";
type GroupByOption = "status" | "assignee" | "priority" | "due-date";

const groupOptions: { value: GroupByOption; label: string }[] = [
  { value: "status", label: "Status" },
  { value: "assignee", label: "Assignee" },
  { value: "priority", label: "Priority" },
  { value: "due-date", label: "Due Date" },
];

// --- Calendar View Component ---
function CalendarView({
  tasks,
  onTaskClick,
}: {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = addDays(monthStart, -1);
  const endDate = addDays(monthEnd, 1);

  const days: Date[] = [];
  let day = startDate;
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  // Map date string to tasks
  const tasksByDate: Record<string, Task[]> = {};
  tasks.forEach(task => {
    if (task.dueDate) {
      const key = format(new Date(task.dueDate), "yyyy-MM-dd");
      if (!tasksByDate[key]) tasksByDate[key] = [];
      tasksByDate[key].push(task);
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        >
          <span className="text-xl">&lt;</span>
        </Button>
        <h2 className="text-xl font-bold text-blue-700">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          <span className="text-xl">&gt;</span>
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center font-semibold text-gray-500 mb-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((date, idx) => {
          const key = format(date, "yyyy-MM-dd");
          const dayTasks = tasksByDate[key] || [];
          return (
            <div
              key={key}
              className={cn(
                "rounded-lg min-h-[80px] p-1 flex flex-col items-stretch border transition",
                isSameDay(date, new Date()) && "bg-blue-50",
                isToday(date) && "border-blue-500 ring-2 ring-blue-200"
              )}
            >
              <div className={cn(
                "text-xs font-bold mb-1 text-right",
                isToday(date) ? "text-blue-600" : "text-gray-500"
              )}>
                {format(date, "d")}
              </div>
              <div className="flex flex-col gap-1">
                {dayTasks.slice(0, 2).map(task => (
                  <button
                    key={task.id}
                    className={cn(
                      "truncate text-xs px-1 py-0.5 rounded bg-blue-50 text-blue-700 text-left hover:bg-blue-100",
                      "border border-blue-100"
                    )}
                    onClick={() => onTaskClick(task)}
                    title={task.title}
                  >
                    {task.title}
                  </button>
                ))}
                {dayTasks.length > 2 && (
                  <span className="text-xs text-blue-400 mt-1">
                    +{dayTasks.length - 2} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Gantt Chart View Component ---
function GanttChartView({
  tasks,
  onTaskClick,
}: {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}) {
  // Zoom levels: day, week, month
  const zoomLevels = [
    { label: "Day", days: 30, step: "day" },
    { label: "Week", days: 90, step: "week" },
    { label: "Month", days: 365, step: "month" },
  ];
  const [zoom, setZoom] = useState(0); // 0: day, 1: week, 2: month
  const [viewStart, setViewStart] = useState(() => startOfMonth(new Date()));

  // Calculate Gantt range (min start, max end)
  const validTasks = tasks.filter(t => t.dueDate && t.startDate);
  const minStart = validTasks.length
    ? validTasks.map(t => new Date(t.startDate!)).reduce((a, b) => (a < b ? a : b))
    : new Date();
  const maxEnd = validTasks.length
    ? validTasks.map(t => new Date(t.dueDate!)).reduce((a, b) => (a > b ? a : b))
    : new Date();

  // Calculate visible range based on zoom
  let daysArr: Date[] = [];
  let rangeStart = viewStart;
  let rangeEnd = (() => {
    if (zoom === 0) return addDays(rangeStart, zoomLevels[zoom].days - 1);
    if (zoom === 1) return addWeeks(rangeStart, Math.floor(zoomLevels[zoom].days / 7) - 1);
    if (zoom === 2) return addYears(rangeStart, 1);
    return addDays(rangeStart, 29);
  })();

  if (zoom === 0) {
    for (let d = 0; d < zoomLevels[zoom].days; d++) {
      daysArr.push(addDays(rangeStart, d));
    }
  } else if (zoom === 1) {
    for (let w = 0; w < Math.floor(zoomLevels[zoom].days / 7); w++) {
      daysArr.push(addWeeks(rangeStart, w));
    }
  } else {
    for (let m = 0; m < 12; m++) {
      daysArr.push(addMonths(rangeStart, m));
    }
  }

  // Drag state for horizontal scroll
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Gantt bar color by priority
  const getBarColor = (priority: string) => {
    if (priority === "high") return "bg-red-500";
    if (priority === "medium") return "bg-yellow-400";
    return "bg-blue-400";
  };

  // Gantt grid
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 overflow-x-auto select-none">
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-700" />
          <h2 className="text-xl font-bold text-blue-700">Gantt Chart</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewStart(addMonths(viewStart, zoom === 2 ? -12 : zoom === 1 ? -3 : -1))}
            title="Previous"
          >
            <ChevronLeft />
          </Button>
          <span className="font-medium text-gray-600">
            {format(rangeStart, "MMM yyyy")} - {format(rangeEnd, "MMM yyyy")}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewStart(addMonths(viewStart, zoom === 2 ? 12 : zoom === 1 ? 3 : 1))}
            title="Next"
          >
            <ChevronRight />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.max(0, zoom - 1))}
            disabled={zoom === 0}
            title="Zoom In"
          >
            <ZoomIn />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoom(Math.min(2, zoom + 1))}
            disabled={zoom === 2}
            title="Zoom Out"
          >
            <ZoomOut />
          </Button>
          <span className="text-xs text-gray-400 ml-2">{zoomLevels[zoom].label} view</span>
        </div>
      </div>
      <div
        className="overflow-x-auto"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        onMouseDown={e => {
          setIsDragging(true);
          setDragStartX(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={e => {
          if (isDragging) {
            const container = e.currentTarget as HTMLDivElement;
            container.scrollLeft -= e.movementX;
          }
        }}
      >
        <div className="min-w-[900px]">
          {/* Header */}
          <div className="flex text-xs font-semibold text-gray-500 border-b pb-2 mb-2 min-w-[700px]">
            <div className="w-56 flex-shrink-0">Task</div>
            <div className="flex-1 flex">
              {daysArr.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 text-center border-l border-gray-100 px-0.5",
                    zoom === 0 && isToday(day) && "text-blue-600 font-bold bg-blue-50 rounded"
                  )}
                >
                  {zoom === 0
                    ? format(day, "d")
                    : zoom === 1
                    ? format(day, "wo MMM")
                    : format(day, "MMM")}
                </div>
              ))}
            </div>
          </div>
          {/* Rows */}
          {tasks.map(task => {
            if (!task.startDate || !task.dueDate) return null;
            const start = new Date(task.startDate);
            const end = new Date(task.dueDate);

            // Calculate bar position and length
            let startIdx = 0, endIdx = 0;
            if (zoom === 0) {
              startIdx = Math.max(0, differenceInCalendarDays(start, daysArr[0]));
              endIdx = Math.min(daysArr.length - 1, differenceInCalendarDays(end, daysArr[0]));
            } else if (zoom === 1) {
              startIdx = Math.max(0, Math.floor(differenceInCalendarDays(start, daysArr[0]) / 7));
              endIdx = Math.min(daysArr.length - 1, Math.floor(differenceInCalendarDays(end, daysArr[0]) / 7));
            } else {
              startIdx = Math.max(0, (start.getMonth() - daysArr[0].getMonth()) + 12 * (start.getFullYear() - daysArr[0].getFullYear()));
              endIdx = Math.min(daysArr.length - 1, (end.getMonth() - daysArr[0].getMonth()) + 12 * (end.getFullYear() - daysArr[0].getFullYear()));
            }
            const barLength = Math.max(1, endIdx - startIdx + 1);

            return (
              <div key={task.id} className="flex items-center h-12 group">
                <div className="w-56 flex-shrink-0 pr-2 truncate font-medium text-gray-800 flex items-center gap-2">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      getBarColor(task.priority || "low")
                    )}
                  />
                  <button
                    className="hover:underline"
                    onClick={() => onTaskClick(task)}
                    title={task.title}
                  >
                    {task.title}
                  </button>
                  {task.assignee && (
                    <Badge className="ml-2 bg-blue-100 text-blue-700">{task.assignee.name}</Badge>
                  )}
                </div>
                <div className="flex-1 flex items-center relative h-8">
                  <div className="flex absolute left-0 top-0 w-full h-full">
                    {daysArr.map((_, i) => (
                      <div key={i} className="flex-1 border-l border-gray-100 h-full" />
                    ))}
                  </div>
                  <div
                    className={cn(
                      "absolute h-6 rounded-full flex items-center justify-center text-xs font-semibold shadow transition-all group-hover:scale-105 cursor-pointer",
                      getBarColor(task.priority || "low"),
                      "opacity-90 hover:opacity-100"
                    )}
                    style={{
                      left: `${(startIdx / daysArr.length) * 100}%`,
                      width: `${(barLength / daysArr.length) * 100}%`,
                      minWidth: "32px",
                      zIndex: 2,
                    }}
                    title={`${task.title}: ${format(start, "MMM d")} - ${format(end, "MMM d")}`}
                    onClick={() => onTaskClick(task)}
                  >
                    <span className="truncate px-2 text-white">{task.assignee?.name || "Unassigned"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {tasks.filter(t => t.startDate && t.dueDate).length === 0 && (
          <div className="text-center text-gray-400 py-8">No tasks with start and end dates.</div>
        )}
      </div>
    </div>
  );
}

// --- Main TaskBoardContent Component ---
export function TaskBoardContent() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<"board" | "list" | "calendar" | "gantt">("board");
  const [sortBy, setSortBy] = useState<SortOption>("created-desc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [groupBy, setGroupBy] = useState<GroupByOption>("status");
  const [topFilter, setTopFilter] = useState<"my" | "delegated">("my");

  // Example: Replace "Current User" with your actual user logic
  const currentUser = "Current User";

  // Top-level filter logic
  const topLevelFilteredTasks = useMemo(() => {
    if (topFilter === "my") {
      return tasks.filter(task => task.assignee?.name === currentUser);
    } else {
      return tasks.filter(task => task.assignee?.name !== currentUser);
    }
  }, [tasks, topFilter, currentUser]);

  // Filtering and sorting logic
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = topLevelFilteredTasks.filter(task => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee?.name.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      switch (filterBy) {
        case "high-priority":
          return task.priority === "high" || task.priority === "urgent";
        case "due-today":
          if (!task.dueDate) return false;
          const today = new Date().toDateString();
          return new Date(task.dueDate).toDateString() === today;
        case "overdue":
          if (!task.dueDate) return false;
          return new Date(task.dueDate) < new Date() && task.status !== "complete";
        case "no-assignee":
          return !task.assignee;
        case "assigned-to-me":
          return task.assignee?.name === currentUser;
        default:
          return true;
      }
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "created-asc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "created-desc":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "due-date":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          return bPriority - aPriority;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [topLevelFilteredTasks, searchTerm, sortBy, filterBy, currentUser]);

  // Task CRUD
  const addTask = (task: Task) => setTasks(prev => [...prev, task]);
  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
      )
    );
  };

  // Grouping logic
  const groupedTasks = useMemo(() => {
    const groups: Record<string, Task[]> = {};
    filteredAndSortedTasks.forEach(task => {
      let key = "";
      switch (groupBy) {
        case "status":
          key = task.status || "No Status";
          break;
        case "assignee":
          key = task.assignee?.name || "Unassigned";
          break;
        case "priority":
          key = task.priority || "No Priority";
          break;
        case "due-date":
          key = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date";
          break;
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    });
    return groups;
  }, [filteredAndSortedTasks, groupBy]);

  // Drag and Drop state
  const [localGroupedTasks, setLocalGroupedTasks] = useState(groupedTasks);

  useEffect(() => {
    setLocalGroupedTasks(groupedTasks);
  }, [groupedTasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      // Reorder within the same column
      const items = Array.from(localGroupedTasks[sourceCol]);
      const [removed] = items.splice(source.index, 1);
      items.splice(destination.index, 0, removed);

      setLocalGroupedTasks({
        ...localGroupedTasks,
        [sourceCol]: items,
      });
    } else {
      // Move to another column
      const sourceItems = Array.from(localGroupedTasks[sourceCol]);
      const destItems = Array.from(localGroupedTasks[destCol]);
      const [removed] = sourceItems.splice(source.index, 1);
      removed.status = destCol as Task["status"]; // Update status if needed
      destItems.splice(destination.index, 0, removed);

      setLocalGroupedTasks({
        ...localGroupedTasks,
        [sourceCol]: sourceItems,
        [destCol]: destItems,
      });
      // Optionally, update the backend or global state here
    }
  };

  // UI
  return (
    <div className="h-full flex flex-col min-h-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 py-3 bg-white border-b sticky top-0 z-50 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-blue-700 tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-indigo-500" />
            Task Board
          </h1>
          <div className="text-xs text-gray-400 mt-1 font-medium">
            Organize, track, and complete your work efficiently.
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-56">
            <Input
              placeholder="Search tasks, assignee, or details"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-9 py-1.5 text-sm rounded border border-blue-100 focus:border-blue-400 transition"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-400 w-4 h-4" />
          </div>
          <Button
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-3 py-1.5 rounded shadow hover:bg-blue-700 transition text-sm"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Add Task
          </Button>
        </div>
      </div>

      {/* --- Top-level filter --- */}
      <div className="flex gap-2 px-4 py-2 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 border-b sticky top-[56px] z-40 shadow-sm">
        <Button
          variant={topFilter === "my" ? "default" : "outline"}
          className={`font-semibold text-sm px-4 py-1 rounded-full transition-all shadow-sm ${
            topFilter === "my"
              ? "bg-white text-blue-700 border border-blue-600"
              : "bg-blue-100 text-blue-700 hover:bg-white"
          }`}
          onClick={() => setTopFilter("my")}
        >
          My Tasks
        </Button>
        <Button
          variant={topFilter === "delegated" ? "default" : "outline"}
          className={`font-semibold text-sm px-4 py-1 rounded-full transition-all shadow-sm ${
            topFilter === "delegated"
              ? "bg-white text-blue-700 border border-blue-600"
              : "bg-blue-100 text-blue-700 hover:bg-white"
          }`}
          onClick={() => setTopFilter("delegated")}
        >
          Delegated Tasks
        </Button>
      </div>

      {/* --- Controls --- */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-white border-b sticky top-[88px] z-30 shadow-sm">
        <Tabs value={currentView} onValueChange={v => setCurrentView(v as "board" | "list" | "calendar" | "gantt")}>
          <TabsList className="bg-blue-50 rounded px-1 py-1">
            <TabsTrigger value="board" className="flex items-center gap-1 text-sm px-2 py-1 rounded">
              <LayoutGrid className="w-4 h-4" /> Board
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-1 text-sm px-2 py-1 rounded">
              <List className="w-4 h-4" /> List
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-1 text-sm px-2 py-1 rounded">
              <CalendarIcon className="w-4 h-4" /> Calendar
            </TabsTrigger>
            <TabsTrigger value="gantt" className="flex items-center gap-1 text-sm px-2 py-1 rounded">
              <BarChart2 className="w-4 h-4" /> Gantt
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-1">
          <Filter className="w-4 h-4 text-blue-400" />
          <select
            className="border border-blue-100 rounded px-2 py-1 text-sm bg-blue-50 focus:border-blue-400 transition"
            value={filterBy}
            onChange={e => setFilterBy(e.target.value as FilterOption)}
          >
            <option value="all">All Tasks</option>
            <option value="high-priority">High Priority</option>
            <option value="due-today">Due Today</option>
            <option value="overdue">Overdue</option>
            <option value="no-assignee">No Assignee</option>
            <option value="assigned-to-me">Assigned to Me</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          <select
            className="border border-blue-100 rounded px-2 py-1 text-sm bg-blue-50 focus:border-blue-400 transition"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as SortOption)}
          >
            <option value="created-desc">Newest</option>
            <option value="created-asc">Oldest</option>
            <option value="due-date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-blue-500 text-sm font-semibold">Group by</span>
          <select
            className="border border-blue-100 rounded px-2 py-1 text-sm bg-blue-50 focus:border-blue-400 transition"
            value={groupBy}
            onChange={e => setGroupBy(e.target.value as GroupByOption)}
          >
            {groupOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Main Content: 100% available height for board view --- */}
      <div className="flex-1 min-h-0 flex flex-col">
        {currentView === "board" ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div
              className="flex-1 min-h-0 overflow-auto"
              style={{ height: "100%" }}
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full"
                style={{ minHeight: "100%" }}
              >
                {Object.entries(localGroupedTasks)
                  .slice(0, 4)
                  .map(([group, groupTasks]) => (
                    <Droppable droppableId={group} key={group}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex flex-col bg-white rounded-lg shadow p-2 min-h-0 h-full transition ${
                            snapshot.isDraggingOver ? "bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-base text-gray-800 truncate">{group}</h2>
                            <Badge className="bg-blue-100 text-blue-700">{groupTasks.length}</Badge>
                          </div>
                          <div className="flex-1 overflow-y-auto min-h-0">
                            {groupTasks.slice(0, 4).map((task, idx) => (
                              <Draggable draggableId={task.id} index={idx} key={task.id}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`mb-2 shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100 rounded bg-gradient-to-br from-white to-blue-50 p-2 ${
                                      snapshot.isDragging ? "ring-2 ring-blue-400" : ""
                                    }`}
                                    onClick={() => {
                                      setSelectedTask(task);
                                      setIsTaskDetailOpen(true);
                                    }}
                                    style={{
                                      minHeight: 56,
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <h3 className="font-semibold text-gray-900 text-sm truncate">{task.title}</h3>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">{task.description}</p>
                                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                                      <Badge
                                        className={
                                          task.priority === "high"
                                            ? "bg-red-100 text-red-700"
                                            : task.priority === "medium"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-gray-100 text-gray-700"
                                        }
                                      >
                                        {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
                                      </Badge>
                                      {task.assignee && (
                                        <Badge className="bg-blue-100 text-blue-700">{task.assignee.name}</Badge>
                                      )}
                                      {task.dueDate && (
                                        <Badge className="bg-gray-100 text-gray-700">
                                          Due: {new Date(task.dueDate).toLocaleDateString()}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  ))}
              </div>
            </div>
          </DragDropContext>
        ) : currentView === "calendar" ? (
          <CalendarView
            tasks={filteredAndSortedTasks}
            onTaskClick={task => {
              setSelectedTask(task);
              setIsTaskDetailOpen(true);
            }}
          />
        ) : currentView === "gantt" ? (
          <GanttChartView
            tasks={filteredAndSortedTasks}
            onTaskClick={task => {
              setSelectedTask(task);
              setIsTaskDetailOpen(true);
            }}
          />
        ) : (
          // List View
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-400 py-8">No tasks found.</td>
                  </tr>
                ) : (
                  filteredAndSortedTasks.map(task => (
                    <tr
                      key={task.id}
                      className="hover:bg-blue-50 transition cursor-pointer"
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskDetailOpen(true);
                      }}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">{task.title}</td>
                      <td className="px-6 py-4">{task.assignee?.name || <span className="text-gray-400">Unassigned</span>}</td>
                      <td className="px-6 py-4">
                        <Badge
                          className={
                            task.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</td>
                      <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline">View</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddTaskModal 
        open={isAddTaskModalOpen} 
        onOpenChange={setIsAddTaskModalOpen} 
      />
      <TaskDetailModal
        task={selectedTask}
        open={isTaskDetailOpen}
        onOpenChange={setIsTaskDetailOpen}
        onUpdateTask={updateTask}
      />
    </div>
  );
}
