import React, { useState } from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, TrendingUp } from "lucide-react";

export const TaskCompletedCard: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [monthData, setMonthData] = useState([
    {
      month: "May",
      short: "M",
      value: 20,
      tasks: ["Project setup", "Initial design"],
    },
    {
      month: "June",
      short: "J",
      value: 25,
      tasks: ["Feature A", "Bug fixes", "Documentation"],
    },
    {
      month: "July",
      short: "J",
      value: 30,
      tasks: ["Feature B", "Testing", "Deployment", "Code review"],
    },
    {
      month: "August",
      short: "A",
      value: 28,
      tasks: [
        "Performance optimization",
        "Security updates",
        "UI improvements",
      ],
    },
    {
      month: "September",
      short: "S",
      value: 35,
      tasks: [
        "Feature C",
        "Integration tests",
        "User feedback",
        "Hotfixes",
        "Monitoring",
      ],
    },
    {
      month: "October",
      short: "O",
      value: 32,
      tasks: [
        "Feature D",
        "Database migration",
        "API improvements",
        "Documentation updates",
      ],
    },
  ]);

  const maxValue = Math.max(...monthData.map((d) => d.value));
  const averageCompleted = Math.round(
    monthData.reduce((sum, m) => sum + m.value, 0) / monthData.length,
  );
  const totalCompleted = monthData.reduce((sum, m) => sum + m.value, 0);

  return (
    <TaskInsightCard title="Task Completed">
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            The last 6 months you completed an average of {averageCompleted}{" "}
            tasks per day
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Completion Rate</span>
            <Badge
              variant="default"
              className="text-xs bg-green-100 text-green-800"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Improving
            </Badge>
          </div>
          <div className="relative">
            <div className="h-2 bg-green-100 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((averageCompleted / 40) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4 flex-1">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">
              {averageCompleted}
            </div>
            <div className="text-sm text-gray-600">Per Day</div>
            <div className="text-xs text-gray-500 mt-1">
              {totalCompleted} total
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <CheckCircle className="h-3 w-3 mr-1" />
              View All
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
                      ? "bg-green-600 shadow-lg"
                      : "bg-green-400 group-hover:bg-green-500"
                  }`}
                  style={{
                    height: `${Math.max((data.value / maxValue) * 50, 12)}px`,
                  }}
                />
                <div
                  className={`text-xs transition-colors ${
                    selectedMonth === index
                      ? "text-green-600 font-semibold"
                      : "text-gray-600"
                  }`}
                >
                  {data.short}
                </div>
                {selectedMonth === index && (
                  <div className="text-xs font-medium text-green-600">
                    {data.value}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedMonth !== null && (
          <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-800 mb-2">
              {monthData[selectedMonth].month}: {monthData[selectedMonth].value}{" "}
              completed tasks
            </div>
            <div className="space-y-1">
              {monthData[selectedMonth].tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="text-xs text-green-700 flex items-center gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  {task}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </TaskInsightCard>
  );
};
