import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TaskInsightCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const TaskInsightCard: React.FC<TaskInsightCardProps> = ({
  title,
  children,
  className,
}) => {
  return (
    <Card
      className={cn(
        "bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 h-[400px] flex flex-col",
        className,
      )}
    >
      <CardHeader className="pb-4 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex-1 flex flex-col">
        {children}
      </CardContent>
    </Card>
  );
};
