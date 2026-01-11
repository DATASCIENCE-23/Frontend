import api from './config';

export const prescriptionsAPI = {
  // Create a new prescription
  createPrescription: async (doctorId, recordId, patientId, prescriptionData) => {
    const response = await api.post(
      `/prescriptions/?doctor_id=${doctorId}&record_id=${recordId}&patient_id=${patientId}`,
      prescriptionData
    );
    return response.data;
  },

  // Get a specific prescription
  getPrescription: async (prescriptionId) => {
    const response = await api.get(`/prescriptions/${prescriptionId}`);
    return response.data;
  },

  // Get prescriptions by patient
  getPatientPrescriptions: async (patientId) => {
    const response = await api.get(`/prescriptions/patient/${patientId}`);
    return response.data;
  },

  // Get prescriptions by medical record
  getRecordPrescriptions: async (recordId) => {
    const response = await api.get(`/prescriptions/record/${recordId}`);
    return response.data;
  },

  // Update prescription
  updatePrescription: async (prescriptionId, updateData) => {
    const response = await api.put(`/prescriptions/${prescriptionId}`, updateData);
    return response.data;
  },

  // Cancel prescription
  cancelPrescription: async (prescriptionId) => {
    const response = await api.patch(`/prescriptions/${prescriptionId}/cancel`);
    return response.data;
  },

  // Delete prescription
  deletePrescription: async (prescriptionId) => {
    const response = await api.delete(`/prescriptions/${prescriptionId}`);
    return response.data;
  }
};