import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { UserProfile } from "./UserProfile";
import { NavItem } from "./NavItem";
import { navigationItems } from "@/lib/navigation";
import { X } from "lucide-react";

export function Sidebar() {
  const { isExpanded, isMobileOpen, setMobileOpen } = useSidebar();

  return (
    <>
      {/* Mobile/Tablet Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-400 transition-all duration-300 flex flex-col",
          isExpanded ? "w-[260px]" : "w-[103px]",
          // Mobile/Tablet behavior
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2 px-4 py-4 border-b border-gray-400 flex-shrink-0 h-[86px] justify-center">
          {/* Mobile/Tablet Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 lg:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-center">
            {isExpanded ? (
              /* Expanded Logo - Full EasyDo logo with text */
              <img
                src="/logo-main.png"
                alt="EasyDo Logo"
                className="h-16 w-auto object-contain"
              />
            ) : (
              /* Collapsed Logo - Just the circular icon */
              <img
                src="/logo-small.png"
                alt="EasyDo Icon"
                className="h-10 w-10 object-contain"
              />
            )}
          </div>
        </div>

        {/* User Profile */}
        <UserProfile isExpanded={isExpanded} />

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                customIconUrl={item.customIconUrl}
                materialIcon={item.materialIcon}
                labelKey={item.labelKey}
                href={item.href}
                badge={item.badge}
              />
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
