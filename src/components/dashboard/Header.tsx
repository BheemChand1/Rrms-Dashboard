import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-primary to-accent h-14 flex items-center justify-between px-4 text-primary-foreground shadow-md">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-primary-foreground hover:bg-white/10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
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
        <button className="relative p-2 hover:bg-white/10 rounded-md">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            1
          </span>
        </button>
        <a href="#" className="hidden sm:block text-sm hover:underline px-2 py-1">
          Help
        </a>
        <Button 
          variant="destructive" 
          size="sm"
          className="text-xs font-medium"
        >
          Sign Out
        </Button>
      </nav>
    </header>
  );
};

export default Header;
