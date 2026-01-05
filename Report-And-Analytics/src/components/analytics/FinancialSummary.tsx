import type { PatientReportResponse } from "../../api/api";

type Props = {
  reports: PatientReportResponse[];
};

export default function FinancialSummary({ reports }: Props) {
  const totalOutstanding = reports.reduce(
    (sum, r) => sum + r.financials.balance_due,
    0
  );

  const patientsWithDues = reports.filter(
    (r) => r.financials.balance_due > 0
  ).length;

  const averageBill =
    reports.reduce((sum, r) => sum + r.financials.total_billed, 0) /
    reports.length;

  return (
    <section>
      <h3>Financial Summary</h3>
      <ul>
        <li>Total Outstanding: ₹ {totalOutstanding.toFixed(2)}</li>
        <li>
          Patients with Dues: {patientsWithDues} / {reports.length}
        </li>
        <li>Average Bill Value: ₹ {averageBill.toFixed(2)}</li>
      </ul>
    </section>
  );
}
