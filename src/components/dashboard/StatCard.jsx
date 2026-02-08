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
    <div className="group bg-card rounded-2xl shadow-md shadow-black/5 border border-border/50 p-4 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      <div className="flex items-center gap-3">
        {/* Icon Section */}
        <div className={`p-3 rounded-xl ${colorClasses[iconColor]} flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        {/* Content Section */}
        <div className="flex-1 min-w-0">
          {/* Centered Title */}
          <div className="flex justify-center mb-2">
            <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
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
                <span className="text-xl font-bold text-card-foreground leading-tight">
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
                <span className="text-xl font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>
              
              {/* Vertical Divider */}
              <div className="w-px h-8 bg-gradient-to-b from-transparent via-border to-transparent mx-2" />
              
              {/* Right Value */}
              <div className="text-right">
                <span className="text-[9px] text-muted-foreground uppercase tracking-wide block">
                  {stats[1].label}
                </span>
                <span className="text-xl font-bold text-card-foreground leading-tight">
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
