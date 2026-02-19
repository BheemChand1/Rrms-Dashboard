import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Occupancy from "./pages/Occupancy.jsx";
import OccupancyReport from "./pages/OccupancyReport.jsx";
import OccupancySummary from "./pages/OccupancySummary.jsx";
import PeakOccupancyReport from "./pages/PeakOccupancyReport.jsx";
import OccupancyDuration from "./pages/OccupancyDuration.jsx";
import SetWakeupCall from "./pages/SetWakeupCall.jsx";
import WakeupHistory from "./pages/WakeupHistory.jsx";
import SetInOut from "./pages/SetInOut.jsx";
import InOutReport from "./pages/InOutReport.jsx";
import CoachingBookings from "./pages/CoachingBookings.jsx";
import FreightBookings from "./pages/FreightBookings.jsx";
import MealReport from "./pages/MealReport.jsx";
import AddMealMenu from "./pages/AddMealMenu.jsx";
import Staff from "./pages/Staff.jsx";
import FeedbackReport from "./pages/FeedbackReport.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/occupancy/inventory" element={<Occupancy />} />
      <Route path="/occupancy/report" element={<OccupancyReport />} />
      <Route path="/occupancy/summary" element={<OccupancySummary />} />
      <Route path="/occupancy/peak-hours" element={<PeakOccupancyReport />} />
      <Route path="/occupancy/duration" element={<OccupancyDuration />} />
      <Route path="/occupancy/wakeup-call" element={<SetWakeupCall />} />
      <Route path="/occupancy/wakeup-history" element={<WakeupHistory />} />
      <Route path="/booking-type/coaching" element={<CoachingBookings />} />
      <Route path="/booking-type/freight" element={<FreightBookings />} />
      <Route path="/meal/report" element={<MealReport />} />
      <Route path="/meal/add-menu" element={<AddMealMenu />} />
      <Route path="/staff/:staffType" element={<Staff />} />
      <Route path="/feedback/report" element={<FeedbackReport />} />
      <Route path="/in-out/set-in-out" element={<SetInOut />} />
      <Route path="/in-out/report" element={<InOutReport />} />
      <Route path="*" element={<Index />} />
    </Routes>
  </BrowserRouter>
);

export default App;
