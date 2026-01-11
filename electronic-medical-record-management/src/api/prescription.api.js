import api from "./axios";

// CREATE
export const createPrescription = (
  doctorId,
  recordId,
  patientId,
  payload
) =>
  api.post("/prescriptions/", payload, {
    params: {
      doctor_id: doctorId,
      record_id: recordId,
      patient_id: patientId,
    },
  });

// READ
export const getPrescriptionById = (id) =>
  api.get(`/prescriptions/${id}`);

export const getPrescriptionsByPatient = (patientId) =>
  api.get(`/prescriptions/patient/${patientId}`);

export const getPrescriptionsByRecord = (recordId) =>
  api.get(`/prescriptions/record/${recordId}`);

// UPDATE
export const updatePrescription = (id, payload) =>
  api.put(`/prescriptions/${id}`, payload);

// CANCEL
export const cancelPrescription = (id) =>
  api.patch(`/prescriptions/${id}/cancel`);

// DELETE
export const deletePrescription = (id) =>
  api.delete(`/prescriptions/${id}`);
