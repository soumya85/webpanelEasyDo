import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export function Footer() {
  const { isExpanded } = useSidebar();

  return (
    <footer
      className={cn(
        "fixed bottom-0 right-0 z-20 bg-white border-t border-gray-200 px-6 py-4",
        "transition-all duration-300",
        isExpanded ? "left-[280px]" : "left-[103px]",
        "md:left-0",
        isExpanded ? "md:left-[280px]" : "md:left-[103px]",
      )}
    >
      <div className="flex items-center justify-between">
        {/* Copyright */}
        <div className="text-11 font-medium text-azure-47 uppercase">
          Copyright © 2025
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <button className="text-11 font-semibold text-azure-24 uppercase hover:text-primary transition-colors">
            Help
          </button>
          <button className="text-11 font-semibold text-azure-24 uppercase hover:text-primary transition-colors">
            Terms
          </button>
          <button className="text-11 font-semibold text-azure-24 uppercase hover:text-primary transition-colors">
            Privacy
          </button>
        </div>
      </div>
    </footer>
  );
}
