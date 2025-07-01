import React from "react";
import { ComponentShowcase } from "../ComponentShowcase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react";

export function FeedbackDemos() {
  const { toast } = useToast();

  return (
    <>
      <ComponentShowcase
        title="Alert"
        description="Alerts provide contextual feedback messages for user actions"
        component={
          <div className="space-y-4 w-full max-w-md">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Info</AlertTitle>
              <AlertDescription>
                This is an informational alert message.
              </AlertDescription>
            </Alert>
            <Alert className="border-green-200 bg-green-50 text-green-900">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>
            <Alert className="border-yellow-200 bg-yellow-50 text-yellow-900">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review your settings before proceeding.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Something went wrong. Please try again.
              </AlertDescription>
            </Alert>
          </div>
        }
        code={`<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>
    This is an informational alert message.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong. Please try again.
  </AlertDescription>
</Alert>`}
        props={[
          {
            name: "variant",
            type: "'default' | 'destructive'",
            default: "default",
            description: "The visual style of the alert",
          },
        ]}
        variants={["default", "destructive"]}
      />

      <ComponentShowcase
        title="Progress"
        description="Progress indicators show the completion status of a task"
        component={
          <div className="space-y-4 w-full max-w-md">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing</span>
                <span>78%</span>
              </div>
              <Progress value={78} />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Complete</span>
                <span>100%</span>
              </div>
              <Progress value={100} />
            </div>
          </div>
        }
        code={`<div className="space-y-2">
  <div className="flex justify-between text-sm">
    <span>Uploading...</span>
    <span>45%</span>
  </div>
  <Progress value={45} />
</div>`}
        props={[
          {
            name: "value",
            type: "number",
            description: "The progress value (0-100)",
          },
          {
            name: "max",
            type: "number",
            default: "100",
            description: "The maximum value",
          },
        ]}
      />

      <ComponentShowcase
        title="Skeleton"
        description="Skeleton loading states while content is being fetched"
        component={
          <div className="space-y-4 w-full max-w-md">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            </div>
          </div>
        }
        code={`<div className="flex items-center space-x-4">
  <Skeleton className="h-12 w-12 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[250px]" />
    <Skeleton className="h-4 w-[200px]" />
  </div>
</div>

<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>`}
      />

      <ComponentShowcase
        title="Toast"
        description="Toast notifications for temporary feedback messages"
        component={
          <div className="space-y-2">
            <Button
              onClick={() => {
                toast({
                  title: "Success!",
                  description: "Your message has been sent.",
                });
              }}
            >
              Show Toast
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                toast({
                  title: "Error!",
                  description: "Something went wrong.",
                  variant: "destructive",
                });
              }}
            >
              Show Error Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                toast({
                  title: "Info",
                  description: "This is an informational message.",
                });
              }}
            >
              Show Info Toast
            </Button>
          </div>
        }
        code={`import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

// Success toast
toast({
  title: "Success!",
  description: "Your message has been sent.",
});

// Error toast
toast({
  title: "Error!",
  description: "Something went wrong.",
  variant: "destructive",
});`}
        props={[
          {
            name: "title",
            type: "string",
            description: "The title of the toast",
          },
          {
            name: "description",
            type: "string",
            description: "The description text",
          },
          {
            name: "variant",
            type: "'default' | 'destructive'",
            default: "default",
            description: "The visual style of the toast",
          },
        ]}
      />
    </>
  );
}
