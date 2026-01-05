import { useEffect, useState } from "react";
import { refreshKPIs, fetchPatientReport } from "../api/api";
import type { KPIResponse, PatientReportResponse } from "../api/api";

import KPIStatCard from "../components/KPIStatCard";
import AggregatedAnalytics from "../components/analytics/AggregatedAnalytics";
import AnalyticsCharts from "../components/analytics/AnalyticsCharts";

export default function Dashboard() {
  const [kpis, setKpis] = useState<KPIResponse | null>(null);
  const [reports, setReports] = useState<PatientReportResponse[]>([]);
  const [loadingReports, setLoadingReports] = useState(true);

  // 1️⃣ Load hospital KPIs
  useEffect(() => {
    refreshKPIs().then(setKpis).catch(console.error);
  }, []);

  // 2️⃣ Load patient reports (frontend aggregation dataset)
  useEffect(() => {
    const patientIds = [1, 2, 3, 4, 5]; // temporary frontend dataset

    Promise.all(patientIds.map(fetchPatientReport))
      .then(setReports)
      .catch(console.error)
      .finally(() => setLoadingReports(false));
  }, []);

  if (!kpis) return <p>Loading dashboard…</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hospital Analytics Dashboard</h1>

      {/* ================= KPI SECTION ================= */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <KPIStatCard label="Total Revenue" value={`₹ ${kpis.total_revenue}`} />
        <KPIStatCard label="Total Patients" value={kpis.total_patients} />
        <KPIStatCard
          label="Active Visits (Today)"
          value={kpis.active_admissions}
        />
      </div>

      {/* ================= AGGREGATED ANALYTICS ================= */}
      <div style={{ marginTop: "40px" }}>
        {loadingReports ? (
          <p>Loading aggregated analytics…</p>
        ) : (
          <AggregatedAnalytics reports={reports} />
        )}
      </div>

      {/* ================= CHARTS ================= */}
      {!loadingReports && (
        <div style={{ marginTop: "40px" }}>
          <AnalyticsCharts reports={reports} />
        </div>
      )}
    </div>
  );
}
