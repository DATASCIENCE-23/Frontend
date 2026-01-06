import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LowStockItem {
  id: number;
  name: string;
  currentStock: number;
  minStock: number;
}

interface LowStockAlertProps {
  items: LowStockItem[];
}

export function LowStockAlert({ items }: LowStockAlertProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="font-semibold text-foreground">Low Stock Alerts</h3>
        </div>
        <Link to="/low-stock">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">All stock levels are healthy</p>
        ) : (
          items.slice(0, 4).map((item) => {
            const percentage = Math.round((item.currentStock / item.minStock) * 100);
            const isVeryLow = percentage < 30;
            
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{item.name}</span>
                  <span className={cn('font-medium', isVeryLow ? 'text-destructive' : 'text-warning')}>
                    {item.currentStock} / {item.minStock}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className={cn('h-2', isVeryLow ? '[&>div]:bg-destructive' : '[&>div]:bg-warning')}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
