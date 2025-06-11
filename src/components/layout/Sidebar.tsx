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
              <div className="flex flex-col items-center gap-2">
                {/* Circular logo with gradient and checkmark */}
                <div className="relative w-12 h-12">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-green-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-7 h-7 text-green-600 fill-current"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* EasyDo text */}
                <div className="text-lg font-bold tracking-tight">
                  <span className="text-gray-800">Easy</span>
                  <span className="text-red-500">Do</span>
                </div>
              </div>
            ) : (
              /* Collapsed Logo - Just the circular checkmark icon */
              <div className="relative w-10 h-10">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 via-orange-500 to-green-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 text-green-600 fill-current"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                </div>
              </div>
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
