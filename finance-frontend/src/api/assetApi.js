import axios from "axios";
const BASE = "http://localhost:8000/assets";

export const getAssets = () => axios.get(BASE);
export const createAsset = (data) => axios.post(BASE, data);
export const deleteAsset = (id) => axios.delete(`${BASE}/${id}`);
