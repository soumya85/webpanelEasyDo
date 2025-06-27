import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/useTranslation";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface EmployeePerformanceRatingModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

// Circular Progress Component
const CircularProgress: React.FC<{
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}> = ({ value, size = 80, strokeWidth = 8, color = "#4ADE80" }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold text-gray-700">{value}</span>
      </div>
    </div>
  );
};

// Sample data for pie charts
export const EmployeePerformanceRatingModal: React.FC<
  EmployeePerformanceRatingModalProps
> = ({ open, onClose, onBackToReports }) => {
  const { t } = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState(t("lastMonth"));

  const taskPerformanceData = [
    { name: t("onTime"), value: 50, color: "#4A90E2" },
    { name: t("afterTime"), value: 50, color: "#F5A623" },
  ];

  const meetingStatusData = [
    { name: t("notAttended"), value: 100, color: "#9CA3AF" },
    { name: t("attended"), value: 0, color: "#4A90E2" },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 [&>button]:hidden">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Employee Performance Rating</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <button onClick={onBackToReports} className="p-1">
              <ArrowLeft className="w-5 h-5 text-blue-500" />
            </button>
            <span className="text-blue-500 text-sm font-medium">
              Back To Report
            </span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">
            Employee Performance Rating
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Title */}
          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-900">
              Employee Performance
            </h2>
          </div>

          {/* Period Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Period</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full h-12 border border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={t("lastMonth")}>{t("lastMonth")}</SelectItem>
                <SelectItem value={t("lastQuarter")}>
                  {t("lastQuarter")}
                </SelectItem>
                <SelectItem value={t("lastYear")}>{t("lastYear")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search and Clear Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white h-12 rounded-full">
              Search
            </Button>
            <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white h-12 rounded-full">
              Clear
            </Button>
          </div>

          {/* Selection Card */}
          <div className="bg-gray-50 rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Selection
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Branch</span>
                <span className="text-gray-900">Head office</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Employee</span>
                <span className="text-gray-900">Soumyadeep Goswami</span>
              </div>
            </div>
          </div>

          {/* Score Status Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Score Status
            </h3>
            <p className="text-sm text-gray-600">01-Apr-2025 to 26-Jun-2025</p>

            {/* Overall Score */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md text-center">
              <div className="text-6xl font-bold text-green-600 mb-2">
                31.25
              </div>
              <div className="text-lg font-medium text-gray-900">Overall</div>
            </div>

            {/* Performance Metrics Grid */}
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="grid grid-cols-2 gap-6">
                {/* Task Performance */}
                <div className="text-center">
                  <CircularProgress value={60} color="#4ADE80" />
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    Task performance
                  </div>
                </div>

                {/* Meeting */}
                <div className="text-center">
                  <CircularProgress value={0} color="#E5E7EB" />
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    Meeting
                  </div>
                </div>

                {/* Response Time */}
                <div className="text-center">
                  <CircularProgress value={16.67} color="#4ADE80" />
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    Response time
                  </div>
                </div>

                {/* Sales Lead */}
                <div className="text-center">
                  <CircularProgress value={0} color="#E5E7EB" />
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    Sales lead
                  </div>
                </div>

                {/* Attendance */}
                <div className="text-center">
                  <CircularProgress value={98.77} color="#4ADE80" />
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    Attendance
                  </div>
                </div>

                {/* Management Review */}
                <div className="text-center">
                  <CircularProgress value={0} color="#E5E7EB" />
                  <div className="mt-2 text-sm font-medium text-gray-900">
                    Management Review
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Performance Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Task Performance Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total tasks</span>
                <span className="text-gray-900 font-semibold">2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Completed on time
                </span>
                <span className="text-gray-900 font-semibold">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Completed after time
                </span>
                <span className="text-gray-900 font-semibold">1</span>
              </div>

              {/* Task Performance Pie Chart */}
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taskPerformanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {taskPerformanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#4A90E2] rounded-sm"></div>
                    <span className="text-sm text-gray-700">On Time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#F5A623] rounded-sm"></div>
                    <span className="text-sm text-gray-700">After Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Meeting Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Meeting Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Total meetings
                </span>
                <span className="text-gray-900 font-semibold">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Attended meetings
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Not attended meetings
                </span>
                <span className="text-gray-900 font-semibold">4</span>
              </div>

              {/* Meeting Status Pie Chart */}
              <div className="flex items-center justify-center gap-8 mt-6">
                <div className="h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={meetingStatusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {meetingStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#4A90E2] rounded-sm"></div>
                    <span className="text-sm text-gray-700">Attended</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#9CA3AF] rounded-sm"></div>
                    <span className="text-sm text-gray-700">Not Attended</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sales Lead Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Lead Status
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total leads</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Converted</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Pending</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Average time to convert leads
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Sales amount by converted clients
                </span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
            </div>
          </div>

          {/* Attendance Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Attendance
              </h3>
              <span className="text-lg font-bold text-gray-900">MAY</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3 shadow-md">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total days</span>
                <span className="text-gray-900 font-semibold">31.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Working days</span>
                <span className="text-gray-900 font-semibold">27.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Present</span>
                <span className="text-gray-900 font-semibold">26.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Absent</span>
                <span className="text-gray-900 font-semibold">0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Leaves</span>
                <span className="text-gray-900 font-semibold">1.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Week off Day</span>
                <span className="text-gray-900 font-semibold">4.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Holiday</span>
                <span className="text-gray-900 font-semibold">0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Half Day</span>
                <span className="text-gray-900 font-semibold">0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Late</span>
                <span className="text-gray-900 font-semibold">3.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Average working hours
                </span>
                <span className="text-gray-900 font-semibold">
                  9 Hrs 15 Mins
                </span>
              </div>
            </div>
          </div>

          {/* Export Buttons */}
          <div className="flex gap-3 mt-6">
            <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white h-12 rounded-full">
              Save in drive
            </Button>
            <Button className="flex-1 bg-pink-500 hover:bg-pink-600 text-white h-12 rounded-full">
              Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
