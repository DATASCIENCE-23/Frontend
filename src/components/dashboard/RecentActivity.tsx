import { formatDistanceToNow } from 'date-fns';
import { Activity, Package, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: number;
  type: 'dispense' | 'prescription' | 'stock' | 'alert';
  message: string;
  timestamp: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const typeConfig = {
  dispense: {
    icon: Package,
    color: 'text-success bg-success/10',
  },
  prescription: {
    icon: FileText,
    color: 'text-info bg-info/10',
  },
  stock: {
    icon: Activity,
    color: 'text-primary bg-primary/10',
  },
  alert: {
    icon: AlertCircle,
    color: 'text-warning bg-warning/10',
  },
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
      <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;
          
          return (
            <div
              key={activity.id}
              className="flex items-start gap-3 animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', config.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{activity.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
