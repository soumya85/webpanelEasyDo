import React from "react";
import { ComponentShowcase } from "../ComponentShowcase";
import { Badge } from "@/components/ui/badge";

export function BadgeDemos() {
  return (
    <>
      <ComponentShowcase
        title="Badge Variants"
        description="Different badge styles for various use cases"
        component={
          <>
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </>
        }
        code={`<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`}
        props={[
          {
            name: "variant",
            type: "'default' | 'secondary' | 'outline' | 'destructive'",
            default: "default",
            description: "The visual style of the badge",
          },
        ]}
        variants={["default", "secondary", "outline", "destructive"]}
      />

      <ComponentShowcase
        title="Status Badges"
        description="Badges commonly used for status indicators"
        component={
          <>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              Active
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
              Pending
            </Badge>
            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
              Inactive
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              In Progress
            </Badge>
          </>
        }
        code={`<Badge className="bg-green-100 text-green-800 hover:bg-green-100">
  Active
</Badge>
<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
  Pending
</Badge>
<Badge className="bg-red-100 text-red-800 hover:bg-red-100">
  Inactive
</Badge>
<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
  In Progress
</Badge>`}
      />

      <ComponentShowcase
        title="Badge with Dot"
        description="Badges with indicator dots for enhanced visual communication"
        component={
          <>
            <Badge variant="secondary" className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Online
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Away
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Offline
            </Badge>
          </>
        }
        code={`<Badge variant="secondary" className="flex items-center gap-1">
  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
  Online
</Badge>
<Badge variant="secondary" className="flex items-center gap-1">
  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
  Away
</Badge>
<Badge variant="secondary" className="flex items-center gap-1">
  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
  Offline
</Badge>`}
      />

      <ComponentShowcase
        title="Badge Sizes"
        description="Different badge sizes for various contexts"
        component={
          <>
            <Badge className="text-xs px-2 py-0.5">Small</Badge>
            <Badge>Default</Badge>
            <Badge className="text-sm px-3 py-1">Large</Badge>
          </>
        }
        code={`<Badge className="text-xs px-2 py-0.5">Small</Badge>
<Badge>Default</Badge>
<Badge className="text-sm px-3 py-1">Large</Badge>`}
      />

      <ComponentShowcase
        title="Notification Badge"
        description="Badges used for notification counts and indicators"
        component={
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </div>
            <div className="relative">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                9
              </Badge>
            </div>
            <div className="relative">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                99+
              </Badge>
            </div>
          </div>
        }
        code={`<div className="relative">
  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
    3
  </Badge>
</div>`}
      />
    </>
  );
}
