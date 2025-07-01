import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentSection } from "@/components/docs/ComponentSection";
import { ComponentShowcase } from "@/components/docs/ComponentShowcase";
import PerformanceMeter from "@/components/PerformanceMeter";
import AttendanceSummary from "@/components/AttendanceSummary";

export default function ComponentLibrary() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              Component Library
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              A comprehensive collection of reusable UI components built with
              React, TypeScript, and TailwindCSS
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="productivity" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="productivity" className="text-base">
              Productivity Module
            </TabsTrigger>
            <TabsTrigger value="company" className="text-base">
              Company Module
            </TabsTrigger>
          </TabsList>

          {/* Productivity Module Tab */}
          <TabsContent value="productivity" className="space-y-8">
            {/* Add productivity components here */}
          </TabsContent>

          {/* Company Module Tab */}
          <TabsContent value="company" className="space-y-8">
            <ComponentSection
              title="Employee Performance"
              description="Components for tracking and displaying employee performance metrics"
            >
              <ComponentShowcase
                title="Performance Meter"
                description="A comprehensive performance dashboard with gauge visualization and detailed metrics breakdown"
                component={
                  <div className="w-full max-w-md mx-auto">
                    <PerformanceMeter />
                  </div>
                }
                code={`import PerformanceMeter from "@/components/PerformanceMeter";

export function EmployeePerformanceWidget() {
  return (
    <div className="w-full">
      <PerformanceMeter />
    </div>
  );
}`}
                props={[
                  {
                    name: "overallScore",
                    type: "number",
                    default: "25.5",
                    description: "The overall performance score percentage",
                  },
                  {
                    name: "performanceData",
                    type: "Array<{category: string, percentage: number}>",
                    description:
                      "Array of performance categories and their scores",
                  },
                ]}
                variants={["default", "with-modal"]}
              />
            </ComponentSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
