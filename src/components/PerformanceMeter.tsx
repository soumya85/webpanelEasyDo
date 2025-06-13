import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

export default function PerformanceMeter() {
  const overallScore = 25.5;

  // Gauge data for the circular meter
  const gaugeData = [
    { name: "Score", value: overallScore, fill: "#ef4444" }, // Red for poor score
    { name: "Remaining", value: 100 - overallScore, fill: "#f3f4f6" }, // Light gray for remaining
  ];

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

  // Custom label component for the gauge
  const renderCustomLabel = ({ cx, cy }: { cx: number; cy: number }) => {
    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-lg font-bold fill-gray-800"
      >
        {overallScore}%
      </text>
    );
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
        <CardContent className="p-6 flex-1 flex flex-col">
          {/* Section Header - Title at top */}
          <div className="text-center mb-6">
            <h2 className="text-[#283C50] font-inter text-xl font-bold mb-2">
              Performance Meter
            </h2>
            <p className="text-sm text-gray-600">
              ( Overall Score : {overallScore}% )
            </p>
          </div>

          {/* Circular Performance Gauge */}
          <div className="mb-6">
            <div className="relative w-64 h-32 mx-auto">
              <PieChart width={256} height={128}>
                <Pie
                  data={gaugeData}
                  cx={128}
                  cy={128}
                  innerRadius={60}
                  outerRadius={90}
                  startAngle={180}
                  endAngle={0}
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomLabel}
                >
                  {gaugeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>

              {/* Score Labels */}
              <div className="absolute bottom-0 left-0 text-sm font-medium text-red-500">
                Poor
              </div>
              <div className="absolute bottom-0 right-0 text-sm font-medium text-green-500">
                Good
              </div>
            </div>
          </div>

          {/* Performance Categories Bar Chart */}
          <div className="h-48 flex-1 min-h-0">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart
                data={performanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  formatter={(value) => [`${value}%`, "Performance"]}
                />
                <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
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
