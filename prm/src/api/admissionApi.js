import axios from "axios";

const BASE_URL = "http://localhost:8000/api/admissions";

// admission table
export const createAdmission = (data) =>
  axios.post(BASE_URL, data);

export const getAdmissionByAppointment = (appointmentId) =>
  axios.get(`${BASE_URL}/appointment/${appointmentId}`);
