import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Plus,
  Calendar,
  Flag,
  MessageSquare,
  Paperclip,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Task } from "@/types/task";

type GroupByOption = "status" | "assignee" | "priority" | "due-date";

interface TaskBoardViewsProps {
  currentView: string;
  filteredTasks: Task[];
  onDragEnd: (result: DropResult) => void;
  onAddTask: (columnStatus: string) => void;
  onTaskClick: (task: Task) => void;
  setIsAddTaskModalOpen: (open: boolean) => void;
  groupBy: GroupByOption;
}

export function TaskBoardViews({
  currentView,
  filteredTasks,
  onDragEnd,
  onAddTask,
  onTaskClick,
  setIsAddTaskModalOpen,
  groupBy,
}: TaskBoardViewsProps) {
  const todoTasks = filteredTasks.filter((task) => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in-progress",
  );
  const completeTasks = filteredTasks.filter(
    (task) => task.status === "complete",
  );

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "complete":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const CompactTaskCard = ({ task }: { task: Task }) => (
    <div
      className="group bg-white border border-gray-200 rounded-lg p-3 mb-2 hover:shadow-md transition-all cursor-pointer text-sm "
      onClick={() => onTaskClick(task)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm leading-tight flex-1 mr-2">
          {task.title}
        </h4>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
        >
          <MoreHorizontal size={12} />
        </Button>
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {task.priority && (
            <div
              className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
            />
          )}
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={10} />
              <span>
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MessageSquare size={10} />
              <span>{task.comments.length}</span>
            </div>
          )}
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Paperclip size={10} />
              <span>{task.attachments.length}</span>
            </div>
          )}
          {task.assignee && (
            <Avatar className="h-5 w-5">
              <AvatarFallback className="text-xs bg-blue-600 text-white">
                {task.assignee.initials}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>

      {task.subtasks.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Subtasks</span>
            <span>
              {task.subtasks.filter((st) => st.completed).length}/
              {task.subtasks.length}
            </span>
          </div>
          <div className="mt-1 bg-gray-200 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full transition-all"
              style={{
                width: `${(task.subtasks.filter((st) => st.completed).length / task.subtasks.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "list":
        return (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">List View</h2>
                <Badge variant="secondary">{filteredTasks.length}</Badge>
              </div>
              <Button onClick={() => setIsAddTaskModalOpen(true)} size="sm">
                <Plus size={14} className="mr-2" />
                Add Task
              </Button>
            </div>
            <div className="p-4 space-y-1">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer group"
                  onClick={() => onTaskClick(task)}
                >
                  <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">
                        {task.title}
                      </span>
                      <Badge
                        className={`text-xs px-2 py-0 ${getStatusBadgeColor(task.status)}`}
                      >
                        {task.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {task.priority && (
                      <div
                        className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                      />
                    )}
                    {task.dueDate && (
                      <span className="text-xs text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    {task.assignee && (
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="text-xs bg-blue-600 text-white">
                          {task.assignee.initials}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "calendar":
        return (
          <div className="bg-white rounded-lg border">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Calendar View</h2>
              <Button onClick={() => setIsAddTaskModalOpen(true)} size="sm">
                <Plus size={14} className="mr-2" />
                Add Task
              </Button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="p-2 text-center text-xs font-medium text-gray-600 border-b"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() - date.getDay() + i);
                  const tasksForDay = filteredTasks.filter(
                    (task) =>
                      task.dueDate &&
                      new Date(task.dueDate).toDateString() ===
                        date.toDateString(),
                  );
                  return (
                    <div
                      key={i}
                      className="h-20 border border-gray-100 p-1 bg-gray-50"
                    >
                      <div className="text-xs text-gray-600 mb-1">
                        {date.getDate()}
                      </div>
                      {tasksForDay.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          className="text-xs p-1 bg-blue-100 text-blue-800 rounded mb-1 cursor-pointer truncate"
                          onClick={() => onTaskClick(task)}
                        >
                          {task.title}
                        </div>
                      ))}
                      {tasksForDay.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{tasksForDay.length - 2} more
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "gantt":
        // Calculate the earliest and latest dates among all tasks
        const allDates = filteredTasks
          .flatMap((task) => [
            task.startDate ? new Date(task.startDate) : null,
            task.dueDate ? new Date(task.dueDate) : null,
          ])
          .filter(Boolean) as Date[];
        const minDate = allDates.length
          ? new Date(Math.min(...allDates.map((d) => d.getTime())))
          : new Date();
        const maxDate = allDates.length
          ? new Date(Math.max(...allDates.map((d) => d.getTime())))
          : new Date();

        // Calculate total days in the range
        const totalDays = Math.max(
          1,
          Math.ceil(
            (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
          ) + 1,
        );

        // Helper to get day offset from minDate
        const getDayOffset = (date: Date) =>
          Math.floor(
            (date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24),
          );

        return (
          <div className="bg-white rounded-lg border w-full h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Gantt View</h2>
              <Button onClick={() => setIsAddTaskModalOpen(true)} size="sm">
                <Plus size={14} className="mr-2" />
                Add Task
              </Button>
            </div>
            <div className="overflow-x-auto flex-1">
              <div className="min-w-[900px] p-4">
                {/* Timeline header */}
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: `200px repeat(${totalDays}, 1fr)`,
                  }}
                >
                  <div></div>
                  {Array.from({ length: totalDays }).map((_, i) => {
                    const d = new Date(minDate);
                    d.setDate(minDate.getDate() + i);
                    return (
                      <div
                        key={i}
                        className="text-xs text-gray-500 text-center border-l"
                      >
                        {d.getDate()}/{d.getMonth() + 1}
                      </div>
                    );
                  })}
                </div>
                {/* Task bars */}
                {filteredTasks.map((task) => {
                  const start = task.startDate
                    ? new Date(task.startDate)
                    : minDate;
                  const end = task.dueDate ? new Date(task.dueDate) : start;
                  const startOffset = getDayOffset(start);
                  const duration = Math.max(
                    1,
                    getDayOffset(end) - startOffset + 1,
                  );

                  return (
                    <div
                      key={task.id}
                      className="grid items-center"
                      style={{
                        gridTemplateColumns: `200px repeat(${totalDays}, 1fr)`,
                      }}
                    >
                      {/* Task name and assignee */}
                      <div className="flex items-center gap-2 pr-2 py-2 border-b">
                        <span className="font-medium">{task.title}</span>
                        {task.assignee && (
                          <Avatar className="h-4 w-4">
                            <AvatarFallback className="text-xs bg-blue-600 text-white">
                              {task.assignee.initials}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      {/* Empty cells before bar */}
                      {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={i} />
                      ))}
                      {/* Gantt bar */}
                      <div
                        className={`h-6 rounded-l rounded-r cursor-pointer flex items-center justify-center text-xs font-medium text-white`}
                        style={{
                          gridColumn: `span ${duration} / span ${duration}`,
                          background:
                            task.status === "complete"
                              ? "#22c55e"
                              : task.status === "in-progress"
                                ? "#3b82f6"
                                : "#a3a3a3",
                        }}
                        onClick={() => onTaskClick(task)}
                      >
                        {duration > 2 ? task.status.replace("-", " ") : ""}
                      </div>
                      {/* Fill remaining cells */}
                      {Array.from({
                        length: totalDays - startOffset - duration,
                      }).map((_, i) => (
                        <div key={i} />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="bg-white rounded-lg border w-full h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Table View</h2>
              <Button onClick={() => setIsAddTaskModalOpen(true)} size="sm">
                <Plus size={14} className="mr-2" />
                Add Task
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full min-w-[900px]">
                <thead className="sticky top-0 z-10 bg-gray-50 border-b">
                  <tr>
                    <th className="p-3 text-xs font-semibold text-gray-600 text-left">
                      Task
                    </th>
                    <th className="p-3 text-xs font-semibold text-gray-600 text-left">
                      Status
                    </th>
                    <th className="p-3 text-xs font-semibold text-gray-600 text-left">
                      Priority
                    </th>
                    <th className="p-3 text-xs font-semibold text-gray-600 text-left">
                      Assignee
                    </th>
                    <th className="p-3 text-xs font-semibold text-gray-600 text-left">
                      Due Date
                    </th>
                    <th className="p-3 text-xs font-semibold text-gray-600 text-left">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b hover:bg-blue-50 transition-colors cursor-pointer"
                      onClick={() => onTaskClick(task)}
                    >
                      <td className="p-3">
                        <div className="font-medium text-sm text-gray-900">
                          {task.title}
                        </div>
                        {task.description && (
                          <div className="text-xs text-gray-500 truncate">
                            {task.description}
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <Badge
                          className={`text-xs px-2 py-0 ${getStatusBadgeColor(task.status)}`}
                        >
                          {task.status.replace("-", " ")}
                        </Badge>
                      </td>
                      <td className="p-3">
                        {task.priority ? (
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}
                            />
                            <span className="text-sm capitalize">
                              {task.priority}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        {task.assignee ? (
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-blue-600 text-white">
                                {task.assignee.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">
                              {task.assignee.name}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-3 text-sm">
                        {task.dueDate ? (
                          new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        {task.subtasks.length > 0 ? (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-16">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width: `${(task.subtasks.filter((st) => st.completed).length / task.subtasks.length) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs text-gray-600">
                              {
                                task.subtasks.filter((st) => st.completed)
                                  .length
                              }
                              /{task.subtasks.length}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-4 w-full h-full flex-1 min-h-0">
              <Droppable droppableId="todo">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-shrink-0 w-80 ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
                  >
                    <div className="bg-gray-50 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full" />
                          <h3 className="font-medium text-sm text-gray-700">
                            TO DO
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {todoTasks.length}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => onAddTask("todo")}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                      <div className="p-3 space-y-2 min-h-[200px]">
                        {todoTasks.map((task, index) => (
                          <div key={task.id}>
                            <CompactTaskCard task={task} />
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>

              <Droppable droppableId="in-progress">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-shrink-0 w-80 ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
                  >
                    <div className="bg-gray-50 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full" />
                          <h3 className="font-medium text-sm text-gray-700">
                            IN PROGRESS
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {inProgressTasks.length}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => onAddTask("in-progress")}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                      <div className="p-3 space-y-2 min-h-[200px]">
                        {inProgressTasks.map((task, index) => (
                          <div key={task.id}>
                            <CompactTaskCard task={task} />
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>

              <Droppable droppableId="complete">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-shrink-0 w-80 ${snapshot.isDraggingOver ? "bg-blue-50" : ""}`}
                  >
                    <div className="bg-gray-50 rounded-lg">
                      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <h3 className="font-medium text-sm text-gray-700">
                            COMPLETE
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {completeTasks.length}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => onAddTask("complete")}
                        >
                          <Plus size={12} />
                        </Button>
                      </div>
                      <div className="p-3 space-y-2 min-h-[200px]">
                        {completeTasks.map((task, index) => (
                          <div key={task.id}>
                            <CompactTaskCard task={task} />
                          </div>
                        ))}
                        {provided.placeholder}
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>

              <div className="flex-shrink-0 w-80">
                <div className="h-12 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setIsAddTaskModalOpen(true)}
                  >
                    <Plus size={14} className="mr-2" />
                    Add section
                  </Button>
                </div>
              </div>
            </div>
          </DragDropContext>
        );
    }
  };

  return (
    <div className="h-full min-h-0 flex-1 overflow-auto">
      {renderCurrentView()}
    </div>
  );
}
