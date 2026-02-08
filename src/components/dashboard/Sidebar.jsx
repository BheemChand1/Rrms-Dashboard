import { 
  LayoutDashboard, 
  Building2, 
  BookOpen, 
  Star, 
  FileText, 
  Utensils, 
  Users, 
  MessageSquare, 
  AlertCircle, 
  BarChart3, 
  UserCog,
  ThumbsDown,
  ChevronRight,
  X
} from "lucide-react";
import railwayLogo from "@/assets/indian-railway-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Building2, label: "Occupancy", hasSubmenu: true },
  { icon: BookOpen, label: "In-Out Register", hasSubmenu: true },
  { icon: Star, label: "Booking Type", hasSubmenu: true },
  { icon: FileText, label: "Requests", hasSubmenu: true },
  { icon: Utensils, label: "Meal", hasSubmenu: true },
  { icon: Users, label: "Staff", hasSubmenu: true },
  { icon: MessageSquare, label: "Feedbacks", hasSubmenu: true },
  { icon: AlertCircle, label: "Complaints", hasSubmenu: true },
  { icon: BarChart3, label: "Reports", hasSubmenu: true },
  { icon: UserCog, label: "Users", hasSubmenu: true },
  { icon: ThumbsDown, label: "Low Rating" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button 
          className="lg:hidden absolute top-4 right-4 text-sidebar-foreground hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-2 border-b border-sidebar-border">
          <img 
            src={railwayLogo} 
            alt="Indian Railways Logo" 
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="px-4 py-3 border-b border-sidebar-border">
          <h2 className="text-sidebar-foreground text-sm font-medium">
            Reception Manager - All
          </h2>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                item.active 
                  ? "bg-sidebar-accent text-white" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </div>
              {item.hasSubmenu && <ChevronRight className="h-4 w-4" />}
            </a>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
