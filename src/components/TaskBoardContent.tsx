import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import { LayoutGrid, Search, Plus, Filter } from "lucide-react";
import { TaskCalendarView } from "./TaskCalendarView";
import { TaskGanttView } from "./TaskGanttView";
import { AddTaskModal } from "./AddTaskModal";
import { TaskDetailModal } from "./TaskDetailModal";

type SortOption =
  | "created-desc"
  | "created-asc"
  | "due-date"
  | "priority"
  | "name";

// Example: Task card data structure for all filters, sorting, and requirements

export type TaskStatus =
  | "noAction"
  | "inprogress"
  | "skip"
  | "done"
  | "completed";
export type TaskPriority = "urgent" | "high" | "medium" | "low";
export type TaskTag = "NEW" | "G.Task" | "Group Task" | "SKIPPED" | "Delegated";

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
  department?: string;
  designation?: string;
  branch?: string;
}

export interface TaskCardData {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: TaskTag[];
  createdAt: string; // ISO date
  dueDate?: string; // ISO date
  completedAt?: string; // ISO date
  createdBy: User;
  assignedTo: User;
  commentsCount: number;
  attachmentsCount: number;
  watchers: User[];
  isDelegated: boolean;
  daysLeft?: number;
}

// Place this mock data at the top of your file, before your component

