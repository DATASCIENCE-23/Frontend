import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pharmacistsApi } from '@/services/api';
import type { 
  Pharmacist, 
  PharmacistListParams, 
  DispenseFilterParams 
} from '@/types/pharmacy';

// Query Keys
export const pharmacistKeys = {
  all: ['pharmacists'] as const,
  lists: () => [...pharmacistKeys.all, 'list'] as const,
  list: (params: PharmacistListParams) => [...pharmacistKeys.lists(), params] as const,
  details: () => [...pharmacistKeys.all, 'detail'] as const,
  detail: (id: number) => [...pharmacistKeys.details(), id] as const,
  dispenses: (id: number, params: DispenseFilterParams) => [...pharmacistKeys.all, 'dispenses', id, params] as const,
  stats: (id: number, startDate?: string, endDate?: string) => [...pharmacistKeys.all, 'stats', id, startDate, endDate] as const,
};

// =============================================
// LIST PHARMACISTS
// =============================================
export function usePharmacists(params: PharmacistListParams = {}) {
  return useQuery({
    queryKey: pharmacistKeys.list(params),
    queryFn: () => pharmacistsApi.list(params),
  });
}

// =============================================
// GET PHARMACIST BY ID
// =============================================
export function usePharmacist(pharmacistId: number) {
  return useQuery({
    queryKey: pharmacistKeys.detail(pharmacistId),
    queryFn: () => pharmacistsApi.getById(pharmacistId),
    enabled: !!pharmacistId,
  });
}

// =============================================
// GET PHARMACIST DISPENSES
// =============================================
export function usePharmacistDispenses(pharmacistId: number, params: DispenseFilterParams = {}) {
  return useQuery({
    queryKey: pharmacistKeys.dispenses(pharmacistId, params),
    queryFn: () => pharmacistsApi.getDispenses(pharmacistId, params),
    enabled: !!pharmacistId,
  });
}

// =============================================
// GET PHARMACIST STATS
// =============================================
export function usePharmacistStats(pharmacistId: number, startDate?: string, endDate?: string) {
  return useQuery({
    queryKey: pharmacistKeys.stats(pharmacistId, startDate, endDate),
    queryFn: () => pharmacistsApi.getStats(pharmacistId, startDate, endDate),
    enabled: !!pharmacistId,
  });
}

// =============================================
// CREATE PHARMACIST
// =============================================
export function useCreatePharmacist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Pharmacist, 'pharmacist_id' | 'is_active' | 'created_at'>) =>
      pharmacistsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pharmacistKeys.lists() });
    },
  });
}

// =============================================
// UPDATE PHARMACIST
// =============================================
export function useUpdatePharmacist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ pharmacistId, data }: { pharmacistId: number; data: Partial<Pharmacist> }) =>
      pharmacistsApi.update(pharmacistId, data),
    onSuccess: (updatedPharmacist) => {
      queryClient.invalidateQueries({ queryKey: pharmacistKeys.lists() });
      queryClient.setQueryData(pharmacistKeys.detail(updatedPharmacist.pharmacist_id), updatedPharmacist);
    },
  });
}

// =============================================
// DEACTIVATE PHARMACIST
// =============================================
export function useDeactivatePharmacist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pharmacistId: number) => pharmacistsApi.deactivate(pharmacistId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pharmacistKeys.lists() });
    },
  });
}
