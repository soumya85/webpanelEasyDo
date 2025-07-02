import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ComponentSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ComponentSection({
  title,
  description,
  children,
}: ComponentSectionProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
      <div className="space-y-8">{children}</div>
    </div>
  );
}
