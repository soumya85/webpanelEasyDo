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
        <CardContent className="p-6 flex-1 flex flex-col space-y-6">
          {/* Section Header - Title at top */}
          <div className="text-center">
            <h2 className="text-[#283C50] font-inter text-xl font-bold mb-2">
              Performance Meter
            </h2>
            <p className="text-sm text-gray-600">
              ( Overall Score : {overallScore}% )
            </p>
          </div>

          {/* Score Display - Prominently shown at top */}
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-white shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold">{overallScore}</div>
                <div className="text-xs font-medium">SCORE</div>
              </div>
            </div>
          </div>

          {/* Simple Progress Bar Gauge */}
          <div className="space-y-4">
            {/* Semicircle Visual */}
            <div className="relative w-full max-w-xs mx-auto">
              <div className="relative w-40 h-20 mx-auto overflow-hidden">
                {/* Background semicircle */}
                <div className="w-full h-full border-8 border-gray-200 rounded-t-full"></div>

                {/* Progress fill */}
                <div className="absolute inset-0">
                  <div
                    className="w-full h-full border-8 border-red-500 rounded-t-full transition-all duration-500"
                    style={{
                      transform: `rotate(${(overallScore / 100) * 180 - 180}deg)`,
                      transformOrigin: "center bottom",
                      clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 0)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Poor/Good Labels */}
              <div className="flex justify-between items-center mt-2 px-4">
                <span className="text-xs font-medium text-red-500">Poor</span>
                <span className="text-xs font-medium text-green-500">Good</span>
              </div>
            </div>
          </div>

          {/* Performance Categories Bar Chart */}
          <div className="flex-1 min-h-[120px]">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={performanceData}
                margin={{ top: 10, right: 15, left: 15, bottom: 40 }}
              >
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 8 }}
                  angle={-45}
                  textAnchor="end"
                  height={40}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10 }}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1">
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
