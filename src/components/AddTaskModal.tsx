
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface AddTaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddTaskModal({ open, onOpenChange }: AddTaskModalProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [checklistItems, setChecklistItems] = useState<string[]>([""]);
  const [repeatType, setRepeatType] = useState("does-not-repeat");

  const addChecklistItem = () => {
    setChecklistItems([...checklistItems, ""]);
  };

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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Add Task
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Company Selection */}
          <div className="space-y-2">
            <Select defaultValue="liberty">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="liberty">🏢 Liberty Highrise Pvt Ltd</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title"
              placeholder="Type Your Title Here"
              className="w-full"
            />
          </div>

          {/* Date Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "EEE,MMM dd,yy h:mm a") : "Tue,Nov 05,24 3:06 PM"}
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

            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "EEE,MMM dd,yy h:mm a") : "Wed,Nov 06,24 3:06 PM"}
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
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Add Instruction</Label>
            <textarea
              id="instructions"
              placeholder="Type Your Instructions Here"
              className="w-full min-h-[80px] px-3 py-2 border border-input rounded-md resize-none"
            />
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            <Label>Checklist Option</Label>
            {checklistItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="Add Item"
                  value={item}
                  onChange={(e) => updateChecklistItem(index, e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addChecklistItem}
                  className="h-10 w-10 bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Repeat Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Customize Repeat</Label>
              <button className="text-blue-600 text-sm hover:underline">
                (learn more about repeat)
              </button>
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="repeat"
                  value="does-not-repeat"
                  checked={repeatType === "does-not-repeat"}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="text-blue-600"
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
                />
                <span className="text-sm">Dynamic Repeat</span>
              </label>
            </div>
          </div>

          {/* Job Number */}
          <div className="space-y-2">
            <Label>Company Job/ Task</Label>
            <Input
              placeholder="Job No : 1234568"
              className="w-full"
            />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" size="sm">Client / Project</Button>
              <Button variant="outline" size="sm">Nature / Type</Button>
              <Button variant="outline" size="sm">Volume (qty)</Button>
            </div>
          </div>

          {/* Attachment */}
          <div className="space-y-2">
            <Label>Add Attachment</Label>
            <Button variant="outline" className="w-fit">
              Browse
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
