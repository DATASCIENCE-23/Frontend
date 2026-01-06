// ============================================
// Types matching the backend API documentation
// ============================================

// Medicine Types
export type MedicineForm = 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Cream' | 'Ointment';

export interface Medicine {
  medicine_id: number;
  medicine_name: string;
  generic_name: string;
  strength: string;
  form: MedicineForm;
  shelf_location: string | null;
  unit_price: number;
  is_active: boolean;
  min_quantity: number;
  reorder_level: number;
  total_stock: number;
  created_at: string;
  updated_at: string;
}

export interface MedicineFormData {
  medicine_name: string;
  generic_name: string;
  strength: string;
  form: MedicineForm;
  shelf_location?: string;
  unit_price: number;
  min_quantity: number;
  reorder_level: number;
  is_active: boolean;
}

export interface MedicineSearchResult {
  medicine_id: number;
  medicine_name: string;
  generic_name: string;
  strength: string;
  form: MedicineForm;
  total_stock: number;
}

export interface LowStockMedicine {
  medicine_id: number;
  medicine_name: string;
  generic_name: string;
  strength: string;
  total_stock: number;
  min_quantity: number;
  reorder_level: number;
  status: 'critical' | 'low';
}

// Batch Types
export interface MedicineBatch {
  batch_id: number;
  medicine_id: number;
  batch_number: string;
  quantity_in_stock: number;
  manufacture_date: string;
  expiry_date: string;
  purchase_price: number;
  is_active: boolean;
  created_at: string;
}

export interface CreateBatchData {
  medicine_id: number;
  batch_number: string;
  quantity_in_stock: number;
  manufacture_date: string;
  expiry_date: string;
  purchase_price: number;
}

export interface BatchAdjustment {
  quantity_change: number;
}

// Pharmacist Types
export interface Pharmacist {
  pharmacist_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  employee_code: string;
  license_number: string;
  phone_number: string;
  email: string;
  is_active: boolean;
  created_at: string;
}

export interface PharmacistDispense {
  dispense_id: number;
  prescription_id: number;
  dispensed_at: string;
  total_amount: number;
  status: DispenseStatus;
}

export interface PharmacistStats {
  total_dispenses: number;
  total_amount: number;
  completed_dispenses: number;
  billed_dispenses: number;
}

// Prescription Types (from external system)
export type PrescriptionStatus = 'pending' | 'completed' | 'partially_completed' | 'cancelled';

export interface Prescription {
  prescription_id: number;
  patient_id: number;
  patient_name: string;
  doctor_id: number;
  doctor_name: string;
  status: PrescriptionStatus;
  notes?: string;
  items: PrescriptionItem[];
  created_at: string;
}

export interface PrescriptionItem {
  prescription_item_id: number;
  medicine_id: number;
  quantity: number;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

// Dispense Types
export type DispenseStatus = 'pending' | 'completed' | 'billed';

export interface Dispense {
  dispense_id: number;
  prescription_id: number;
  pharmacist_id: number;
  pharmacist_name: string;
  dispensed_at: string;
  total_amount: number;
  status: DispenseStatus;
  notes?: string;
  items: DispenseItem[];
}

export interface DispenseItem {
  dispense_item_id: number;
  prescription_item_id: number;
  medicine_name: string;
  batch_number: string;
  dispensed_quantity: number;
  unit_price: number;
  line_total: number;
}

export interface CreateDispenseData {
  prescription_id: number;
  notes?: string;
  dispense_items: CreateDispenseItem[];
}

export interface CreateDispenseItem {
  prescription_item_id: number;
  batch_id: number;
  dispensed_quantity: number;
  unit_price: number;
}

export interface BillingInfo {
  dispense_id: number;
  prescription_id: number;
  patient_id: number;
  dispensed_at: string;
  total_amount: number;
  is_billed: boolean;
  items: DispenseItem[];
}

// Audit Log Types
export type EntityName = 'Medicine' | 'Prescription' | 'Dispense' | 'MedicineBatch' | 'Pharmacist' | 'Batch';
export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'DISPENSE';

export interface PharmacyAuditLog {
  log_id: number;
  user_id: number;
  entity_name: EntityName;
  entity_id: number;
  action_type: ActionType;
  action_time: string;
  ip_address?: string;
  details?: string;
}

// Dashboard Types
export interface DashboardStats {
  total_medicines: number;
  low_stock_count: number;
  pending_prescriptions: number;
  today_dispenses: number;
  expiring_soon: number;
  total_revenue_today: number;
}

// API Response Types
export interface ApiError {
  detail: string;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}

export interface MedicineListParams extends PaginationParams {
  active_only?: boolean;
}

export interface BatchListParams {
  active_only?: boolean;
}

export interface PharmacistListParams extends PaginationParams {
  active_only?: boolean;
}

export interface DispenseFilterParams {
  status?: DispenseStatus;
  start_date?: string;
  end_date?: string;
}
