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
import { CalendarIcon, X, Plus, Paperclip, CheckCircle2, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { MultilingualText } from "@/components/MultilingualText";

// Mock data for companies, groups, and employees
const companies = [
  { id: "c1", name: "Acme Corp" },
  { id: "c2", name: "Globex Inc" },
];

const groups = [
  { id: "g1", name: "Design Team" },
  { id: "g2", name: "Development Team" },
];

const employees = [
  { id: "e1", name: "Alice Smith" },
  { id: "e2", name: "Bob Johnson" },
  { id: "e3", name: "Charlie Lee" },
];

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData?: {
    company?: string;
    title?: string;
    assignees?: { id: string; name: string; type: "group" | "employee" }[];
    startDate?: Date;
    endDate?: Date;
    priority?: string;
    instructions?: string;
    checklistItems?: string[];
    repeatType?: string;
    attachment?: File | null;
  };
}

export function AddTaskModal({ open, onOpenChange, formData }: AddTaskModalProps) {
  const { t } = useTranslation();
  const [company, setCompany] = useState(formData?.company || "");
  const [title, setTitle] = useState(formData?.title || "");
  const [assignees, setAssignees] = useState<{ id: string; name: string; type: "group" | "employee" }[]>(formData?.assignees || []);
  const [startDate, setStartDate] = useState<Date | undefined>(formData?.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(formData?.endDate);
  const [priority, setPriority] = useState(formData?.priority || "medium");
  const [instructions, setInstructions] = useState(formData?.instructions || "");
  const [checklistItems, setChecklistItems] = useState<string[]>([""]);
  const [repeatType, setRepeatType] = useState(formData?.repeatType || "does-not-repeat");
  const [attachment, setAttachment] = useState<File | null>(formData?.attachment || null);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);

  const isUpdate = !!formData;

  // Handle assignee add/remove
  const handleAddAssignee = (item: { id: string; name: string; type: "group" | "employee" }) => {
    if (!assignees.some(a => a.id === item.id && a.type === item.type)) {
      setAssignees([...assignees, item]);
    }
    setShowAssigneeDropdown(false);
  };
  const handleRemoveAssignee = (id: string, type: "group" | "employee") => {
    setAssignees(assignees.filter(a => !(a.id === id && a.type === type)));
  };

  function addChecklistItem() {
    setChecklistItems([...checklistItems, ""]);
  }
  // Add these helper functions for checklist
  function updateChecklistItem(index: number, value: string) {
    setChecklistItems(items => items.map((item, i) => (i === index ? value : item)));
  }
  function removeChecklistItem(index: number) {
    setChecklistItems(items => items.length > 1 ? items.filter((_, i) => i !== index) : items);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] p-0 rounded-2xl shadow-2xl border-0 flex flex-col">
        {/* Fixed DialogTitle */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-700 via-blue-600 to-blue-400 px-6 py-5 rounded-t-2xl">
          <DialogTitle className="text-2xl font-extrabold text-white flex items-center justify-between tracking-tight">
            <span>
              <CheckCircle2 className="inline-block mr-2 text-green-300" size={28} />
              <ReactiveMultilingualText translationKey={isUpdate ? "updateTask" : "createNewTask"} />
            </span>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-blue-700"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </DialogTitle>
        </div>
        {/* Scrollable Content */}
        <form
          className="flex-1 overflow-y-auto px-6 py-6 bg-white space-y-6 min-h-0"
          onSubmit={e => {
            e.preventDefault();
            // handle submit logic here
          }}
        >
          {/* Company Dropdown at Top */}
          <div>
            <Label htmlFor="company" className="font-semibold text-gray-700">
              Company
            </Label>
            <Select value={company} onValueChange={setCompany}>
              <SelectTrigger className="mt-1 w-full h-9 text-sm">
                <SelectValue placeholder="Select company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title & Assignee */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="font-semibold text-gray-700">
                Task Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Design new dashboard"
                className="w-full mt-1 h-9 text-sm"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="assignee" className="font-semibold text-gray-700">
                Assignee
              </Label>
              {/* Multi-select Assignee */}
              <div className="relative mt-1">
                <div
                  className="flex flex-wrap gap-1 min-h-[36px] border border-input rounded-lg px-2 py-1 bg-white cursor-pointer"
                  onClick={() => setShowAssigneeDropdown((v) => !v)}
                  tabIndex={0}
                  onBlur={() => setTimeout(() => setShowAssigneeDropdown(false), 150)}
                >
                  {assignees.length === 0 && (
                    <span className="text-gray-400 text-xs">Select group or employee...</span>
                  )}
                  {assignees.map((a) => (
                    <span
                      key={a.type + a.id}
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium",
                        a.type === "group"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-blue-100 text-blue-700"
                      )}
                    >
                      <Users className="w-3 h-3" />
                      {a.name}
                      <button
                        type="button"
                        className="ml-1 text-gray-400 hover:text-red-500"
                        onClick={e => {
                          e.stopPropagation();
                          setAssignees(assignees.filter(ass => !(ass.id === a.id && ass.type === a.type)));
                        }}
                        tabIndex={-1}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {showAssigneeDropdown && (
                  <div className="absolute z-10 bg-white border rounded shadow w-full mt-1 max-h-40 overflow-auto">
                    <div className="px-3 py-2 text-xs text-gray-500 font-semibold">Groups</div>
                    {groups.map((g) => (
                      <div
                        key={g.id}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-xs"
                        onClick={() => {
                          if (!assignees.some(a => a.id === g.id && a.type === "group")) {
                            setAssignees([...assignees, { id: g.id, name: g.name, type: "group" }]);
                          }
                          setShowAssigneeDropdown(false);
                        }}
                      >
                        <Users className="inline w-4 h-4 mr-1 text-indigo-500" />
                        {g.name}
                      </div>
                    ))}
                    <div className="px-3 py-2 text-xs text-gray-500 font-semibold border-t">Employees</div>
                    {employees.map((e) => (
                      <div
                        key={e.id}
                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-xs"
                        onClick={() => {
                          if (!assignees.some(a => a.id === e.id && a.type === "employee")) {
                            setAssignees([...assignees, { id: e.id, name: e.name, type: "employee" }]);
                          }
                          setShowAssigneeDropdown(false);
                        }}
                      >
                        <Users className="inline w-4 h-4 mr-1 text-blue-500" />
                        {e.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dates & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="font-semibold text-gray-700">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal mt-1 h-9 text-sm",
                      !startDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
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
                      "w-full justify-start text-left font-normal mt-1 h-9 text-sm",
                      !endDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
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
                <SelectTrigger className="mt-1 h-9 text-sm">
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
            <Label htmlFor="instructions" className="font-semibold text-gray-700">
              Instructions
            </Label>
            <textarea
              id="instructions"
              placeholder={t("describeTaskInDetail")}
              className="w-full min-h-[80px] px-2 py-1 border border-input rounded-lg resize-none mt-1 text-sm"
              value={instructions}
              onChange={e => setInstructions(e.target.value)}
            />
          </div>

          {/* Checklist */}
          <div>
            <Label className="font-semibold text-gray-700">Checklist</Label>
            <div className="space-y-1 mt-1">
              {checklistItems.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Input
                    placeholder={`Checklist item #${index + 1}`}
                    value={item}
                    onChange={(e) => updateChecklistItem(index, e.target.value)}
                    className="flex-1 h-8 text-xs"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={addChecklistItem}
                    className="h-7 w-7 bg-blue-600 text-white hover:bg-blue-700"
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
                      className="h-7 w-7 text-red-500"
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
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="repeat"
                  value="does-not-repeat"
                  checked={repeatType === "does-not-repeat"}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="accent-blue-600"
                />
                <span>Does Not Repeat</span>
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="repeat"
                  value="fixed-repeat"
                  checked={repeatType === "fixed-repeat"}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="accent-blue-600"
                />
                <span>Fixed Repeat</span>
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="repeat"
                  value="dynamic-repeat"
                  checked={repeatType === "dynamic-repeat"}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="accent-blue-600"
                />
                <span>Dynamic Repeat</span>
              </label>
            </div>
          </div>

          {/* Attachment */}
          <div>
            <Label className="font-semibold text-gray-700">Attachment</Label>
            <label className="flex items-center gap-2 cursor-pointer mt-1">
              <Button
                variant="outline"
                className="w-fit flex items-center gap-2 h-8 text-xs"
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

          {/* Fixed Actions Footer (now inside the form, always at the bottom) */}
          <div className="flex justify-end gap-3 px-0 py-4 border-t bg-white rounded-b-2xl sticky bottom-0 z-10">
            <DialogClose asChild>
              <Button variant="outline" type="button" className="font-semibold h-9 px-4 text-sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold px-6 py-2 rounded-lg flex items-center gap-2 shadow-lg hover:from-indigo-700 hover:to-blue-600 transition h-9 text-sm"
            >
              {isUpdate ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isUpdate ? "Update Task" : "Add Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
