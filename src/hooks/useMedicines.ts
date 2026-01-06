import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { medicinesApi, batchesApi } from '@/services/api';
import type { 
  Medicine, 
  MedicineFormData, 
  MedicineListParams,
  MedicineBatch,
  CreateBatchData,
  BatchAdjustment,
  LowStockMedicine,
} from '@/types/pharmacy';

// Query Keys
export const medicineKeys = {
  all: ['medicines'] as const,
  lists: () => [...medicineKeys.all, 'list'] as const,
  list: (params: MedicineListParams) => [...medicineKeys.lists(), params] as const,
  details: () => [...medicineKeys.all, 'detail'] as const,
  detail: (id: number) => [...medicineKeys.details(), id] as const,
  search: (query: string) => [...medicineKeys.all, 'search', query] as const,
  lowStock: () => [...medicineKeys.all, 'low-stock'] as const,
  batches: (medicineId: number) => [...medicineKeys.all, 'batches', medicineId] as const,
};

// =============================================
// LIST MEDICINES
// =============================================
export function useMedicines(params: MedicineListParams = {}) {
  return useQuery({
    queryKey: medicineKeys.list(params),
    queryFn: () => medicinesApi.list(params),
  });
}

// =============================================
// GET MEDICINE BY ID
// =============================================
export function useMedicine(medicineId: number) {
  return useQuery({
    queryKey: medicineKeys.detail(medicineId),
    queryFn: () => medicinesApi.getById(medicineId),
    enabled: !!medicineId,
  });
}

// =============================================
// SEARCH MEDICINES
// =============================================
export function useSearchMedicines(query: string, activeOnly = true) {
  return useQuery({
    queryKey: medicineKeys.search(query),
    queryFn: () => medicinesApi.search(query, activeOnly),
    enabled: query.length >= 2,
  });
}

// =============================================
// LOW STOCK MEDICINES
// =============================================
export function useLowStockMedicines() {
  return useQuery({
    queryKey: medicineKeys.lowStock(),
    queryFn: () => medicinesApi.getLowStock(),
  });
}

// =============================================
// CREATE MEDICINE
// =============================================
export function useCreateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MedicineFormData) => medicinesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() });
    },
  });
}

// =============================================
// UPDATE MEDICINE
// =============================================
export function useUpdateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ medicineId, data }: { medicineId: number; data: Partial<MedicineFormData & { is_active: boolean }> }) =>
      medicinesApi.update(medicineId, data),
    onSuccess: (updatedMedicine) => {
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() });
      queryClient.setQueryData(medicineKeys.detail(updatedMedicine.medicine_id), updatedMedicine);
    },
  });
}

// =============================================
// BATCHES
// =============================================
export function useMedicineBatches(medicineId: number) {
  return useQuery({
    queryKey: medicineKeys.batches(medicineId),
    queryFn: () => batchesApi.listForMedicine(medicineId),
    enabled: !!medicineId,
  });
}

export function useCreateBatch() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ medicineId, data }: { medicineId: number; data: CreateBatchData }) =>
      batchesApi.create(medicineId, data),
    onSuccess: (newBatch) => {
      queryClient.invalidateQueries({ queryKey: medicineKeys.batches(newBatch.medicine_id) });
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() });
    },
  });
}

export function useAdjustBatchStock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ batchId, data }: { batchId: number; data: BatchAdjustment }) =>
      batchesApi.adjustStock(batchId, data),
    onSuccess: (updatedBatch) => {
      queryClient.invalidateQueries({ queryKey: medicineKeys.batches(updatedBatch.medicine_id) });
      queryClient.invalidateQueries({ queryKey: medicineKeys.lists() });
      queryClient.invalidateQueries({ queryKey: medicineKeys.lowStock() });
    },
  });
}
