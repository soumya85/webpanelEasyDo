import React, { useState } from "react";
import { TaskInsightCard } from "@/components/TaskInsightCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
} from "lucide-react";

export const TaskPendingTrendsCard: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const yearData = {
    "2024": {
      value: 33,
      trend: "up",
      percentage: 43.5,
      color: "bg-red-500",
      months: [
        { month: "Jan", pending: 28 },
        { month: "Feb", pending: 31 },
        { month: "Mar", pending: 35 },
        { month: "Apr", pending: 39 },
        { month: "May", pending: 33 },
        { month: "Jun", pending: 29 },
      ],
    },
    "2023": {
      value: 23,
      trend: "down",
      percentage: 0,
      color: "bg-gray-400",
      months: [
        { month: "Jan", pending: 22 },
        { month: "Feb", pending: 25 },
        { month: "Mar", pending: 21 },
        { month: "Apr", pending: 24 },
        { month: "May", pending: 23 },
        { month: "Jun", pending: 23 },
      ],
    },
  };

  const improvement =
    ((yearData["2024"].value - yearData["2023"].value) /
      yearData["2023"].value) *
    100;

  return (
    <TaskInsightCard title="Task Pending Trends">
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-600">
            On average, your pending tasks are{" "}
            {improvement > 0 ? "higher" : "lower"} than last year
          </p>
        </div>

        <div className="flex justify-between items-center">
          <Badge
            variant={improvement > 0 ? "destructive" : "default"}
            className="text-xs"
          >
            {improvement > 0 ? (
              <TrendingUp className="h-3 w-3 mr-1" />
            ) : (
              <TrendingDown className="h-3 w-3 mr-1" />
            )}
            {Math.abs(improvement).toFixed(1)}% vs last year
          </Badge>
          <Button variant="outline" size="sm">
            <Calendar className="h-3 w-3 mr-1" />
            Monthly View
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
                {data.trend === "up" ? (
                  <TrendingUp className="h-5 w-5 text-red-500" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="text-sm text-gray-600">Tasks per month</div>
              <div className="flex items-center space-x-2">
                <div
                  className={`${
                    year === "2024" ? "bg-red-500" : "bg-gray-400"
                  } text-white px-2 py-1 rounded text-sm font-medium transition-all hover:shadow-md`}
                >
                  {year}
                </div>
                <div className="h-3 bg-gray-200 rounded flex-1 overflow-hidden">
                  <div
                    className={`h-3 ${data.color} rounded transition-all duration-500`}
                    style={{ width: year === "2024" ? "100%" : "70%" }}
                  />
                </div>
              </div>

              {selectedYear === year && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                  <div className="text-sm font-medium text-gray-800 mb-2">
                    {year} Monthly Breakdown
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {data.months.map((month, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xs text-gray-600">
                          {month.month}
                        </div>
                        <div className="text-sm font-medium">
                          {month.pending}
                        </div>
                        <div
                          className={`h-1 rounded mt-1 ${
                            month.pending > 30 ? "bg-red-400" : "bg-yellow-400"
                          }`}
                        />
                      </div>
                    ))}
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
