import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentSection } from "@/components/docs/ComponentSection";
import { ButtonDemos } from "@/components/docs/demos/ButtonDemos";
import { InputDemos } from "@/components/docs/demos/InputDemos";
import { FormDemos } from "@/components/docs/demos/FormDemos";
import { FeedbackDemos } from "@/components/docs/demos/FeedbackDemos";
import { NavigationDemos } from "@/components/docs/demos/NavigationDemos";
import { LayoutDemos } from "@/components/docs/demos/LayoutDemos";
import { CardDemos } from "@/components/docs/demos/CardDemos";
import { DataDisplayDemos } from "@/components/docs/demos/DataDisplayDemos";
import { OverlayDemos } from "@/components/docs/demos/OverlayDemos";
import { BadgeDemos } from "@/components/docs/demos/BadgeDemos";

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
          <TabsContent value="productivity" className="space-y-12">
            <ComponentSection
              title="Form Components"
              description="Interactive components for user input and forms"
            >
              <ButtonDemos />
              <InputDemos />
              <FormDemos />
            </ComponentSection>

            <ComponentSection
              title="Feedback & Status"
              description="Components for user feedback and status indication"
            >
              <FeedbackDemos />
              <BadgeDemos />
            </ComponentSection>

            <ComponentSection
              title="Navigation & Layout"
              description="Components for navigation and page structure"
            >
              <NavigationDemos />
              <LayoutDemos />
            </ComponentSection>
          </TabsContent>

          {/* Company Module Tab */}
          <TabsContent value="company" className="space-y-12">
            <ComponentSection
              title="Data Display"
              description="Components for displaying and organizing company data"
            >
              <DataDisplayDemos />
              <CardDemos />
            </ComponentSection>

            <ComponentSection
              title="Overlays & Modals"
              description="Components for overlays and modal interactions"
            >
              <OverlayDemos />
            </ComponentSection>

            <ComponentSection
              title="Company Analytics"
              description="Specialized components for company metrics and analytics"
            >
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">
                  Company-specific components coming soon...
                </p>
                <p className="text-sm mt-2">
                  This section will include dashboard widgets, analytics charts,
                  and company-specific UI components.
                </p>
              </div>
            </ComponentSection>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
