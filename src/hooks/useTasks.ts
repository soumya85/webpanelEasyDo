import { useState, useMemo } from "react";
import { TaskItem } from "@/components/TaskCard";

export const useTasks = () => {
  const [tasks] = useState<TaskItem[]>([
    {
      id: "1",
      title: "You are on leave",
      description: "Liberty Highrise Pvt Ltd",
      type: "leave",
      status: "casual-leave",
      company: "Liberty Highrise Pvt Ltd",
    },
    {
      id: "2",
      title: "Tasks, pending review.",
      description: "Pending review tasks.",
      type: "tasks-review",
      status: "review",
    },
    {
      id: "3",
      title: "(Important) code review for the...",
      description: "01Feb 12:35 PM to 04 Feb 12:26 PM",
      type: "multiday",
      status: "new",
      category: "g-task",
      duration: "114d",
      time: "Shibjyoti Android: Shibjyoti Sarkar...",
    },
    {
      id: "4",
      title: "Presentation for EasyDo Demo...",
      description: "Soumyadeep Goswami created a new ...",
      type: "meeting",
      status: "new",
      category: "d-task",
      time: "5:00 AM",
      notifications: 3,
    },
  ]);

  const getFilteredTasks = (searchQuery: string, filter: string) => {
    return useMemo(() => {
      let filtered = tasks;

      // Search filter
      if (searchQuery.trim()) {
        filtered = filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            task.company?.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // Type filter
      if (filter !== "All") {
        // This would be where you'd implement actual filtering logic
        // For now, we return all tasks
      }

      return filtered;
    }, [searchQuery, filter]);
  };

  const getTaskCounts = () => {
    return {
      total: tasks.length,
      myTasks: tasks.filter((task) => task.category === "g-task").length,
      delegatedTasks: tasks.filter((task) => task.category === "d-task").length,
      leave: tasks.filter((task) => task.type === "leave").length,
      review: tasks.filter(
        (task) => task.type === "review" || task.type === "tasks-review",
      ).length,
      meetings: tasks.filter((task) => task.type === "meeting").length,
      multiday: tasks.filter((task) => task.type === "multiday").length,
    };
  };

  const getTasksByType = (filteredTasks: TaskItem[]) => {
    return {
      allDay: filteredTasks.filter(
        (task) =>
          task.type === "leave" ||
          task.type === "review" ||
          task.type === "tasks-review",
      ),
      multiDay: filteredTasks.filter((task) => task.type === "multiday"),
      timed: filteredTasks.filter((task) => task.type === "meeting"),
    };
  };

  return {
    tasks,
    getFilteredTasks,
    getTaskCounts,
    getTasksByType,
  };
};
