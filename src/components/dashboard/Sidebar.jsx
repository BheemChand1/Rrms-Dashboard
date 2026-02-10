import { useState } from "react";
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
  X,
  ChevronLeft,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import railwayLogo from "@/assets/indian-railway-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  {
    icon: Building2,
    label: "Occupancy",
    path: "#",
    hasSubmenu: true,
    submenu: [
      { label: "View Inventory", path: "/occupancy/inventory" },
      { label: "Report", path: "/occupancy/report" },
    ],
  },
  { icon: BookOpen, label: "In-Out Register", path: "#", hasSubmenu: true },
  { icon: Star, label: "Booking Type", path: "#", hasSubmenu: true },
  { icon: FileText, label: "Requests", path: "#", hasSubmenu: true },
  { icon: Utensils, label: "Meal", path: "#", hasSubmenu: true },
  { icon: Users, label: "Staff", path: "#", hasSubmenu: true },
  { icon: MessageSquare, label: "Feedbacks", path: "#", hasSubmenu: true },
  { icon: AlertCircle, label: "Complaints", path: "#", hasSubmenu: true },
  { icon: BarChart3, label: "Reports", path: "#", hasSubmenu: true },
  { icon: UserCog, label: "Users", path: "#", hasSubmenu: true },
  { icon: ThumbsDown, label: "Low Rating", path: "#" },
];

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation();

  // Auto-expand submenu if current route matches any submenu item
  const getInitialExpandedMenu = () => {
    for (let item of menuItems) {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some(
          (subitem) => subitem.path === location.pathname,
        );
        if (isSubmenuActive) return item.label;
      }
    }
    return null;
  };

  const [expandedMenu, setExpandedMenu] = useState(getInitialExpandedMenu);

  const toggleSubmenu = (label) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const isSubmenuActive = (submenu) => {
    return submenu.some((item) => item.path === location.pathname);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-gradient-to-b from-sidebar to-sidebar/95 transform transition-all duration-300 ease-in-out flex flex-col shadow-2xl ${
          isCollapsed ? "w-16" : "w-56 xl:w-64 2xl:w-72"
        } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Mobile close button */}
        <button
          className="lg:hidden absolute top-4 right-4 text-sidebar-foreground hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Desktop collapse toggle */}
        <button
          className="hidden lg:flex absolute -right-3 top-20 z-50 w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 bg-primary text-white rounded-full items-center justify-center shadow-lg hover:bg-primary/80 transition-colors"
          onClick={onToggleCollapse}
        >
          <ChevronLeft
            className={`h-4 w-4 xl:h-5 xl:w-5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </button>

        <div
          className={`p-4 xl:p-5 2xl:p-6 flex justify-center border-b border-sidebar-border/50 ${isCollapsed ? "px-2" : ""}`}
        >
          <div
            className={`bg-white/10 rounded-2xl backdrop-blur-sm ${isCollapsed ? "p-1.5" : "p-2 xl:p-3"}`}
          >
            <img
              src={railwayLogo}
              alt="Indian Railways Logo"
              className={`object-contain transition-all duration-300 ${isCollapsed ? "w-10 h-10" : "w-16 h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24"}`}
            />
          </div>
        </div>

        {!isCollapsed && (
          <div className="px-4 xl:px-5 2xl:px-6 py-4 xl:py-5 border-b border-sidebar-border/50">
            <h2 className="text-sidebar-foreground text-sm xl:text-base 2xl:text-lg font-semibold tracking-wide">
              Reception Manager
            </h2>
            <p className="text-sidebar-foreground/60 text-xs xl:text-sm mt-0.5">
              All Modules
            </p>
          </div>
        )}

        <nav
          className="flex-1 overflow-y-auto py-2 xl:py-3 px-2 xl:px-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "hsl(var(--sidebar-accent)) transparent",
          }}
        >
          {menuItems.map((item, index) => {
            const isActive =
              item.path !== "#" && location.pathname === item.path;
            const submenuActive = item.submenu && isSubmenuActive(item.submenu);
            const isExpanded = expandedMenu === item.label;

            return (
              <div key={index}>
                {item.hasSubmenu ? (
                  <button
                    onClick={() => {
                      toggleSubmenu(item.label);
                      isOpen && onClose();
                    }}
                    className={`w-full flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-3 xl:px-3.5 py-2 xl:py-2.5 text-sm xl:text-base rounded-xl mb-1 transition-all duration-200 group ${
                      submenuActive || isExpanded
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <div
                      className={`flex items-center ${isCollapsed ? "" : "gap-2.5 xl:gap-3"}`}
                    >
                      <item.icon className="h-4 w-4 xl:h-5 xl:w-5 transition-transform group-hover:scale-110" />
                      {!isCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 xl:h-4 xl:w-4 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    title={isCollapsed ? item.label : undefined}
                    onClick={() => isOpen && onClose()}
                    className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} px-3 xl:px-3.5 py-2 xl:py-2.5 text-sm xl:text-base rounded-xl mb-1 transition-all duration-200 group ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-white"
                    }`}
                  >
                    <div
                      className={`flex items-center ${isCollapsed ? "" : "gap-2.5 xl:gap-3"}`}
                    >
                      <item.icon
                        className={`h-4 w-4 xl:h-5 xl:w-5 ${isActive ? "" : "group-hover:scale-110"} transition-transform`}
                      />
                      {!isCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </div>
                    {!isCollapsed && item.hasSubmenu && (
                      <ChevronRight className="h-3.5 w-3.5 xl:h-4 xl:w-4 opacity-50" />
                    )}
                  </Link>
                )}

                {/* Submenu */}
                {item.submenu && isExpanded && !isCollapsed && (
                  <div className="pl-2 mt-1 space-y-1">
                    {item.submenu.map((subitem, subindex) => {
                      const isSubActive = location.pathname === subitem.path;
                      return (
                        <Link
                          key={subindex}
                          to={subitem.path}
                          onClick={() => isOpen && onClose()}
                          className={`flex items-center px-3 xl:px-3.5 py-2 xl:py-2.5 text-xs xl:text-sm rounded-lg transition-all duration-200 ${
                            isSubActive
                              ? "bg-primary/20 text-primary font-medium"
                              : "text-sidebar-foreground/70 hover:text-white hover:bg-sidebar-accent/50"
                          }`}
                        >
                          <span className="ml-2">{subitem.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom section */}
        {!isCollapsed && (
          <div className="p-3 xl:p-4 border-t border-sidebar-border/50">
            <div className="bg-sidebar-accent/50 rounded-xl p-3 xl:p-4">
              <p className="text-[10px] xl:text-xs text-sidebar-foreground/60 uppercase tracking-wider">
                Version
              </p>
              <p className="text-xs xl:text-sm 2xl:text-base text-sidebar-foreground font-semibold">
                2.0.0 Beta
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
