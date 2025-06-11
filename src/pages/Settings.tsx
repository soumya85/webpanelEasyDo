import { Settings as SettingsIcon } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Settings() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Configure your account preferences, notifications, and system settings."
      icon={<SettingsIcon className="h-8 w-8" />}
    />
  );
}
