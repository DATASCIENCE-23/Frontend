import { Routes, Route } from "react-router-dom";

import PatientPage from "../pages/PatientPage";
import DoctorPage from "../pages/DoctorPage";
import AdmissionPage from "../pages/AdmissionPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Patient Management */}
      <Route path="/patients" element={<PatientPage />} />

      {/* Doctor + Specialization */}
      <Route path="/doctors" element={<DoctorPage />} />

      {/* Admission */}
      <Route path="/admission" element={<AdmissionPage />} />
    </Routes>
  );
}
