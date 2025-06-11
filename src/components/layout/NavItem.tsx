import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: number;
}

export function NavItem({ icon: Icon, label, href, badge }: NavItemProps) {
  const location = useLocation();
  const { isExpanded, setMobileOpen } = useSidebar();
  const isActive = location.pathname === href;

  const handleClick = () => {
    // Close mobile sidebar when navigating
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  return (
    <Link
      to={href}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-4 px-4 py-3 mx-3 rounded-lg transition-colors relative",
        "hover:bg-gray-100",
        isActive
          ? "bg-primary-100 text-azure-24 border-l-4 border-primary ml-3 pl-3"
          : "text-azure-24",
        !isExpanded && "justify-center px-2",
      )}
    >
      <Icon className="h-[18px] w-[18px] flex-shrink-0" />
      {isExpanded && (
        <span className="text-13 font-semibold leading-tight">{label}</span>
      )}
      {badge && badge > 0 && isExpanded && (
        <div className="ml-auto flex h-4 w-4 items-center justify-center rounded-full bg-warning text-white text-[9px] font-semibold">
          {badge}
        </div>
      )}
    </Link>
  );
}
