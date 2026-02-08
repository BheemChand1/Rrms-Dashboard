import { LayoutGrid, MoreHorizontal } from "lucide-react";

const DashboardCard = ({ title, children, badge, className = "" }) => {
  return (
    <div className={`bg-card rounded-xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-primary/10">
            <LayoutGrid className="h-3 w-3 text-primary" />
          </div>
          <h3 className="text-xs font-semibold text-card-foreground">{title}</h3>
          {badge && (
            <span className="bg-destructive text-destructive-foreground text-[9px] px-1.5 py-0.5 rounded-full font-semibold">
              {badge}
            </span>
          )}
        </div>
        <button className="p-1 rounded text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-colors">
          <MoreHorizontal className="h-3 w-3" />
        </button>
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
