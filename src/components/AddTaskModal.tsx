import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, X, Plus, Paperclip, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [checklistItems, setChecklistItems] = useState<string[]>([""]);
  const [repeatType, setRepeatType] = useState("does-not-repeat");
  const [priority, setPriority] = useState("medium");
  const [assignee, setAssignee] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const addChecklistItem = () => setChecklistItems([...checklistItems, ""]);
  const updateChecklistItem = (index: number, value: string) => {
    const newItems = [...checklistItems];
    newItems[index] = value;
    setChecklistItems(newItems);
  };
  const removeChecklistItem = (index: number) => {
    if (checklistItems.length > 1) {
      setChecklistItems(checklistItems.filter((_, i) => i !== index));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border-0 p-0">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 px-10 py-8">
          <DialogTitle className="text-3xl font-extrabold text-white flex items-center justify-between tracking-tight">
            <span>
              <CheckCircle2
                className="inline-block mr-2 text-green-300"
                size={32}
              />
              <ReactiveMultilingualText translationKey="createNewTask" />
            </span>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-white hover:bg-blue-700"
              >
                <X className="h-6 w-6" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <form className="px-10 py-10 bg-white space-y-10">
          {/* Title & Assignee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <Label htmlFor="title" className="font-semibold text-gray-700">
                Task Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Design new dashboard"
                className="w-full mt-2"
                required
              />
            </div>
            <div>
              <Label htmlFor="assignee" className="font-semibold text-gray-700">
                Assignee
              </Label>
              <Input
                id="assignee"
                placeholder="Assign to (name or email)"
                className="w-full mt-2"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
            </div>
          </div>

          {/* Dates & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Label className="font-semibold text-gray-700">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-2",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {startDate
                      ? format(startDate, "EEE, MMM dd, yyyy")
                      : t("pickADate")}
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
            </div>
            <div>
              <Label className="font-semibold text-gray-700">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-2",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {endDate
                      ? format(endDate, "EEE, MMM dd, yyyy")
                      : t("pickADate")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label className="font-semibold text-gray-700">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder={t("selectPriority")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔥 High</SelectItem>
                  <SelectItem value="medium">⭐ Medium</SelectItem>
                  <SelectItem value="low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <Label
              htmlFor="instructions"
              className="font-semibold text-gray-700"
            >
              Instructions
            </Label>
            <textarea
              id="instructions"
              placeholder={t("describeTaskInDetail")}
              className="w-full min-h-[100px] px-3 py-2 border border-input rounded-lg resize-none mt-2"
            />
          </div>

          {/* Checklist */}
          <div>
            <Label className="font-semibold text-gray-700">Checklist</Label>
            <div className="space-y-2 mt-2">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder={`Checklist item #${index + 1}`}
                    value={item}
                    onChange={(e) => updateChecklistItem(index, e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={addChecklistItem}
                    className="h-9 w-9 bg-blue-600 text-white hover:bg-blue-700"
                    title="Add item"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  {checklistItems.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeChecklistItem(index)}
                      className="h-9 w-9 text-red-500"
                      title="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Repeat Options */}
          <div>
            <Label className="font-semibold text-gray-700">Repeat</Label>
            <div className="flex gap-6 mt-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="repeat"
                  value="does-not-repeat"
                  checked={repeatType === "does-not-repeat"}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="accent-blue-600"
                />
                <span className="text-sm">Does Not Repeat</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="repeat"
                  value="fixed-repeat"
                  checked={repeatType === "fixed-repeat"}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="accent-blue-600"
                />
                <span className="text-sm">Fixed Repeat</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="repeat"
                  value="dynamic-repeat"
                  checked={repeatType === "dynamic-repeat"}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="accent-blue-600"
                />
                <span className="text-sm">Dynamic Repeat</span>
              </label>
            </div>
          </div>

          {/* Attachment */}
          <div>
            <Label className="font-semibold text-gray-700">Attachment</Label>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <Button
                variant="outline"
                className="w-fit flex items-center gap-2"
                asChild
              >
                <span>
                  <Paperclip className="w-4 h-4 mr-1" />
                  {attachment ? attachment.name : "Browse"}
                </span>
              </Button>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-8 border-t mt-10">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="font-semibold">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold px-8 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:from-indigo-700 hover:to-blue-600 transition"
            >
              <Plus className="w-5 h-5" /> Add Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
