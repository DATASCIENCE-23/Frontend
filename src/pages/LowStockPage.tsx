import { AlertTriangle, Package, ArrowRight, Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLowStockMedicines } from '@/hooks/useMedicines';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const LowStockPage = () => {
  const { data: lowStockMedicines = [], isLoading, error } = useLowStockMedicines();

  const medicinesWithPercentage = lowStockMedicines.map((m) => ({
    ...m,
    percentage: Math.round((m.total_stock / m.min_quantity) * 100),
  }));

  return (
    <MainLayout title="Low Stock Alerts" subtitle="Medicines below minimum quantity threshold">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading low stock items...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-destructive">
          <p>Failed to load low stock items. Please try again.</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          {medicinesWithPercentage.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
                <Package className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">All Stock Levels Healthy</h3>
              <p className="text-muted-foreground">No medicines are below the minimum quantity threshold</p>
            </div>
          ) : (
            <div className="rounded-xl border bg-card overflow-hidden animate-fade-in">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="font-semibold">Medicine</TableHead>
                    <TableHead className="font-semibold">Current Stock</TableHead>
                    <TableHead className="font-semibold">Min Quantity</TableHead>
                    <TableHead className="font-semibold">Reorder Level</TableHead>
                    <TableHead className="font-semibold">Stock Level</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {medicinesWithPercentage.map((medicine, index) => {
                    const isVeryLow = medicine.percentage < 30;
                    const isCritical = medicine.status === 'critical';
                    
                    return (
                      <TableRow
                        key={medicine.medicine_id}
                        className="animate-slide-in"
                        style={{ animationDelay: `${index * 30}ms` }}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {isCritical && <AlertTriangle className="h-4 w-4 text-destructive" />}
                            <div>
                              <p className="font-medium">{medicine.medicine_name}</p>
                              <p className="text-sm text-muted-foreground">{medicine.strength}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={cn('font-semibold', isCritical ? 'text-destructive' : 'text-warning')}>
                            {medicine.total_stock} units
                          </span>
                        </TableCell>
                        <TableCell>{medicine.min_quantity} units</TableCell>
                        <TableCell>{medicine.reorder_level} units</TableCell>
                        <TableCell className="w-40">
                          <div className="space-y-1">
                            <Progress
                              value={medicine.percentage}
                              className={cn('h-2', isCritical ? '[&>div]:bg-destructive' : '[&>div]:bg-warning')}
                            />
                            <p className="text-xs text-muted-foreground text-right">{medicine.percentage}%</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              isCritical 
                                ? 'bg-destructive/15 text-destructive border-destructive/30'
                                : 'bg-warning/15 text-warning border-warning/30'
                            )}
                          >
                            {isCritical ? 'Critical' : 'Low'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline">
                            Create PO <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
};

export default LowStockPage;
