import axios from "axios";

const BASE_URL = "http://localhost:8000/api/insurance";

// insurance table
export const addInsurance = (data) =>
  axios.post(BASE_URL, data);

export const getInsuranceByPatient = (patientId) =>
  axios.get(`${BASE_URL}/patient/${patientId}`);
