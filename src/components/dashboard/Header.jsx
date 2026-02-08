import { useState } from "react";
import { Menu } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown.jsx";
import NewsUpdatesDropdown from "./NewsUpdatesDropdown.jsx";

const Header = ({ onMenuClick }) => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);

  const closeAll = () => {
    setNotificationOpen(false);
    setNewsOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-primary to-accent h-14 flex items-center justify-between px-4 text-primary-foreground shadow-md">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-md text-primary-foreground hover:bg-white/10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xs font-bold">✓</span>
          </div>
          <h1 className="text-lg font-semibold tracking-wide">
            DASHBOARD - AJMER
          </h1>
        </div>
      </div>
      
      <nav className="flex items-center gap-1 sm:gap-4">
        <a href="#" className="hidden sm:block text-sm hover:underline px-2 py-1">
          Directory
        </a>
        <a href="#" className="hidden sm:block text-sm hover:underline px-2 py-1">
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
        <a href="#" className="hidden sm:block text-sm hover:underline px-2 py-1">
          Help
        </a>
        <button className="bg-destructive text-destructive-foreground px-3 py-1.5 rounded-md text-xs font-medium hover:bg-destructive/90">
          Sign Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
