const colorClasses = {
  blue: "bg-stat-blue",
  yellow: "bg-stat-yellow",
  orange: "bg-stat-orange",
  red: "bg-stat-red",
  purple: "bg-stat-purple",
  darkBlue: "bg-stat-darkBlue",
  green: "bg-stat-green",
};

const StatCard = ({ icon: Icon, iconColor, title, stats }) => {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        {/* Icon Section */}
        <div className={`p-2.5 rounded-lg ${colorClasses[iconColor]} flex-shrink-0`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Centered Title */}
          <div className="flex justify-center mb-2">
            <h3 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </h3>
          </div>
          
          {/* Values Layout */}
          {stats.length === 1 ? (
            <div className="flex justify-center">
              <div className="text-center">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-lg font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              {/* Left Value */}
              <div className="text-left">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-lg font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>
              
              {/* Vertical Divider */}
              <div className="w-px h-6 bg-border mx-2" />
              
              {/* Right Value */}
              <div className="text-right">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wide block">
                  {stats[1].label}
                </span>
                <span className="text-lg font-bold text-card-foreground leading-tight">
                  {stats[1].value}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
