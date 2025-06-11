import { HelpCircle } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function HelpSupport() {
  return (
    <PlaceholderPage
      title="Help & Support"
      description="Get assistance, browse documentation, and contact our support team for help."
      icon={<HelpCircle className="h-8 w-8" />}
    />
  );
}
