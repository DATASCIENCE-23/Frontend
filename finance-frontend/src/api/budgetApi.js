import axios from "axios";
const BASE = "http://localhost:8000/budget";

export const getBudgets = () => axios.get(BASE);
export const createBudget = (data) => axios.post(BASE, data);
