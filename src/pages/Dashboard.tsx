import { Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { LowStockAlert } from '@/components/dashboard/LowStockAlert';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { ExpiryWarning } from '@/components/dashboard/ExpiryWarning';
import {
  Pill,
  AlertTriangle,
  ClipboardList,
  PackageCheck,
  Calendar,
  DollarSign,
} from 'lucide-react';
import { useDashboardStats } from '@/hooks/useDashboard';
import { useLowStockMedicines } from '@/hooks/useMedicines';

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: lowStockMedicines = [], isLoading: lowStockLoading } = useLowStockMedicines();

  // Transform low stock medicines for the component
  const lowStockItems = lowStockMedicines.map((m) => ({
    id: m.medicine_id,
    name: `${m.medicine_name} ${m.strength}`,
    currentStock: m.total_stock,
    minStock: m.min_quantity,
  }));

  // Empty arrays for features not available in current API
  const expiringItems: Array<{
    batchNumber: string;
    medicineName: string;
    expiryDate: string;
    quantity: number;
  }> = [];

  const recentActivities: Array<{
    id: number;
    type: 'dispense' | 'prescription' | 'alert' | 'stock';
    message: string;
    timestamp: string;
  }> = [];

  const isLoading = statsLoading || lowStockLoading;

  if (isLoading) {
    return (
      <MainLayout title="Dashboard" subtitle="Welcome back">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading dashboard...</span>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Dashboard" subtitle="Welcome back">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-6">
        <StatCard
          title="Total Medicines"
          value={stats?.total_medicines ?? 0}
          icon={Pill}
          variant="default"
        />
        <StatCard
          title="Low Stock Items"
          value={stats?.low_stock_count ?? 0}
          icon={AlertTriangle}
          variant="warning"
        />
        <StatCard
          title="Pending Rx"
          value={stats?.pending_prescriptions ?? 0}
          icon={ClipboardList}
          variant="default"
        />
        <StatCard
          title="Today's Dispenses"
          value={stats?.today_dispenses ?? 0}
          icon={PackageCheck}
          variant="success"
        />
        <StatCard
          title="Expiring Soon"
          value={stats?.expiring_soon ?? 0}
          icon={Calendar}
          variant="danger"
        />
        <StatCard
          title="Today's Revenue"
          value={`$${(stats?.total_revenue_today ?? 0).toFixed(2)}`}
          icon={DollarSign}
          variant="default"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Low Stock Alerts - WORKING */}
        <div className="xl:col-span-1">
          <LowStockAlert items={lowStockItems} />
        </div>

        {/* Expiry Warnings - PLACEHOLDER */}
        <div className="xl:col-span-1">
          <ExpiryWarning items={expiringItems} />
        </div>

        {/* Recent Activity - PLACEHOLDER */}
        <div className="xl:col-span-1">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;