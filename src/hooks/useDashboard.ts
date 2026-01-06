import { useQuery } from '@tanstack/react-query';
import { medicinesApi } from '@/services/api';
import type { DashboardStats } from '@/types/pharmacy';

// Query Keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
};

// =============================================
// DASHBOARD STATS
// =============================================
export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      try {
        // Fetch all medicines (active only)
        const allMedicines = await medicinesApi.list({ 
          skip: 0, 
          limit: 1000, 
          active_only: true 
        });
        
        // Fetch low stock medicines
        const lowStock = await medicinesApi.getLowStock();
        
        return {
          total_medicines: allMedicines.length,
          low_stock_count: lowStock.length,
          pending_prescriptions: 0, // Not available in current API
          today_dispenses: 0, // Not available in current API
          expiring_soon: 0, // Not available in current API
          total_revenue_today: 0, // Not available in current API
        };
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return {
          total_medicines: 0,
          low_stock_count: 0,
          pending_prescriptions: 0,
          today_dispenses: 0,
          expiring_soon: 0,
          total_revenue_today: 0,
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });
}