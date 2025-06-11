import { FileText } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function Reports() {
  return (
    <PlaceholderPage
      title="Reports"
      description="Generate detailed reports, analyze data trends, and export insights for your organization."
      icon={<FileText className="h-8 w-8" />}
    />
  );
}
