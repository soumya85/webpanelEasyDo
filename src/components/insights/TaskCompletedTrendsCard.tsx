import React from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";

export const TaskCompletedTrendsCard: React.FC = () => {
  return (
    <TaskInsightCard title="Task Completed Trends">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          On average, you are completing more tasks per month compared to last
          year
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-800">23</div>
            <div className="text-sm text-gray-600">Tasks per month</div>
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-medium">
                2024
              </div>
              <div className="h-3 bg-yellow-400 rounded flex-1"></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-sm text-gray-600">Tasks per month</div>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-400 text-white px-2 py-1 rounded text-sm font-medium">
                2023
              </div>
              <div
                className="h-3 bg-gray-400 rounded"
                style={{ width: "52%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </TaskInsightCard>
  );
};
