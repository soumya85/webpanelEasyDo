import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PerformanceMeter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const overallScore = 25.5;

  // Performance categories data
  const performanceData = [
    { category: "Management Review", percentage: 0 },
    { category: "Attendance", percentage: 97 },
    { category: "On-Time Tasks", percentage: 0 },
    { category: "Task Performance", percentage: 40 },
    { category: "Attend Meeting", percentage: 0 },
    { category: "Sales Lead", percentage: 0 },
  ];

  // Chart configuration for the ChartContainer
  const chartConfig = {
    percentage: {
      label: "Performance",
      color: "#3b82f6",
    },
  };

  // Custom bar colors based on performance
  const getBarColor = (percentage: number) => {
    if (percentage === 0) return "#6b7280"; // Gray for 0%
    if (percentage <= 40) return "#f97316"; // Orange for low performance
    if (percentage <= 70) return "#eab308"; // Yellow for medium performance
    return "#22c55e"; // Green for high performance
  };

  return (
    <div className="w-full h-full">
      {/* Card with background starting from title */}
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-3 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Employee Score
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-[#4766E5] hover:text-[#4766E5]/80"
              onClick={() => setIsModalOpen(true)}
            >
              More Info
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Large, Clear Score Display */}
          <div className="text-center mb-2 py-2">
            <div className="text-3xl font-bold text-red-500 mb-1">
              {overallScore}%{" "}
              <span className="text-sm text-gray-600 font-normal">
                ( Overall Score )
              </span>
            </div>
            <div className="text-lg font-bold text-gray-600 mb-2">
              Performance Meter
            </div>

            {/* Simple Progress Bar */}
            <div className="w-full max-w-sm mx-auto">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${overallScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span className="text-red-500 font-medium">Poor</span>
                <span className="text-green-500 font-medium">Good</span>
              </div>
            </div>
          </div>

          {/* Performance Categories Bar Chart */}
          <div className="flex-1 min-h-[40px] max-h-[80px]">
            <h3 className="text-center text-xs font-semibold text-gray-700 mb-1">
              Category Breakdown
            </h3>
            <ChartContainer config={chartConfig} className="h-12 w-full">
              <BarChart
                data={performanceData}
                margin={{ top: 2, right: 3, left: 3, bottom: 15 }}
              >
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 6 }}
                  angle={-45}
                  textAnchor="end"
                  height={15}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 7 }}
                  tickFormatter={(value) => `${value}%`}
                  width={20}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${value}%`, "Performance"]}
                />
                <Bar dataKey="percentage" radius={[2, 2, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getBarColor(entry.percentage)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>

          {/* Performance Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 mt-1">
            {performanceData.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className={cn("text-xs font-medium")}
                  style={{ color: getBarColor(item.percentage) }}
                >
                  {item.percentage}%
                </div>
                <div className="text-xs text-gray-600 leading-tight">
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#283C50]">
              Employee Performance Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Overall Score Section */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-500 mb-2">
                  {overallScore}%
                </div>
                <div className="text-lg font-semibold text-gray-700 mb-4">
                  Overall Performance Score
                </div>
                <div className="w-full max-w-md mx-auto">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-red-500 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${overallScore}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="text-red-500 font-medium">
                      Poor (0-30%)
                    </span>
                    <span className="text-yellow-500 font-medium">
                      Average (31-70%)
                    </span>
                    <span className="text-green-500 font-medium">
                      Good (71-100%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Performance Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {performanceData.map((item, index) => (
                <div key={index} className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">
                      {item.category}
                    </h3>
                    <div className="flex items-center">
                      <span
                        className="font-bold text-lg"
                        style={{ color: getBarColor(item.percentage) }}
                      >
                        {item.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: getBarColor(item.percentage),
                      }}
                    ></div>
                  </div>

                  <div className="text-sm text-gray-600">
                    {item.percentage === 0 &&
                      "No data available for this period"}
                    {item.percentage > 0 &&
                      item.percentage <= 40 &&
                      "Below expectations - Needs improvement"}
                    {item.percentage > 40 &&
                      item.percentage <= 70 &&
                      "Meeting expectations - Good progress"}
                    {item.percentage > 70 &&
                      "Exceeding expectations - Excellent performance"}
                  </div>
                </div>
              ))}
            </div>

            {/* Performance Insights */}
            <div className="bg-blue-50 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Performance Insights
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Strong Performance
                    </div>
                    <div className="text-sm text-gray-600">
                      Attendance rate is excellent at 97%
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Areas for Improvement
                    </div>
                    <div className="text-sm text-gray-600">
                      Focus on Management Review, Meeting Attendance, and Sales
                      Lead activities
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <div className="font-medium text-gray-800">
                      Recommendation
                    </div>
                    <div className="text-sm text-gray-600">
                      Schedule regular check-ins with manager and set clear task
                      deadlines
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
