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
} from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  href: string;
  badge?: number;
}

export const navigationItems: NavigationItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    id: "chats",
    label: "Chats",
    icon: MessageSquare,
    href: "/chats",
  },
  {
    id: "todays-schedule",
    label: "Todays Schedule",
    icon: Calendar,
    href: "/todays-schedule",
  },
  {
    id: "employee-dashboard",
    label: "Employee Dashboard",
    icon: Users,
    href: "/employee-dashboard",
  },
  {
    id: "company-dashboard",
    label: "Company Dashboard",
    icon: Building,
    href: "/company-dashboard",
  },
  {
    id: "tasks",
    label: "Tasks",
    icon: CheckSquare,
    href: "/tasks",
  },
  {
    id: "meet",
    label: "Meet",
    icon: Video,
    href: "/meet",
  },
  {
    id: "notes-reminder",
    label: "Notes & Reminder",
    icon: StickyNote,
    href: "/notes-reminder",
  },
  {
    id: "reports",
    label: "Reports",
    icon: FileText,
    href: "/reports",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    id: "help-support",
    label: "Help & Support",
    icon: HelpCircle,
    href: "/help-support",
  },
];
