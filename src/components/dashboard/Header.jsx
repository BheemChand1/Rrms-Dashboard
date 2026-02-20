import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import styled from "styled-components";
import NotificationDropdown from "./NotificationDropdown.jsx";
import NewsUpdatesDropdown from "./NewsUpdatesDropdown.jsx";

const StyledHeader = styled.header`
  background: linear-gradient(to right, #07a759, #48a9d4) !important;
`;

const Header = ({ onMenuClick, sidebarCollapsed }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const closeAll = () => {
    setNotificationOpen(false);
    setNewsOpen(false);
  };

  return (
    <StyledHeader
      className={`fixed top-0 right-0 z-40 h-9 xl:h-10 2xl:h-11 flex items-center justify-between px-3 xl:px-4 2xl:px-6 text-primary-foreground shadow-md transition-all duration-300 ${sidebarCollapsed ? "left-16" : "left-0 lg:left-44 xl:left-52 2xl:left-60"}`}
    >
      <div className="flex items-center gap-3 xl:gap-4">
        <button
          className="lg:hidden p-0.5 rounded-lg text-primary-foreground hover:bg-white/15 transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-3 w-3 xl:h-3.5 xl:w-3.5" />
        </button>
        <div className="flex items-center gap-2 xl:gap-2">
          <div className="w-4 h-4 xl:w-5 xl:h-5 2xl:w-5 2xl:h-5 rounded-lg bg-white/20 flex items-center justify-center">
            <span className="text-[8px] xl:text-[9px] 2xl:text-[9px] font-bold">
              ✓
            </span>
          </div>
          <h1 className="text-xs xl:text-xs 2xl:text-sm font-bold tracking-wide">
            DASHBOARD - AJMER
          </h1>
        </div>
      </div>

      <nav className="flex items-center gap-0.5 sm:gap-1 xl:gap-2">
        <a
          href="#"
          className="hidden sm:flex items-center text-[10px] xl:text-xs 2xl:text-xs hover:bg-white/15 px-2 xl:px-2 py-1 xl:py-1.5 rounded-lg transition-all"
        >
          Directory
        </a>
        <a
          href="#"
          className="hidden sm:flex items-center text-[10px] xl:text-xs 2xl:text-xs hover:bg-white/15 px-2 xl:px-2 py-1 xl:py-1.5 rounded-lg transition-all"
        >
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
        <a
          href="#"
          className="hidden sm:flex items-center text-[10px] xl:text-xs 2xl:text-xs hover:bg-white/15 px-2 xl:px-2 py-1 xl:py-1.5 rounded-lg transition-all"
        >
          Help
        </a>
        <button className="bg-destructive text-destructive-foreground p-0.5 xl:p-1 sm:px-1.5 xl:sm:px-2 sm:py-0.5 xl:sm:py-1 rounded-lg text-[9px] xl:text-[10px] font-semibold hover:bg-destructive/90 transition-all shadow-sm flex items-center gap-1">
          <LogOut className="h-2.5 w-2.5 sm:h-3 sm:w-3 xl:h-3.5 xl:w-3.5" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </nav>
    </StyledHeader>
  );
};

export default Header;
