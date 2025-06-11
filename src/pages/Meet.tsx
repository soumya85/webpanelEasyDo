import { Video } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Meet() {
  return (
    <PlaceholderPage
      title="Meet"
      description="Start video conferences, schedule meetings, and collaborate with your team in real-time."
      icon={<Video className="h-8 w-8" />}
    />
  );
}
