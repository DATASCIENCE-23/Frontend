import type { PatientReportResponse } from "../../api/api";
import FinancialSummary from "./FinancialSummary";
import ClinicalRiskSummary from "./ClinicalRiskSummary";
import TreatmentSummary from "./TreatmentSummary";

type Props = {
  reports: PatientReportResponse[];
};

export default function AggregatedAnalytics({ reports }: Props) {
  if (reports.length === 0) return null;

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Aggregated Patient Analytics</h2>

      <FinancialSummary reports={reports} />
      <ClinicalRiskSummary reports={reports} />
      <TreatmentSummary reports={reports} />
    </div>
  );
}
