import { CheckSquare, Check, Users, MessageSquare, Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MultilingualText } from "@/components/MultilingualText";
import { useTranslation } from "@/hooks/useTranslation";

interface CreateMenuProps {
  children: React.ReactNode;
}

export function CreateMenu({ children }: CreateMenuProps) {
  const { t } = useTranslation();

  const menuItems = [
    {
      id: "my-task",
      label: "My Task (To-do)",
      icon: CheckSquare,
      onClick: () => {
        // TODO: Navigate to create task page or open task modal
        console.log("Create My Task clicked");
      },
    },
    {
      id: "delegate-task",
      label: "Delegate Task",
      icon: Check,
      onClick: () => {
        // TODO: Navigate to delegate task page or open delegate modal
        console.log("Delegate Task clicked");
      },
    },
    {
      id: "meet",
      label: "Meet",
      icon: Users,
      onClick: () => {
        // TODO: Navigate to schedule meeting page or open meeting modal
        console.log("Meet clicked");
      },
    },
    {
      id: "chat",
      label: "Chat",
      icon: MessageSquare,
      onClick: () => {
        // TODO: Navigate to chat page or open chat modal
        console.log("Chat clicked");
      },
    },
    {
      id: "notes-reminder",
      label: "Notes & Reminder",
      icon: Bell,
      onClick: () => {
        // TODO: Navigate to notes page or open notes modal
        console.log("Notes & Reminder clicked");
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <DropdownMenuItem
              key={item.id}
              onClick={item.onClick}
              className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-gray-50"
            >
              <IconComponent className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700 font-medium">
                {item.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
