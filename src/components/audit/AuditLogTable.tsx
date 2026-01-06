import { format } from 'date-fns';
import { FileText, User, Clock, Activity } from 'lucide-react';
import { PharmacyAuditLog } from '@/types/pharmacy';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface AuditLogTableProps {
  logs: PharmacyAuditLog[];
}

const actionConfig = {
  CREATE: { label: 'Create', className: 'bg-success/15 text-success border-success/30' },
  UPDATE: { label: 'Update', className: 'bg-info/15 text-info border-info/30' },
  DELETE: { label: 'Delete', className: 'bg-destructive/15 text-destructive border-destructive/30' },
  DISPENSE: { label: 'Dispense', className: 'bg-primary/15 text-primary border-primary/30' },
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  const parseDetails = (details?: string) => {
    if (!details) return null;
    try {
      return JSON.parse(details);
    } catch {
      return null;
    }
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Timestamp</TableHead>
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Entity</TableHead>
            <TableHead className="font-semibold">Action</TableHead>
            <TableHead className="font-semibold">Details</TableHead>
            <TableHead className="font-semibold">IP Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {logs.map((log, index) => {
            const config = actionConfig[log.action_type];
            const details = parseDetails(log.details);

            return (
              <TableRow
                key={log.log_id}
                className="animate-slide-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <TableCell className="text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {format(new Date(log.action_time), 'MMM dd, yyyy h:mm a')}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm">User #{log.user_id}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {log.entity_name} #{log.entity_id}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn('border', config?.className)}>
                    {config?.label || log.action_type}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-xs">
                  {details ? (
                    <div className="text-sm text-muted-foreground truncate">
                      {Object.entries(details).map(([key, value]) => (
                        <span key={key} className="mr-2">
                          <span className="font-medium">{key}:</span> {String(value)}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {log.ip_address || '—'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
