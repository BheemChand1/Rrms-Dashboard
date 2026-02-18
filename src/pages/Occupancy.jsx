import { useState } from "react";
import Header from "../components/dashboard/Header.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import RoomInventory from "../components/dashboard/RoomInventory.jsx";

const Occupancy = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Spacer for fixed sidebar */}
      <div
        className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-44 xl:w-52 2xl:w-60"}`}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Spacer for fixed header */}
        <div className="h-12 xl:h-14 2xl:h-16 flex-shrink-0" />

        <main className="flex-1 p-3 lg:p-4 xl:p-6 2xl:p-8 overflow-auto">
          {/* Room Inventory */}
          <RoomInventory />

          {/* Footer */}
          <footer className="mt-8 xl:mt-10 2xl:mt-12 pt-4 xl:pt-6 2xl:pt-8 border-t border-border/50 text-center">
            <p className="text-[10px] xl:text-xs 2xl:text-sm text-muted-foreground">
              © 2026 Reception Manager • Designed by beatleanalytics.com
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Occupancy;
