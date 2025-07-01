import React from "react";
import { ComponentShowcase } from "../ComponentShowcase";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function LayoutDemos() {
  return (
    <>
      <ComponentShowcase
        title="Aspect Ratio"
        description="Maintain consistent aspect ratios for responsive content"
        component={
          <div className="space-y-4 w-full max-w-md">
            <div className="w-full">
              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  16:9 Aspect Ratio
                </div>
              </AspectRatio>
            </div>
            <div className="w-full">
              <AspectRatio ratio={4 / 3} className="bg-muted rounded-lg">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  4:3 Aspect Ratio
                </div>
              </AspectRatio>
            </div>
            <div className="w-full">
              <AspectRatio ratio={1} className="bg-muted rounded-lg">
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  1:1 Aspect Ratio
                </div>
              </AspectRatio>
            </div>
          </div>
        }
        code={`<AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
  <div className="flex items-center justify-center h-full">
    16:9 Aspect Ratio
  </div>
</AspectRatio>

<AspectRatio ratio={4 / 3} className="bg-muted rounded-lg">
  <div className="flex items-center justify-center h-full">
    4:3 Aspect Ratio
  </div>
</AspectRatio>

<AspectRatio ratio={1} className="bg-muted rounded-lg">
  <div className="flex items-center justify-center h-full">
    1:1 Aspect Ratio
  </div>
</AspectRatio>`}
        props={[
          {
            name: "ratio",
            type: "number",
            required: true,
            description: "The desired aspect ratio (width / height)",
          },
        ]}
      />

      <ComponentShowcase
        title="Resizable Panels"
        description="Resizable layout panels with drag handles"
        component={
          <div className="w-full max-w-md h-[300px]">
            <ResizablePanelGroup
              direction="horizontal"
              className="min-h-[200px] max-w-md rounded-lg border"
            >
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-6">
                  <span className="font-semibold">Left Panel</span>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={25}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">Top</span>
                    </div>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center p-6">
                      <span className="font-semibold">Bottom</span>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        }
        code={`<ResizablePanelGroup
  direction="horizontal"
  className="min-h-[200px] max-w-md rounded-lg border"
>
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Left Panel</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Top</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Bottom</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  </ResizablePanel>
</ResizablePanelGroup>`}
        props={[
          {
            name: "direction",
            type: "'horizontal' | 'vertical'",
            required: true,
            description: "The direction of the panel group",
          },
          {
            name: "defaultSize",
            type: "number",
            description: "The default size of the panel as a percentage",
          },
        ]}
      />

      <ComponentShowcase
        title="Scroll Area"
        description="Custom scrollable areas with styled scrollbars"
        component={
          <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
            <div className="space-y-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
              {Array.from({ length: 50 }, (_, i) => (
                <React.Fragment key={i}>
                  <div className="text-sm">
                    Tag {i + 1} - This is a sample tag in the scrollable area
                  </div>
                  {i < 49 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </ScrollArea>
        }
        code={`<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  <div className="space-y-4">
    <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
    {Array.from({ length: 50 }, (_, i) => (
      <React.Fragment key={i}>
        <div className="text-sm">
          Tag {i + 1} - This is a sample tag in the scrollable area
        </div>
        {i < 49 && <Separator />}
      </React.Fragment>
    ))}
  </div>
</ScrollArea>`}
        props={[
          {
            name: "className",
            type: "string",
            description: "CSS classes for styling and sizing the scroll area",
          },
        ]}
      />

      <ComponentShowcase
        title="Container Layout"
        description="Responsive container layouts with proper spacing"
        component={
          <div className="space-y-4 w-full">
            <div className="container max-w-4xl mx-auto p-4 border rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">Container (max-w-4xl)</h3>
              <p className="text-sm text-muted-foreground">
                This is a responsive container with centered content and proper
                padding.
              </p>
            </div>
            <div className="container max-w-2xl mx-auto p-4 border rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">Container (max-w-2xl)</h3>
              <p className="text-sm text-muted-foreground">
                This is a smaller responsive container for focused content.
              </p>
            </div>
            <div className="container max-w-md mx-auto p-4 border rounded-lg bg-muted/30">
              <h3 className="font-semibold mb-2">Container (max-w-md)</h3>
              <p className="text-sm text-muted-foreground">
                This is a compact container for minimal content.
              </p>
            </div>
          </div>
        }
        code={`<div className="container max-w-4xl mx-auto p-4">
  <h3 className="font-semibold mb-2">Container (max-w-4xl)</h3>
  <p className="text-sm text-muted-foreground">
    This is a responsive container with centered content and proper padding.
  </p>
</div>

<div className="container max-w-2xl mx-auto p-4">
  <h3 className="font-semibold mb-2">Container (max-w-2xl)</h3>
  <p className="text-sm text-muted-foreground">
    This is a smaller responsive container for focused content.
  </p>
</div>`}
      />

      <ComponentShowcase
        title="Grid Layout"
        description="Responsive grid layouts for organizing content"
        component={
          <div className="w-full max-w-md">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium">2</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium">1</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium">2</span>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <span className="text-sm font-medium">3</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-muted rounded-lg flex items-center justify-center"
                >
                  <span className="text-xs font-medium">{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        }
        code={`<div className="grid grid-cols-2 gap-4">
  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
    <span className="text-sm font-medium">1</span>
  </div>
  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
    <span className="text-sm font-medium">2</span>
  </div>
</div>

<div className="grid grid-cols-3 gap-2">
  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
    <span className="text-sm font-medium">1</span>
  </div>
  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
    <span className="text-sm font-medium">2</span>
  </div>
  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
    <span className="text-sm font-medium">3</span>
  </div>
</div>`}
      />
    </>
  );
}
