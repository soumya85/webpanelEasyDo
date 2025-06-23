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
  DialogClose,
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
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0 rounded-t-3xl">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex-1"></div>
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex-1 flex justify-end">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 rounded-full bg-black text-white hover:bg-gray-800"
                >
                  <span className="sr-only">Close</span>✕
                </Button>
              </DialogClose>
            </div>
          </div>

          <DialogHeader className="px-4 pb-4">
            <DialogTitle className="text-xl font-bold text-center">
              Score Details
            </DialogTitle>
          </DialogHeader>

          <div className="px-4">
            {/* Tabs */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab("scores")}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "scores"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Scores
              </button>
              <button
                onClick={() => setActiveTab("weightage")}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "weightage"
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Weightage
              </button>
            </div>

            {activeTab === "scores" ? (
              <>
                {/* Semicircular Gauge */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-64 h-32">
                    <svg width="256" height="128" viewBox="0 0 256 128">
                      {/* Background Arc */}
                      <path
                        d="M 32 96 A 96 96 0 0 1 224 96"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="24"
                        strokeLinecap="round"
                      />

                      {/* Red section (0-20) */}
                      <path
                        d="M 32 96 A 96 96 0 0 1 71.5 36.5"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="24"
                        strokeLinecap="round"
                      />

                      {/* Orange section (20-40) */}
                      <path
                        d="M 71.5 36.5 A 96 96 0 0 1 128 16"
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="24"
                        strokeLinecap="round"
                      />

                      {/* Yellow section (40-60) */}
                      <path
                        d="M 128 16 A 96 96 0 0 1 184.5 36.5"
                        fill="none"
                        stroke="#EAB308"
                        strokeWidth="24"
                        strokeLinecap="round"
                      />

                      {/* Green section (60-80) */}
                      <path
                        d="M 184.5 36.5 A 96 96 0 0 1 224 96"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="24"
                        strokeLinecap="round"
                      />

                      {/* Score labels */}
                      <text
                        x="45"
                        y="105"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#374151"
                      >
                        20
                      </text>
                      <text
                        x="85"
                        y="45"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#374151"
                      >
                        40
                      </text>
                      <text
                        x="120"
                        y="25"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#374151"
                      >
                        60
                      </text>
                      <text
                        x="155"
                        y="45"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#374151"
                      >
                        80
                      </text>
                      <text
                        x="195"
                        y="105"
                        fontSize="14"
                        fontWeight="bold"
                        fill="#374151"
                      >
                        100
                      </text>

                      {/* Needle */}
                      <g transform="translate(128, 96)">
                        <line
                          x1="0"
                          y1="0"
                          x2={
                            Math.cos(Math.PI * (1 - overallScore / 100)) * -80
                          }
                          y2={
                            Math.sin(Math.PI * (1 - overallScore / 100)) * -80
                          }
                          stroke="#000"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <circle cx="0" cy="0" r="4" fill="#000" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Labels */}
                <div className="flex justify-between mb-6 px-4">
                  <span className="text-lg font-bold text-red-500">Poor</span>
                  <span className="text-lg font-bold text-green-500">Good</span>
                </div>

                {/* Performance Meter Text */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-black mb-1">
                    Performance Meter
                  </h2>
                  <p className="text-lg text-gray-600">
                    ( Overall Score :{" "}
                    <span className="font-bold">{overallScore}%</span> )
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Donut Chart for Weightage */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-48 h-48">
                    <svg width="192" height="192" viewBox="0 0 192 192">
                      {/* Background circle */}
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="20"
                      />

                      {/* Progress circle */}
                      <circle
                        cx="96"
                        cy="96"
                        r="80"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="20"
                        strokeDasharray={`${(overallScore / 100) * 502.65} 502.65`}
                        strokeDashoffset="125.66"
                        transform="rotate(-90 96 96)"
                      />

                      {/* Center text */}
                      <text
                        x="96"
                        y="96"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="24"
                        fontWeight="bold"
                        fill="#000"
                      >
                        {overallScore}%
                      </text>
                    </svg>
                  </div>
                </div>

                {/* Full Score Text */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-black">
                    Full Score : 100
                  </h2>
                </div>

                {/* Weightage Header */}
                <div className="flex justify-between items-center mb-4 px-2">
                  <span className="text-lg font-semibold text-gray-700">
                    Title
                  </span>
                  <span className="text-lg font-semibold text-gray-700">
                    Weightage%
                  </span>
                </div>
              </>
            )}

            {/* Performance Categories List */}
            <div className="space-y-3 mb-6">
              {performanceData.map((item, index) => {
                const icons = ["👍", "👋", "⚡", "⭐", "👥", "📈"];
                const colors = [
                  "#93C5FD",
                  "#3B82F6",
                  "#1E40AF",
                  "#EF4444",
                  "#10B981",
                  "#EAB308",
                ];
                const weightages = [20, 20, 15, 15, 15, 15];

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: colors[index] }}
                      ></div>
                      <span className="text-gray-800 font-medium">
                        {item.category}
                      </span>
                      <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xs">i</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{icons[index]}</span>
                      <span className="text-lg font-bold text-gray-800">
                        {activeTab === "scores"
                          ? `${item.percentage}%`
                          : weightages[index]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">- Note :</span> Weightage of
                each score is set by the Management of the company.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
