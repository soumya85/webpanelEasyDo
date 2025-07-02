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
  icon: typeof LayoutDashboard;
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
    icon: Users,
    href: "/employee-dashboard",
  },
  {
    id: "company-dashboard",
    labelKey: "companyDashboard",
    icon: Building,
    href: "/sample-page-3",
  },
  {
    id: "tasks",
    labelKey: "tasks",
    icon: CheckSquare,
    href: "/tasks",
  },
  {
    id: "meet",
    labelKey: "meet",
    icon: Video,
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
    id: "component-library",
    labelKey: "componentLibrary",
    icon: Layers,
    href: "/component-library",
  },
];
