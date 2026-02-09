import DashboardCard from "./DashboardCard.jsx";

const GrossHappinessIndex = () => {
  const percentage = 79.5;
  
  return (
    <DashboardCard title="Gross Happiness Index">
      <div className="space-y-2 xl:space-y-3">
        <h4 className="text-sm xl:text-base 2xl:text-lg font-medium text-card-foreground">Ajmer</h4>
        <div className="relative">
          <div className="h-6 xl:h-8 2xl:h-10 bg-muted rounded-lg overflow-hidden">
            <div 
              className="h-full bg-primary rounded-lg flex items-center justify-end pr-2 xl:pr-3 transition-all duration-500"
              style={{ width: `${percentage}%` }}
            >
              <span className="text-primary-foreground font-semibold text-xs xl:text-sm 2xl:text-base">
                {percentage}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};

export default GrossHappinessIndex;
