import { ReactNode } from "react";
import { LayoutGrid } from "lucide-react";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  badge?: string;
  className?: string;
}

const DashboardCard = ({ title, children, badge, className = "" }: DashboardCardProps) => {
  return (
    <div className={`bg-card rounded-lg shadow-sm border border-border ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium text-card-foreground">{title}</h3>
          {badge && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        <button className="text-muted-foreground hover:text-card-foreground">
          <LayoutGrid className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
