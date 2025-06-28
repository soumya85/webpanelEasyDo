import { Card, CardContent } from "@/components/ui/card";

export default function EmployeeLocationTimelineCard() {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm h-full">
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Employee Location Timeline
          </h2>
        </div>
      </CardContent>
    </Card>
  );
}
