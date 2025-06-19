
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus,
  BarChart3,
  Calendar,
  ChevronLeft,
  ChevronRight
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

interface TaskGanttViewProps {
  tasks: Task[];
  setIsAddTaskModalOpen: (open: boolean) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-gray-400";
    case "in-progress":
      return "bg-blue-500";
    case "complete":
      return "bg-green-500";
    default:
      return "bg-gray-400";
  }
};

export function TaskGanttView({ tasks, setIsAddTaskModalOpen }: TaskGanttViewProps) {
  // Generate weeks for the timeline
  const weeks = Array.from({ length: 8 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (i * 7));
    return date;
  });

  const getTaskPosition = (task: Task) => {
    if (!task.dueDate) return { left: '0%', width: '10%' };
    
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const daysDiff = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    const left = Math.max(0, (daysDiff + 7) * (100 / 56)); // 8 weeks = 56 days
    const width = Math.min(100 - left, 15); // Default 15% width
    
    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 size={20} />
              <h2 className="text-lg font-semibold">Gantt Chart</h2>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {tasks.length} tasks
            </Badge>
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

      <div className="overflow-x-auto">
        {/* Timeline Header */}
        <div className="flex border-b bg-gray-50">
          <div className="w-80 p-4 border-r bg-white">
            <div className="flex items-center justify-between">
              <span className="font-medium">Task Name</span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ChevronLeft size={14} />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 flex">
            {weeks.map((week, index) => (
              <div key={index} className="flex-1 p-2 border-r text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {week.toLocaleDateString('en-US', { month: 'short' })}
                </div>
                <div className="text-sm font-medium">
                  {week.getDate()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Rows */}
        <div className="min-h-96">
          {tasks.map((task, index) => (
            <div key={task.id} className="flex border-b hover:bg-gray-50">
              {/* Task Info */}
              <div className="w-80 p-4 border-r bg-white">
                <div className="space-y-2">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="flex items-center gap-2">
                    {task.assignee && (
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs bg-blue-600 text-white">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar size={10} />
                        {task.dueDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Gantt Bar */}
              <div className="flex-1 relative p-4">
                <div className="relative h-8">
                  {task.dueDate && (
                    <div
                      className={`absolute top-1 h-6 rounded ${getStatusColor(task.status)} opacity-80`}
                      style={getTaskPosition(task)}
                    >
                      <div className="px-2 py-1 text-xs text-white font-medium truncate">
                        {task.status === 'complete' ? '100%' : 
                         task.status === 'in-progress' ? '60%' : '0%'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <BarChart3 size={48} className="mx-auto mb-4 opacity-50" />
            <p className="mb-4">No tasks to display in Gantt view</p>
            <Button 
              onClick={() => setIsAddTaskModalOpen(true)}
              variant="outline"
            >
              <Plus size={16} className="mr-2" />
              Create your first task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
