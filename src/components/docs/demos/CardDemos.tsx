import React from "react";
import { ComponentShowcase } from "../ComponentShowcase";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function CardDemos() {
  return (
    <>
      <ComponentShowcase
        title="Basic Card"
        description="A simple card with header, content, and footer"
        component={
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>
                This is a description of what this card contains or represents.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the main content area of the card. You can put any
                content here.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Confirm</Button>
            </CardFooter>
          </Card>
        }
        code={`<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>
      This is a description of what this card contains or represents.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>
      This is the main content area of the card. You can put any
      content here.
    </p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Confirm</Button>
  </CardFooter>
</Card>`}
        props={[
          {
            name: "className",
            type: "string",
            description: "Additional CSS classes",
          },
        ]}
      />

      <ComponentShowcase
        title="Card with Badge"
        description="Card enhanced with status badges and additional information"
        component={
          <Card className="w-[350px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Project Alpha</CardTitle>
                <Badge variant="secondary">In Progress</Badge>
              </div>
              <CardDescription>
                A comprehensive project management solution for modern teams.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[75%]"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        }
        code={`<Card className="w-[350px]">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Project Alpha</CardTitle>
      <Badge variant="secondary">In Progress</Badge>
    </div>
    <CardDescription>
      A comprehensive project management solution for modern teams.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Progress</span>
        <span>75%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2">
        <div className="bg-primary h-2 rounded-full w-[75%]"></div>
      </div>
    </div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">View Details</Button>
  </CardFooter>
</Card>`}
      />

      <ComponentShowcase
        title="Compact Card"
        description="A minimal card design for displaying quick information"
        component={
          <Card className="w-[300px]">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                Total Users
                <span className="text-green-600 ml-2">+12%</span>
              </p>
            </CardContent>
          </Card>
        }
        code={`<Card className="w-[300px]">
  <CardContent className="pt-6">
    <div className="text-2xl font-bold">2,847</div>
    <p className="text-xs text-muted-foreground">
      Total Users
      <span className="text-green-600 ml-2">+12%</span>
    </p>
  </CardContent>
</Card>`}
      />
    </>
  );
}
