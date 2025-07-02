import React from "react";
import { ComponentShowcase } from "../ComponentShowcase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, Mail, Lock } from "lucide-react";

export function InputDemos() {
  return (
    <>
      <ComponentShowcase
        title="Basic Input"
        description="Standard text input field for user data collection"
        component={
          <div className="space-y-2 w-[300px]">
            <Label htmlFor="basic-input">Email</Label>
            <Input
              id="basic-input"
              type="email"
              placeholder="Enter your email"
            />
          </div>
        }
        code={`<div className="space-y-2">
  <Label htmlFor="basic-input">Email</Label>
  <Input
    id="basic-input"
    type="email"
    placeholder="Enter your email"
  />
</div>`}
        props={[
          {
            name: "type",
            type: "string",
            default: "text",
            description: "The input type (text, email, password, etc.)",
          },
          {
            name: "placeholder",
            type: "string",
            description: "Placeholder text when input is empty",
          },
          {
            name: "disabled",
            type: "boolean",
            default: "false",
            description: "Whether the input is disabled",
          },
        ]}
      />

      <ComponentShowcase
        title="Input with Icon"
        description="Enhanced input fields with icons for better visual hierarchy"
        component={
          <div className="space-y-4 w-[300px]">
            <div className="space-y-2">
              <Label htmlFor="search-input">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="search-input"
                  placeholder="Search..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-input">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email-input"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        }
        code={`<div className="space-y-2">
  <Label htmlFor="search-input">Search</Label>
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
    <Input
      id="search-input"
      placeholder="Search..."
      className="pl-10"
    />
  </div>
</div>`}
      />

      <ComponentShowcase
        title="Input States"
        description="Different states of input fields including disabled and error states"
        component={
          <div className="space-y-4 w-[300px]">
            <div className="space-y-2">
              <Label htmlFor="normal-input">Normal</Label>
              <Input id="normal-input" placeholder="Normal input" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabled-input">Disabled</Label>
              <Input
                id="disabled-input"
                placeholder="Disabled input"
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="error-input" className="text-destructive">
                Error State
              </Label>
              <Input
                id="error-input"
                placeholder="Error input"
                className="border-destructive focus-visible:ring-destructive"
              />
              <p className="text-sm text-destructive">
                This field is required.
              </p>
            </div>
          </div>
        }
        code={`<div className="space-y-2">
  <Label htmlFor="normal-input">Normal</Label>
  <Input id="normal-input" placeholder="Normal input" />
</div>

<div className="space-y-2">
  <Label htmlFor="disabled-input">Disabled</Label>
  <Input id="disabled-input" placeholder="Disabled input" disabled />
</div>

<div className="space-y-2">
  <Label htmlFor="error-input" className="text-destructive">Error State</Label>
  <Input
    id="error-input"
    placeholder="Error input"
    className="border-destructive focus-visible:ring-destructive"
  />
  <p className="text-sm text-destructive">This field is required.</p>
</div>`}
      />

      <ComponentShowcase
        title="Textarea"
        description="Multi-line text input for longer content"
        component={
          <div className="space-y-2 w-[350px]">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              rows={4}
            />
          </div>
        }
        code={`<div className="space-y-2">
  <Label htmlFor="message">Message</Label>
  <Textarea
    id="message"
    placeholder="Type your message here..."
    rows={4}
  />
</div>`}
      />

      <ComponentShowcase
        title="Input Group"
        description="Grouped input fields with button for form actions"
        component={
          <div className="space-y-2 w-[350px]">
            <Label htmlFor="newsletter">Newsletter Signup</Label>
            <div className="flex w-full">
              <Input
                id="newsletter"
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none"
              />
              <Button type="submit" className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        }
        code={`<div className="space-y-2">
  <Label htmlFor="newsletter">Newsletter Signup</Label>
  <div className="flex w-full">
    <Input
      id="newsletter"
      type="email"
      placeholder="Enter your email"
      className="rounded-r-none"
    />
    <Button type="submit" className="rounded-l-none">
      Subscribe
    </Button>
  </div>
</div>`}
      />
    </>
  );
}
