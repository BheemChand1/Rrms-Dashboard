import DashboardCard from "./DashboardCard.jsx";

const performanceData = [
  { label: "Occupancy", value: 69.47 },
  { label: "Breakfast", value: 18.73 },
  { label: "Meal", value: 92.4 },
  { label: "Feedback", value: 0.07 },
  { label: "Complaint", value: 0 },
];

const AveragePerformance = () => {
  return (
    <DashboardCard title="Avg Performance - Fortnight">
      <table className="w-full">
        <tbody>
          {performanceData.map((item, index) => (
            <tr key={index} className="border-b border-border/50 last:border-0">
              <td className="py-1 text-xs text-card-foreground">{item.label}</td>
              <td className="py-1 text-xs text-right font-semibold text-card-foreground">
                {item.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DashboardCard>
  );
};

export default AveragePerformance;
