import axios from "axios";
const BASE = "http://localhost:8000/accounts";

export const getAccounts = () => axios.get(BASE);
export const createAccount = (data) => axios.post(BASE, data);
