import React from "react";
import { ComponentShowcase } from "../ComponentShowcase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function FormDemos() {
  return (
    <>
      <ComponentShowcase
        title="Checkbox"
        description="Checkboxes for multiple selection options"
        component={
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsletter" defaultChecked />
              <Label htmlFor="newsletter">Subscribe to newsletter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="disabled" disabled />
              <Label htmlFor="disabled">Disabled option</Label>
            </div>
          </div>
        }
        code={`<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>
<div className="flex items-center space-x-2">
  <Checkbox id="newsletter" defaultChecked />
  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
</div>
<div className="flex items-center space-x-2">
  <Checkbox id="disabled" disabled />
  <Label htmlFor="disabled">Disabled option</Label>
</div>`}
        props={[
          {
            name: "checked",
            type: "boolean",
            description: "The checked state of the checkbox",
          },
          {
            name: "defaultChecked",
            type: "boolean",
            description: "The default checked state",
          },
          {
            name: "disabled",
            type: "boolean",
            description: "Whether the checkbox is disabled",
          },
        ]}
      />

      <ComponentShowcase
        title="Radio Group"
        description="Radio buttons for single selection from multiple options"
        component={
          <RadioGroup defaultValue="comfortable" className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        }
        code={`<RadioGroup defaultValue="comfortable" className="space-y-2">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="default" id="r1" />
    <Label htmlFor="r1">Default</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="comfortable" id="r2" />
    <Label htmlFor="r2">Comfortable</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="compact" id="r3" />
    <Label htmlFor="r3">Compact</Label>
  </div>
</RadioGroup>`}
      />

      <ComponentShowcase
        title="Switch"
        description="Toggle switches for binary settings"
        component={
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="airplane-mode" />
              <Label htmlFor="airplane-mode">Airplane Mode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notifications" defaultChecked />
              <Label htmlFor="notifications">Notifications</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="disabled-switch" disabled />
              <Label htmlFor="disabled-switch">Disabled</Label>
            </div>
          </div>
        }
        code={`<div className="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label htmlFor="airplane-mode">Airplane Mode</Label>
</div>
<div className="flex items-center space-x-2">
  <Switch id="notifications" defaultChecked />
  <Label htmlFor="notifications">Notifications</Label>
</div>
<div className="flex items-center space-x-2">
  <Switch id="disabled-switch" disabled />
  <Label htmlFor="disabled-switch">Disabled</Label>
</div>`}
      />

      <ComponentShowcase
        title="Select"
        description="Dropdown select for choosing from a list of options"
        component={
          <div className="w-[250px] space-y-4">
            <div className="space-y-2">
              <Label>Fruit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="grape">Grape</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select defaultValue="system">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        }
        code={`<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
    <SelectItem value="grape">Grape</SelectItem>
  </SelectContent>
</Select>`}
      />

      <ComponentShowcase
        title="Slider"
        description="Range slider for selecting numeric values"
        component={
          <div className="w-[300px] space-y-6">
            <div className="space-y-2">
              <Label>Volume: 50%</Label>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label>Range: 20 - 80</Label>
              <Slider defaultValue={[20, 80]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <Label>Price: $100</Label>
              <Slider
                defaultValue={[100]}
                max={1000}
                min={0}
                step={10}
                className="[&_[role=slider]]:bg-primary"
              />
            </div>
          </div>
        }
        code={`<div className="space-y-2">
  <Label>Volume: 50%</Label>
  <Slider defaultValue={[50]} max={100} step={1} />
</div>
<div className="space-y-2">
  <Label>Range: 20 - 80</Label>
  <Slider defaultValue={[20, 80]} max={100} step={1} />
</div>`}
      />
    </>
  );
}
