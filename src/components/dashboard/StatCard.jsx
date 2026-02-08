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
    <div className="bg-card rounded-xl shadow-sm border border-border p-5 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4 md:gap-5">
        {/* Icon Section */}
        <div className={`p-3 rounded-lg ${colorClasses[iconColor]} flex-shrink-0`}>
          <Icon className="h-7 w-7 text-white" />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Centered Title */}
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-center mb-4">
            {title}
          </h3>
          
          {/* Values Layout */}
          {stats.length === 1 ? (
            // Single stat - centered
            <div className="text-center">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wide block mb-1">
                {stats[0].label}
              </span>
              <span className="text-2xl font-bold text-card-foreground">
                {stats[0].value}
              </span>
            </div>
          ) : (
            // Multiple stats - flex layout with divider
            <div className="flex items-center justify-center gap-4 md:gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                  {/* Stat Block */}
                  <div className={`${index === 0 ? 'text-left' : 'text-right'}`}>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide block mb-1">
                      {stat.label}
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-card-foreground">
                      {stat.value}
                    </span>
                  </div>
                  
                  {/* Vertical Divider - only between items */}
                  {index < stats.length - 1 && (
                    <div className="hidden sm:block w-px h-8 bg-border mx-4 md:mx-6" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
