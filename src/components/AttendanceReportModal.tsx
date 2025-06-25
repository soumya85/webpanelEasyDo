import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, X } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface AttendanceReportModalProps {
  open: boolean;
  onClose: () => void;
  onBackToReports: () => void;
}

// Sample data based on the screenshots
const attendanceData = [
  { name: "Present", value: 26, color: "#06B6D4" },
  { name: "Absent", value: 0, color: "#EF4444" },
  { name: "Late", value: 3, color: "#F3F4F6" },
  { name: "Half Days", value: 0, color: "#E5E7EB" },
  { name: "On Leaves", value: 1, color: "#6B7280" },
];

const attendanceLogData = [
  {
    day: "Thu, 01-May-2025",
    punchIn: "10:10 AM",
    punchOut: "7:30 PM",
    isWeekend: false,
  },
  {
    day: "Fri, 02-May-2025",
    punchIn: "10:42 AM",
    punchOut: "7:45 PM",
    isWeekend: false,
  },
  {
    day: "Sat, 03-May-2025",
    punchIn: "10:24 AM",
    punchOut: "8:15 PM",
    isWeekend: false,
  },
  { day: "Sun, 04-May-2025", punchIn: "×", punchOut: "×", isWeekend: true },
  {
    day: "Mon, 05-May-2025",
    punchIn: "9:45 AM",
    punchOut: "7:30 PM",
    isWeekend: false,
  },
  {
    day: "Tue, 06-May-2025",
    punchIn: "10:45 AM",
    punchOut: "7:45 PM",
    isWeekend: false,
  },
  {
    day: "Wed, 07-May-2025",
    punchIn: "9:46 AM",
    punchOut: "8:00 PM",
    isWeekend: false,
  },
  { day: "Sun, 25-May-2025", punchIn: "×", punchOut: "×", isWeekend: true },
  {
    day: "Mon, 26-May-2025",
    punchIn: "10:24 AM",
    punchOut: "7:30 PM",
    isWeekend: false,
  },
  {
    day: "Tue, 27-May-2025",
    punchIn: "10:04 AM",
    punchOut: "7:45 PM",
    isWeekend: false,
  },
  {
    day: "Wed, 28-May-2025",
    punchIn: "10:10 AM",
    punchOut: "7:30 PM",
    isWeekend: false,
  },
  {
    day: "Thu, 29-May-2025",
    punchIn: "10:00 AM",
    punchOut: "7:45 PM",
    isWeekend: false,
  },
  {
    day: "Fri, 30-May-2025",
    punchIn: "10:03 AM",
    punchOut: "7:30 PM",
    isWeekend: false,
  },
  {
    day: "Sat, 31-May-2025",
    punchIn: "10:10 AM",
    punchOut: "7:45 PM",
    isWeekend: false,
  },
];

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

