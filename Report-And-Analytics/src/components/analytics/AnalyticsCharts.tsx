import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import type { PatientReportResponse } from "../../api/api";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

type Props = {
  reports: PatientReportResponse[];
};

export default function AnalyticsCharts({ reports }: Props) {
  /* -------------------- Financial Status -------------------- */
  const paidCount = reports.filter(
    (r) => r.financials.status === "Paid"
  ).length;

  const pendingCount = reports.filter(
    (r) => r.financials.status === "Pending"
  ).length;

  const financialChartData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [paidCount, pendingCount],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  /* -------------------- Medicine Frequency -------------------- */
  const medicineMap: Record<string, number> = {};

  reports.forEach((r) => {
    r.treatments.forEach((t) => {
      medicineMap[t.medicine] = (medicineMap[t.medicine] || 0) + 1;
    });
  });

  const medicineChartData = {
    labels: Object.keys(medicineMap),
    datasets: [
      {
        label: "Prescriptions",
        data: Object.values(medicineMap),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        marginTop: "30px",
      }}
    >
      <div>
        <h3>Payment Status Distribution</h3>
        <Pie data={financialChartData} />
      </div>

      <div>
        <h3>Top Prescribed Medicines</h3>
        <Bar data={medicineChartData} />
      </div>
    </div>
  );
}
