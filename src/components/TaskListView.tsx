
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar,
  Flag,
  MessageSquare,
  MoreHorizontal,
  Plus
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

interface TaskListViewProps {
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-gray-100 text-gray-600";
    case "in-progress":
      return "bg-blue-100 text-blue-600";
    case "complete":
      return "bg-green-100 text-green-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export function TaskListView({ tasks, setIsAddTaskModalOpen }: TaskListViewProps) {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTasks(tasks.map(task => task.id));
    } else {
      setSelectedTasks([]);
    }
  };

  const handleSelectTask = (taskId: string, checked: boolean) => {
    if (checked) {
      setSelectedTasks([...selectedTasks, taskId]);
    } else {
      setSelectedTasks(selectedTasks.filter(id => id !== taskId));
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold">All Tasks</h2>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
              {tasks.length}
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

      <Table>
        <TableHeader>
          <TableRow className="border-b">
            <TableHead className="w-8">
              <Checkbox 
                checked={selectedTasks.length === tasks.length && tasks.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Task name</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Due date</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Subtasks</TableHead>
            <TableHead className="w-8"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id} className="hover:bg-gray-50">
              <TableCell>
                <Checkbox 
                  checked={selectedTasks.includes(task.id)}
                  onCheckedChange={(checked) => handleSelectTask(task.id, checked as boolean)}
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{task.title}</span>
                </div>
              </TableCell>
              <TableCell>
                {task.assignee ? (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs bg-blue-600 text-white">
                        {task.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{task.assignee.name}</span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Unassigned</span>
                )}
              </TableCell>
              <TableCell>
                {task.dueDate ? (
                  <div className="flex items-center gap-1 text-sm">
                    <Calendar size={14} />
                    {task.dueDate}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No due date</span>
                )}
              </TableCell>
              <TableCell>
                {task.priority ? (
                  <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                    <Flag size={12} className="mr-1" />
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                ) : (
                  <span className="text-gray-400 text-sm">No priority</span>
                )}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>
                  {task.status.replace('-', ' ').toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                {task.subtasks ? (
                  <div className="flex items-center gap-1 text-sm">
                    <MessageSquare size={14} />
                    {task.completedSubtasks || 0}/{task.subtasks}
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">0</span>
                )}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {tasks.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          <p className="mb-4">No tasks found</p>
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
  );
}
