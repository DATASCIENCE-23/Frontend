import api from './config';

export const reportsAPI = {
  // Create a new report
  createReport: async (reportData) => {
    const response = await api.post('/reports/create', reportData);
    return response.data;
  },

  // Get a specific report
  getReport: async (reportId) => {
    const response = await api.get(`/reports/${reportId}`);
    return response.data;
  },

  // Get reports for a specific visit/medical record
  getReportsForVisit: async (recordId) => {
    const response = await api.get(`/reports/visit/${recordId}`);
    return response.data;
  }
};