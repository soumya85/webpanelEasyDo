import React from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";

export const TaskPendingCard: React.FC = () => {
  const monthData = [
    { month: "M", value: 25 },
    { month: "J", value: 35 },
    { month: "J", value: 40 },
    { month: "A", value: 30 },
    { month: "S", value: 20 },
    { month: "O", value: 15 },
  ];

  const maxValue = Math.max(...monthData.map((d) => d.value));

  return (
    <TaskInsightCard title="Task Pending">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          The last 6 Months, you have an average of 33 pending Tasks.
        </p>

        <div className="space-y-2">
          <span className="text-sm text-gray-700">Average Pending</span>
          <div className="relative">
            <div className="h-1 bg-red-500 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-end justify-between pt-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500">33</div>
            <div className="text-sm text-gray-600">Per Day</div>
          </div>

          <div className="flex items-end space-x-3">
            {monthData.map((data, index) => (
              <div key={index} className="text-center">
                <div
                  className="w-4 bg-gray-300 rounded-sm mb-1"
                  style={{ height: `${(data.value / maxValue) * 40}px` }}
                ></div>
                <div className="text-xs text-gray-600">{data.month}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TaskInsightCard>
  );
};
