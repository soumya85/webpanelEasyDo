
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { SubTask } from "@/types/task";
import { Plus, X, GripVertical } from "lucide-react";

interface SubTaskListProps {
  subtasks: SubTask[];
  onAdd: (title: string) => void;
  onUpdate: (id: string, updates: Partial<SubTask>) => void;
  onDelete: (id: string) => void;
}

export function SubTaskList({ subtasks, onAdd, onUpdate, onDelete }: SubTaskListProps) {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleAdd = () => {
    if (newSubtaskTitle.trim()) {
      onAdd(newSubtaskTitle.trim());
      setNewSubtaskTitle("");
      setIsAdding(false);
    }
  };

  const handleEdit = (subtask: SubTask) => {
    setEditingId(subtask.id);
    setEditTitle(subtask.title);
  };

  const handleSaveEdit = () => {
    if (editingId && editTitle.trim()) {
      onUpdate(editingId, { title: editTitle.trim() });
      setEditingId(null);
      setEditTitle("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const handleToggleComplete = (subtask: SubTask) => {
    onUpdate(subtask.id, { completed: !subtask.completed });
  };

  return (
    <div className="space-y-2">
      {subtasks.map((subtask) => (
        <div 
          key={subtask.id} 
          className="flex items-center gap-3 p-2 border rounded hover:bg-gray-50 group"
        >
          <GripVertical size={14} className="text-gray-400 opacity-0 group-hover:opacity-100" />
          
          <Checkbox
            checked={subtask.completed}
            onCheckedChange={() => handleToggleComplete(subtask)}
          />
          
          {editingId === subtask.id ? (
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveEdit();
                  if (e.key === 'Escape') handleCancelEdit();
                }}
                className="h-8"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          ) : (
            <div 
              className={`flex-1 cursor-pointer ${
                subtask.completed ? 'line-through text-gray-500' : ''
              }`}
              onClick={() => handleEdit(subtask)}
            >
              {subtask.title}
            </div>
          )}
          
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => onDelete(subtask.id)}
            className="opacity-0 group-hover:opacity-100"
          >
            <X size={14} />
          </Button>
        </div>
      ))}
      
      {isAdding ? (
        <div className="flex items-center gap-2 p-2 border rounded">
          <Input
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
              if (e.key === 'Escape') setIsAdding(false);
            }}
            placeholder="Enter subtask title..."
            className="h-8"
            autoFocus
          />
          <Button size="sm" onClick={handleAdd}>
            Add
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAdding(true)}
          className="w-full justify-start text-gray-500 hover:text-gray-700"
        >
          <Plus size={14} className="mr-2" />
          Add Subtask
        </Button>
      )}
    </div>
  );
}
