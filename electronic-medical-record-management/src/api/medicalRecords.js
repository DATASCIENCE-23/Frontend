import api from './config';

export const medicalRecordsAPI = {
  // Create a new medical record
  createRecord: async (doctorId, recordData) => {
    const response = await api.post(`/medical-records/?doctor_id=${doctorId}`, recordData);
    return response.data;
  },

  // Get a specific medical record
  getRecord: async (recordId) => {
    const response = await api.get(`/medical-records/${recordId}`);
    return response.data;
  },

  // Get patient's medical history
  getPatientHistory: async (patientId) => {
    const response = await api.get(`/medical-records/patient/${patientId}`);
    return response.data;
  },

  // Update medical record
  updateRecord: async (recordId, updateData) => {
    const response = await api.put(`/medical-records/${recordId}`, updateData);
    return response.data;
  },

  // Delete medical record
  deleteRecord: async (recordId) => {
    const response = await api.delete(`/medical-records/${recordId}`);
    return response.data;
  },

  // Get all medical records
  getAllRecords: async () => {
    const response = await api.get('/medical-records/');
    return response.data;
  }
};