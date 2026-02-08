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
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import GrossHappinessIndex from "@/components/dashboard/GrossHappinessIndex";
import LatestComments from "@/components/dashboard/LatestComments";
import AveragePerformance from "@/components/dashboard/AveragePerformance";
import ComplaintStatusChart from "@/components/dashboard/ComplaintStatusChart";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import WeeklyFeedbackChart from "@/components/dashboard/WeeklyFeedbackChart";

const statCards = [
  {
    icon: Building2,
    iconColor: "blue" as const,
    title: "Occupancy",
    stats: [
      { label: "OCCUPIED", value: 35 },
      { label: "TOTAL", value: 55 },
    ],
  },
  {
    icon: Package,
    iconColor: "yellow" as const,
    title: "Booking Type",
    stats: [
      { label: "COACHING", value: 28 },
      { label: "FREIGHT", value: 5 },
    ],
  },
  {
    icon: Mail,
    iconColor: "orange" as const,
    title: "Pending Requests",
    stats: [
      { label: "BOOKING", value: 1 },
    ],
  },
  {
    icon: Utensils,
    iconColor: "red" as const,
    title: "Meals",
    stats: [
      { label: "ORDERS", value: 52 },
      { label: "SERVED", value: 52 },
    ],
  },
  {
    icon: Eye,
    iconColor: "purple" as const,
    title: "Inspections",
    stats: [
      { label: "TODAY", value: 0 },
      { label: "MONTH", value: 0 },
    ],
  },
  {
    icon: Users,
    iconColor: "darkBlue" as const,
    title: "Staff",
    stats: [
      { label: "RAILWAYS", value: 0 },
      { label: "CONTRACTOR", value: 0 },
    ],
  },
  {
    icon: MessageSquare,
    iconColor: "green" as const,
    title: "Feedbacks",
    stats: [
      { label: "TODAY", value: 0 },
      { label: "MONTH", value: 0 },
    ],
  },
  {
    icon: Bell,
    iconColor: "red" as const,
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
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Daily report header */}
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <span className="text-sm">📋 Daily report for</span>
            <span className="text-sm font-medium text-card-foreground">{currentDate}</span>
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          {/* Middle Section - 3 Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <GrossHappinessIndex />
            <LatestComments />
            <AveragePerformance />
          </div>

          {/* Bottom Section - Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <ComplaintStatusChart />
            <OccupancyChart />
            <WeeklyFeedbackChart />
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t border-border text-center text-xs text-muted-foreground">
            Copyright 2016 | All Rights Reserved | Designed & Developed by beatleanalytics.com | Terms
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
