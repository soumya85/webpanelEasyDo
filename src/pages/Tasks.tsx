import { CheckSquare } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Tasks() {
  return (
    <PlaceholderPage
      title="Tasks"
      description="Create, assign, and track tasks to keep your projects organized and on schedule."
      icon={<CheckSquare className="h-8 w-8" />}
    />
  );
}
