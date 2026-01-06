// ============================================
// API Service Layer - Replace BASE_URL with your actual API URL
// ============================================

import type {
  Medicine,
  MedicineFormData,
  MedicineSearchResult,
  LowStockMedicine,
  MedicineBatch,
  CreateBatchData,
  BatchAdjustment,
  Pharmacist,
  PharmacistDispense,
  PharmacistStats,
  Prescription,
  Dispense,
  CreateDispenseData,
  BillingInfo,
  DispenseItem,
  PharmacyAuditLog,
  MedicineListParams,
  BatchListParams,
  PharmacistListParams,
  DispenseFilterParams,
  DispenseStatus,
} from '@/types/pharmacy';

// =============================================
// CONFIGURATION - Update this with your API URL
// =============================================
const BASE_URL = 'http://localhost:8000/api/v1';

// =============================================
// AUTH TOKEN - Replace with your auth implementation
// =============================================
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

export const getAuthToken = () => authToken;

// =============================================
// API CLIENT HELPER
// =============================================
async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

// =============================================
// MEDICINES API
// =============================================
export const medicinesApi = {
  // Create a new medicine
  create: (data: MedicineFormData): Promise<Medicine> =>
    apiClient('/pharmacy/medicines/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get medicine by ID
  getById: (medicineId: number): Promise<Medicine> =>
    apiClient(`/pharmacy/medicines/${medicineId}`),

  // List all medicines
  list: (params: MedicineListParams = {}): Promise<Medicine[]> => {
    const searchParams = new URLSearchParams();
    if (params.skip !== undefined) searchParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());
    if (params.active_only !== undefined) searchParams.append('active_only', params.active_only.toString());
    
    const query = searchParams.toString();
    return apiClient(`/pharmacy/medicines/${query ? `?${query}` : ''}`);
  },

  // Search medicines
  search: (q: string, activeOnly = true): Promise<MedicineSearchResult[]> => {
    const searchParams = new URLSearchParams({ q, active_only: activeOnly.toString() });
    return apiClient(`/pharmacy/medicines/search/?${searchParams}`);
  },

  // Update medicine
  update: (medicineId: number, data: Partial<MedicineFormData & { is_active: boolean }>): Promise<Medicine> =>
    apiClient(`/pharmacy/medicines/${medicineId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Get low stock medicines
  getLowStock: (): Promise<LowStockMedicine[]> =>
    apiClient('/pharmacy/medicines/low-stock'),
};

// =============================================
// BATCHES API
// =============================================
export const batchesApi = {
  // Create a new batch
  create: (medicineId: number, data: CreateBatchData): Promise<MedicineBatch> =>
    apiClient(`/pharmacy/medicines/${medicineId}/batches`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get batch by ID
  getById: (batchId: number): Promise<MedicineBatch> =>
    apiClient(`/pharmacy/medicines/batches/${batchId}`),

  // List batches for medicine
  listForMedicine: (medicineId: number, params: BatchListParams = {}): Promise<MedicineBatch[]> => {
    const searchParams = new URLSearchParams();
    if (params.active_only !== undefined) searchParams.append('active_only', params.active_only.toString());
    
    const query = searchParams.toString();
    return apiClient(`/pharmacy/medicines/${medicineId}/batches${query ? `?${query}` : ''}`);
  },

  // Adjust batch stock
  adjustStock: (batchId: number, data: BatchAdjustment): Promise<MedicineBatch> =>
    apiClient(`/pharmacy/medicines/batches/${batchId}/adjust`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// =============================================
// PHARMACISTS API
// =============================================
export const pharmacistsApi = {
  // Create pharmacist
  create: (data: Omit<Pharmacist, 'pharmacist_id' | 'is_active' | 'created_at'>): Promise<Pharmacist> =>
    apiClient('/pharmacy/pharmacists/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get pharmacist by ID
  getById: (pharmacistId: number): Promise<Pharmacist> =>
    apiClient(`/pharmacy/pharmacists/${pharmacistId}`),

  // List all pharmacists
  list: (params: PharmacistListParams = {}): Promise<Pharmacist[]> => {
    const searchParams = new URLSearchParams();
    if (params.active_only !== undefined) searchParams.append('active_only', params.active_only.toString());
    if (params.skip !== undefined) searchParams.append('skip', params.skip.toString());
    if (params.limit !== undefined) searchParams.append('limit', params.limit.toString());
    
    const query = searchParams.toString();
    return apiClient(`/pharmacy/pharmacists/${query ? `?${query}` : ''}`);
  },

  // Update pharmacist
  update: (pharmacistId: number, data: Partial<Pharmacist>): Promise<Pharmacist> =>
    apiClient(`/pharmacy/pharmacists/${pharmacistId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Deactivate pharmacist
  deactivate: (pharmacistId: number): Promise<{ message: string; success: boolean }> =>
    apiClient(`/pharmacy/pharmacists/${pharmacistId}/deactivate`, {
      method: 'POST',
    }),

  // Get pharmacist dispenses
  getDispenses: (pharmacistId: number, params: DispenseFilterParams = {}): Promise<PharmacistDispense[]> => {
    const searchParams = new URLSearchParams();
    if (params.status) searchParams.append('status', params.status);
    if (params.start_date) searchParams.append('start_date', params.start_date);
    if (params.end_date) searchParams.append('end_date', params.end_date);
    
    const query = searchParams.toString();
    return apiClient(`/pharmacy/pharmacists/${pharmacistId}/dispenses${query ? `?${query}` : ''}`);
  },

  // Get pharmacist statistics
  getStats: (pharmacistId: number, startDate?: string, endDate?: string): Promise<PharmacistStats> => {
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append('start_date', startDate);
    if (endDate) searchParams.append('end_date', endDate);
    
    const query = searchParams.toString();
    return apiClient(`/pharmacy/pharmacists/${pharmacistId}/dispense-stats${query ? `?${query}` : ''}`);
  },
};

// =============================================
// DISPENSE API
// =============================================
export const dispenseApi = {
  // Create dispense
  create: (data: CreateDispenseData): Promise<Dispense> =>
    apiClient('/pharmacy/dispense/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Get dispense by ID
  getById: (dispenseId: number): Promise<Dispense> =>
    apiClient(`/pharmacy/dispense/${dispenseId}`),

  // List dispenses for prescription
  listForPrescription: (prescriptionId: number): Promise<Dispense[]> =>
    apiClient(`/pharmacy/dispense/prescription/${prescriptionId}`),

  // Mark dispense as billed
  markAsBilled: (dispenseId: number, invoiceId: number): Promise<Dispense> =>
    apiClient(`/pharmacy/dispense/${dispenseId}/bill/${invoiceId}`, {
      method: 'POST',
    }),

  // Get unbilled dispenses
  getUnbilled: (): Promise<Dispense[]> =>
    apiClient('/pharmacy/dispense/unbilled'),

  // Get billing information
  getBillingInfo: (dispenseId: number): Promise<BillingInfo> =>
    apiClient(`/pharmacy/dispense/${dispenseId}/billing-info`),

  // Get dispense items
  getItems: (dispenseId: number): Promise<DispenseItem[]> =>
    apiClient(`/pharmacy/dispense/${dispenseId}/items`),
};

// =============================================
// AUDIT LOGS API
// =============================================
export const auditApi = {
  // Get audit logs for entity
  getForEntity: (entityName: string, entityId: number): Promise<PharmacyAuditLog[]> =>
    apiClient(`/pharmacy/audit/${entityName}/${entityId}`),
};

// =============================================
// PRESCRIPTIONS API (External - adjust as needed)
// =============================================
export const prescriptionsApi = {
  // List prescriptions (adjust endpoint based on your external API)
  list: (status?: string): Promise<Prescription[]> => {
    const searchParams = new URLSearchParams();
    if (status) searchParams.append('status', status);
    
    const query = searchParams.toString();
    // NOTE: Update this endpoint to match your prescription service
    return apiClient(`/prescriptions/${query ? `?${query}` : ''}`);
  },

  // Get prescription by ID
  getById: (prescriptionId: number): Promise<Prescription> =>
    // NOTE: Update this endpoint to match your prescription service
    apiClient(`/prescriptions/${prescriptionId}`),
};