// Example data
export const taskCardData: TaskCardData[] = [
  // --- My Tasks (assigned to 'Current User') ---
  // noAction
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `my-noaction-${i + 1}`,
    title: `My No Action Task ${i + 1}`,
    description: `Description for my no action task ${i + 1}`,
    status: "noAction" as TaskStatus,
    priority: (["urgent", "high", "medium", "low", "medium"] as TaskPriority[])[
      i
    ],
    tags: ["NEW" as TaskTag],
    createdAt: `2025-02-01T0${i + 1}:00:00Z`,
    dueDate: `2025-02-04T1${i + 1}:00:00Z`,
    createdBy: {
      id: "u1",
      name: "Shibyjyoti Sarkar",
      department: "Engineering",
      designation: "Lead Developer",
      branch: "Main Branch",
    },
    assignedTo: {
      id: "u2",
      name: "Current User",
      department: "Engineering",
      designation: "Developer",
      branch: "Main Branch",
    },
    commentsCount: i,
    attachmentsCount: i % 3,
    watchers: [],
    isDelegated: false,
    daysLeft: 5 - i,
  })),
  // inprogress
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `my-inprogress-${i + 1}`,
    title: `My In Progress Task ${i + 1}`,
    description: `Description for my in progress task ${i + 1}`,
    status: "inprogress" as TaskStatus,
    priority: (["high", "medium", "low", "urgent", "high"] as TaskPriority[])[
      i
    ],
    tags: ["G.Task" as TaskTag],
    createdAt: `2025-02-02T0${i + 1}:00:00Z`,
    dueDate: `2025-02-05T1${i + 1}:00:00Z`,
    createdBy: {
      id: "u3",
      name: "Jane Smith",
      department: "Marketing",
      designation: "Manager",
      branch: "North Branch",
    },
    assignedTo: {
      id: "u2",
      name: "Current User",
      department: "Engineering",
      designation: "Developer",
      branch: "Main Branch",
    },
    commentsCount: i + 1,
    attachmentsCount: (i + 1) % 3,
    watchers: [],
    isDelegated: false,
    daysLeft: 4 - i,
  })),
  // skip
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `my-skip-${i + 1}`,
    title: `My Skipped Task ${i + 1}`,
    description: `Description for my skipped task ${i + 1}`,
    status: "skip" as TaskStatus,
    priority: (["medium", "low", "urgent", "high", "medium"] as TaskPriority[])[
      i
    ],
    tags: ["SKIPPED" as TaskTag],
    createdAt: `2025-02-03T0${i + 1}:00:00Z`,
    dueDate: `2025-02-06T1${i + 1}:00:00Z`,
    createdBy: {
      id: "u4",
      name: "Alex Johnson",
      department: "Finance",
      designation: "Accountant",
      branch: "Main Branch",
    },
    assignedTo: {
      id: "u2",
      name: "Current User",
      department: "Engineering",
      designation: "Developer",
      branch: "Main Branch",
    },
    commentsCount: i + 2,
    attachmentsCount: (i + 2) % 3,
    watchers: [],
    isDelegated: false,
    daysLeft: 3 - i,
  })),
  // done
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `my-done-${i + 1}`,
    title: `My Done Task ${i + 1}`,
    description: `Description for my done task ${i + 1}`,
    status: "done" as TaskStatus,
    priority: (["low", "urgent", "high", "medium", "low"] as TaskPriority[])[i],
    tags: ["Group Task" as TaskTag],
    createdAt: `2025-02-04T0${i + 1}:00:00Z`,
    dueDate: `2025-02-07T1${i + 1}:00:00Z`,
    completedAt: `2025-02-07T1${i + 1}:30:00Z`,
    createdBy: {
      id: "u5",
      name: "Soumyadeep Ghosh",
      department: "Engineering",
      designation: "Developer",
      branch: "Main Branch",
    },
    assignedTo: {
      id: "u2",
      name: "Current User",
      department: "Engineering",
      designation: "Developer",
      branch: "Main Branch",
    },
    commentsCount: i + 3,
    attachmentsCount: (i + 3) % 3,
    watchers: [],
    isDelegated: false,
    daysLeft: 2 - i,
  })),
  // completed
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `my-completed-${i + 1}`,
    title: `My Completed Task ${i + 1}`,
    description: `Description for my completed task ${i + 1}`,
    status: "completed" as TaskStatus,
    priority: (["urgent", "high", "medium", "low", "urgent"] as TaskPriority[])[
      i
    ],
    tags: ["Delegated" as TaskTag],
    createdAt: `2025-02-05T0${i + 1}:00:00Z`,
    dueDate: `2025-02-08T1${i + 1}:00:00Z`,
    completedAt: `2025-02-08T1${i + 1}:30:00Z`,
    createdBy: {
      id: "u6",
      name: "Priya Patel",
      department: "Procurement",
      designation: "Procurement Lead",
      branch: "Main Branch",
    },
    assignedTo: {
      id: "u2",
      name: "Current User",
      department: "Engineering",
      designation: "Developer",
      branch: "Main Branch",
    },
    commentsCount: i + 4,
    attachmentsCount: (i + 4) % 3,
    watchers: [],
    isDelegated: false,
    daysLeft: 1 - i,
  })),

  // --- Delegated Tasks (assigned to someone else) ---
  // noAction
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `del-noaction-${i + 1}`,
    title: `Delegated No Action Task ${i + 1}`,
    description: `Description for delegated no action task ${i + 1}`,
    status: "noAction" as TaskStatus,
    priority: (["urgent", "high", "medium", "low", "medium"] as TaskPriority[])[
      i
    ],
    tags: ["NEW" as TaskTag],
    createdAt: `2025-02-01T1${i + 1}:00:00Z`,
    dueDate: `2025-02-04T2${i + 1}:00:00Z`,
    createdBy: {
      id: "u7",
      name: "Alex Johnson",
      department: "Engineering",
      designation: "Project Manager",
      branch: "South Branch",
    },
    assignedTo: {
      id: `u10${i}`,
      name: `Delegated User ${i + 1}`,
      department: "Engineering",
      designation: "Developer",
      branch: "South Branch",
    },
    commentsCount: i,
    attachmentsCount: i % 3,
    watchers: [],
    isDelegated: true,
    daysLeft: 5 - i,
  })),
  // inprogress
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `del-inprogress-${i + 1}`,
    title: `Delegated In Progress Task ${i + 1}`,
    description: `Description for delegated in progress task ${i + 1}`,
    status: "inprogress" as TaskStatus,
    priority: (["high", "medium", "low", "urgent", "high"] as TaskPriority[])[
      i
    ],
    tags: ["G.Task" as TaskTag],
    createdAt: `2025-02-02T1${i + 1}:00:00Z`,
    dueDate: `2025-02-05T2${i + 1}:00:00Z`,
    createdBy: {
      id: "u8",
      name: "Jane Smith",
      department: "Marketing",
      designation: "Manager",
      branch: "North Branch",
    },
    assignedTo: {
      id: `u11${i}`,
      name: `Delegated User ${i + 6}`,
      department: "Marketing",
      designation: "Analyst",
      branch: "North Branch",
    },
    commentsCount: i + 1,
    attachmentsCount: (i + 1) % 3,
    watchers: [],
    isDelegated: true,
    daysLeft: 4 - i,
  })),
  // skip
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `del-skip-${i + 1}`,
    title: `Delegated Skipped Task ${i + 1}`,
    description: `Description for delegated skipped task ${i + 1}`,
    status: "skip" as TaskStatus,
    priority: (["medium", "low", "urgent", "high", "medium"] as TaskPriority[])[
      i
    ],
    tags: ["SKIPPED" as TaskTag],
    createdAt: `2025-02-03T1${i + 1}:00:00Z`,
    dueDate: `2025-02-06T2${i + 1}:00:00Z`,
    createdBy: {
      id: "u9",
      name: "Soumyadeep Ghosh",
      department: "Finance",
      designation: "Accountant",
      branch: "Main Branch",
    },
    assignedTo: {
      id: `u12${i}`,
      name: `Delegated User ${i + 11}`,
      department: "Finance",
      designation: "Accountant",
      branch: "Main Branch",
    },
    commentsCount: i + 2,
    attachmentsCount: (i + 2) % 3,
    watchers: [],
    isDelegated: true,
    daysLeft: 3 - i,
  })),
  // done
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `del-done-${i + 1}`,
    title: `Delegated Done Task ${i + 1}`,
    description: `Description for delegated done task ${i + 1}`,
    status: "done" as TaskStatus,
    priority: (["low", "urgent", "high", "medium", "low"] as TaskPriority[])[i],
    tags: ["Group Task" as TaskTag],
    createdAt: `2025-02-04T1${i + 1}:00:00Z`,
    dueDate: `2025-02-07T2${i + 1}:00:00Z`,
    completedAt: `2025-02-07T2${i + 1}:30:00Z`,
    createdBy: {
      id: "u13",
      name: "Priya Patel",
      department: "Procurement",
      designation: "Procurement Lead",
      branch: "Main Branch",
    },
    assignedTo: {
      id: `u13${i}`,
      name: `Delegated User ${i + 16}`,
      department: "Procurement",
      designation: "Procurement Executive",
      branch: "Main Branch",
    },
    commentsCount: i + 3,
    attachmentsCount: (i + 3) % 3,
    watchers: [],
    isDelegated: true,
    daysLeft: 2 - i,
  })),
  // completed
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `del-completed-${i + 1}`,
    title: `Delegated Completed Task ${i + 1}`,
    description: `Description for delegated completed task ${i + 1}`,
    status: "completed" as TaskStatus,
    priority: (["urgent", "high", "medium", "low", "urgent"] as TaskPriority[])[
      i
    ],
    tags: ["Delegated" as TaskTag],
    createdAt: `2025-02-05T1${i + 1}:00:00Z`,
    dueDate: `2025-02-08T2${i + 1}:00:00Z`,
    completedAt: `2025-02-08T2${i + 1}:30:00Z`,
    createdBy: {
      id: "u14",
      name: "Rahul Mehra",
      department: "Procurement",
      designation: "Procurement Lead",
      branch: "Main Branch",
    },
    assignedTo: {
      id: `u14${i}`,
      name: `Delegated User ${i + 21}`,
      department: "Procurement",
      designation: "Procurement Executive",
      branch: "Main Branch",
    },
    commentsCount: i + 4,
    attachmentsCount: (i + 4) % 3,
    watchers: [],
    isDelegated: true,
    daysLeft: 1 - i,
  })),
];

