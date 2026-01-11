import api from "../lib/axios";

export const getPayments = () => api.get("/api/payments");
export const createPayment = (data: any) =>
  api.post("/api/payments", data);
