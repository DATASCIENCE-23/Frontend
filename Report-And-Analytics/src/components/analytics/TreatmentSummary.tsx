import type { PatientReportResponse } from "../../api/api";

type Props = {
  reports: PatientReportResponse[];
};

export default function TreatmentSummary({ reports }: Props) {
  const medicineCounts: Record<string, number> = {};

  reports.forEach((report) =>
    report.treatments.forEach((t) => {
      medicineCounts[t.medicine] = (medicineCounts[t.medicine] || 0) + 1;
    })
  );

  return (
    <section>
      <h3>Treatment Summary</h3>
      <ul>
        {Object.entries(medicineCounts).map(([medicine, count]) => (
          <li key={medicine}>
            {medicine} — {count} patient(s)
          </li>
        ))}
      </ul>
    </section>
  );
}
