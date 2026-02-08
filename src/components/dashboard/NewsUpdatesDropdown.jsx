import { useState } from "react";
import { Newspaper, X, Megaphone, Sparkles, Info } from "lucide-react";

const newsUpdates = [
  {
    id: 1,
    type: "update",
    icon: Sparkles,
    iconBg: "bg-stat-purple",
    title: "New Dashboard Features",
    message: "Enhanced analytics and real-time tracking now available for all users.",
    date: "Feb 8, 2026",
    isNew: true,
  },
  {
    id: 2,
    type: "news",
    icon: Megaphone,
    iconBg: "bg-stat-blue",
    title: "System Maintenance",
    message: "Scheduled maintenance on Feb 10, 2026 from 2:00 AM to 4:00 AM IST.",
    date: "Feb 7, 2026",
    isNew: true,
  },
  {
    id: 3,
    type: "update",
    icon: Sparkles,
    iconBg: "bg-stat-green",
    title: "Mobile App Update",
    message: "Version 2.5 released with improved performance and bug fixes.",
    date: "Feb 5, 2026",
    isNew: false,
  },
  {
    id: 4,
    type: "news",
    icon: Info,
    iconBg: "bg-stat-orange",
    title: "Policy Update",
    message: "New booking cancellation policy effective from March 1, 2026.",
    date: "Feb 3, 2026",
    isNew: false,
  },
  {
    id: 5,
    type: "update",
    icon: Sparkles,
    iconBg: "bg-stat-purple",
    title: "Report Module Enhanced",
    message: "Export reports in PDF and Excel formats with custom date ranges.",
    date: "Feb 1, 2026",
    isNew: false,
  },
];

const NewsUpdatesDropdown = ({ isOpen, onClose, onToggle }) => {
  const [activeTab, setActiveTab] = useState("all");
  const newCount = newsUpdates.filter((n) => n.isNew).length;

  const filteredNews = activeTab === "all" 
    ? newsUpdates 
    : newsUpdates.filter((n) => n.type === activeTab);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={onToggle}
        className="hidden sm:flex items-center gap-1.5 text-sm hover:bg-white/10 px-2 py-1 rounded-md transition-colors"
      >
        <Newspaper className="h-4 w-4" />
        <span>Updates</span>
        {newCount > 0 && (
          <span className="bg-stat-yellow text-black text-[10px] px-1.5 py-0.5 rounded-full font-medium">
            {newCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={onClose} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex items-center gap-2">
                <Newspaper className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-card-foreground text-sm">
                  News & Updates
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-muted rounded-md transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {[
                { key: "all", label: "All" },
                { key: "news", label: "News" },
                { key: "update", label: "Updates" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 px-4 py-2 text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-primary border-b-2 border-primary bg-primary/5"
                      : "text-muted-foreground hover:text-card-foreground hover:bg-muted/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* News List */}
            <div className="max-h-80 overflow-y-auto">
              {filteredNews.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <Newspaper className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No updates available</p>
                </div>
              ) : (
                filteredNews.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0 ${
                      item.isNew ? "bg-primary/5" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className={`p-2 rounded-lg ${item.iconBg} flex-shrink-0`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-card-foreground truncate">
                          {item.title}
                        </h4>
                        {item.isNew && (
                          <span className="bg-stat-yellow text-black text-[9px] px-1.5 py-0.5 rounded font-medium flex-shrink-0">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {item.message}
                      </p>
                      <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-muted/30 border-t border-border">
              <button className="w-full text-xs text-primary hover:text-primary/80 font-medium py-1.5 rounded-md hover:bg-primary/10 transition-colors">
                View All News & Updates
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsUpdatesDropdown;
