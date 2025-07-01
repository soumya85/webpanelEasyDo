import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ComponentSection } from "@/components/docs/ComponentSection";
import { ComponentShowcase } from "@/components/docs/ComponentShowcase";
import { Search } from "lucide-react";

// Import component demos
import { ButtonDemos } from "@/components/docs/demos/ButtonDemos";
import { CardDemos } from "@/components/docs/demos/CardDemos";
import { InputDemos } from "@/components/docs/demos/InputDemos";
import { BadgeDemos } from "@/components/docs/demos/BadgeDemos";
import { FormDemos } from "@/components/docs/demos/FormDemos";
import { NavigationDemos } from "@/components/docs/demos/NavigationDemos";
import { FeedbackDemos } from "@/components/docs/demos/FeedbackDemos";
import { OverlayDemos } from "@/components/docs/demos/OverlayDemos";
import { DataDisplayDemos } from "@/components/docs/demos/DataDisplayDemos";
import { LayoutDemos } from "@/components/docs/demos/LayoutDemos";

interface ComponentCategory {
  id: string;
  title: string;
  description: string;
  count: number;
  components: React.ComponentType[];
}

const componentCategories: ComponentCategory[] = [
  {
    id: "buttons",
    title: "Buttons & Actions",
    description: "Interactive elements for user actions",
    count: 3,
    components: [ButtonDemos],
  },
  {
    id: "inputs",
    title: "Form Controls",
    description: "Input components for data collection",
    count: 8,
    components: [InputDemos, FormDemos],
  },
  {
    id: "data-display",
    title: "Data Display",
    description: "Components for displaying information",
    count: 12,
    components: [CardDemos, BadgeDemos, DataDisplayDemos],
  },
  {
    id: "navigation",
    title: "Navigation",
    description: "Components for site navigation and routing",
    count: 6,
    components: [NavigationDemos],
  },
  {
    id: "feedback",
    title: "Feedback",
    description: "Components for user feedback and notifications",
    count: 7,
    components: [FeedbackDemos],
  },
  {
    id: "overlays",
    title: "Overlays",
    description: "Modal dialogs, popovers, and overlay components",
    count: 8,
    components: [OverlayDemos],
  },
  {
    id: "layout",
    title: "Layout",
    description: "Structural components for organizing content",
    count: 5,
    components: [LayoutDemos],
  },
];

export default function ComponentLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories = componentCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalComponents = componentCategories.reduce(
    (sum, category) => sum + category.count,
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Component Library
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                A comprehensive collection of reusable UI components built with
                React, TypeScript, and TailwindCSS
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-wrap">
              <Badge variant="secondary" className="px-3 py-1">
                {totalComponents} Components
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                {componentCategories.length} Categories
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                TypeScript
              </Badge>
              <Badge variant="secondary" className="px-3 py-1">
                Accessible
              </Badge>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search components..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            {componentCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.title.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* All Components Overview */}
          <TabsContent value="all" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCategories.map((category) => (
                <Card
                  key={category.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        {category.title}
                      </CardTitle>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Individual Category Content */}
          {componentCategories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="space-y-8"
            >
              <ComponentSection
                title={category.title}
                description={category.description}
              >
                {category.components.map((Component, index) => (
                  <Component key={index} />
                ))}
              </ComponentSection>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
