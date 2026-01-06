import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MedicinesPage from "./pages/MedicinesPage";
import PrescriptionsPage from "./pages/PrescriptionsPage";
import DispensePage from "./pages/DispensePage";
import AuditPage from "./pages/AuditPage";
import LowStockPage from "./pages/LowStockPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/dispense" element={<DispensePage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/low-stock" element={<LowStockPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
