import DashboardCard from "./DashboardCard.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Sun", value: 2 },
  { day: "Mon", value: 5 },
  { day: "Tue", value: 3 },
  { day: "Wed", value: 4 },
  { day: "Thu", value: 6 },
  { day: "Fri", value: 2 },
  { day: "Sat", value: 1 },
];

const ComplaintStatusChart = () => {
  return (
    <DashboardCard title="Complaint Status">
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              width={25}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--stat-red))"
              radius={[4, 4, 0, 0]}
              barSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default ComplaintStatusChart;
