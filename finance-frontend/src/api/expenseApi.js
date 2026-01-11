import axios from "axios";
const BASE = "http://localhost:8000/expenses";

export const getExpenses = () => axios.get(BASE);
export const createExpense = (data) => axios.post(BASE, data);
export const deleteExpense = (id) => axios.delete(`${BASE}/${id}`);
