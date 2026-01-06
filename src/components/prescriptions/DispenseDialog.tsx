import { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import { Package, AlertTriangle, Check, X, Loader2 } from 'lucide-react';
import { Prescription, PrescriptionItem } from '@/types/pharmacy';
import { useMedicines, useMedicineBatches } from '@/hooks/useMedicines';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface DispenseDialogProps {
  open: boolean;
  onClose: () => void;
  prescription: Prescription | null;
  onDispense: (prescription: Prescription, data: DispenseData) => void;
}

interface DispenseData {
  pharmacist_id: number;
  notes: string;
  items: {
    prescription_item_id: number;
    batch_id: number;
    dispensed_quantity: number;
    unit_price: number;
  }[];
}

interface ItemState {
  prescription_item_id: number;
  batch_id: number | null;
  dispensed_quantity: number;
  available: number;
  medicine_name: string;
  requested_quantity: number;
  medicine_id: number;
  unit_price: number;
}

export function DispenseDialog({ open, onClose, prescription, onDispense }: DispenseDialogProps) {
  const { toast } = useToast();
  const [notes, setNotes] = useState('');
  const [itemsState, setItemsState] = useState<ItemState[]>([]);
  
  const { data: medicines = [], isLoading: medicinesLoading } = useMedicines();

  // Initialize items state when prescription changes
  useEffect(() => {
    if (!prescription) {
      setItemsState([]);
      return;
    }
    
    const initialState = prescription.items.map((item) => {
      const medicine = medicines.find((m) => m.medicine_id === item.medicine_id);
      const availableStock = medicine?.total_stock || 0;
      
      return {
        prescription_item_id: item.prescription_item_id,
        batch_id: null,
        dispensed_quantity: Math.min(item.quantity, availableStock),
        available: availableStock,
        medicine_name: medicine?.medicine_name || `Medicine #${item.medicine_id}`,
        requested_quantity: item.quantity,
        medicine_id: item.medicine_id,
        unit_price: medicine?.unit_price || 0,
      };
    });
    
    setItemsState(initialState);
    setNotes('');
  }, [prescription, medicines]);

  const handleQuantityChange = (itemId: number, quantity: number) => {
    setItemsState((prev) =>
      prev.map((item) =>
        item.prescription_item_id === itemId
          ? { ...item, dispensed_quantity: Math.min(Math.max(0, quantity), item.available, item.requested_quantity) }
          : item
      )
    );
  };

  const handleBatchChange = (itemId: number, batchId: string) => {
    setItemsState((prev) =>
      prev.map((item) =>
        item.prescription_item_id === itemId
          ? { ...item, batch_id: parseInt(batchId) }
          : item
      )
    );
  };

  const totalAmount = useMemo(() => {
    return itemsState.reduce((total, item) => {
      return total + (item.dispensed_quantity * item.unit_price);
    }, 0);
  }, [itemsState]);

  const handleSubmit = () => {
    const invalidItems = itemsState.filter((item) => !item.batch_id);
    if (invalidItems.length > 0) {
      toast({
        title: 'Select batch for all items',
        description: 'Please select a batch for each medicine',
        variant: 'destructive',
      });
      return;
    }

    onDispense(prescription!, {
      pharmacist_id: 1, // Would come from auth context
      notes,
      items: itemsState.map((item) => ({
        prescription_item_id: item.prescription_item_id,
        batch_id: item.batch_id!,
        dispensed_quantity: item.dispensed_quantity,
        unit_price: item.unit_price,
      })),
    });
  };

  if (!prescription) return null;

  const isLoading = medicinesLoading;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Dispense Prescription #{prescription.prescription_id}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Patient Info */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm text-muted-foreground">Patient</p>
                <p className="font-medium">{prescription.patient_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Doctor</p>
                <p className="font-medium">{prescription.doctor_name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {format(new Date(prescription.created_at), 'MMM dd, yyyy h:mm a')}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <h4 className="font-semibold">Prescription Items</h4>
              
              {itemsState.map((item) => (
                <DispenseItemRow
                  key={item.prescription_item_id}
                  item={item}
                  prescriptionItem={prescription.items.find(
                    (pi) => pi.prescription_item_id === item.prescription_item_id
                  )}
                  onQuantityChange={handleQuantityChange}
                  onBatchChange={handleBatchChange}
                />
              ))}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Dispensing Notes</Label>
              <Textarea
                placeholder="Add any notes about partial dispense or special instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
              />
            </div>

            {/* Total */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="font-semibold text-foreground">Total Amount</span>
              <span className="text-2xl font-bold text-primary">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            <Check className="mr-2 h-4 w-4" />
            Confirm Dispense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Separate component for each dispense item row with its own batch query
function DispenseItemRow({
  item,
  prescriptionItem,
  onQuantityChange,
  onBatchChange,
}: {
  item: ItemState;
  prescriptionItem?: PrescriptionItem;
  onQuantityChange: (itemId: number, quantity: number) => void;
  onBatchChange: (itemId: number, batchId: string) => void;
}) {
  const { data: batches = [] } = useMedicineBatches(item.medicine_id);
  
  const availableBatches = batches.filter(
    (b) => b.is_active && b.quantity_in_stock > 0
  );
  
  const hasStockIssue = item.available < item.requested_quantity;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border space-y-3',
        hasStockIssue ? 'border-warning/50 bg-warning/5' : ''
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium">{item.medicine_name}</p>
          <p className="text-sm text-muted-foreground">
            {prescriptionItem?.dosage} • {prescriptionItem?.frequency}
          </p>
        </div>
        {hasStockIssue && (
          <Badge variant="outline" className="status-pending">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Low Stock
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label className="text-xs">Requested</Label>
          <p className="font-semibold">{item.requested_quantity} units</p>
        </div>
        <div>
          <Label className="text-xs">Available</Label>
          <p className={cn('font-semibold', hasStockIssue && 'text-warning')}>
            {item.available} units
          </p>
        </div>
        <div>
          <Label className="text-xs">Dispense Qty</Label>
          <Input
            type="number"
            min={0}
            max={Math.min(item.available, item.requested_quantity)}
            value={item.dispensed_quantity}
            onChange={(e) =>
              onQuantityChange(item.prescription_item_id, parseInt(e.target.value) || 0)
            }
            className="h-8"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs">Select Batch</Label>
        <Select
          value={item.batch_id?.toString() || ''}
          onValueChange={(value) => onBatchChange(item.prescription_item_id, value)}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select batch..." />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            {availableBatches.length === 0 ? (
              <SelectItem value="none" disabled>No batches available</SelectItem>
            ) : (
              availableBatches.map((batch) => (
                <SelectItem key={batch.batch_id} value={batch.batch_id.toString()}>
                  {batch.batch_number} (Stock: {batch.quantity_in_stock}, Exp: {format(new Date(batch.expiry_date), 'MMM yyyy')})
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {prescriptionItem?.instructions && (
        <p className="text-sm text-muted-foreground italic">
          Instructions: {prescriptionItem.instructions}
        </p>
      )}
    </div>
  );
}
