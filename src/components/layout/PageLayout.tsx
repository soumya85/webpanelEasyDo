import { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Footer } from "./Footer";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { isExpanded } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <Header />

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 pt-[86px] pb-16",
          // Desktop margins
          isExpanded ? "md:ml-[280px]" : "md:ml-[103px]",
          // Mobile margins (no sidebar margin, but account for mobile breadcrumb)
          "ml-0 md:pt-[86px] pt-[151px]", // 86px header + 65px mobile breadcrumb
        )}
      >
        <div className="min-h-[calc(100vh-86px-64px)]">
          {" "}
          {/* Account for header and footer */}
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
