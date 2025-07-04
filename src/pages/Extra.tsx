import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { ScoresInsightCard } from "@/components/insights/ScoresInsightCard";
import { TaskPendingCard } from "@/components/insights/TaskPendingCard";
import { TaskPendingTrendsCard } from "@/components/insights/TaskPendingTrendsCard";
import { TaskCompletedCard } from "@/components/insights/TaskCompletedCard";
import { TaskCompletedTrendsCard } from "@/components/insights/TaskCompletedTrendsCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, Calendar, BarChart3 } from "lucide-react";

const Extra = () => {
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
      </div>
    </div>
  );
};

export default Extra;
