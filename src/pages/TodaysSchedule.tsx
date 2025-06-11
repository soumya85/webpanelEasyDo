import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskCard } from "@/components/TaskCard";
import { ScheduleCalendar } from "@/components/ScheduleCalendar";
import { useTasks } from "@/hooks/useTasks";

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
  const [currentDate, setCurrentDate] = useState(new Date()); // Current date for calendar navigation
  const [selectedDate, setSelectedDate] = useState(new Date()); // Selected date for timeline
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { getFilteredTasks, getTasksByType, getTaskCounts } = useTasks();

  const filteredTasks = getFilteredTasks(searchQuery, selectedFilter);
  const {
    allDay: allDayTasks,
    multiDay: multiDayTasks,
    timed: timedTasks,
  } = getTasksByType(filteredTasks);
  const taskCounts = getTaskCounts();

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth(), 1);
      if (direction === "prev") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (day: number) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day,
    );
    setSelectedDate(newSelectedDate);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Controls */}
        <div className="px-4 pb-4 mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-blue-600 font-medium text-base">
              {selectedDate.toDateString() === new Date().toDateString()
                ? `Today, ${formatDate(selectedDate).replace(/^\w+, /, "")}`
                : formatDate(selectedDate)}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1 sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search tasks, meetings, events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-8 bg-white border-gray-300 placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>

              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All ({taskCounts.total})</SelectItem>
                  <SelectItem value="My Task">
                    My Task ({taskCounts.myTasks})
                  </SelectItem>
                  <SelectItem value="Delegated Task">
                    Delegated Task ({taskCounts.delegatedTasks})
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Calendar Widget */}
        <ScheduleCalendar
          currentDate={currentDate}
          selectedDate={selectedDate}
          onNavigate={navigateMonth}
          onDateSelect={handleDateSelect}
          className="mb-6"
        />

        {/* Task Sections - All in one white container */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* No Results Message */}
          {filteredTasks.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No tasks found</div>
              <div className="text-gray-400 text-sm">
                Try adjusting your search or filter criteria
              </div>
            </div>
          )}

          <div className="space-y-6">
            {/* AllDay Section */}
            {allDayTasks.length > 0 && (
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-sm font-bold text-gray-600">
                    AllDay ({allDayTasks.length})
                  </h2>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-6">
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
                  <h2 className="text-sm font-bold text-gray-600">
                    MultiDay ({multiDayTasks.length})
                  </h2>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="grid grid-cols-1 gap-4 mb-6">
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

          {/* Default empty state when no tasks at all */}
          {filteredTasks.length === 0 && !searchQuery && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                No tasks scheduled
              </div>
              <div className="text-gray-400 text-sm">
                Your schedule is clear for today
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
