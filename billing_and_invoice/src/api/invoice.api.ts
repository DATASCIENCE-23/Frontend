import api from "../lib/axios";

export const getInvoices = () => api.get("/invoice");
export const getInvoiceById = (id: string) => api.get(`/invoice/${id}`);
export const createInvoice = (data: any) => api.post("/invoice", data);
export const downloadInvoicePDF = (id: string) =>
  api.get(`/invoice/${id}/pdf`, { responseType: "blob" });
