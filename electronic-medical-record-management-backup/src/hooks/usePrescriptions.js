import {
  createPrescription,
  getPrescriptionById,
} from "../api/prescription.api";

export function usePrescriptions() {
  return {
    create: createPrescription,
    getById: getPrescriptionById,
  };
}
