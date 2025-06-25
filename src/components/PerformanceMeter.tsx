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
  const [activeTab, setActiveTab] = useState<"scores" | "weightage">("scores");
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
        <DialogContent className="max-w-2xl w-full max-h-[95vh] overflow-y-auto p-0 rounded-t-3xl">
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
                {/* Performance Meter - Figma Design */}
                <div className="flex justify-center mb-8">
                  <div className="relative w-full max-w-[320px] h-[180px] flex justify-center items-center">
                    <svg
                      width="281"
                      height="152"
                      viewBox="0 0 281 152"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-[280px] h-[152px]"
                    >
                      {/* Red segment (0-20) - Poor */}
                      <path
                        d="M0.169067 140C0.169066 110.435 9.52876 81.6287 26.9067 57.7101L72.2116 90.626C61.7849 104.977 56.1691 122.261 56.1691 140H0.169067Z"
                        fill="#FF4D0F"
                      />
                      {/* Orange segment (20-40) */}
                      <path
                        d="M26.9066 57.7101C44.2845 33.7914 68.7885 15.9882 96.9066 6.85208L114.212 60.1112C97.3407 65.5929 82.6383 76.2748 72.2116 90.626L26.9066 57.7101Z"
                        fill="#FFA21F"
                      />
                      {/* Yellow segment (40-60) */}
                      <path
                        d="M96.9066 6.85208C125.025 -2.28403 155.313 -2.28403 183.431 6.85208L166.126 60.1113C149.256 54.6296 131.082 54.6296 114.212 60.1113L96.9066 6.85208Z"
                        fill="#EDE96E"
                      />
                      {/* Light green segment (60-80) */}
                      <path
                        d="M183.431 6.85208C211.549 15.9882 236.053 33.7914 253.431 57.7101L208.126 90.626C197.7 76.2748 182.997 65.5929 166.126 60.1113L183.431 6.85208Z"
                        fill="#A1CC47"
                      />
                      {/* Dark green segment (80-100) - Good */}
                      <path
                        d="M253.431 57.7101C270.809 81.6287 280.169 110.435 280.169 140H224.169C224.169 122.261 218.553 104.977 208.126 90.626L253.431 57.7101Z"
                        fill="#7CC200"
                      />
                      {/* Needle - rotated for 25.5% score (pointing to red section) */}
                      <g
                        transform="rotate(-45 140 135)"
                        className="transition-transform duration-1000 ease-out"
                      >
                        {/* Needle shaft */}
                        <path
                          d="M134.006 134.457L140.357 43.7404C140.412 42.7817 141.722 42.7178 141.759 43.7617L146 134.649C146.091 144.556 133.696 144.407 134.006 134.457Z"
                          fill="#1E3A5F"
                        />
                      </g>

                      {/* Needle base - outer circle */}
                      <path
                        d="M123.323 135.061C123.098 125.92 130.324 118.318 139.465 118.093C142.768 118.018 145.865 118.9 148.493 120.496C153.148 123.33 156.301 128.398 156.432 134.235C156.676 143.376 149.45 150.977 140.291 151.221C131.169 151.447 123.567 144.20 123.323 135.061Z"
                        fill="#1E3A5F"
                      />
                      {/* Needle base - white ring */}
                      <path
                        d="M131.544 134.854C131.431 130.256 135.073 126.427 139.671 126.314C141.342 126.277 142.881 126.727 144.213 127.516C146.56 128.942 148.136 131.495 148.211 134.423C148.324 139.021 144.701 142.85 140.084 142.963C135.486 143.113 131.675 139.472 131.544 134.854Z"
                        fill="white"
                      />
                      {/* Needle base - center circle */}
                      <path
                        d="M135.585 134.923C135.525 132.477 137.46 130.44 139.903 130.38C140.791 130.36 141.609 130.6 142.317 131.019C143.563 131.778 144.401 133.136 144.441 134.693C144.501 137.139 142.576 139.176 140.123 139.235C137.679 139.315 135.655 137.379 135.585 134.923Z"
                        fill="#1E3A5F"
                      />
                    </svg>

                    {/* Scale Values positioned around the meter */}
                    <div className="absolute inset-0 pointer-events-none">
                      {/* 40 - positioned on the orange section (left side) */}
                      <div
                        className="absolute text-lg font-bold text-gray-700"
                        style={{
                          left: "20%",
                          top: "30%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        40
                      </div>

                      {/* 60 - positioned at the top center on yellow section */}
                      <div
                        className="absolute text-lg font-bold text-gray-700"
                        style={{
                          left: "50%",
                          top: "5%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        60
                      </div>

                      {/* 80 - positioned on the light green section (right side) */}
                      <div
                        className="absolute text-lg font-bold text-gray-700"
                        style={{
                          right: "20%",
                          top: "30%",
                          transform: "translate(50%, -50%)",
                        }}
                      >
                        80
                      </div>

                      {/* 100 - positioned on the dark green section (far right) */}
                      <div
                        className="absolute text-lg font-bold text-gray-700"
                        style={{
                          right: "8%",
                          top: "65%",
                          transform: "translate(50%, -50%)",
                        }}
                      >
                        100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Poor and Good labels */}
                <div className="flex justify-between items-center mb-6 px-8">
                  <div className="text-lg font-bold text-red-500">POOR</div>
                  <div className="text-lg font-bold text-green-500">GOOD</div>
                </div>

                {/* Current Score Display */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-red-500 mb-2">
                    {overallScore}%
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    Overall Performance Score
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Your current score falls in the{" "}
                    <span className="font-semibold text-red-500">Poor</span>{" "}
                    range
                  </div>
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
