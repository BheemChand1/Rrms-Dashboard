import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Occupancy from "./pages/Occupancy.jsx";
import OccupancyReport from "./pages/OccupancyReport.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/occupancy/inventory" element={<Occupancy />} />
      <Route path="/occupancy/report" element={<OccupancyReport />} />
      <Route path="*" element={<Index />} />
    </Routes>
  </BrowserRouter>
);

export default App;
