import type { PatientReportResponse } from "../api/api";

type Props = {
  report: PatientReportResponse;
};

export default function PatientReport({ report }: Props) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Patient Medical Report</h2>

      {/* Demographics */}
      <section>
        <strong>{report.demographics.name}</strong> <br />
        Contact: {report.demographics.contact}
      </section>

      {/* Clinical History */}
      <section>
        <h3>Clinical History</h3>
        <ul>
          {report.clinical_history.map((v, i) => (
            <li key={i}>
              {new Date(v.date).toLocaleString()} — {v.reason}
            </li>
          ))}
        </ul>
      </section>

      {/* Diagnostics */}
      <section>
        <h3>Diagnostics</h3>
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>Test</th>
              <th>Value</th>
              <th>Reference</th>
              <th>Flag</th>
            </tr>
          </thead>
          <tbody>
            {report.diagnostics.map((d, i) => (
              <tr key={i}>
                <td>{d.test}</td>
                <td>{d.value}</td>
                <td>{d.reference_range}</td>
                <td style={{ color: d.flag === "LOW" ? "red" : "black" }}>
                  {d.flag}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Treatments */}
      <section>
        <h3>Treatments</h3>
        <table border={1} cellPadding={6}>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {report.treatments.map((t, i) => (
              <tr key={i}>
                <td>{t.medicine}</td>
                <td>{t.dosage}</td>
                <td>{t.frequency}</td>
                <td>{t.duration_days} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Financials */}
      <section>
        <h3>Billing Summary</h3>
        <p>Total Billed: ₹ {report.financials.total_billed}</p>
        <p>Total Paid: ₹ {report.financials.total_paid}</p>
        <p>
          Balance Due: ₹ {report.financials.balance_due} (
          {report.financials.status})
        </p>
      </section>
    </div>
  );
}
