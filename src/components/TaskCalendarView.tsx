
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon
} from "lucide-react";

interface Task {
  id: string;
  title: string;
  assignee?: {
    name: string;
    avatar: string;
    initials: string;
  };
  dueDate?: string;
  priority?: "urgent" | "high" | "medium" | "low";
  status: "todo" | "in-progress" | "complete";
  subtasks?: number;
  completedSubtasks?: number;
}

interface TaskCalendarViewProps {
  tasks: Task[];
  setIsAddTaskModalOpen: (open: boolean) => void;
}

const getPriorityColor = (priority?: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500 text-white";
    case "high":
      return "bg-orange-500 text-white";
    case "medium":
      return "bg-yellow-500 text-white";
    case "low":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-200 text-gray-600";
  }
};

export function TaskCalendarView({ tasks, setIsAddTaskModalOpen }: TaskCalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Filter tasks by selected date
  const tasksForSelectedDate = tasks.filter(task => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === selectedDate.toDateString();
  });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">Calendar View</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft size={16} />
              </Button>
              <span className="font-medium min-w-32 text-center">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
          <Button 
            onClick={() => setIsAddTaskModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border w-full"
            />
          </div>

          {/* Tasks for selected date */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} />
              <h3 className="font-medium">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </div>

            {tasksForSelectedDate.length > 0 ? (
              <div className="space-y-3">
                {tasksForSelectedDate.map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">{task.title}</h4>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {task.assignee && (
                              <Avatar className="h-5 w-5">
                                <AvatarFallback className="text-xs bg-blue-600 text-white">
                                  {task.assignee.initials}
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            {task.priority && (
                              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </Badge>
                            )}
                          </div>

                          <Badge variant="secondary" className="text-xs">
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 text-gray-500">
                <CalendarIcon size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No tasks for this date</p>
                <Button 
                  onClick={() => setIsAddTaskModalOpen(true)}
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                >
                  <Plus size={14} className="mr-1" />
                  Add task
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
