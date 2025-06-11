import { StickyNote } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function NotesReminder() {
  return (
    <PlaceholderPage
      title="Notes & Reminder"
      description="Create personal notes, set reminders, and keep track of important information."
      icon={<StickyNote className="h-8 w-8" />}
    />
  );
}
