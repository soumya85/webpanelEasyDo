import React, { useState } from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar } from "lucide-react";

export const TaskPendingCard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [monthData, setMonthData] = useState([
    {
      month: "May",
      short: "M",
      value: 25,
      tasks: ["Review documents", "Team meeting", "Code review"],
    },
    {
      month: "June",
      short: "J",
      value: 35,
      tasks: [
        "Project planning",
        "Client presentation",
        "Bug fixes",
        "Testing",
      ],
    },
    {
      month: "July",
      short: "J",
      value: 40,
      tasks: [
        "Feature development",
        "Documentation",
        "Sprint planning",
        "UI design",
        "Database optimization",
      ],
    },
    {
      month: "August",
      short: "A",
      value: 30,
      tasks: ["API integration", "Security audit", "Performance testing"],
    },
    {
      month: "September",
      short: "S",
      value: 20,
      tasks: ["Deployment", "Monitoring setup"],
    },
    {
      month: "October",
      short: "O",
      value: 15,
      tasks: ["Maintenance", "Updates"],
    },
  ]);

  const maxValue = Math.max(...monthData.map((d) => d.value));
  const averagePending = Math.round(
    monthData.reduce((sum, m) => sum + m.value, 0) / monthData.length,
  );

  return (
    <TaskInsightCard title="Task Pending">
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            The last 6 months, you have an average of {averagePending} pending
            tasks.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Average Pending</span>
            <Badge variant="destructive" className="text-xs">
              High Priority
            </Badge>
          </div>
          <div className="relative">
            <div className="h-2 bg-red-100 rounded-full">
              <div
                className="h-2 bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${(averagePending / 50) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4 flex-1">
          <div className="text-center">
            <div className="text-4xl font-bold text-red-600">
              {averagePending}
            </div>
            <div className="text-sm text-gray-600">Per Day</div>
            <Button variant="outline" size="sm" className="mt-2">
              <Calendar className="h-3 w-3 mr-1" />
              View Details
            </Button>
          </div>

          <div className="flex items-end space-x-2">
            {monthData.map((data, index) => (
              <div
                key={index}
                className="text-center group cursor-pointer"
                onClick={() =>
                  setSelectedMonth(selectedMonth === index ? null : index)
                }
              >
                <div
                  className={`w-4 rounded-sm mb-2 transition-all duration-300 ${
                    selectedMonth === index
                      ? "bg-red-600 shadow-lg"
                      : "bg-red-400 group-hover:bg-red-500"
                  }`}
                  style={{
                    height: `${Math.max((data.value / maxValue) * 50, 12)}px`,
                  }}
                />
                <div
                  className={`text-xs transition-colors ${
                    selectedMonth === index
                      ? "text-red-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {data.short}
                </div>
                {selectedMonth === index && (
                  <div className="text-xs font-medium text-red-600">
                    {data.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedMonth !== null && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="text-sm font-medium text-red-800 mb-2">
              {monthData[selectedMonth].month}: {monthData[selectedMonth].value}{" "}
              pending tasks
            </div>
            <div className="space-y-1">
              {monthData[selectedMonth].tasks.slice(0, 3).map((task, idx) => (
                <div key={idx} className="text-xs text-red-700">
                  • {task}
                </div>
              ))}
              {monthData[selectedMonth].tasks.length > 3 && (
                <div className="text-xs text-red-600">
                  +{monthData[selectedMonth].tasks.length - 3} more...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </TaskInsightCard>
  );
};
