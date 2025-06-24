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
          "transition-all duration-300 pt-[70px] pb-16",
          // Desktop margins
          isExpanded ? "lg:ml-[280px]" : "lg:ml-[103px]",
          // Mobile/Tablet margins (no sidebar margin, but account for mobile breadcrumb)
          "ml-0 lg:pt-[70px] pt-[135px]", // Reduced padding for desktop and mobile
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
