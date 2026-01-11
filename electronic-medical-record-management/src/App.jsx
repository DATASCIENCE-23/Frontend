// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MedicalRecordEntry from "./pages/MedicalRecordEntry";
import MedicalRecordDetail from "./pages/MedicalRecordDetail";
import PatientHistory from "./pages/PatientHistory";
import PrescriptionCreate from "./pages/PrescriptionCreate";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doctor/record" element={<MedicalRecordEntry />} />
        <Route path="/medical-record/:id" element={<MedicalRecordDetail />} />
        <Route path="/patient/history" element={<PatientHistory />} />
        <Route path="/doctor/prescription" element={<PrescriptionCreate />} />
        <Route path="/prescription/:id" element={<PrescriptionDetail />} />
        <Route path="/reports/:recordId?" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}
