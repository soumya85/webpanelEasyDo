import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Users, CheckCircle2, Calendar as CalendarIcon } from "lucide-react";
import { DashboardCard } from "../DashboardCard";
import { CardSize } from "@/types/cardSize";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface Task {
  id: string;
  title: string;
  start: string;
  end: string;
  assignee: string;
  tags: string[];
  daysLeft: number;
  date: string; // "YYYY-MM-DD"
}

interface TodayScheduleCardProps {
  id: string;
  index: number;
  size?: CardSize;
  onResize?: (cardId: string, newSize: CardSize) => void;
}

// Mock tasks
const todayStr = new Date().toISOString().slice(0, 10);
const allTasks: Task[] = [
  // My Task for today
  {
    id: "my-today-1",
    title: "Finish React UI for dashboard",
    start: "Today 09:00 AM",
    end: "Today 11:00 AM",
    assignee: "Current User",
    tags: ["NEW", "G.Task"],
    daysLeft: 0,
    date: todayStr,
  },
  // Delegated Task for today
  {
    id: "del-today-1",
    title: "Prepare delegated report for client",
    start: "Today 01:00 PM",
    end: "Today 03:00 PM",
    assignee: "Teammate: Alex Johnson",
    tags: ["Delegated"],
    daysLeft: 0,
    date: todayStr,
  },
  // Existing mock tasks
  {
    id: "1",
    title: "(Important) code review for...",
    start: "01 Feb 12:35 PM",
    end: "04 Feb 12:26 PM",
    assignee: "Shibyjyoti Android : Shibyjyoti Sarkar...",
    tags: ["NEW", "G.Task", "SKIPPED"],
    daysLeft: 114,
    date: "2025-02-02",
  },
  {
    id: "2",
    title: "Analyze customer satisfac...",
    start: "01 Feb 12:40 PM",
    end: "05 Feb 1:40 PM",
    assignee: "Shibyjyoti IOS : Task Reminder",
    tags: ["NEW", "Group Task"],
    daysLeft: 114,
    date: "2025-02-02",
  },
  {
    id: "3",
    title: "Review and update month...",
    start: "01 Feb 3:15 PM",
    end: "05 Feb 3:15 PM",
    assignee: "Shibyjyoti Android : Soumyadeep G...",
    tags: ["NEW", "G.Task", "SKIPPED"],
    daysLeft: 113,
    date: "2025-02-02",
  },
  // Add more tasks for other days if needed
];

const tagOptions = [
  { label: "All", value: "all" },
  { label: "My Task", value: "my" },
  { label: "Delegated Task", value: "delegated" },
  { label: "Meet", value: "meet" },
  { label: "Reminder", value: "reminder" },
  { label: "Holiday", value: "holiday" },
  { label: "Birthday", value: "birthday" },
];

function getNext7Days(startDate: Date) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }).charAt(0),
      date: d.toISOString().slice(0, 10),
      count: Math.floor(Math.random() * 15), // Replace with real count if available
    });
  }
  return days;
}

