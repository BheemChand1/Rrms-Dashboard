const colorClasses = {
  blue: "icon-gradient-blue",
  yellow: "icon-gradient-yellow",
  orange: "icon-gradient-orange",
  red: "icon-gradient-red",
  purple: "icon-gradient-purple",
  darkBlue: "icon-gradient-darkBlue",
  green: "icon-gradient-green",
};

const StatCard = ({ icon: Icon, iconColor, title, stats }) => {
  return (
    <div className="group bg-card rounded-xl xl:rounded-2xl shadow-sm border border-border/50 p-3 xl:p-4 2xl:p-5 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-2 xl:gap-3 2xl:gap-4">
        {/* Icon Section */}
        <div className={`p-2 xl:p-3 2xl:p-4 rounded-lg xl:rounded-xl ${colorClasses[iconColor]} flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}>
          <Icon className="h-5 w-5 xl:h-6 xl:w-6 2xl:h-8 2xl:w-8 text-white" />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <div className="flex justify-center mb-1 xl:mb-2">
            <h3 className="text-[9px] xl:text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              {title}
            </h3>
          </div>
          
          {/* Values Layout */}
          {stats.length === 1 ? (
            <div className="flex justify-center">
              <div className="text-center">
                <span className="text-[8px] xl:text-[10px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-lg xl:text-xl 2xl:text-2xl font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-left">
                <span className="text-[8px] xl:text-[10px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-base xl:text-lg 2xl:text-xl font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>
              
              <div className="w-px h-6 xl:h-8 2xl:h-10 bg-gradient-to-b from-transparent via-border to-transparent mx-1 xl:mx-2" />
              
              <div className="text-right">
                <span className="text-[8px] xl:text-[10px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[1].label}
                </span>
                <span className="text-base xl:text-lg 2xl:text-xl font-bold text-card-foreground leading-tight">
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
