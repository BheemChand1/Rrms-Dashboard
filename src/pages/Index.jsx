import { useState } from "react";
import { 
  Building2, 
  Package, 
  Mail, 
  Utensils, 
  Eye, 
  Users, 
  MessageSquare, 
  Bell 
} from "lucide-react";
import Header from "../components/dashboard/Header.jsx";
import Sidebar from "../components/dashboard/Sidebar.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import GrossHappinessIndex from "../components/dashboard/GrossHappinessIndex.jsx";
import LatestComments from "../components/dashboard/LatestComments.jsx";
import AveragePerformance from "../components/dashboard/AveragePerformance.jsx";
import ComplaintStatusChart from "../components/dashboard/ComplaintStatusChart.jsx";
import OccupancyChart from "../components/dashboard/OccupancyChart.jsx";
import WeeklyFeedbackChart from "../components/dashboard/WeeklyFeedbackChart.jsx";
import LiveNotifications from "../components/dashboard/LiveNotifications.jsx";

const statCards = [
  {
    icon: Building2,
    iconColor: "blue",
    title: "Occupancy",
    stats: [
      { label: "OCCUPIED", value: 35 },
      { label: "TOTAL", value: 55 },
    ],
  },
  {
    icon: Package,
    iconColor: "yellow",
    title: "Booking Type",
    stats: [
      { label: "COACHING", value: 28 },
      { label: "FREIGHT", value: 5 },
    ],
  },
  {
    icon: Mail,
    iconColor: "orange",
    title: "Pending Requests",
    stats: [
      { label: "BOOKING", value: 1 },
    ],
  },
  {
    icon: Utensils,
    iconColor: "red",
    title: "Meals",
    stats: [
      { label: "ORDERS", value: 52 },
      { label: "SERVED", value: 52 },
    ],
  },
  {
    icon: Eye,
    iconColor: "purple",
    title: "Inspections",
    stats: [
      { label: "TODAY", value: 0 },
      { label: "MONTH", value: 0 },
    ],
  },
  {
    icon: Users,
    iconColor: "darkBlue",
    title: "Staff",
    stats: [
      { label: "RAILWAYS", value: 0 },
      { label: "CONTRACTOR", value: 0 },
    ],
  },
  {
    icon: MessageSquare,
    iconColor: "green",
    title: "Feedbacks",
    stats: [
      { label: "TODAY", value: 0 },
      { label: "MONTH", value: 0 },
    ],
  },
  {
    icon: Bell,
    iconColor: "red",
    title: "Complaints",
    stats: [
      { label: "OPEN", value: 0 },
      { label: "CLOSED", value: 0 },
    ],
  },
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentDate = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-3 lg:p-4 overflow-auto">
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <span className="text-xs">📋 Daily report for</span>
            <span className="text-xs font-semibold text-foreground">{currentDate}</span>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-3 mb-3">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-3 mb-3">
            <GrossHappinessIndex />
            <LatestComments />
            <AveragePerformance />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-3">
            <ComplaintStatusChart />
            <OccupancyChart />
            <WeeklyFeedbackChart />
          </div>

          {/* Footer */}
          <footer className="mt-4 pt-3 border-t border-border/50 text-center">
            <p className="text-[10px] text-muted-foreground">
              © 2026 Reception Manager • Designed by beatleanalytics.com
            </p>
          </footer>
        </main>
      </div>

      <LiveNotifications />
    </div>
  );
};

export default Index;
