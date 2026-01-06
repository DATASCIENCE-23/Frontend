import { format } from 'date-fns';
import { Clock, User, Stethoscope, ArrowRight, AlertCircle } from 'lucide-react';
import { Prescription } from '@/types/pharmacy';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface PrescriptionCardProps {
  prescription: Prescription;
  onDispense: (prescription: Prescription) => void;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'status-pending',
  },
  completed: {
    label: 'Completed',
    className: 'status-completed',
  },
  partially_completed: {
    label: 'Partial',
    className: 'status-pending',
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-muted text-muted-foreground',
  },
};

export function PrescriptionCard({ prescription, onDispense }: PrescriptionCardProps) {
  const status = statusConfig[prescription.status];

  return (
    <Card className="overflow-hidden hover:shadow-card-hover transition-shadow animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Prescription #{prescription.prescription_id}</p>
            <h3 className="text-lg font-semibold text-foreground mt-1">{prescription.patient_name}</h3>
          </div>
          <Badge variant="outline" className={cn('border', status.className)}>
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Stethoscope className="h-4 w-4" />
          <span>{prescription.doctor_name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{format(new Date(prescription.created_at), 'MMM dd, yyyy h:mm a')}</span>
        </div>

        {prescription.notes && (
          <div className="flex items-start gap-2 p-2 rounded-lg bg-warning/10 text-warning text-sm">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{prescription.notes}</span>
          </div>
        )}

        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium text-foreground">Items ({prescription.items.length})</p>
          {prescription.items.slice(0, 2).map((item) => (
            <div
              key={item.prescription_item_id}
              className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50"
            >
              <span className="text-foreground">Medicine ID: {item.medicine_id}</span>
              <span className="text-muted-foreground">Qty: {item.quantity}</span>
            </div>
          ))}
          {prescription.items.length > 2 && (
            <p className="text-sm text-muted-foreground">
              +{prescription.items.length - 2} more items
            </p>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t">
        {prescription.status === 'pending' ? (
          <Button className="w-full" onClick={() => onDispense(prescription)}>
            Dispense <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full" onClick={() => onDispense(prescription)}>
            View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
