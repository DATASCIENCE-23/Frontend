import axios from "axios";

const BASE_URL = "http://localhost:8000/api/patients";

// patient table
export const createPatient = (data) =>
  axios.post(BASE_URL, data);

export const getPatients = () =>
  axios.get(BASE_URL);

export const getPatientDetails = (patientId) =>
  axios.get(`${BASE_URL}/${patientId}`);

export const updatePatient = (patientId, data) =>
  axios.put(`${BASE_URL}/${patientId}`, data);
