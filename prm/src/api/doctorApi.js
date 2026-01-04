import axios from "axios";

const BASE_URL = "http://localhost:8000/api/doctors";

// doctor table
export const createDoctor = (data) =>
  axios.post(BASE_URL, data);

export const getDoctors = () =>
  axios.get(BASE_URL);
