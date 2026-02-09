import { useState } from "react";
import { Bell, User, Utensils, Calendar, X, Check } from "lucide-react";

const notifications = [
  {
    id: 1,
    type: "booking",
    icon: Calendar,
    iconBg: "bg-stat-blue",
    title: "New Booking Request",
    message: "Room 204 requested by Rajesh Kumar",
    time: "5 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "meal",
    icon: Utensils,
    iconBg: "bg-stat-orange",
    title: "Meal Request",
    message: "Lunch order from Room 105 - 2 plates",
    time: "15 min ago",
    unread: true,
  },
  {
    id: 3,
    type: "user",
    icon: User,
    iconBg: "bg-stat-purple",
    title: "Guest Check-in",
    message: "Amit Sharma checked into Room 301",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 4,
    type: "booking",
    icon: Calendar,
    iconBg: "bg-stat-green",
    title: "Booking Confirmed",
    message: "Room 412 booking confirmed for tomorrow",
    time: "2 hours ago",
    unread: false,
  },
];

const NotificationDropdown = ({ isOpen, onClose, onToggle }) => {
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter((n) => n.unread).length;

  const markAsRead = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={onToggle}
        className="relative p-2 hover:bg-white/10 rounded-md transition-colors"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={onClose}
          />

          {/* Dropdown */}
          <div className="fixed left-2 right-2 top-14 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-card-foreground text-sm">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-primary hover:text-primary/80 font-medium px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-muted rounded-md transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto">
              {items.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                items.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-0 ${
                      notification.unread ? "bg-primary/5" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    {/* Icon */}
                    <div
                      className={`p-2 rounded-lg ${notification.iconBg} flex-shrink-0`}
                    >
                      <notification.icon className="h-4 w-4 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium text-card-foreground truncate">
                          {notification.title}
                        </h4>
                        {notification.unread && (
                          <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                        {notification.message}
                      </p>
                      <span className="text-[10px] text-muted-foreground/70 mt-1 block">
                        {notification.time}
                      </span>
                    </div>

                    {/* Read indicator */}
                    {!notification.unread && (
                      <Check className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-muted/30 border-t border-border">
              <button className="w-full text-xs text-primary hover:text-primary/80 font-medium py-1.5 rounded-md hover:bg-primary/10 transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
