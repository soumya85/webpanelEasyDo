import { Card, CardContent } from "@/components/ui/card";

export default function PerformanceMeter() {
  return (
    <div className="w-full h-full">
      <Card className="bg-white border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-4 flex-1 flex flex-col">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#283C50] font-inter text-xl font-bold">
              Employee Location
            </h2>
          </div>

          {/* Empty content area */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-sm">Content will be added here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
