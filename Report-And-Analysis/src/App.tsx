import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import PatientReportPage from "./pages/PatientReportPage";

type Page = "dashboard" | "patient" | "finance";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#1f2937",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Hospital Analytics</h2>

        <SidebarItem
          label="Dashboard"
          active={activePage === "dashboard"}
          onClick={() => setActivePage("dashboard")}
        />

        <SidebarItem
          label="Patient Reports"
          active={activePage === "patient"}
          onClick={() => setActivePage("patient")}
        />

        <SidebarItem
          label="Financial Intelligence"
          active={activePage === "finance"}
          onClick={() => setActivePage("finance")}
        />
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "patient" && <PatientReportPage />}
        {activePage === "finance" && <FinancePlaceholder />}
      </main>
    </div>
  );
}

function SidebarItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "10px",
        marginBottom: "10px",
        cursor: "pointer",
        borderRadius: "6px",
        background: active ? "#374151" : "transparent",
      }}
    >
      {label}
    </div>
  );
}

function FinancePlaceholder() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Financial Intelligence</h1>
      <p>Module under development.</p>
    </div>
  );
}
