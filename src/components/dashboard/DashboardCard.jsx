import { LayoutGrid, MoreHorizontal } from "lucide-react";

const DashboardCard = ({ title, children, badge, className = "" }) => {
  return (
    <div className={`bg-card rounded-xl xl:rounded-2xl shadow-sm border border-border/50 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      <div className="flex items-center justify-between px-3 xl:px-4 2xl:px-5 py-2 xl:py-3 2xl:py-4 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2 xl:gap-3">
          <div className="p-1 xl:p-1.5 2xl:p-2 rounded bg-primary/10">
            <LayoutGrid className="h-3 w-3 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 text-primary" />
          </div>
          <h3 className="text-xs xl:text-sm 2xl:text-base font-semibold text-card-foreground">{title}</h3>
          {badge && (
            <span className="bg-destructive text-destructive-foreground text-[9px] xl:text-[10px] 2xl:text-xs px-1.5 xl:px-2 py-0.5 xl:py-1 rounded-full font-semibold">
              {badge}
            </span>
          )}
        </div>
        <button className="p-1 xl:p-1.5 2xl:p-2 rounded text-muted-foreground hover:text-card-foreground hover:bg-muted/50 transition-colors">
          <MoreHorizontal className="h-3 w-3 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5" />
        </button>
      </div>
      <div className="p-3 xl:p-4 2xl:p-5">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
