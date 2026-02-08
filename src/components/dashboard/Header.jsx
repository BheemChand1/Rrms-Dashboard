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
    <header className="bg-gradient-to-r from-primary via-primary to-accent h-16 flex items-center justify-between px-6 text-primary-foreground shadow-lg shadow-primary/20">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2.5 rounded-xl text-primary-foreground hover:bg-white/15 transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner">
            <span className="text-sm font-bold">✓</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">
              DASHBOARD
            </h1>
            <p className="text-[10px] text-white/70 -mt-0.5">AJMER DIVISION</p>
          </div>
        </div>
      </div>
      
      <nav className="flex items-center gap-2 sm:gap-3">
        <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm hover:bg-white/15 px-3 py-2 rounded-xl transition-all duration-200">
          Directory
        </a>
        <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm hover:bg-white/15 px-3 py-2 rounded-xl transition-all duration-200">
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
        <a href="#" className="hidden sm:flex items-center gap-1.5 text-sm hover:bg-white/15 px-3 py-2 rounded-xl transition-all duration-200">
          Help
        </a>
        <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/30 transition-all duration-200 shadow-lg">
          Sign Out
        </button>
      </nav>
    </header>
  );
};

export default Header;
