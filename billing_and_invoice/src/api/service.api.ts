import api from "../lib/axios";
export const getServices = () => api.get("/services");
