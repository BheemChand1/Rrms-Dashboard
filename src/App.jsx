import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Occupancy from "./pages/Occupancy.jsx";
import OccupancyReport from "./pages/OccupancyReport.jsx";
import OccupancySummary from "./pages/OccupancySummary.jsx";
import PeakOccupancyReport from "./pages/PeakOccupancyReport.jsx";
import OccupancyDuration from "./pages/OccupancyDuration.jsx";
import SetWakeupCall from "./pages/SetWakeupCall.jsx";
import WakeupHistory from "./pages/WakeupHistory.jsx";

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
      <Route path="*" element={<Index />} />
    </Routes>
  </BrowserRouter>
);

export default App;
