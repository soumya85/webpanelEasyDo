
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { SubTaskList } from "@/components/SubTaskList";
import { Task, SubTask, Comment, Attachment } from "@/types/task";
import { 
  X, 
  Calendar, 
  Flag, 
  User, 
  Clock,
  Plus,
  MessageSquare,
  Paperclip
} from "lucide-react";

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
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

export function TaskDetailModal({ task, open, onOpenChange, onUpdateTask }: TaskDetailModalProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [comment, setComment] = useState("");
  const [newTag, setNewTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!task) return null;

  const handleTitleSave = () => {
    onUpdateTask(task.id, { title, updatedAt: new Date().toISOString() });
    setIsEditingTitle(false);
  };

  const handleDescriptionSave = () => {
    onUpdateTask(task.id, { description, updatedAt: new Date().toISOString() });
  };

  const handleStatusChange = (status: "todo" | "in-progress" | "complete") => {
    onUpdateTask(task.id, { status, updatedAt: new Date().toISOString() });
  };

  const handlePriorityChange = (priority: "urgent" | "high" | "medium" | "low") => {
    onUpdateTask(task.id, { priority, updatedAt: new Date().toISOString() });
  };

  const handleSubtaskAdd = (subtaskTitle: string) => {
    const newSubtask: SubTask = {
      id: Date.now().toString(),
      title: subtaskTitle,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    onUpdateTask(task.id, { 
      subtasks: [...task.subtasks, newSubtask],
      updatedAt: new Date().toISOString()
    });
  };

  const handleSubtaskUpdate = (subtaskId: string, updates: Partial<SubTask>) => {
    const updatedSubtasks = task.subtasks.map(subtask =>
      subtask.id === subtaskId ? { ...subtask, ...updates } : subtask
    );
    
    onUpdateTask(task.id, { 
      subtasks: updatedSubtasks,
      updatedAt: new Date().toISOString()
    });
  };

  const handleSubtaskDelete = (subtaskId: string) => {
    const updatedSubtasks = task.subtasks.filter(subtask => subtask.id !== subtaskId);
    onUpdateTask(task.id, { 
      subtasks: updatedSubtasks,
      updatedAt: new Date().toISOString()
    });
  };

  // Add comment handler
  const handlePostComment = () => {
    if (!comment.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      author: { 
        id: "current-user", 
        name: "You", 
        initials: "YOU",
        avatar: ""
      },
      content: comment,
      createdAt: new Date().toLocaleString(),
    };
    onUpdateTask(task.id, { 
      comments: [...task.comments, newComment],
      updatedAt: new Date().toISOString()
    });
    setComment("");
  };

  // Add tag handler
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    onUpdateTask(task.id, { 
      tags: [...task.tags, newTag.trim()],
      updatedAt: new Date().toISOString()
    });
    setNewTag("");
  };

  // Add attachment handler
  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const newAttachment: Attachment = {
      id: Date.now().toString(),
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString(),
    };
    onUpdateTask(task.id, { 
      attachments: [...task.attachments, newAttachment],
      updatedAt: new Date().toISOString()
    });
    e.target.value = "";
  };

  const completedSubtasks = task.subtasks.filter(st => st.completed).length;
  const progressPercentage = task.subtasks.length > 0 
    ? Math.round((completedSubtasks / task.subtasks.length) * 100) 
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full max-h-[90vh] bg-gray-50 border border-gray-200 rounded-xl shadow-xl p-0 overflow-hidden">
        {/* Title Bar */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-white">
          <div className="flex items-center gap-3">
            {isEditingTitle ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') setIsEditingTitle(false);
                }}
                className="text-2xl font-bold bg-gray-100 px-3 py-2 rounded"
                autoFocus
              />
            ) : (
              <h2
                className="text-2xl font-bold cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition"
                onClick={() => setIsEditingTitle(true)}
              >
                {task.title}
              </h2>
            )}
            <span className={`ml-4 px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
              {task.status.replace("-", " ")}
            </span>
            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority || "medium"}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X size={20} />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex h-[70vh] overflow-hidden">
          {/* Left/Main */}
          <div className="flex-1 px-8 py-6 overflow-y-auto">
            {/* Description */}
            <section className="mb-8">
              <h3 className="text-base font-semibold text-gray-700 mb-2">Description</h3>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={handleDescriptionSave}
                placeholder="Add a description..."
                className="min-h-[100px] bg-white border border-gray-200 rounded"
              />
            </section>

            {/* Subtasks */}
            <section className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold text-gray-700">
                  Subtasks <span className="text-xs text-gray-400">({completedSubtasks}/{task.subtasks.length})</span>
                </h3>
                {task.subtasks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{progressPercentage}%</span>
                  </div>
                )}
              </div>
              <SubTaskList
                subtasks={task.subtasks}
                onAdd={handleSubtaskAdd}
                onUpdate={handleSubtaskUpdate}
                onDelete={handleSubtaskDelete}
              />
            </section>

            {/* Comments */}
            <section>
              <h3 className="text-base font-semibold text-gray-700 mb-2">Comments</h3>
              <div className="space-y-3">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-3 bg-white border border-gray-100 rounded">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-blue-600 text-white">
                        {comment.author.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{comment.author.name}</span>
                        <span className="text-xs text-gray-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-gray-400 text-white">
                      YOU
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Add a comment..."
                      className="min-h-[60px] bg-white border border-gray-200 rounded"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <Button size="sm" className="mt-2" onClick={handlePostComment}>
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="w-80 px-6 py-6 border-l bg-white flex-shrink-0 overflow-y-auto">
            {/* Assignee */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Assignee</h4>
              {task.assignee ? (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-blue-600 text-white">
                      {task.assignee.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{task.assignee.name}</span>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full">
                  <User size={14} className="mr-2" />
                  Assign
                </Button>
              )}
            </div>

            {/* Due Date */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Due Date</h4>
              {task.dueDate ? (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={14} />
                  <span>{task.dueDate}</span>
                </div>
              ) : (
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar size={14} className="mr-2" />
                  Set Date
                </Button>
              )}
            </div>

            {/* Time Tracking */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Time Tracking</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Tracked:</span>
                  <span>{task.timeTracked || 0}h</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Estimated:</span>
                  <span>{task.estimatedTime || 0}h</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  <Clock size={14} className="mr-2" />
                  Start Timer
                </Button>
              </div>
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                {task.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  size={8}
                  placeholder="Add tag"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleAddTag(); }}
                />
                <Button variant="outline" size="sm" onClick={handleAddTag}>
                  <Plus size={12} className="mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Attachments */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Attachments ({task.attachments.length})
              </h4>
              <div className="space-y-2 mb-2">
                {task.attachments.map(att => (
                  <a
                    key={att.id}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-xs text-blue-600 underline truncate"
                  >
                    {att.name}
                  </a>
                ))}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleAttachmentChange}
              />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={14} className="mr-2" />
                Add Attachment
              </Button>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
