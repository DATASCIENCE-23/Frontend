type Props = {
  label: string;
  value: string | number;
};

export default function KPIStatCard({ label, value }: Props) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        borderRadius: "8px",
        minWidth: "180px",
      }}
    >
      <div style={{ fontSize: "14px", color: "#555" }}>{label}</div>
      <div style={{ fontSize: "22px", fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
