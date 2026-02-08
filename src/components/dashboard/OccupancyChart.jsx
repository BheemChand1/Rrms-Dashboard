import DashboardCard from "./DashboardCard.jsx";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Coaching", value: 50 },
  { name: "Freight", value: 25 },
];

const OccupancyChart = () => {
  return (
    <DashboardCard title="Occupancy Chart">
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              type="number" 
              domain={[0, 60]}
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              width={50}
            />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--stat-orange))" 
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default OccupancyChart;
