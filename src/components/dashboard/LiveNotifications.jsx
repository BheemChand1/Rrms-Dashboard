import { useState, useEffect } from "react";
import { Calendar, Utensils, X } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    type: "booking",
    title: "Booking Request",
    message: "Room 204 - Rajesh Kumar",
    time: "Just now",
  },
  {
    id: 2,
    type: "meal",
    title: "Meal Request",
    message: "Lunch x2 - Room 105",
    time: "Just now",
  },
  {
    id: 3,
    type: "booking",
    title: "Booking Request",
    message: "Room 312 - Priya Singh",
    time: "Just now",
  },
  {
    id: 4,
    type: "meal",
    title: "Meal Request",
    message: "Dinner x4 - Room 208",
    time: "Just now",
  },
];

const LiveNotifications = () => {
  const [toasts, setToasts] = useState([]);
  const [notificationIndex, setNotificationIndex] = useState(0);

  // Simulate live notifications every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const notification = {
        ...mockNotifications[notificationIndex % mockNotifications.length],
        uniqueId: Date.now(),
      };
      
      setToasts((prev) => [...prev.slice(-2), notification]); // Keep max 3 toasts
      setNotificationIndex((prev) => prev + 1);
    }, 8000);

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(() => {
      const notification = {
        ...mockNotifications[0],
        uniqueId: Date.now(),
      };
      setToasts([notification]);
      setNotificationIndex(1);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, [notificationIndex]);

  // Auto-dismiss toasts after 5 seconds
  useEffect(() => {
    if (toasts.length === 0) return;

    const timeout = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [toasts]);

  const dismissToast = (uniqueId) => {
    setToasts((prev) => prev.filter((t) => t.uniqueId !== uniqueId));
  };

  const getIcon = (type) => {
    return type === "booking" ? Calendar : Utensils;
  };

  const getIconBg = (type) => {
    return type === "booking" ? "bg-stat-blue" : "bg-stat-orange";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => {
        const Icon = getIcon(toast.type);
        return (
          <div
            key={toast.uniqueId}
            className="pointer-events-auto bg-card rounded-lg shadow-lg border border-border p-3 w-72 animate-in slide-in-from-right-full fade-in duration-300"
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div className={`p-2 rounded-lg ${getIconBg(toast.type)} flex-shrink-0`}>
                <Icon className="h-4 w-4 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-semibold text-card-foreground">
                    {toast.title}
                  </h4>
                  <button
                    onClick={() => dismissToast(toast.uniqueId)}
                    className="p-0.5 hover:bg-muted rounded transition-colors"
                  >
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {toast.message}
                </p>
                <span className="text-[10px] text-primary font-medium mt-1 block">
                  {toast.time}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-2 h-0.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary animate-shrink-width"
                style={{ animationDuration: '5s' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveNotifications;
