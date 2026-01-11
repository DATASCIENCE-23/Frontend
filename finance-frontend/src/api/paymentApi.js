import axios from "axios";
const BASE = "http://localhost:8000/payment";

export const getPayments = () => axios.get(BASE);
export const createPayment = (data) => axios.post(BASE, data);
