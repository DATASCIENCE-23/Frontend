import type { PatientReportResponse } from "../../api/api";

type Props = {
  reports: PatientReportResponse[];
};

export default function ClinicalRiskSummary({ reports }: Props) {
  const abnormalTestCounts: Record<string, number> = {};
  let patientsAtRisk = 0;

  reports.forEach((report) => {
    let hasRisk = false;

    report.diagnostics.forEach((d) => {
      if (d.flag === "LOW" || d.flag === "HIGH") {
        abnormalTestCounts[d.test] = (abnormalTestCounts[d.test] || 0) + 1;
        hasRisk = true;
      }
    });

    if (hasRisk) patientsAtRisk++;
  });

  return (
    <section>
      <h3>Clinical Risk Summary</h3>
      <p>
        Patients with Abnormal Results: {patientsAtRisk} / {reports.length}
      </p>

      <table>
        <thead>
          <tr>
            <th>Test</th>
            <th>Abnormal Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(abnormalTestCounts).map(([test, count]) => (
            <tr key={test}>
              <td>{test}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