export const AttendanceReportModal: React.FC<AttendanceReportModalProps> = ({
  open,
  onClose,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last Month");

  const CustomLegend = () => (
    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span>Above Office Average</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span>Below Office Average</span>
      </div>
    </div>
  );

  const PieChartLegend = () => (
    <div className="space-y-1 text-sm">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-[#06B6D4]"></div>
        <span>Present</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-[#EF4444]"></div>
        <span>Absent</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-[#E5E7EB]"></div>
        <span>Late</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-[#E5E7EB]"></div>
        <span>Half Days</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-sm bg-[#6B7280]"></div>
        <span>On Leaves</span>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-0 [&>button]:hidden">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Attendance Report</DialogTitle>
          </VisuallyHidden>
        </DialogHeader>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-1">
              <ArrowLeft className="w-5 h-5 text-blue-500" />
            </button>
            <span className="text-blue-500 text-sm font-medium">
              Back To Report
            </span>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">
            Attendance Report
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="p-4 space-y-6">
          {/* Period Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Period</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full h-12 border border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Last Quarter">Last Quarter</SelectItem>
                <SelectItem value="Last Year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search and Clear Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white h-12 rounded-full">
              Search
            </Button>
            <Button
              variant="outline"
              className="flex-1 bg-pink-500 hover:bg-pink-600 text-white border-pink-500 h-12 rounded-full"
            >
              Clear
            </Button>
          </div>

          {/* Selection Card */}
          <div className="bg-gray-50 rounded-lg p-4">
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
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total staffs</span>
                <span className="text-gray-900">28</span>
              </div>
            </div>
          </div>

          {/* Attendance Score Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Attendance Score
              </h3>
              <span className="text-sm text-gray-600">Last Month</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Your Attendance Score
                </span>
                <span className="text-2xl font-bold text-green-600">
                  96.30%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">
                  Office Attendance Score
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  74.14%
                </span>
              </div>
              <CustomLegend />
            </div>
          </div>

          {/* Employee Status Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Employee Status
              </h3>
              <span className="text-sm text-gray-600">Last Month</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Present</span>
                <span className="text-gray-900 font-semibold">26</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Absent</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Late</span>
                <span className="text-gray-900 font-semibold">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Half Days</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">On Leaves</span>
                <span className="text-gray-900 font-semibold">1</span>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-center gap-8">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {attendanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <PieChartLegend />
              </div>
            </div>
          </div>

          {/* Leave Balance Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Leave Balance
            </h3>
            <p className="text-sm text-gray-600">01-Apr-2025 to 25-Jun-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Earned</span>
                <span className="text-gray-900 font-semibold">
                  9.99 out of 9.99
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Sick</span>
                <span className="text-gray-900 font-semibold">
                  5.00 out of 5.00
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Casual</span>
                <span className="text-gray-900 font-semibold">
                  3.16 out of 4.16
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Others</span>
                <span className="text-gray-900 font-semibold">
                  6.00 out of 6.00
                </span>
              </div>
            </div>
          </div>

          {/* Employee Insights Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Employee Insights
              </h3>
              <span className="text-sm text-gray-600">Last Month</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Total working time
                </span>
                <span className="text-gray-900 font-semibold">
                  10 Days 0 Hrs
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Average working time
                </span>
                <span className="text-gray-900 font-semibold">
                  9 Hrs 15 Mins
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">
                  Average break time
                </span>
                <span className="text-gray-900 font-semibold">0 Mins</span>
              </div>
            </div>
          </div>

          {/* Office Days Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">
                Office Days
              </h3>
              <span className="text-sm text-gray-600">Last Month</span>
            </div>
            <p className="text-sm text-gray-600">01-May-2025 to 31-May-2025</p>

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Total Days</span>
                <span className="text-gray-900 font-semibold">31</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Working Days</span>
                <span className="text-gray-900 font-semibold">27</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Holidays</span>
                <span className="text-gray-900 font-semibold">0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Weekly off</span>
                <span className="text-gray-900 font-semibold">4</span>
              </div>
            </div>
          </div>

          {/* Assigned Timings Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Assigned Timings
            </h3>

            {/* Week Days */}
            <div className="flex justify-center gap-2">
              {weekDays.map((day, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === 3
                      ? "bg-cyan-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">
                Wednesday (10:15 AM to 07:15 PM)
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-2 bg-cyan-500 rounded"></div>
                <div className="flex-1 h-2 bg-cyan-500 rounded"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Duration 9 hours and 0 minutes</span>
                <span>Break 30 min</span>
              </div>
            </div>
          </div>

          {/* Attendance Log Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Your Attendance Log
            </h3>
            <p className="text-sm text-gray-600">
              Export for (Soumyadeep Goswami)
            </p>

            <div className="bg-gray-50 rounded-lg p-4">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-300 mb-3">
                <span className="text-sm font-semibold text-gray-900">Day</span>
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Punch-in
                </span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  Punch-out
                </span>
              </div>

              {/* Table Rows */}
              <div className="space-y-3">
                {attendanceLogData.map((entry, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-3 gap-4 py-1 text-sm ${
                      entry.isWeekend ? "text-pink-500" : "text-gray-900"
                    }`}
                  >
                    <span className="font-medium">{entry.day}</span>
                    <span className="text-center">
                      {entry.punchIn === "×" ? (
                        <span className="text-pink-500 text-lg font-bold">
                          ×
                        </span>
                      ) : (
                        entry.punchIn
                      )}
                    </span>
                    <span className="text-right">
                      {entry.punchOut === "×" ? "" : entry.punchOut}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Border */}
              <div className="border-b border-gray-300 mt-4 mb-3"></div>

              {/* Table Footer */}
              <div className="grid grid-cols-3 gap-4 py-2">
                <span className="text-sm font-semibold text-gray-900">Day</span>
                <span className="text-sm font-semibold text-gray-900 text-center">
                  Punch-in
                </span>
                <span className="text-sm font-semibold text-gray-900 text-right">
                  Punch-out
                </span>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
