import axios from "axios";
const BASE = "http://localhost:8000/depreciation";

export const getDepreciation = () => axios.get(BASE);
export const createDepreciation = (data) => axios.post(BASE, data);
export const deleteDepreciation = (id) => axios.delete(`${BASE}/${id}`);
