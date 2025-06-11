import { MessageSquare } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Chats() {
  return (
    <PlaceholderPage
      title="Chats"
      description="Connect with your team members through instant messaging and group conversations."
      icon={<MessageSquare className="h-8 w-8" />}
    />
  );
}
