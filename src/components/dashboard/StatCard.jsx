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
    <div className="group bg-card rounded-lg xl:rounded-xl shadow-sm border border-border/50 p-2 xl:p-3 2xl:p-4 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
      <div className="flex sm:flex-row flex-col items-center sm:items-center gap-2 xl:gap-3 2xl:gap-4">
        {/* Icon Section - Large square like reference */}
        <div
          className={`p-1.5 sm:p-2 xl:p-3 2xl:p-4 rounded-lg xl:rounded-xl ${colorClasses[iconColor]} flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 xl:h-7 xl:w-7 2xl:h-9 2xl:w-9 text-white" />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 w-full">
          {/* Title */}
          <div className="flex justify-center sm:justify-center mb-1 xl:mb-2">
            <h3 className="text-[8px] sm:text-[9px] xl:text-xs 2xl:text-sm font-semibold text-muted-foreground uppercase tracking-widest text-center">
              {title}
            </h3>
          </div>

          {/* Values Layout */}
          {stats.length === 1 ? (
            <div className="flex justify-center">
              <div className="text-center">
                <span className="text-[7px] sm:text-[8px] xl:text-[10px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-sm sm:text-lg xl:text-xl 2xl:text-2xl font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex sm:flex-row flex-col items-center sm:items-center sm:justify-between gap-1 sm:gap-0">
              <div className="text-center sm:text-left flex-1">
                <span className="text-[7px] sm:text-[8px] xl:text-[10px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-sm sm:text-base xl:text-lg 2xl:text-xl font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>

              <div className="hidden sm:block w-px h-6 xl:h-8 2xl:h-10 bg-gradient-to-b from-transparent via-border to-transparent mx-1 xl:mx-2" />

              <div className="text-center sm:text-right flex-1">
                <span className="text-[7px] sm:text-[8px] xl:text-[10px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[1].label}
                </span>
                <span className="text-sm sm:text-base xl:text-lg 2xl:text-xl font-bold text-card-foreground leading-tight">
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
