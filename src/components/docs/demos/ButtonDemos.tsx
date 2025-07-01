import React from "react";
import { ComponentShowcase } from "../ComponentShowcase";
import { Button } from "@/components/ui/button";
import { Download, Plus, Settings, Trash2 } from "lucide-react";

export function ButtonDemos() {
  return (
    <>
      <ComponentShowcase
        title="Button Variants"
        description="Different button styles for various use cases"
        component={
          <>
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </>
        }
        code={`<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`}
        props={[
          {
            name: "variant",
            type: "'default' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'",
            default: "default",
            description: "The visual style of the button",
          },
          {
            name: "size",
            type: "'default' | 'sm' | 'lg' | 'icon'",
            default: "default",
            description: "The size of the button",
          },
          {
            name: "asChild",
            type: "boolean",
            default: "false",
            description: "Render as a child component",
          },
        ]}
        variants={[
          "default",
          "secondary",
          "outline",
          "ghost",
          "link",
          "destructive",
        ]}
      />

      <ComponentShowcase
        title="Button Sizes"
        description="Different button sizes for various contexts"
        component={
          <>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </>
        }
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Settings className="h-4 w-4" />
</Button>`}
        variants={["sm", "default", "lg", "icon"]}
      />

      <ComponentShowcase
        title="Button with Icons"
        description="Buttons enhanced with icons for better user experience"
        component={
          <>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </>
        }
        code={`<Button>
  <Plus className="mr-2 h-4 w-4" />
  Add Item
</Button>
<Button variant="outline">
  <Download className="mr-2 h-4 w-4" />
  Download
</Button>
<Button variant="destructive">
  <Trash2 className="mr-2 h-4 w-4" />
  Delete
</Button>`}
      />

      <ComponentShowcase
        title="Button States"
        description="Different states of buttons including disabled and loading"
        component={
          <>
            <Button disabled>Disabled</Button>
            <Button>
              <Settings className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </>
        }
        code={`<Button disabled>Disabled</Button>
<Button>
  <Settings className="mr-2 h-4 w-4 animate-spin" />
  Loading
</Button>
<Button variant="outline" disabled>
  Disabled Outline
</Button>`}
      />
    </>
  );
}
