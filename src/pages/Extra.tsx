import { ReactiveMultilingualText } from "@/components/ReactiveMultilingualText";
import { ScoresInsightCard } from "@/components/insights/ScoresInsightCard";
import { TaskPendingCard } from "@/components/insights/TaskPendingCard";
import { TaskPendingTrendsCard } from "@/components/insights/TaskPendingTrendsCard";
import { TaskCompletedCard } from "@/components/insights/TaskCompletedCard";
import { TaskCompletedTrendsCard } from "@/components/insights/TaskCompletedTrendsCard";

const Extra = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-6 pt-6">
        <ReactiveMultilingualText
          as="h1"
          className="text-2xl font-bold text-[#283C50]"
          translationKey="extra"
        />
      </div>

      {/* Task Insights Dashboard */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="lg:col-span-2 xl:col-span-1">
            <ScoresInsightCard />
          </div>

          <div className="lg:col-span-1 xl:col-span-1">
            <TaskPendingCard />
          </div>

          <div className="lg:col-span-1 xl:col-span-1">
            <TaskPendingTrendsCard />
          </div>

          <div className="lg:col-span-1 xl:col-span-1">
            <TaskCompletedCard />
          </div>

          <div className="lg:col-span-2 xl:col-span-1">
            <TaskCompletedTrendsCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extra;
