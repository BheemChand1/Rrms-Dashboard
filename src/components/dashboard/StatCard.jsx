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
    <div className="group bg-card rounded-lg xl:rounded-xl shadow-sm border border-border/50 p-1.5 xl:p-2 2xl:p-3 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
      <div className="flex sm:flex-row flex-col items-center sm:items-center gap-1.5 xl:gap-2 2xl:gap-3">
        {/* Icon Section - Large square like reference */}
        <div
          className={`p-1 sm:p-1.5 xl:p-2 2xl:p-3 rounded-lg xl:rounded-xl ${colorClasses[iconColor]} flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300`}
        >
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7 text-white" />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 w-full">
          {/* Title */}
          <div className="flex justify-center sm:justify-center mb-0.5 xl:mb-1">
            <h3 className="text-[7px] sm:text-[8px] xl:text-[9px] 2xl:text-xs font-semibold text-muted-foreground uppercase tracking-widest text-center">
              {title}
            </h3>
          </div>

          {/* Values Layout */}
          {stats.length === 1 ? (
            <div className="flex justify-center">
              <div className="text-center">
                <span className="text-[6px] sm:text-[7px] xl:text-[9px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-xs sm:text-sm xl:text-base 2xl:text-lg font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex sm:flex-row flex-col items-center sm:items-center sm:justify-between gap-0.5 sm:gap-0">
              <div className="text-center sm:text-left flex-1">
                <span className="text-[6px] sm:text-[7px] xl:text-[9px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[0].label}
                </span>
                <span className="text-xs sm:text-sm xl:text-base 2xl:text-lg font-bold text-card-foreground leading-tight">
                  {stats[0].value}
                </span>
              </div>

              <div className="hidden sm:block w-px h-5 xl:h-6 2xl:h-8 bg-gradient-to-b from-transparent via-border to-transparent mx-1 xl:mx-1.5" />

              <div className="text-center sm:text-right flex-1">
                <span className="text-[6px] sm:text-[7px] xl:text-[9px] 2xl:text-xs text-muted-foreground uppercase tracking-wide block">
                  {stats[1].label}
                </span>
                <span className="text-xs sm:text-sm xl:text-base 2xl:text-lg font-bold text-card-foreground leading-tight">
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
