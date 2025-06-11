import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskCard, TaskItem } from "@/components/TaskCard";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";

const mockTasks: TaskItem[] = [
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
    type: "review",
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
];

const timeSlots = [
  "12:00 AM",
  "1:00 AM",
  "2:00 AM",
  "3:00 AM",
  "4:00 AM",
  "5:00 AM",
  "6:00 AM",
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
  "8:00 PM",
  "9:00 PM",
  "10:00 PM",
  "11:00 PM",
];

export default function TodaysSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 4, 26)); // May 26, 2025
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(() => {
    let filtered = mockTasks;

    if (searchQuery) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedFilter !== "All") {
      // Filter logic for My Task / Delegated Task can be added here
      // For now, we'll show all tasks regardless of filter
    }

    return filtered;
  }, [searchQuery, selectedFilter]);

  const allDayTasks = filteredTasks.filter(
    (task) => task.type === "leave" || task.type === "review",
  );
  const multiDayTasks = filteredTasks.filter(
    (task) => task.type === "multiday",
  );
  const timedTasks = filteredTasks.filter((task) => task.type === "meeting");

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <div className="border-r border-gray-300 pr-4">
                <h1 className="text-lg font-bold text-gray-900">
                  Todays Schedule
                </h1>
              </div>
              <div className="text-sm font-bold text-gray-900">
                Liberty Highrise PVT Ltd
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top Controls */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-blue-600 font-medium text-base">
              Today, {formatDate(currentDate).replace(/^\w+, /, "")}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1 sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white border-gray-300"
                />
              </div>

              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="My Task">My Task</SelectItem>
                  <SelectItem value="Delegated Task">Delegated Task</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Calendar Widget */}
        <ScheduleCalendar
          currentDate={currentDate}
          onNavigate={navigateMonth}
          className="mb-6"
        />

        {/* Task Sections */}
        <div className="space-y-6">
          {/* AllDay Section */}
          {allDayTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-sm font-bold text-gray-600">AllDay</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {allDayTasks.map((task) => (
                  <TaskCard key={task.id} task={task} className="max-w-md" />
                ))}
              </div>
            </div>
          )}

          {/* MultiDay Section */}
          {multiDayTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-sm font-bold text-gray-600">MultiDay</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {multiDayTasks.map((task) => (
                  <TaskCard key={task.id} task={task} className="max-w-md" />
                ))}
              </div>
            </div>
          )}

          {/* Timeline Section */}
          <div className="space-y-4">
            {timeSlots.map((timeSlot) => (
              <div key={timeSlot}>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-sm font-bold text-gray-600 w-20 flex-shrink-0">
                    {timeSlot}
                  </h2>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Render timed tasks for specific slots */}
                {timeSlot === "5:00 AM" &&
                  timedTasks.map((task) => (
                    <div key={task.id} className="ml-24">
                      <TaskCard task={task} className="max-w-md" />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
