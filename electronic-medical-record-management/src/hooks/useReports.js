import { uploadReport, getReportsByRecord } from "../api/report.api";

export function useReports() {
  return {
    upload: uploadReport,
    getByRecord: getReportsByRecord,
  };
}
