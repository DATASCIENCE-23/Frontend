import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export type KPIResponse = {
  total_revenue: number;
  total_patients: number;
  active_admissions: number;
};

export type PatientReportResponse = {
  metadata: {
    generated_at: string;
    patient_id: number;
  };
  demographics: {
    name: string;
    contact: string;
  };
  clinical_history: {
    date: string;
    reason: string;
  }[];
  diagnostics: {
    test: string;
    value: string;
    reference_range: string;
    flag: string;
  }[];
  treatments: {
    medicine: string;
    dosage: string;
    frequency: string;
    duration_days: number;
    dispensed_at: string;
  }[];
  financials: {
    total_billed: number;
    total_paid: number;
    balance_due: number;
    status: string;
  };
};

export async function refreshKPIs() {
  const res = await axios.post(`${API_BASE}/analytics/refresh-kpis`);
  return res.data.data as KPIResponse;
}

export async function fetchPatientReport(patientId: number) {
  const res = await axios.get(
    `${API_BASE}/analytics/patient-report/${patientId}`
  );
  return res.data as PatientReportResponse;
}
