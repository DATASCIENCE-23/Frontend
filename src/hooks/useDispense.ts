import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dispenseApi, prescriptionsApi } from '@/services/api';
import type { CreateDispenseData, Prescription, DispenseStatus } from '@/types/pharmacy';
import { medicineKeys } from './useMedicines';

// Query Keys
export const dispenseKeys = {
  all: ['dispense'] as const,
  lists: () => [...dispenseKeys.all, 'list'] as const,
  details: () => [...dispenseKeys.all, 'detail'] as const,
  detail: (id: number) => [...dispenseKeys.details(), id] as const,
  forPrescription: (prescriptionId: number) => [...dispenseKeys.all, 'prescription', prescriptionId] as const,
  unbilled: () => [...dispenseKeys.all, 'unbilled'] as const,
  billingInfo: (id: number) => [...dispenseKeys.all, 'billing', id] as const,
  items: (id: number) => [...dispenseKeys.all, 'items', id] as const,
};

export const prescriptionKeys = {
  all: ['prescriptions'] as const,
  lists: () => [...prescriptionKeys.all, 'list'] as const,
  list: (status?: string) => [...prescriptionKeys.lists(), status] as const,
  details: () => [...prescriptionKeys.all, 'detail'] as const,
  detail: (id: number) => [...prescriptionKeys.details(), id] as const,
};

// =============================================
// PRESCRIPTIONS
// =============================================
export function usePrescriptions(status?: string) {
  return useQuery({
    queryKey: prescriptionKeys.list(status),
    queryFn: () => prescriptionsApi.list(status),
  });
}

export function usePrescription(prescriptionId: number) {
  return useQuery({
    queryKey: prescriptionKeys.detail(prescriptionId),
    queryFn: () => prescriptionsApi.getById(prescriptionId),
    enabled: !!prescriptionId,
  });
}

// =============================================
// DISPENSE
// =============================================
export function useDispense(dispenseId: number) {
  return useQuery({
    queryKey: dispenseKeys.detail(dispenseId),
    queryFn: () => dispenseApi.getById(dispenseId),
    enabled: !!dispenseId,
  });
}

export function useDispenses() {
  return useQuery({
    queryKey: dispenseKeys.lists(),
    queryFn: () => dispenseApi.getUnbilled(), // Use unbilled as default list, adjust if you have a list all endpoint
  });
}

export function useDispensesForPrescription(prescriptionId: number) {
  return useQuery({
    queryKey: dispenseKeys.forPrescription(prescriptionId),
    queryFn: () => dispenseApi.listForPrescription(prescriptionId),
    enabled: !!prescriptionId,
  });
}

export function useUnbilledDispenses() {
  return useQuery({
    queryKey: dispenseKeys.unbilled(),
    queryFn: () => dispenseApi.getUnbilled(),
  });
}

export function useDispenseBillingInfo(dispenseId: number) {
  return useQuery({
    queryKey: dispenseKeys.billingInfo(dispenseId),
    queryFn: () => dispenseApi.getBillingInfo(dispenseId),
    enabled: !!dispenseId,
  });
}

export function useDispenseItems(dispenseId: number) {
  return useQuery({
    queryKey: dispenseKeys.items(dispenseId),
    queryFn: () => dispenseApi.getItems(dispenseId),
    enabled: !!dispenseId,
  });
}

// =============================================
// CREATE DISPENSE
// =============================================
export function useCreateDispense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDispenseData) => dispenseApi.create(data),
    onSuccess: (newDispense) => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: dispenseKeys.lists() });
      queryClient.invalidateQueries({ queryKey: dispenseKeys.forPrescription(newDispense.prescription_id) });
      queryClient.invalidateQueries({ queryKey: dispenseKeys.unbilled() });
      queryClient.invalidateQueries({ queryKey: prescriptionKeys.lists() });
      // Stock was deducted, so invalidate medicines
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() });
      queryClient.invalidateQueries({ queryKey: medicineKeys.lowStock() });
    },
  });
}

// =============================================
// MARK AS BILLED
// =============================================
export function useMarkDispenseAsBilled() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dispenseId, invoiceId }: { dispenseId: number; invoiceId: number }) =>
      dispenseApi.markAsBilled(dispenseId, invoiceId),
    onSuccess: (updatedDispense) => {
      queryClient.invalidateQueries({ queryKey: dispenseKeys.unbilled() });
      queryClient.setQueryData(dispenseKeys.detail(updatedDispense.dispense_id), updatedDispense);
    },
  });
}
