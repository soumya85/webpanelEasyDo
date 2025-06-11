import React, { useState, useMemo } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Briefcase,
  Umbrella,
  Video,
  CheckCircle,
  Calendar as CalendarIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TaskItem {
  id: string;
  title: string;
  description: string;
  time?: string;
  endTime?: string;
  type: "leave" | "review" | "meeting" | "multiday";
  status: "new" | "review" | "skipped" | "no-action" | "casual-leave";
  category?: "g-task" | "d-task";
  duration?: string;
  avatar?: string;
  notifications?: number;
  progress?: number;
  company?: string;
}

const mockTasks: TaskItem[] = [
  {
    id: "1",
    title: "You are on leave",
    description: "Liberty Highrise Pvt Ltd",
    type: "leave",
    status: "casual-leave",
    company: "Liberty Highrise Pvt Ltd"
  },
  {
    id: "2",
    title: "Tasks, pending review.",
    description: "Pending review tasks.",
    type: "review",
    status: "review"
  },
  {
    id: "3",
    title: "(Important) code review for the...",
    description: "01Feb 12:35 PM to 04 Feb 12:26 PM",
    type: "multiday",
    status: "new",
    category: "g-task",
    duration: "114d",
    avatar: "/api/placeholder/50/50",
    time: "Shibjyoti Android: Shibjyoti Sarkar..."
  },
  {
    id: "4",
    title: "Presentation for EasyDo Demo...",
    description: "Soumyadeep Goswami created a new ...",
    type: "meeting",
    status: "new",
    category: "d-task",
    time: "5:00 AM",
    avatar: "/api/placeholder/50/50",
    notifications: 3
  }
];

const timeSlots = [
  "12:00 AM", "1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM", 
  "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"
];

export default function TodaysSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Get current month data
  const currentMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const taskCount = Math.floor(Math.random() * 7); // Mock task counts
      days.push({
        day,
        taskCount: taskCount > 0 ? taskCount : null,
        isToday: day === 26 // Mock today as 26th for demo
      });
    }
    
    return days;
  }, [currentDate]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const filteredTasks = useMemo(() => {
    let filtered = mockTasks;
    
    if (searchQuery) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery]);

  const allDayTasks = filteredTasks.filter(task => task.type === "leave" || task.type === "review");
  const multiDayTasks = filteredTasks.filter(task => task.type === "multiday");
  const timedTasks = filteredTasks.filter(task => task.type === "meeting");

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const TaskCard = ({ task }: { task: TaskItem }) => {
    const getCardBgColor = () => {
      switch (task.type) {
        case "leave": return "bg-red-200 border-r-4 border-red-500";
        case "review": return "bg-blue-200 border-r-4 border-blue-500";
        case "multiday": return "bg-blue-200 border-r-4 border-blue-500";
        case "meeting": return "bg-orange-200 border-r-4 border-orange-500";
        default: return "bg-gray-200";
      }
    };

    const getStatusBadge = () => {
      switch (task.status) {
        case "casual-leave": return <Badge className="bg-black text-white">Casual Leave</Badge>;
        case "review": return <Badge className="bg-red-500 text-white">REVIEW</Badge>;
        case "new": return <Badge className="bg-red-500 text-white">NEW</Badge>;
        case "skipped": return <Badge className="bg-red-500 text-white">SKIPPED</Badge>;
        case "no-action": return <Badge className="bg-gray-500 text-white">No Action</Badge>;
        default: return null;
      }
    };

    const getCategoryBadge = () => {
      switch (task.category) {
        case "g-task": return <Badge className="bg-black text-white border border-gray-600">G.Task</Badge>;
        case "d-task": return <Badge className="bg-black text-white border border-gray-600">D.Task</Badge>;
        default: return null;
      }
    };

    return (
      <Card className={cn("relative p-4 rounded-lg", getCardBgColor())}>
        <div className="flex items-start gap-3">
          {task.avatar && (
            <Avatar className="w-12 h-12 flex-shrink-0">
              <AvatarImage src={task.avatar} />
              <AvatarFallback>
                {task.type === "leave" && <Umbrella className="w-6 h-6" />}
                {task.type === "review" && <CheckCircle className="w-6 h-6" />}
                {task.type === "multiday" && <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">👤</div>}
                {task.type === "meeting" && <div className="w-8 h-8 bg-gray-600 rounded-full" />}
              </AvatarImage>
            </Avatar>
          )}
          
          {!task.avatar && (
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              {task.type === "leave" && (
                <div className="w-12 h-12 bg-red-300 rounded flex items-center justify-center">
                  <Umbrella className="w-6 h-6 text-black" />
                </div>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 truncate">{task.title}</h3>
            <p className="text-sm text-gray-700 mt-1">{task.description}</p>
            {task.time && <p className="text-sm text-gray-600 mt-1">{task.time}</p>}
            
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {getStatusBadge()}
              {getCategoryBadge()}
              {task.type === "leave" && (
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                </div>
              )}
              {task.type === "meeting" && (
                <div className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  {task.notifications && (
                    <Badge className="bg-blue-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center">
                      {task.notifications}
                    </Badge>
                  )}
                </div>
              )}
            </div>
            
            {task.progress !== undefined && (
              <div className="w-full h-1 bg-red-500 mt-2 rounded"></div>
            )}
          </div>

          {task.duration && (
            <Badge className="bg-green-500 text-white absolute top-2 right-2">
              {task.duration}
            </Badge>
          )}
          
          {task.type === "review" && (
            <div className="absolute top-2 right-2">
              <CheckCircle className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <div className="border-r border-gray-300 pr-4">
                <h1 className="text-lg font-bold text-gray-900">Todays Schedule</h1>
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-blue-600 font-medium">
              Today, 26 May 2025
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative flex-1 md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>
              
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-48 bg-white">
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
        <Card className="mb-6 bg-white">
          <div className="p-4">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="border-gray-400"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <h2 className="text-lg font-bold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigateMonth('next')}
                className="border-gray-400"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-center text-sm font-bold text-gray-600 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 border border-gray-300 rounded">
              {currentMonth.map((dayData, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-12 flex flex-col items-center justify-center text-sm relative border-r border-b border-gray-200 last:border-r-0",
                    dayData?.isToday ? "bg-blue-500 text-white font-bold" : "bg-white hover:bg-gray-50",
                    !dayData && "bg-gray-100"
                  )}
                >
                  {dayData && (
                    <>
                      <span className={dayData.isToday ? "text-white" : "text-gray-700 font-bold"}>
                        {dayData.day}
                      </span>
                      {dayData.taskCount && (
                        <span className="text-xs text-blue-600 bg-blue-100 px-1 rounded mt-1">
                          {dayData.taskCount}
                        </span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Task Sections */}
        <div className="space-y-6">
          {/* AllDay Section */}
          {allDayTasks.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-sm font-bold text-gray-600">AllDay</h2>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allDayTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
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
                  <div key={task.id} className="max-w-md">
                    <TaskCard task={task} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Section */}
          <div className="space-y-4">
            {timeSlots.map((timeSlot) => (
              <div key={timeSlot}>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-sm font-bold text-gray-600 w-20">{timeSlot}</h2>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>
                
                {/* Render timed tasks for specific slots */}
                {timeSlot === "5:00 AM" && timedTasks.map((task) => (
                  <div key={task.id} className="max-w-md ml-24">
                    <TaskCard task={task} />
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