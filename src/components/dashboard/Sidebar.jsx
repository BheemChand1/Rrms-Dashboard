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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-56 bg-gradient-to-b from-sidebar to-sidebar/95 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button 
          className="lg:hidden absolute top-4 right-4 text-sidebar-foreground hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 flex justify-center border-b border-sidebar-border/50">
          <div className="p-2 bg-white/10 rounded-2xl backdrop-blur-sm">
            <img 
              src={railwayLogo} 
              alt="Indian Railways Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        <div className="px-4 py-4 border-b border-sidebar-border/50">
          <h2 className="text-sidebar-foreground text-sm font-semibold tracking-wide">
            Reception Manager
          </h2>
          <p className="text-sidebar-foreground/60 text-xs mt-0.5">All Modules</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2" style={{ scrollbarWidth: 'thin', scrollbarColor: 'hsl(var(--sidebar-accent)) transparent' }}>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center justify-between px-3 py-2.5 text-sm rounded-xl mb-1 transition-all duration-200 group ${
                item.active 
                  ? "bg-primary text-white shadow-lg shadow-primary/30" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-4 w-4 ${item.active ? '' : 'group-hover:scale-110'} transition-transform`} />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.hasSubmenu && <ChevronRight className="h-4 w-4 opacity-50" />}
            </a>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-sidebar-border/50">
          <div className="bg-sidebar-accent/50 rounded-xl p-3">
            <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-wider">Version</p>
            <p className="text-xs text-sidebar-foreground font-semibold">2.0.0 Beta</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
