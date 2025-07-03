import React, { useState, useEffect } from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw, TrendingUp, TrendingDown } from "lucide-react";

export const ScoresInsightCard: React.FC = () => {
  const [scores, setScores] = useState({
    average: 45,
    onTime: 37,
    task: 33,
    meet: 28,
  });
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setScores({
      average: Math.floor(Math.random() * 30) + 40, // 40-70%
      onTime: Math.floor(Math.random() * 20) + 30, // 30-50%
      task: Math.floor(Math.random() * 20) + 25, // 25-45%
      meet: Math.floor(Math.random() * 15) + 20, // 20-35%
    });
    setIsLoading(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 60) return "bg-green-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <TaskInsightCard title="Your Scores">
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <p className="text-sm text-gray-600 flex-1">
            Average Productivity Score of 80% is desirable. Focus more on
            On-Time Task Completion.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshData}
            disabled={isLoading}
            className="ml-2 flex-shrink-0"
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Average Score</span>
            <div className="flex items-center gap-2">
              {scores.average > 45 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${getScoreColor(scores.average)}`}
              >
                {scores.average}%
              </span>
            </div>
          </div>
          <div className="relative">
            <Progress value={scores.average} className="h-3" />
            <div
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor(scores.average)}`}
              style={{ width: `${scores.average}%` }}
            />
          </div>
        </div>

        <div className="flex items-end justify-between pt-6 flex-1">
          <div className="text-center">
            <div
              className={`text-4xl font-bold transition-colors duration-300 ${getScoreColor(scores.average)}`}
            >
              {scores.average}%
            </div>
            <div className="text-xs text-gray-500 mt-1">Overall</div>
          </div>

          <div className="flex space-x-4">
            <div className="text-center group cursor-pointer">
              <div
                className="w-5 bg-blue-500 rounded-sm mb-2 transition-all duration-300 group-hover:bg-blue-600 group-hover:w-6"
                style={{ height: `${Math.max(scores.onTime * 1.5, 20)}px` }}
              />
              <div className="text-xs font-medium text-gray-700">
                {scores.onTime}%
              </div>
              <div className="text-xs text-gray-500">On-Time</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div
                className="w-5 bg-gray-500 rounded-sm mb-2 transition-all duration-300 group-hover:bg-gray-600 group-hover:w-6"
                style={{ height: `${Math.max(scores.task * 1.5, 20)}px` }}
              />
              <div className="text-xs font-medium text-gray-700">
                {scores.task}%
              </div>
              <div className="text-xs text-gray-500">Task</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div
                className="w-5 bg-purple-500 rounded-sm mb-2 transition-all duration-300 group-hover:bg-purple-600 group-hover:w-6"
                style={{ height: `${Math.max(scores.meet * 1.5, 20)}px` }}
              />
              <div className="text-xs font-medium text-gray-700">
                {scores.meet}%
              </div>
              <div className="text-xs text-gray-500">Meet</div>
            </div>
          </div>
        </div>
      </div>
    </TaskInsightCard>
  );
};
