import { createMedicalRecord, getPatientRecords } from "../api/medicalRecord.api";

export function useMedicalRecords() {
  const create = (data) => createMedicalRecord(data);
  const getByPatient = (patientId) => getPatientRecords(patientId);

  return { create, getByPatient };
}
