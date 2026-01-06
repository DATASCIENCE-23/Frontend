import { Calendar, AlertTriangle } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface ExpiryItem {
  batchNumber: string;
  medicineName: string;
  expiryDate: string;
  quantity: number;
}

interface ExpiryWarningProps {
  items: ExpiryItem[];
}

export function ExpiryWarning({ items }: ExpiryWarningProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-warning" />
        <h3 className="font-semibold text-foreground">Expiring Soon</h3>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No medicines expiring soon</p>
        ) : (
          items.slice(0, 4).map((item) => {
            const daysUntilExpiry = differenceInDays(new Date(item.expiryDate), new Date());
            const isUrgent = daysUntilExpiry <= 7;
            
            return (
              <div
                key={item.batchNumber}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border',
                  isUrgent ? 'bg-destructive/5 border-destructive/20' : 'bg-warning/5 border-warning/20'
                )}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{item.medicineName}</p>
                  <p className="text-xs text-muted-foreground">Batch: {item.batchNumber}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={cn(isUrgent ? 'status-pending' : '')}>
                    {daysUntilExpiry <= 0 ? 'Expired' : `${daysUntilExpiry} days`}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Qty: {item.quantity}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
