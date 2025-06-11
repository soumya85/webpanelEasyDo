import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface CalendarDay {
  day: number;
  taskCount?: number;
  isToday: boolean;
  isCurrentMonth: boolean;
}

interface ScheduleCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onNavigate: (direction: "prev" | "next") => void;
  onDateSelect: (day: number) => void;
  className?: string;
}

export function ScheduleCalendar({
  currentDate,
  onNavigate,
  className,
}: ScheduleCalendarProps) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Mock task counts for demo - in real app this would come from props
  const mockTaskCounts: { [key: number]: number } = {
    22: 6,
    23: 4,
    24: 2,
    25: 2,
    26: 4,
    27: 2,
    28: 2,
    29: 2,
    30: 2,
    31: 2,
  };

  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get today's date for comparison
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDate = today.getDate();

    const days: (CalendarDay | null)[] = [];

    // Add empty cells for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        year === todayYear && month === todayMonth && day === todayDate;

      days.push({
        day,
        taskCount: mockTaskCounts[day],
        isToday,
        isCurrentMonth: true,
      });
    }

    // Fill remaining cells to complete the grid (6 rows x 7 days = 42 cells)
    const totalCells = 42;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(null);
    }

    return days;
  }, [currentDate]);

  return (
    <Card className={cn("bg-white shadow-sm", className)}>
      <div className="p-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("prev")}
            className="h-8 w-8 p-0 border-gray-400 hover:bg-gray-100"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </Button>

          <h2 className="text-base font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("next")}
            className="h-8 w-8 p-0 border-gray-400 hover:bg-gray-100"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        {/* Week Days Header */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-bold text-gray-600 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="grid grid-cols-7">
            {calendarData.map((dayData, index) => (
              <div
                key={index}
                className={cn(
                  "h-12 flex flex-col items-center justify-center text-sm relative border-r border-b border-gray-200 last:border-r-0",
                  index >= 35 && "border-b-0", // Remove bottom border for last row
                  dayData?.isToday
                    ? "bg-blue-500 text-white"
                    : dayData
                      ? "bg-white hover:bg-gray-50"
                      : "bg-gray-100",
                )}
              >
                {dayData && (
                  <>
                    <span
                      className={cn(
                        "font-bold text-base leading-none",
                        dayData.isToday ? "text-white" : "text-gray-700",
                      )}
                    >
                      {dayData.day}
                    </span>
                    {dayData.taskCount && (
                      <span
                        className={cn(
                          "text-xs px-1 rounded mt-0.5 leading-none",
                          dayData.isToday
                            ? "text-white bg-blue-400"
                            : "text-blue-600 bg-blue-100",
                        )}
                      >
                        {dayData.taskCount}
                      </span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
