import { useState } from "react";
import { fetchPatientReport } from "../api/api";
import type { PatientReportResponse } from "../api/api";
import PatientReport from "../components/PatientReport";

export default function PatientReportPage() {
  const [patientId, setPatientId] = useState("");
  const [report, setReport] = useState<PatientReportResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchPatientReport(Number(patientId));
      setReport(data);
    } catch {
      alert("Patient not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Patient Reports</h1>

      <input
        type="number"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
        Fetch Report
      </button>

      {loading && <p>Loading report…</p>}
      {report && <PatientReport report={report} />}
    </div>
  );
}
