import api from "./axios";

// CREATE
export const createReport = (payload) =>
  api.post("/create", payload);

// READ
export const getReportById = (reportId) =>
  api.get(`/${reportId}`);

// READ (visit)
export const getReportsByRecord = (recordId) =>
  api.get(`/visit/${recordId}`);
