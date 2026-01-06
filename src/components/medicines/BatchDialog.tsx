import { format, differenceInDays } from 'date-fns';
import { Plus, AlertTriangle, Loader2 } from 'lucide-react';
import { Medicine } from '@/types/pharmacy';
import { useMedicineBatches } from '@/hooks/useMedicines';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface BatchDialogProps {
  open: boolean;
  onClose: () => void;
  medicine: Medicine | null;
}

export function BatchDialog({ open, onClose, medicine }: BatchDialogProps) {
  const { data: batches = [], isLoading } = useMedicineBatches(medicine?.medicine_id ?? 0);

  if (!medicine) return null;

  const activeBatches = batches.filter((b) => b.is_active);

  const getExpiryStatus = (expiryDate: string) => {
    const days = differenceInDays(new Date(expiryDate), new Date());
    if (days <= 0) return 'expired';
    if (days <= 30) return 'expiring';
    return 'ok';
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Batches for {medicine.medicine_name}
            <Badge variant="secondary">{medicine.strength}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-end">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Batch
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading batches...</span>
            </div>
          ) : activeBatches.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No batches found for this medicine</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Mfg Date</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead>Purchase Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeBatches.map((batch) => {
                  const expiryStatus = getExpiryStatus(batch.expiry_date);
                  const daysToExpiry = differenceInDays(new Date(batch.expiry_date), new Date());

                  return (
                    <TableRow key={batch.batch_id}>
                      <TableCell className="font-medium">{batch.batch_number}</TableCell>
                      <TableCell>{batch.quantity_in_stock} units</TableCell>
                      <TableCell>{format(new Date(batch.manufacture_date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {format(new Date(batch.expiry_date), 'MMM dd, yyyy')}
                          {expiryStatus !== 'ok' && (
                            <AlertTriangle
                              className={cn(
                                'h-4 w-4',
                                expiryStatus === 'expired' ? 'text-destructive' : 'text-warning'
                              )}
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>${batch.purchase_price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            expiryStatus === 'expired'
                              ? 'bg-destructive/15 text-destructive border-destructive/30'
                              : expiryStatus === 'expiring'
                              ? 'bg-warning/15 text-warning border-warning/30'
                              : 'bg-success/15 text-success border-success/30'
                          )}
                        >
                          {expiryStatus === 'expired'
                            ? 'Expired'
                            : expiryStatus === 'expiring'
                            ? `${daysToExpiry} days`
                            : 'Good'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
