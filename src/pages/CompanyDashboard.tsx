import { Building } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function CompanyDashboard() {
  return (
    <PlaceholderPage
      title="Company Dashboard"
      description="Get insights into company-wide metrics, performance indicators, and business analytics."
      icon={<Building className="h-8 w-8" />}
    />
  );
}
