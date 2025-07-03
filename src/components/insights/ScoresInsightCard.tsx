import React from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";
import { Progress } from "@/components/ui/progress";

export const ScoresInsightCard: React.FC = () => {
  return (
    <TaskInsightCard title="Your Scores">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Average Productivity Score of 80% is desirable. Pls focus more on
          On-Time Task Completion.
        </p>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Average Score</span>
            <span className="text-sm font-medium text-gray-800">45%</span>
          </div>
          <Progress value={45} className="h-2" />
        </div>

        <div className="flex items-end justify-between pt-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500">38%</div>
          </div>

          <div className="flex space-x-6">
            <div className="text-center">
              <div className="w-4 h-8 bg-blue-400 rounded-sm mb-1"></div>
              <div className="text-xs text-gray-600">37%</div>
              <div className="text-xs text-gray-600">On-Time</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-6 bg-gray-400 rounded-sm mb-1"></div>
              <div className="text-xs text-gray-600">33%</div>
              <div className="text-xs text-gray-600">Task</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-gray-300 rounded-sm mb-1"></div>
              <div className="text-xs text-gray-600">Meet</div>
            </div>
          </div>
        </div>
      </div>
    </TaskInsightCard>
  );
};
