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
    <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-muted/30">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-5 lg:p-8 overflow-auto">
          <div className="flex items-center gap-2 mb-5 text-muted-foreground">
            <span className="text-sm">📋 Daily report for</span>
            <span className="text-sm font-semibold text-foreground">{currentDate}</span>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            <GrossHappinessIndex />
            <LatestComments />
            <AveragePerformance />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <ComplaintStatusChart />
            <OccupancyChart />
            <WeeklyFeedbackChart />
          </div>

          {/* Footer */}
          <footer className="mt-10 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground">
              © 2026 Reception Manager • Designed & Developed by{" "}
              <a href="#" className="text-primary hover:underline font-medium">beatleanalytics.com</a>
            </p>
          </footer>
        </main>
      </div>

      {/* Live Notifications */}
      <LiveNotifications />
    </div>
  );
};

export default Index;
