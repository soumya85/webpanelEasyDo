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

  // Calculate rotation for the gauge (180 degrees = 0%, 0 degrees = 100%)
  const rotation = 180 - overallScore * 1.8; // 1.8 degrees per percent

  return (
    <div className="w-full h-full">
      {/* Card with background starting from title */}
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Section Header - Title at top */}
          <div className="text-center mb-4">
            <h2 className="text-[#283C50] font-inter text-xl font-bold mb-2">
              Performance Meter
            </h2>
            <p className="text-sm text-gray-600">
              ( Overall Score : {overallScore}% )
            </p>
          </div>

          {/* Custom CSS-based Circular Performance Gauge */}
          <div className="mb-6">
            <div className="relative w-full max-w-sm mx-auto">
              {/* Gauge Container */}
              <div className="relative w-64 h-32 mx-auto">
                {/* Background Semi-circle */}
                <div className="absolute inset-0 flex items-end justify-center">
                  <div className="relative w-48 h-24 overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-full h-full border-8 border-gray-200 rounded-t-full"></div>
                    {/* Active Progress Arc */}
                    <div
                      className="absolute bottom-0 left-0 w-full h-full border-8 border-red-500 rounded-t-full"
                      style={{
                        clipPath: `polygon(0 100%, ${overallScore}% 100%, ${overallScore}% 0, 0 0)`,
                        background:
                          "conic-gradient(from 180deg, #ef4444 0deg, #ef4444 ${overallScore * 3.6}deg, transparent ${overallScore * 3.6}deg)",
                        borderImage: `conic-gradient(from 180deg, #ef4444 0deg, #ef4444 ${overallScore * 1.8}deg, #f3f4f6 ${overallScore * 1.8}deg) 1`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Needle/Pointer */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div
                    className="w-1 h-16 bg-gray-800 rounded-full origin-bottom transform"
                    style={{
                      transform: `translateX(-50%) rotate(${rotation}deg)`,
                    }}
                  ></div>
                  {/* Center dot */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800 rounded-full"></div>
                </div>

                {/* Score Display - Positioned safely below the gauge */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8">
                  <div className="text-2xl font-bold text-gray-800 text-center bg-white px-3 py-1 rounded-lg shadow-sm border">
                    {overallScore}%
                  </div>
                </div>
              </div>

              {/* Poor/Good Labels */}
              <div className="flex justify-between items-center mt-12 px-8">
                <span className="text-sm font-medium text-red-500">Poor</span>
                <span className="text-sm font-medium text-green-500">Good</span>
              </div>
            </div>
          </div>

          {/* Performance Categories Bar Chart */}
          <div className="h-40 flex-1 min-h-0">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={performanceData}
                margin={{ top: 10, right: 20, left: 10, bottom: 50 }}
              >
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 9 }}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11 }}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 mt-2">
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