export function TaskBoardContent() {
  // --- State ---
  const [tasks, setTasks] = useState<TaskCardData[]>(taskCardData);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentView, setCurrentView] = useState<
    "board" | "list" | "calendar" | "gantt"
  >("board");
  const [sortBy, setSortBy] = useState<SortOption>("created-desc");
  const [activeTab, setActiveTab] = useState<"my" | "delegated">("my");
  const [groupBy, setGroupBy] = useState<
    "status" | "priority" | "assignedTo" | "createdBy"
  >("status");
  const [filterBy, setFilterBy] = useState<
    "all" | "my" | "delegated" | "high-priority"
  >("all");

  // 1. Define filter state as an object for multi-filtering (like ClickUp)
  type TaskFilter = {
    assignee?: string;
    priority?: string;
    status?: string;
    tag?: string;
  };
  const [filters, setFilters] = useState<TaskFilter>({});

  // --- Filtering and sorting ---
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      // ClickUp-style filters
      if (filters.assignee && filters.assignee !== "all") {
        if (filters.assignee === "me") {
          if (task.assignedTo?.name !== "Current User") return false;
        } else if (task.assignedTo?.name !== filters.assignee) {
          return false;
        }
      }
      if (filters.priority && filters.priority !== "all") {
        if (task.priority !== filters.priority) return false;
      }
      if (filters.status && filters.status !== "all") {
        if (task.status !== filters.status) return false;
      }
      if (filters.tag && filters.tag !== "all") {
        if (!task.tags?.includes(filters.tag)) return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "created-asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "created-desc":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "due-date":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          const aPriority =
            priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          const bPriority =
            priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          return bPriority - aPriority;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [tasks, searchTerm, sortBy, filters]);

  // Group tasks by the selected groupBy field
  const groupedTasks = useMemo(() => {
    const groups: Record<string, typeof tasks> = {};
    filteredAndSortedTasks.forEach((task) => {
      let key = "";
      if (groupBy === "status") key = task.status;
      else if (groupBy === "priority") key = task.priority;
      else if (groupBy === "assignedTo")
        key = task.assignedTo?.name || "Unassigned";
      else if (groupBy === "createdBy") key = task.createdBy?.name || "Unknown";
      if (!groups[key]) groups[key] = [];
      groups[key].push(task);
    });
    return groups;
  }, [filteredAndSortedTasks, groupBy]);

  // --- Group tasks by status for "My Task" ---
  const myTaskStatusOrder = [
    "noAction",
    "inprogress",
    "skip",
    "done",
    "completed",
  ];
  const myTaskStatusLabels: Record<string, string> = {
    noAction: "No Action",
    inprogress: "In Progress",
    skip: "Skipped",
    done: "Done",
    completed: "Completed",
  };

  const myTasks = filteredAndSortedTasks.filter(
    (task) => task.assignedTo?.name === "Current User",
  );

  const myTaskGroups = myTaskStatusOrder.map((status) => ({
    status,
    label: myTaskStatusLabels[status],
    tasks: myTasks.filter((task) => task.status === status),
  }));

  // --- Group tasks for "Delegated Task" ---
  const delegatedTasks = filteredAndSortedTasks.filter(
    (task) => task.assignedTo?.name !== "Current User",
  );

  const delegatedGroups = [
    {
      section: "Pending",
      statuses: ["noAction", "inprogress", "skip"],
      tasks: delegatedTasks.filter((task) =>
        ["noAction", "inprogress", "skip"].includes(task.status),
      ),
    },
    {
      section: "In Review",
      statuses: ["done"],
      tasks: delegatedTasks.filter((task) => task.status === "done"),
    },
    {
      section: "Completed",
      statuses: ["completed"],
      tasks: delegatedTasks.filter((task) => task.status === "completed"),
    },
  ];

  // Example: Group tasks by section (status)
  const sectionList = [
    { section: "noAction", label: "No Action" },
    { section: "inprogress", label: "In Progress" },
    { section: "skip", label: "Skipped" },
    { section: "done", label: "Done" },
    { section: "completed", label: "Completed" },
  ];
  const sectionGroups = sectionList.map((section) => ({
    ...section,
    tasks: tasks.filter((t) => t.status === section.section),
  }));

  // --- Drag and Drop Handler for sections ---
  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const sourceSection = result.source.droppableId;
    const destSection = result.destination.droppableId;
    const sourceIdx = result.source.index;
    const destIdx = result.destination.index;

    // Find the dragged task
    const sourceTasks =
      sectionGroups.find((g) => g.section === sourceSection)?.tasks || [];
    const draggedTask = sourceTasks[sourceIdx];
    if (!draggedTask) return;

    setTasks((prev) => {
      let newTasks = [...prev];
      // If moved to a new section, update status
      if (sourceSection !== destSection) {
        newTasks = newTasks.map((t) =>
          t.id === draggedTask.id ? { ...t, status: destSection } : t,
        );
      }
      // Optionally: reorder within the same section (not persisted unless you store order)
      return newTasks;
    });
  }

  // Add these before the return statement in TaskBoardContent
  const myTaskCount = tasks.filter(
    (task) => task.assignedTo?.name === "Current User",
  ).length;
  const delegatedTaskCount = tasks.filter(
    (task) => task.assignedTo?.name !== "Current User",
  ).length;

  return (
    <div className="h-full flex flex-col min-h-0 bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-4 py-2 bg-white border-b sticky top-0 z-50 shadow-sm">
        <div>
          <h1 className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
            <LayoutGrid className="w-6 h-6 text-gray-500" />
            Task Board
          </h1>
          <div className="text-xs text-gray-400 mt-1 font-medium">
            Organize, track, and complete your work efficiently.
          </div>
        </div>
        {/* --- Centered Tabs --- */}
        <div className="flex-1 flex justify-center items-center gap-2">
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition shadow-sm ${
              activeTab === "my"
                ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200"
            }`}
            onClick={() => setActiveTab("my")}
          >
            My Task
            <span className="ml-2 bg-blue-200 text-blue-800 rounded-full px-2 text-xs font-bold align-middle">
              {myTaskCount}
            </span>
          </button>
          <button
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition shadow-sm ${
              activeTab === "delegated"
                ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200"
            }`}
            onClick={() => setActiveTab("delegated")}
          >
            Delegated Task
            <span className="ml-2 bg-blue-200 text-blue-800 rounded-full px-2 text-xs font-bold align-middle">
              {delegatedTaskCount}
            </span>
          </button>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Input
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 py-1.5 text-sm rounded-lg border border-gray-200 focus:border-gray-400 transition bg-gray-50"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
          <Button
            className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-300 text-white font-semibold px-2.5 py-1.5 rounded-lg shadow hover:from-blue-500 hover:to-blue-400 transition text-sm"
            onClick={() => setIsAddTaskModalOpen(true)}
          >
            <Plus className="w-4 h-4" /> Add Task
          </Button>
        </div>
      </div>

      {/* --- View Switcher and Filters --- */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 border-b">
        {/* View Switcher */}
        <div className="flex gap-1">
          <button
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm transition ${
              currentView === "board"
                ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200"
            }`}
            onClick={() => setCurrentView("board")}
          >
            <LayoutGrid className="w-4 h-4" /> Board
          </button>
          <button
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm transition ${
              currentView === "list"
                ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200"
            }`}
            onClick={() => setCurrentView("list")}
          >
            <span className="inline-block w-4 h-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            List
          </button>
          <button
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm transition ${
              currentView === "calendar"
                ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200"
            }`}
            onClick={() => setCurrentView("calendar")}
          >
            <span className="inline-block w-4 h-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
            Calendar
          </button>
          <button
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-semibold text-sm transition ${
              currentView === "gantt"
                ? "bg-gradient-to-r from-blue-400 to-blue-300 text-white shadow"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200"
            }`}
            onClick={() => setCurrentView("gantt")}
          >
            <span className="inline-block w-4 h-4">
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <rect x="3" y="13" width="7" height="8" rx="2" />
                <rect x="14" y="3" width="7" height="8" rx="2" />
              </svg>
            </span>
            Gantt
          </button>
        </div>
        {/* Filter */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="ml-2 px-2.5 py-1.5 rounded-lg bg-blue-100 border border-blue-200 text-sm text-blue-800 flex items-center gap-2 shadow-sm hover:bg-blue-200">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-60 rounded-lg shadow-lg border border-gray-200 bg-white">
            <div className="mb-2 font-semibold text-gray-700 text-base">
              Filter Tasks
            </div>
            <div className="mb-2">
              <label className="block text-xs text-gray-500 mb-1">
                Assignee
              </label>
              <select
                className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
                value={filters.assignee || "all"}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, assignee: e.target.value }))
                }
              >
                <option value="all">All</option>
                <option value="me">Me</option>
                {[
                  ...new Set(
                    tasks.map((t) => t.assignedTo?.name).filter(Boolean),
                  ),
                ]
                  .filter((name) => name !== "Current User")
                  .map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-xs text-gray-500 mb-1">
                Priority
              </label>
              <select
                className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
                value={filters.priority || "all"}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, priority: e.target.value }))
                }
              >
                <option value="all">All</option>
                <option value="urgent">Urgent</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-xs text-gray-500 mb-1">Status</label>
              <select
                className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
                value={filters.status || "all"}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, status: e.target.value }))
                }
              >
                <option value="all">All</option>
                <option value="noAction">No Action</option>
                <option value="inprogress">In Progress</option>
                <option value="skip">Skipped</option>
                <option value="done">Done</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Tag</label>
              <select
                className="w-full border rounded px-2 py-1 text-sm bg-gray-50"
                value={filters.tag || "all"}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, tag: e.target.value }))
                }
              >
                <option value="all">All</option>
                {[...new Set(tasks.flatMap((t) => t.tags || []))].map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="mt-2 w-full bg-gradient-to-r from-blue-400 to-blue-300 text-white rounded px-2 py-1 text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition"
              onClick={() => setFilters({})}
              type="button"
            >
              Clear Filters
            </button>
          </PopoverContent>
        </Popover>
        {/* Sort */}
        <select
          className="px-2.5 py-1.5 rounded-lg bg-blue-100 border border-blue-200 text-sm text-blue-800 shadow-sm focus:ring-blue-300 focus:border-blue-400"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="created-desc">Newest</option>
          <option value="created-asc">Oldest</option>
          <option value="due-date">Due Date</option>
          <option value="priority">Priority</option>
          <option value="name">Name</option>
        </select>
        {/* Group by */}
        <span className="ml-1 text-blue-800 font-semibold text-sm">
          Group by
        </span>
        <select
          className="px-2 py-1.5 rounded-lg bg-blue-100 border border-blue-200 text-sm text-blue-800 shadow-sm focus:ring-blue-300 focus:border-blue-400"
          value={groupBy}
          onChange={(e) => setGroupBy(e.target.value as typeof groupBy)}
        >
          <option value="status">Status</option>
          <option value="priority">Priority</option>
          <option value="assignedTo">Assigned To</option>
          <option value="createdBy">Created By</option>
        </select>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 min-h-0 flex flex-col px-2 py-2">
        {currentView === "board" ? (
          activeTab === "my" ? (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex gap-3 h-full overflow-x-auto">
                {myTaskGroups.map((group) => (
                  <div
                    style={{ minWidth: "250px", width: "25%" }}
                    key={group.status}
                  >
                    <Droppable droppableId={group.status}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow p-2 min-h-0 h-full border border-gray-200 ${
                            snapshot.isDraggingOver
                              ? "ring-2 ring-gray-400"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h2 className="font-bold text-base text-gray-800 truncate">
                              {group.label}
                            </h2>
                            <span className="bg-gray-200 text-gray-700 rounded-full px-2 text-xs font-semibold">
                              {group.tasks.length}
                            </span>
                          </div>
                          <div className="flex-1 overflow-y-auto min-h-0">
                            {group.tasks.length === 0 ? (
                              <div className="text-gray-300 text-sm text-center py-4">
                                No tasks
                              </div>
                            ) : (
                              group.tasks.map((task, idx) => (
                                <Draggable
                                  draggableId={String(task.id)}
                                  index={idx}
                                  key={task.id}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      className={`mb-2 shadow hover:shadow-md transition cursor-pointer border border-gray-200 rounded-lg bg-white p-2 ${
                                        snapshot.isDragging
                                          ? "ring-2 ring-gray-400 bg-gray-50"
                                          : ""
                                      }`}
                                      style={{
                                        minHeight: 44,
                                        ...provided.draggableProps.style,
                                      }}
                                      onClick={() => {
                                        setSelectedTask(task);
                                        setIsTaskDetailOpen(true);
                                      }}
                                    >
                                      <div className="font-semibold text-gray-900 text-sm truncate">
                                        {task.title}
                                      </div>
                                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                        {task.description}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                          {task.priority?.toUpperCase()}
                                        </span>
                                        {task.dueDate &&
                                        !isNaN(
                                          new Date(task.dueDate).getTime(),
                                        ) ? (
                                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                            Due:{" "}
                                            {new Date(
                                              task.dueDate,
                                            ).toLocaleDateString()}
                                          </span>
                                        ) : (
                                          "-"
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))
                            )}
                            {provided.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          ) : (
            // Delegated Task View (drag-and-drop not enabled here for simplicity)
            <div className="flex gap-3 h-full overflow-x-auto">
              {delegatedGroups.map((group) => (
                <div
                  key={group.section}
                  className={`flex flex-col bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow p-2 min-h-0 h-full border border-gray-200`}
                  style={
                    group.section === "Pending"
                      ? { width: "66.66%", minWidth: "800px" }
                      : { width: "25%", minWidth: "250px" }
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-bold text-base text-gray-800 truncate">
                      {group.section}
                    </h2>
                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 text-xs font-semibold">
                      {group.tasks.length}
                    </span>
                  </div>
                  {group.section === "Pending" ? (
                    <div className="flex gap-2 h-full">
                      {["noAction", "inprogress", "skip"].map((status) => (
                        <div
                          key={status}
                          className="bg-white rounded-lg p-2 shadow-inner border border-gray-200 flex flex-col"
                          style={{ width: "33.33%", minWidth: 250 }}
                        >
                          <div className="text-xs font-bold text-gray-700 mb-2 text-center tracking-wide uppercase">
                            {myTaskStatusLabels[status]}
                          </div>
                          <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar">
                            {group.tasks.filter(
                              (task) => task.status === status,
                            ).length === 0 ? (
                              <div className="text-gray-300 text-sm text-center py-4">
                                No tasks
                              </div>
                            ) : (
                              group.tasks
                                .filter((task) => task.status === status)
                                .map((task) => (
                                  <div
                                    key={task.id}
                                    className="mb-2 last:mb-0 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow hover:shadow-md border border-gray-200 p-2 cursor-pointer transition"
                                    onClick={() => {
                                      setSelectedTask(task);
                                      setIsTaskDetailOpen(true);
                                    }}
                                    style={{ minHeight: 44 }}
                                  >
                                    <div className="font-semibold text-gray-900 text-sm truncate">
                                      {task.title}
                                    </div>
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                      {task.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                        {task.priority?.toUpperCase()}
                                      </span>
                                      {task.dueDate &&
                                      !isNaN(
                                        new Date(task.dueDate).getTime(),
                                      ) ? (
                                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                          Due:{" "}
                                          {new Date(
                                            task.dueDate,
                                          ).toLocaleDateString()}
                                        </span>
                                      ) : (
                                        "-"
                                      )}
                                    </div>
                                  </div>
                                ))
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex-1 overflow-y-auto min-h-0">
                      {group.tasks.length === 0 ? (
                        <div className="text-gray-300 text-sm text-center py-4">
                          No tasks
                        </div>
                      ) : (
                        group.tasks.map((task) => (
                          <div
                            key={task.id}
                            className="mb-2 shadow hover:shadow-md transition cursor-pointer border border-gray-200 rounded-lg bg-white p-2"
                            onClick={() => {
                              setSelectedTask(task);
                              setIsTaskDetailOpen(true);
                            }}
                            style={{ minHeight: 44 }}
                          >
                            <div className="font-semibold text-gray-900 text-sm truncate">
                              {task.title}
                            </div>
                            <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                              {task.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                {task.priority?.toUpperCase()}
                              </span>
                              {task.dueDate &&
                              !isNaN(new Date(task.dueDate).getTime()) ? (
                                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                  Due:{" "}
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              ) : (
                                "-"
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : currentView === "calendar" ? (
          <TaskCalendarView
            tasks={filteredAndSortedTasks}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setIsTaskDetailOpen(true);
            }}
          />
        ) : currentView === "gantt" ? (
          <TaskGanttView
            tasks={filteredAndSortedTasks}
            onTaskClick={(task) => {
              setSelectedTask(task);
              setIsTaskDetailOpen(true);
            }}
          />
        ) : (
          // List View (no drag-and-drop)
          <div className="bg-white rounded-xl shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Assignee
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedTasks.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-300 py-6">
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  filteredAndSortedTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="hover:bg-gray-100 transition cursor-pointer"
                      onClick={() => {
                        setSelectedTask(task);
                        setIsTaskDetailOpen(true);
                      }}
                    >
                      <td className="px-4 py-2 font-medium text-gray-900">
                        {task.title}
                      </td>
                      <td className="px-4 py-2">
                        {task.assignedTo?.name || (
                          <span className="text-gray-300">Unassigned</span>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <Badge
                          className={
                            task.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-200 text-gray-700"
                          }
                        >
                          {task.priority?.charAt(0).toUpperCase() +
                            task.priority?.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-2">
                        {task.dueDate &&
                        !isNaN(new Date(task.dueDate).getTime())
                          ? new Date(task.dueDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-2 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200"
                        >
                          View
                        </Button>
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
        onOpenChange={(open) => {
          setIsAddTaskModalOpen(open);
        }}
      />
      <TaskDetailModal
        open={isTaskDetailOpen}
        onOpenChange={setIsTaskDetailOpen}
        task={selectedTask}
        onUpdateTask={(updatedTask) => {
          setTasks((tasks) =>
            tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
          );
        }}
      />
    </div>
  );
}
