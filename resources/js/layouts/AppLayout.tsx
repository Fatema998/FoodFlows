import { ReactNode } from "react";
import AppSidebar from "./AppSidebar";
import Backdrop from "./Backdrop";
import AppHeader from "./AppHeader";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

type LayoutContentProps = {
  children: ReactNode;
};

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out  dark:bg-gray-950 dark:text-gray-200 ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader />
        <div className="p-1 mx-auto max-w-(--breakpoint-2xl) md:p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
};


const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
    </SidebarProvider>
  );
};


export default AppLayout;