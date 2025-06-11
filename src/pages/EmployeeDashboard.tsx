import { Users } from "lucide-react";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function EmployeeDashboard() {
  return (
    <PlaceholderPage
      title="Employee Dashboard"
      description="Monitor employee performance, attendance, and manage team resources effectively."
      icon={<Users className="h-8 w-8" />}
    />
  );
}
