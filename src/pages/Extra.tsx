import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { ScoresInsightCard } from "@/components/insights/ScoresInsightCard";
import { TaskPendingCard } from "@/components/insights/TaskPendingCard";
import { TaskPendingTrendsCard } from "@/components/insights/TaskPendingTrendsCard";
import { TaskCompletedCard } from "@/components/insights/TaskCompletedCard";
import { TaskCompletedTrendsCard } from "@/components/insights/TaskCompletedTrendsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Calendar, BarChart3 } from "lucide-react";
import { useState } from "react";

const Extra = () => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <div className="flex items-center gap-4">
          <ReactiveMultilingualText
            as="h1"
            className="text-3xl font-bold text-[#283C50]"
            translationKey="extra"
          />
          <Badge variant="outline" className="text-sm">
            <BarChart3 className="h-4 w-4 mr-1" />
            Task Analytics
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button variant="default" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Task Insights Dashboard */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <div className="xl:col-span-1">
            <ScoresInsightCard />
          </div>

          <div className="xl:col-span-1">
            <TaskPendingCard />
          </div>

          <div className="xl:col-span-1">
            <TaskCompletedCard />
          </div>

          <div className="lg:col-span-1 xl:col-span-1">
            <TaskPendingTrendsCard />
          </div>

          <div className="lg:col-span-1 xl:col-span-2">
            <TaskCompletedTrendsCard />
          </div>
        </div>

        {/* Summary Footer */}
        <div className="mt-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Performance Summary
                </h3>
                <p className="text-sm text-gray-600">
                  Your task management performance has improved significantly.
                  Consider focusing on reducing pending tasks to optimize your
                  workflow.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">↑ 55%</div>
                  <div className="text-xs text-gray-500">Completion Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">↑ 43%</div>
                  <div className="text-xs text-gray-500">Pending Tasks</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!showInsight && (
          <div className="w-full flex justify-center py-4 bg-white border-b">
            <div className="relative flex flex-col items-center">
              {/* Green circle with red border for In Progress */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
                <div className="rounded-full border-4 border-red-500 bg-green-300 w-16 h-16 flex items-center justify-center text-xl font-bold text-black shadow">
                  {myTaskGroups.find(g => g.status === 'inprogress')?.tasks.length || 0}
                </div>
              </div>
              {/* Main Card */}
              <div className="mt-8 bg-blue-50 rounded-xl shadow border flex flex-col items-center px-8 py-4 min-w-[320px] relative">
                <div className="flex justify-between w-full mb-2">
                  <span className="text-blue-700 font-bold text-lg">Pending Tasks</span>
                  <span className="text-blue-700 font-bold text-lg">All Time</span>
                </div>
                <div className="flex justify-between w-full items-end gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-extrabold text-blue-600">{myTaskGroups.reduce((sum, g) => sum + g.tasks.length, 0)}</span>
                    <span className="w-8 h-1 bg-blue-600 rounded-full mt-1" />
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-red-600">{myTaskGroups.find(g => g.status === 'skip')?.tasks.length || 0}</span>
                    <span className="text-xs text-red-600 font-semibold mt-1">Overdue</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-600">{myTaskGroups.find(g => g.status === 'inprogress')?.tasks.length || 0}</span>
                    <span className="text-xs text-green-600 font-semibold mt-1">In Progress</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-bold text-black">{myTaskGroups.find(g => g.status === 'noAction')?.tasks.length || 0}</span>
                    <span className="text-xs text-black font-semibold mt-1">No Action</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showInsight && (
          <YourInsightComponentOrPanel />
        )}
      </div>
    </div>
  );
};

export default Extra;
