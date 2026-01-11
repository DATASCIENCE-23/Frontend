import axios from "axios";
const BASE = "http://localhost:8000/bank";

export const getBanks = () => axios.get(BASE);
export const createBank = (data) => axios.post(BASE, data);
