import axios from "axios";
const BASE = "http://localhost:8000/invoice";

export const getInvoices = () => axios.get(BASE);
export const createInvoice = (data) => axios.post(BASE, data);
