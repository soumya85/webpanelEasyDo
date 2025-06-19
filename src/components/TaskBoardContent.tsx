import { useState, useMemo } from "react";
import { DropResult } from "react-beautiful-dnd";
import { AddTaskModal } from "@/components/AddTaskModal";
import { TaskBoardHeader } from "@/components/TaskBoardHeader";
import { TaskBoardNavigation } from "@/components/TaskBoardNavigation";
import { TaskBoardFilters } from "@/components/TaskBoardFilters";
import { TaskBoardViews } from "@/components/TaskBoardViews";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { Task } from "@/types/task";
import { initialTasks } from "@/data/initialTasks";

type SortOption = "created-desc" | "created-asc" | "due-date" | "priority" | "name";
type FilterOption = "all" | "high-priority" | "due-today" | "overdue" | "no-assignee" | "assigned-to-me";
type GroupByOption = "status" | "assignee" | "priority" | "due-date";

export function TaskBoardContent() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState("board");
  const [sortBy, setSortBy] = useState<SortOption>("created-desc");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");
  const [groupBy, setGroupBy] = useState<GroupByOption>("status");

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter(task => {
      // Search filter
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee?.name.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // Additional filters
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
          return task.assignee?.name === "Current User"; // This would be dynamic in real app
        default:
          return true;
      }
    });

    // Sorting
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
  }, [tasks, searchTerm, sortBy, filterBy]);

  const addTask = (columnStatus: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "New Task",
      status: columnStatus as "todo" | "in-progress" | "complete",
      subtasks: [],
      comments: [],
      attachments: [],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
      )
    );
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailOpen(true);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const taskToMove = tasks.find(task => task.id === draggableId);
    if (!taskToMove) return;

    const newStatus = destination.droppableId as "todo" | "in-progress" | "complete";
    
    setTasks(prevTasks => 
      prevTasks.map(task =>
        task.id === draggableId 
          ? { ...task, status: newStatus, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  return (
    <div className="h-full flex flex-col min-h-0 bg-gray-50">
      {/* Ultra-compact Header */}
      <div className="flex-shrink-0 border-b bg-white">
        <TaskBoardHeader className="py-1 px-3 text-sm" />
      </div>
      
      {/* Ultra-compact Navigation */}
      <div className="flex-shrink-0 border-b bg-white">
        <TaskBoardNavigation 
          currentView={currentView}
          setCurrentView={setCurrentView}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          className="py-1 px-2 text-xs"
        />
      </div>
      
      {/* Ultra-compact Filters */}
      <div className="flex-shrink-0 border-b bg-white">
        <TaskBoardFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          className="py-1 px-2 text-xs"
        />
      </div>

      {/* Compact Scrollable Content Area */}
      <div className="flex-1 overflow-auto min-h-0">
        <TaskBoardViews
          currentView={currentView}
          filteredTasks={filteredAndSortedTasks}
          onDragEnd={handleDragEnd}
          onAddTask={addTask}
          onTaskClick={handleTaskClick}
          setIsAddTaskModalOpen={setIsAddTaskModalOpen}
          groupBy={groupBy}
          compact // Pass compact prop for dense rendering
        />
      </div>

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
