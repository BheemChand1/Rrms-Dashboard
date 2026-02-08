import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  iconColor: "blue" | "yellow" | "orange" | "red" | "purple" | "darkBlue" | "green";
  title: string;
  stats: Array<{ label: string; value: number | string }>;
}

const colorClasses = {
  blue: "bg-stat-blue",
  yellow: "bg-stat-yellow",
  orange: "bg-stat-orange",
  red: "bg-stat-red",
  purple: "bg-stat-purple",
  darkBlue: "bg-stat-darkBlue",
  green: "bg-stat-green",
};

const StatCard = ({ icon: Icon, iconColor, title, stats }: StatCardProps) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className={cn("p-3 rounded-lg", colorClasses[iconColor])}>
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
          {title}
        </h3>
        <div className="flex gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <span className="text-xs text-muted-foreground block">{stat.label}</span>
              <span className="text-xl font-bold text-card-foreground">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
