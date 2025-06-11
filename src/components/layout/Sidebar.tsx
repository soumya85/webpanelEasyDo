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
              /* Expanded Logo - Full EasyDo logo with text */
              <img
                src="data:image/png;base64,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"
                alt="EasyDo"
                className="h-[70px] w-[86px] object-contain"
              />
            ) : (
              /* Collapsed Logo - Just the circular icon */
              <img
                src="data:image/png;base64,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"
                alt="EasyDo"
                className="h-[42px] w-[42px] object-contain"
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
