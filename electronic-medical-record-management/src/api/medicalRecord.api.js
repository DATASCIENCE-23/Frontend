import api from "./axios";

// CREATE
export const createMedicalRecord = (doctorId, payload) =>
  api.post("/medical-records/", payload, {
    params: { doctor_id: doctorId },
  });

// READ (single)
export const getMedicalRecord = (recordId) =>
  api.get(`/medical-records/${recordId}`);

// READ (patient history)
export const getPatientMedicalHistory = (patientId) =>
  api.get(`/medical-records/patient/${patientId}`);

// UPDATE
export const updateMedicalRecord = (recordId, payload) =>
  api.put(`/medical-records/${recordId}`, payload);

// DELETE
export const deleteMedicalRecord = (recordId) =>
  api.delete(`/medical-records/${recordId}`);
