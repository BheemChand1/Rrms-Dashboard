import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown.jsx";
import NewsUpdatesDropdown from "./NewsUpdatesDropdown.jsx";

const Header = ({ onMenuClick, sidebarCollapsed }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const closeAll = () => {
    setNotificationOpen(false);
    setNewsOpen(false);
  };

  return (
    <header className={`fixed top-0 right-0 z-40 bg-gradient-to-r from-primary via-primary to-accent h-12 xl:h-14 2xl:h-16 flex items-center justify-between px-4 xl:px-6 2xl:px-8 text-primary-foreground shadow-md transition-all duration-300 ${sidebarCollapsed ? "left-16" : "left-0 lg:left-56 xl:left-64 2xl:left-72"}`}>
      <div className="flex items-center gap-3 xl:gap-4">
        <button
          className="lg:hidden p-2 rounded-lg text-primary-foreground hover:bg-white/15 transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-4 w-4 xl:h-5 xl:w-5" />
        </button>
        <div className="flex items-center gap-2 xl:gap-3">
          <div className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-xs xl:text-sm 2xl:text-base font-bold">✓</span>
          </div>
          <h1 className="text-sm xl:text-base 2xl:text-lg font-bold tracking-wide">
            DASHBOARD - AJMER
          </h1>
        </div>
      </div>
      
      <nav className="flex items-center gap-1 sm:gap-2 xl:gap-3">
        <a href="#" className="hidden sm:flex items-center text-xs xl:text-sm 2xl:text-base hover:bg-white/15 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all">
          Directory
        </a>
        <a href="#" className="hidden sm:flex items-center text-xs xl:text-sm 2xl:text-base hover:bg-white/15 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all">
          IOS Scanner
        </a>
        <NewsUpdatesDropdown
          isOpen={newsOpen}
          onToggle={() => {
            setNewsOpen(!newsOpen);
            setNotificationOpen(false);
          }}
          onClose={() => setNewsOpen(false)}
        />
        <NotificationDropdown
          isOpen={notificationOpen}
          onToggle={() => {
            setNotificationOpen(!notificationOpen);
            setNewsOpen(false);
          }}
          onClose={() => setNotificationOpen(false)}
        />
        <a href="#" className="hidden sm:flex items-center text-xs xl:text-sm 2xl:text-base hover:bg-white/15 px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg transition-all">
          Help
        </a>
        <button className="bg-destructive text-destructive-foreground p-2 xl:p-2.5 sm:px-4 xl:sm:px-5 sm:py-2 xl:sm:py-2.5 rounded-lg text-xs sm:text-sm xl:text-base font-semibold hover:bg-destructive/90 transition-all shadow-sm flex items-center gap-2">
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 xl:h-6 xl:w-6" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
