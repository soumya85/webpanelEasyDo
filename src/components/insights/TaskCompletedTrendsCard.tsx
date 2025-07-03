import React, { useState } from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Target, CheckCircle } from "lucide-react";

export const TaskCompletedTrendsCard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const yearData = {
    "2024": {
      value: 28,
      trend: "up",
      color: "bg-green-500",
      months: [
        { month: "Jan", completed: 25 },
        { month: "Feb", completed: 27 },
        { month: "Mar", completed: 30 },
        { month: "Apr", completed: 32 },
        { month: "May", completed: 28 },
        { month: "Jun", completed: 26 },
      ],
    },
    "2023": {
      value: 18,
      trend: "stable",
      color: "bg-gray-400",
      months: [
        { month: "Jan", completed: 16 },
        { month: "Feb", completed: 18 },
        { month: "Mar", completed: 19 },
        { month: "Apr", completed: 17 },
        { month: "May", completed: 18 },
        { month: "Jun", completed: 20 },
      ],
    },
  };

  const improvement =
    ((yearData["2024"].value - yearData["2023"].value) /
      yearData["2023"].value) *
    100;

  return (
    <TaskInsightCard title="Task Completed Trends">
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            On average, you are completing more tasks per month compared to last
            year
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Badge
            variant="default"
            className="text-xs bg-green-100 text-green-800"
          >
            <TrendingUp className="h-3 w-3 mr-1" />+{improvement.toFixed(1)}%
            improvement
          </Badge>
          <Button variant="outline" size="sm">
            <Target className="h-3 w-3 mr-1" />
            Set Goal
          </Button>
        </div>

        <div className="space-y-4 flex-1">
          {Object.entries(yearData).map(([year, data]) => (
            <div
              key={year}
              className="space-y-2 cursor-pointer"
              onClick={() =>
                setSelectedYear(selectedYear === year ? null : year)
              }
            >
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-gray-800">
                  {data.value}
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <div className="text-sm text-gray-600">Tasks per month</div>
              <div className="flex items-center space-x-2">
                <div
                  className={`${
                    year === "2024" ? "bg-green-500" : "bg-gray-400"
                  } text-white px-2 py-1 rounded text-sm font-medium transition-all hover:shadow-md`}
                >
                  {year}
                </div>
                <div className="h-3 bg-gray-200 rounded flex-1 overflow-hidden">
                  <div
                    className={`h-3 ${data.color} rounded transition-all duration-500`}
                    style={{ width: year === "2024" ? "100%" : "64%" }}
                  />
                </div>
              </div>

              {selectedYear === year && (
                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-sm font-medium text-green-800 mb-2">
                    {year} Monthly Performance
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {data.months.map((month, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xs text-green-600">
                          {month.month}
                        </div>
                        <div className="text-sm font-medium">
                          {month.completed}
                        </div>
                        <div
                          className={`h-1 rounded mt-1 ${
                            month.completed > 25
                              ? "bg-green-500"
                              : "bg-green-300"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-green-700">
                    Average:{" "}
                    {(
                      data.months.reduce((sum, m) => sum + m.completed, 0) /
                      data.months.length
                    ).toFixed(1)}{" "}
                    tasks/month
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </TaskInsightCard>
  );
};
