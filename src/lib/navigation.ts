import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Users,
  Building,
  CheckSquare,
  Video,
  StickyNote,
  FileText,
  Settings,
  HelpCircle,
  Zap,
  Star,
  Layers,
} from "lucide-react";
import { type TranslationKey } from "@/data/translations";

export interface NavigationItem {
  id: string;
  labelKey: TranslationKey;
  icon?: typeof LayoutDashboard;
  customIconUrl?: string;
  materialIcon?: string;
  href: string;
  badge?: number;
}

export const navigationItems: NavigationItem[] = [
  {
    id: "dashboard",
    labelKey: "dashboard",
    icon: Calendar,
    href: "/dashboard",
  },
  {
    id: "chats",
    labelKey: "chats",
    icon: MessageSquare,
    href: "/chats",
  },
  {
    id: "employee-dashboard",
    labelKey: "employeeDashboard",
    materialIcon: "person_outline",
    href: "/employee-dashboard",
  },
  {
    id: "company-dashboard",
    labelKey: "companyDashboard",
    materialIcon: "maps_home_work",
    href: "/sample-page-3",
  },
  {
    id: "tasks",
    labelKey: "tasks",
    materialIcon: "task_alt",
    href: "/tasks",
  },
  {
    id: "meet",
    labelKey: "meet",
    customIconUrl:
      "https://cdn.builder.io/api/v1/image/assets%2Fd6f93891567641d1bb19c951c166916e%2F51d359c5891a4e05a53ecd2441dc52fd?format=webp&width=800",
    href: "/meet",
  },
  {
    id: "notes-reminder",
    labelKey: "notesReminder",
    icon: StickyNote,
    href: "/notes-reminder",
  },
  {
    id: "reports",
    labelKey: "reports",
    icon: FileText,
    href: "/reports",
  },
  {
    id: "settings",
    labelKey: "settings",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "help-support",
    labelKey: "helpSupport",
    icon: HelpCircle,
    href: "/help-support",
  },
  {
    id: "demo1",
    labelKey: "demo1",
    icon: Zap,
    href: "/demo1",
  },
];
