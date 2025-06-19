import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Cell } from "recharts";
import { cn } from "@/lib/utils";

export default function PerformanceMeter() {
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
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Section Header - Title at top */}
          <div className="text-center mb-4">
            <h2 className="text-[#283C50] font-inter text-xl font-bold mb-2">
              Performance Meter
            </h2>
            <p className="text-sm text-gray-600">
              ( Overall Score : {overallScore}% )
            </p>
          </div>

          {/* Large, Clear Score Display */}
          <div className="text-center mb-4 py-3">
            <div className="text-4xl font-bold text-red-500 mb-2">
              {overallScore}%
            </div>
            <div className="text-base font-medium text-gray-600 mb-3">
              Overall Performance Score
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
          <div className="flex-1 min-h-[80px]">
            <h3 className="text-center text-sm font-semibold text-gray-700 mb-2">
              Category Breakdown
            </h3>
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={performanceData}
                margin={{ top: 10, right: 10, left: 10, bottom: 35 }}
              >
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 8 }}
                  angle={-45}
                  textAnchor="end"
                  height={35}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 9 }}
                  tickFormatter={(value) => `${value}%`}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 mt-3">
            {performanceData.map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className={cn("text-xs font-medium mb-1")}
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
    </div>
  );
}