export const TodayScheduleCard: React.FC<TodayScheduleCardProps> = ({
  id,
  index,
  size,
  onResize,
}) => {
  // State for selected day and tag
  const [calendarAnchor, setCalendarAnchor] = useState<null | HTMLElement>(null);
  const [daysStart, setDaysStart] = useState(new Date());
  const days = getNext7Days(daysStart);
  const [selectedDate, setSelectedDate] = useState(days[0].date);
  const [selectedTag, setSelectedTag] = useState("all");

  // Filter tasks by selected date
  let filteredTasks = allTasks.filter((task) => task.date === selectedDate);

  // Filter by tag
  if (selectedTag === "my") {
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.tags.includes("G.Task") || task.tags.includes("Group Task"),
    );
  } else if (selectedTag === "delegated") {
    filteredTasks = filteredTasks.filter((task) =>
      task.tags.includes("Delegated"),
    );
  }

  // Render different views for special tags
  let content;
  if (["all", "my", "delegated"].includes(selectedTag)) {
    content = (
      <div className="max-h-72 overflow-y-auto pr-2">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            No tasks for this day and filter.
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-blue-100 rounded-xl p-4 mb-4 flex flex-col gap-1 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full p-1 border border-gray-200">
                  <Users className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex-1 font-semibold text-base text-black truncate">
                  {task.title}
                </div>
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  {task.daysLeft}d
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-700 mt-1">
                <span>
                  {task.start} - {task.end}
                </span>
                <span className="text-gray-500">{task.assignee}</span>
              </div>
              <div className="flex gap-2 mt-2">
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      tag === "NEW"
                        ? "bg-red-500 text-white"
                        : tag === "SKIPPED"
                        ? "bg-red-500 text-white"
                        : tag === "G.Task" || tag === "Group Task"
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-end mt-2 gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          ))
        )}
      </div>
    );
  } else if (selectedTag === "meet") {
    content = (
      <div className="text-center text-gray-400 text-sm py-8">No meetings today.</div>
    );
  } else if (selectedTag === "reminder") {
    content = (
      <div className="text-center text-gray-400 text-sm py-8">No reminders for today.</div>
    );
  } else if (selectedTag === "holiday") {
    content = (
      <div className="text-center text-gray-400 text-sm py-8">No holidays today.</div>
    );
  } else if (selectedTag === "birthday") {
    content = (
      <div className="text-center text-gray-400 text-sm py-8">No birthdays today.</div>
    );
  }

  // Helper for date display
  const getDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <DashboardCard id={id} index={index} size={size} onResize={onResize}>
      {/* Header: Date and Tabs */}
      <div className="px-6 pt-5 pb-3 border-b flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50">
        <div>
          <div className="text-lg font-bold text-indigo-800">
            <strong>Today</strong>
          </div>
          <div className="mt-2 overflow-x-auto whitespace-nowrap custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
            {tagOptions.map((tag) => (
              <button
                key={tag.value}
                className={`inline-block px-3 py-1 mr-2 rounded-full text-xs font-semibold transition ${
                  selectedTag === tag.value
                    ? "bg-blue-100 text-blue-700 font-bold"
                    : "bg-gray-100 text-gray-500"
                }`}
                onClick={() => setSelectedTag(tag.value)}
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold text-blue-700">
            {getDateDisplay(selectedDate)}
          </span>
          <span className="text-xs text-gray-500">Feb 2025 ▼</span>
        </div>
      </div>
      {/* Calendar Row */}
      <div className="flex gap-3 px-6 py-2 border-b bg-white items-center">
        <div className="flex gap-3 flex-1 overflow-x-auto custom-scrollbar">
          {days.map((d, i) => (
            <button
              key={d.date}
              className={`flex flex-col items-center w-8 focus:outline-none ${
                selectedDate === d.date
                  ? "text-white bg-blue-600 rounded-lg"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedDate(d.date)}
            >
              <span className="text-xs">{d.label}</span>
              <span className="font-bold">
                {parseInt(d.date.split("-")[2], 10)}
              </span>
              <span className="text-[10px] text-red-400">
                {d.count > 0 ? `+${d.count}` : ""}
              </span>
            </button>
          ))}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="ml-2 p-2 rounded-full bg-gray-100 hover:bg-blue-100 border border-gray-200 text-blue-600 focus:outline-none"
              aria-label="Pick a date"
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="p-0 w-auto bg-white border rounded-lg shadow-lg">
            <Calendar
              mode="single"
              selected={new Date(selectedDate)}
              onSelect={(date) => {
                if (date) {
                  setDaysStart(date);
                  setSelectedDate(date.toISOString().slice(0, 10));
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* MultiDay Section */}
      <div className="px-6 py-4 bg-[#F8FAFF]">
        {/* <div className="text-xs text-gray-500 mb-2 font-semibold">MultiDay</div> */}
        {content}
      </div>
    </DashboardCard>
  );
};

/* Add this to your global CSS if not present already */
// .custom-scrollbar::-webkit-scrollbar { height: 6px; background: #f1f1f1; }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
