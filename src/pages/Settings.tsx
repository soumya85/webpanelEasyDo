import React, { useState } from "react";
import {
  Building2,
  Eye,
  Users,
  UserPlus,
  Tag,
  Mail,
  Archive,
  Settings as SettingsIcon,
  MapPin,
  Plane,
  MessageCircle,
  Globe,
  Bell,
  Shield,
  Palette,
  Star,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useGlobalTranslation } from "@/hooks/useGlobalTranslation";

interface SettingsItemProps {
  icon: React.ReactNode;
  title: string;
  value?: string;
  hasChevron?: boolean;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onClick?: () => void;
}

function SettingsItem({
  icon,
  title,
  value,
  hasChevron = true,
  hasSwitch = false,
  switchValue = false,
  onSwitchChange,
  onClick,
}: SettingsItemProps) {
  return (
    <div
      className="flex items-center justify-between py-4 px-0 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 flex items-center justify-center text-gray-600">
          {icon}
        </div>
        <span className="text-base font-normal text-black">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span className="text-base font-normal text-gray-600">{value}</span>
        )}
        {hasSwitch && (
          <Switch
            checked={switchValue}
            onCheckedChange={onSwitchChange}
            className="data-[state=checked]:bg-green-500"
          />
        )}
        {hasChevron && !hasSwitch && (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </div>
    </div>
  );
}

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-primary mb-4">{title}</h2>
      <div className="bg-white">
        {React.Children.map(children, (child, index) => (
          <div key={index}>
            {child}
            {index < React.Children.count(children) - 1 && (
              <div className="border-b border-gray-200 ml-9" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Settings() {
  const { t } = useGlobalTranslation();
  const [autoAttendMeeting, setAutoAttendMeeting] = useState(false);
  const [autoPendingMessages, setAutoPendingMessages] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Organization Section */}
        <SettingsSection title="Organization">
          <SettingsItem
            icon={<Building2 className="w-6 h-6" />}
            title="Create Organization"
            onClick={() => console.log("Create Organization clicked")}
          />
          <SettingsItem
            icon={<Eye className="w-6 h-6" />}
            title="View Organization"
            onClick={() => console.log("View Organization clicked")}
          />
        </SettingsSection>

        {/* General Section */}
        <SettingsSection title="General">
          <SettingsItem
            icon={<Users className="w-6 h-6" />}
            title="Contacts"
            onClick={() => console.log("Contacts clicked")}
          />
          <SettingsItem
            icon={<Users className="w-6 h-6" />}
            title="Groups"
            onClick={() => console.log("Groups clicked")}
          />
          <SettingsItem
            icon={<UserPlus className="w-6 h-6" />}
            title="Create New Group"
            onClick={() => console.log("Create New Group clicked")}
          />
          <SettingsItem
            icon={<Tag className="w-6 h-6" />}
            title="Labels"
            onClick={() => console.log("Labels clicked")}
          />
          <SettingsItem
            icon={<Mail className="w-6 h-6" />}
            title="Invite Friends"
            onClick={() => console.log("Invite Friends clicked")}
          />
          <SettingsItem
            icon={<Archive className="w-6 h-6" />}
            title="Archived"
            onClick={() => console.log("Archived clicked")}
          />
        </SettingsSection>

        {/* Content Section */}
        <SettingsSection title="Content">
          <SettingsItem
            icon={<SettingsIcon className="w-6 h-6" />}
            title="Content Settings"
            onClick={() => console.log("Content Settings clicked")}
          />
          <SettingsItem
            icon={<MapPin className="w-6 h-6" />}
            title="Live Geo Tracking"
            onClick={() => console.log("Live Geo Tracking clicked")}
          />
          <SettingsItem
            icon={<Plane className="w-6 h-6" />}
            title="Auto Attend Meeting"
            hasChevron={false}
            hasSwitch={true}
            switchValue={autoAttendMeeting}
            onSwitchChange={setAutoAttendMeeting}
          />
          <SettingsItem
            icon={<MessageCircle className="w-6 h-6" />}
            title="Auto Send Pending Messa..."
            hasChevron={false}
            hasSwitch={true}
            switchValue={autoPendingMessages}
            onSwitchChange={setAutoPendingMessages}
          />
          <SettingsItem
            icon={<Globe className="w-6 h-6" />}
            title="Language"
            value="English"
            onClick={() => console.log("Language clicked")}
          />
          <SettingsItem
            icon={<Globe className="w-6 h-6" />}
            title="Chat Translation"
            value="English"
            onClick={() => console.log("Chat Translation clicked")}
          />
        </SettingsSection>

        {/* Other Section */}
        <SettingsSection title="Other">
          <SettingsItem
            icon={<Bell className="w-6 h-6" />}
            title="Notifications and Sounds"
            onClick={() => console.log("Notifications and Sounds clicked")}
          />
          <SettingsItem
            icon={<Shield className="w-6 h-6" />}
            title="Privacy and Security"
            onClick={() => console.log("Privacy and Security clicked")}
          />
          <SettingsItem
            icon={<Palette className="w-6 h-6" />}
            title="Theme & Appearance"
            onClick={() => console.log("Theme & Appearance clicked")}
          />
        </SettingsSection>

        {/* Bottom Section */}
        <div className="space-y-4">
          <SettingsItem
            icon={<Star className="w-6 h-6" />}
            title="Rate & Review Us"
            onClick={() => console.log("Rate & Review Us clicked")}
          />
          <SettingsItem
            icon={<MessageSquare className="w-6 h-6" />}
            title="Feedback or Report Bug"
            onClick={() => console.log("Feedback or Report Bug clicked")}
          />
          <SettingsItem
            icon={<Globe className="w-6 h-6" />}
            title="App Website"
            onClick={() => console.log("App Website clicked")}
          />
          <SettingsItem
            icon={<SettingsIcon className="w-6 h-6" />}
            title="App Tutorial"
            onClick={() => console.log("App Tutorial clicked")}
          />
        </div>
      </div>
    </div>
  );
}
