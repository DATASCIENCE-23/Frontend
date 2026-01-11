import axios from "axios";
const BASE = "http://localhost:8000/tax";

export const getTaxes = () => axios.get(BASE);
export const createTax = (data) => axios.post(BASE, data);
export const deleteTax = (id) => axios.delete(`${BASE}/${id}`);
