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
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/25 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-400 transition-all duration-300 flex flex-col",
          isExpanded ? "w-[280px]" : "w-[103px]",
          // Mobile behavior
          "md:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-2 p-4 border-b border-gray-400 flex-shrink-0">
          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-4 right-4 md:hidden p-1 hover:bg-gray-100 rounded"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center justify-center">
            {isExpanded ? (
              /* Expanded Logo - EasyDo with text */
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb01d55239b62aaccf11995df137c5221e0f0473?placeholderIfAbsent=true"
                alt="EasyDo"
                className="h-[70px] w-[86px] object-contain rounded-sm"
              />
            ) : (
              /* Collapsed Logo - Just the circular icon */
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/eb01d55239b62aaccf11995df137c5221e0f0473?placeholderIfAbsent=true"
                alt="EasyDo"
                className="h-[42px] w-[42px] object-contain rounded-sm"
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
                label={item.label}
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
