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
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: "chats",
    labelKey: "chats",
    icon: MessageSquare,
    href: "/chats",
  },
  {
    id: "todays-schedule",
    labelKey: "todaysSchedule",
    icon: Calendar,
    href: "/todays-schedule",
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
    href: "/company-dashboard",
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
    id: "sample",
    labelKey: "dashboard",
    icon: Zap,
    href: "/sample",
  },
];
