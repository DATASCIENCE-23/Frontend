import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { MainLayout } from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useUnbilledDispenses } from '@/hooks/useDispense';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Eye, Receipt } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending', className: 'status-pending' },
  completed: { label: 'Completed', className: 'status-completed' },
  billed: { label: 'Billed', className: 'status-billed' },
};

const DispensePage = () => {
  const { data: dispenses = [], isLoading, error } = useUnbilledDispenses();

  return (
    <MainLayout title="Dispense History" subtitle="View all dispensed prescriptions">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading dispenses...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-destructive">
          <p>Failed to load dispenses. Please try again.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <div className="rounded-xl border bg-card overflow-hidden animate-fade-in">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Dispense ID</TableHead>
                <TableHead className="font-semibold">Prescription</TableHead>
                <TableHead className="font-semibold">Pharmacist</TableHead>
                <TableHead className="font-semibold">Date & Time</TableHead>
                <TableHead className="font-semibold">Items</TableHead>
                <TableHead className="font-semibold">Total Amount</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dispenses.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    No dispense records found
                  </TableCell>
                </TableRow>
              ) : (
                dispenses.map((dispense, index) => {
                  const status = statusConfig[dispense.status];
                  return (
                    <TableRow
                      key={dispense.dispense_id}
                      className="animate-slide-in"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <TableCell className="font-medium">#{dispense.dispense_id}</TableCell>
                      <TableCell>#{dispense.prescription_id}</TableCell>
                      <TableCell>{dispense.pharmacist_name}</TableCell>
                      <TableCell>
                        {format(new Date(dispense.dispensed_at), 'MMM dd, yyyy h:mm a')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{dispense.items?.length ?? 0} items</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-primary">
                        ${dispense.total_amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn('border', status?.className)}>
                          {status?.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {dispense.status !== 'billed' && (
                            <Button variant="ghost" size="icon">
                              <Receipt className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </MainLayout>
  );
};

export default DispensePage;
