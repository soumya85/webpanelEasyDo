import { Calendar } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function TodaysSchedule() {
  return (
    <PlaceholderPage
      title="Today's Schedule"
      description="View and manage your daily appointments, meetings, and important events."
      icon={<Calendar className="h-8 w-8" />}
    />
  );
}
