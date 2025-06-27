import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  X,
  Edit3,
  Save,
  User,
  Flag,
} from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Task } from "@/types/task";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

// These will be translated in the component using the translation hook

export function TaskDetailModal({
  task,
  open,
  onOpenChange,
  onUpdateTask,
}: TaskDetailModalProps) {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState<Task["status"]>(task?.status || "To Do");
  const [priority, setPriority] = useState<Task["priority"]>(
    task?.priority || "medium",
  );

  // Get translated status and priority options
  const getStatusOptions = () => [
    { value: "To Do", label: t("toDo") },
    { value: "In Progress", label: t("inProgress") },
    { value: "Review", label: t("review") },
    { value: "Done", label: t("done") },
    { value: "Blocked", label: t("blocked") },
    { value: "Cancelled", label: t("cancelled") },
  ];

  const getPriorityOptions = () => [
    { value: "urgent", label: t("urgent") },
    { value: "high", label: t("high") },
    { value: "medium", label: t("medium") },
    { value: "low", label: t("low") },
  ];

  const getStatusDisplayText = (statusValue: string) => {
    const statusOption = getStatusOptions().find(
      (option) => option.value === statusValue,
    );
    return statusOption ? statusOption.label : statusValue;
  };

  const getPriorityDisplayText = (priorityValue: string) => {
    const priorityOption = getPriorityOptions().find(
      (option) => option.value === priorityValue,
    );
    return priorityOption ? priorityOption.label : priorityValue;
  };
  const [assignee, setAssignee] = useState(task?.assignee?.name || "");
  const [startDate, setStartDate] = useState<Date | undefined>(
    task?.startDate ? new Date(task.startDate) : undefined,
  );
  const [dueDate, setDueDate] = useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate) : undefined,
  );

  useEffect(() => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setStatus(task?.status || "To Do");
    setPriority(task?.priority || "medium");
    setAssignee(task?.assignee?.name || "");
    setStartDate(task?.startDate ? new Date(task.startDate) : undefined);
    setDueDate(task?.dueDate ? new Date(task.dueDate) : undefined);
    setEditMode(false);
  }, [task, open]);

  if (!task) return null;

  const handleSave = () => {
    onUpdateTask(task.id, {
      title,
      description,
      status,
      priority,
      assignee: assignee ? { name: assignee } : undefined,
      startDate: startDate ? startDate.toISOString().slice(0, 10) : undefined,
      dueDate: dueDate ? dueDate.toISOString().slice(0, 10) : undefined,
    });
    setEditMode(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-3xl shadow-2xl border-0 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 px-10 py-8">
          <DialogTitle className="flex items-center gap-4">
            <span className="flex items-center gap-3">
              <Flag className="w-8 h-8 text-yellow-200 drop-shadow-lg" />
              <span className="text-3xl font-black text-white tracking-tight drop-shadow-lg">
                <MultilingualText>{t("taskDetails")}</MultilingualText>
              </span>
            </span>
            <span className="ml-auto">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-white hover:bg-blue-700"
                >
                  <X className="h-6 w-6" />
                </Button>
              </DialogClose>
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="px-10 py-10 bg-white space-y-10">
          {/* Title */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 border-b pb-6">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-gray-500 mb-1">
                <MultilingualText>{t("title")}</MultilingualText>
              </label>
              {editMode ? (
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold border-2 border-blue-200 focus:border-blue-500 transition"
                />
              ) : (
                <div className="text-2xl font-extrabold text-blue-900 tracking-tight">
                  {task.title}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Badge
                className={
                  status === "Done"
                    ? "bg-green-100 text-green-700"
                    : status === "In Progress"
                      ? "bg-blue-100 text-blue-700"
                      : status === "Review"
                        ? "bg-yellow-100 text-yellow-700"
                        : status === "Blocked"
                          ? "bg-red-100 text-red-700"
                          : status === "Cancelled"
                            ? "bg-gray-200 text-gray-500"
                            : "bg-gray-100 text-gray-700"
                }
              >
                <MultilingualText>
                  {getStatusDisplayText(task.status)}
                </MultilingualText>
              </Badge>
              <Badge
                className={
                  priority === "urgent"
                    ? "bg-pink-100 text-pink-700"
                    : priority === "high"
                      ? "bg-red-100 text-red-700"
                      : priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                }
              >
                <MultilingualText>
                  {getPriorityDisplayText(task.priority || "medium")}
                </MultilingualText>
              </Badge>
            </div>
          </div>
          {/* Assignee & Dates */}
          <div className="flex flex-col md:flex-row gap-8 border-b pb-6">
            <div className="flex-1 flex flex-col gap-2">
              <label className="block text-xs font-semibold text-gray-500">
                <MultilingualText>{t("assignee")}</MultilingualText>
              </label>
              {editMode ? (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-400" />
                  <Input
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  />
                </div>
              ) : (
                <Badge className="bg-blue-100 text-blue-700 flex items-center gap-1 text-base px-3 py-1.5">
                  <User className="w-5 h-5" />
                  <MultilingualText>
                    {task.assignee?.name || t("unassigned")}
                  </MultilingualText>
                </Badge>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="block text-xs font-semibold text-gray-500">
                <MultilingualText>{t("startDate")}</MultilingualText>
              </label>
              {editMode ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <MultilingualText>
                        {startDate
                          ? format(startDate, "yyyy-MM-dd")
                          : t("pickADate")}
                      </MultilingualText>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <span className="text-base font-medium">
                  {task.startDate
                    ? format(new Date(task.startDate), "yyyy-MM-dd")
                    : "-"}
                </span>
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="block text-xs font-semibold text-gray-500">
                <MultilingualText>{t("dueDate")}</MultilingualText>
              </label>
              {editMode ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <MultilingualText>
                        {dueDate
                          ? format(dueDate, "yyyy-MM-dd")
                          : t("pickADate")}
                      </MultilingualText>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <span className="text-base font-medium">
                  {task.dueDate
                    ? format(new Date(task.dueDate), "yyyy-MM-dd")
                    : "-"}
                </span>
              )}
            </div>
          </div>
          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">
              <MultilingualText>{t("description")}</MultilingualText>
            </label>
            {editMode ? (
              <textarea
                className="w-full min-h-[80px] border rounded-lg px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <div className="text-gray-700 text-base">
                {task.description || (
                  <span className="text-gray-400">
                    <MultilingualText>{t("noDescription")}</MultilingualText>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-8 border-t mt-10">
          {editMode ? (
            <Button
              type="button"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:from-indigo-700 hover:to-blue-600 transition"
              onClick={handleSave}
            >
              <Save className="w-5 h-5" />
              <MultilingualText>{t("save")}</MultilingualText>
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              className="flex items-center gap-2"
              onClick={() => setEditMode(true)}
            >
              <Edit3 className="w-5 h-5" />
              <MultilingualText>{t("edit")}</MultilingualText>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
