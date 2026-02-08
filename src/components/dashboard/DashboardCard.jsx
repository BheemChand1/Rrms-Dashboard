import { LayoutGrid, MoreHorizontal } from "lucide-react";

const DashboardCard = ({ title, children, badge, className = "" }) => {
  return (
    <div className={`bg-card rounded-2xl shadow-lg shadow-black/5 border border-border/50 overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-gradient-to-r from-muted/30 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <LayoutGrid className="h-4 w-4 text-primary" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
          {badge && (
            <span className="bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground text-[10px] px-2.5 py-1 rounded-full font-semibold shadow-sm">
              {badge}
            </span>
          )}
        </div>
        <button className="p-1.5 rounded-lg text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
