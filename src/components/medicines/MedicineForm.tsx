import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Medicine, MedicineFormData } from '@/types/pharmacy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

const medicineSchema = z.object({
  medicine_name: z.string().min(1, 'Medicine name is required').max(200),
  generic_name: z.string().min(1, 'Generic name is required').max(200),
  strength: z.string().min(1, 'Strength is required').max(50),
  form: z.enum(['Tablet', 'Capsule', 'Syrup', 'Injection', 'Cream', 'Drops']),
  shelf_location: z.string().max(50).optional(),
  unit_price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  min_quantity: z.coerce.number().int().min(1, 'Min quantity must be at least 1'),
  reorder_level: z.coerce.number().int().min(1, 'Reorder level must be at least 1'),
  is_active: z.boolean(),
});

interface MedicineFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: MedicineFormData) => void;
  medicine?: Medicine | null;
}

export function MedicineForm({ open, onClose, onSubmit, medicine }: MedicineFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MedicineFormData>({
    resolver: zodResolver(medicineSchema),
    defaultValues: medicine || {
      medicine_name: '',
      generic_name: '',
      strength: '',
      form: 'Tablet',
      shelf_location: '',
      unit_price: 0,
      min_quantity: 10,
      reorder_level: 20,
      is_active: true,
    },
  });

  const isActive = watch('is_active');
  const selectedForm = watch('form');

  const handleFormSubmit = (data: MedicineFormData) => {
    onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-card">
        <DialogHeader>
          <DialogTitle>{medicine ? 'Edit Medicine' : 'Add New Medicine'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="medicine_name">Medicine Name *</Label>
              <Input
                id="medicine_name"
                {...register('medicine_name')}
                placeholder="e.g., Amoxicillin"
                className={errors.medicine_name ? 'border-destructive' : ''}
              />
              {errors.medicine_name && (
                <p className="text-xs text-destructive">{errors.medicine_name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="generic_name">Generic Name *</Label>
              <Input
                id="generic_name"
                {...register('generic_name')}
                placeholder="e.g., Amoxicillin Trihydrate"
                className={errors.generic_name ? 'border-destructive' : ''}
              />
              {errors.generic_name && (
                <p className="text-xs text-destructive">{errors.generic_name.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="form">Form *</Label>
              <Select
                value={selectedForm}
                onValueChange={(value) => setValue('form', value as MedicineFormData['form'])}
              >
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select form" />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Tablet">Tablet</SelectItem>
                  <SelectItem value="Capsule">Capsule</SelectItem>
                  <SelectItem value="Syrup">Syrup</SelectItem>
                  <SelectItem value="Injection">Injection</SelectItem>
                  <SelectItem value="Cream">Cream</SelectItem>
                  <SelectItem value="Drops">Drops</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="strength">Strength *</Label>
              <Input
                id="strength"
                {...register('strength')}
                placeholder="e.g., 500mg"
                className={errors.strength ? 'border-destructive' : ''}
              />
              {errors.strength && (
                <p className="text-xs text-destructive">{errors.strength.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="unit_price">Unit Price ($) *</Label>
              <Input
                id="unit_price"
                type="number"
                step="0.01"
                {...register('unit_price')}
                className={errors.unit_price ? 'border-destructive' : ''}
              />
              {errors.unit_price && (
                <p className="text-xs text-destructive">{errors.unit_price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shelf_location">Shelf Location</Label>
              <Input
                id="shelf_location"
                {...register('shelf_location')}
                placeholder="e.g., A1-01"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min_quantity">Min Quantity *</Label>
              <Input
                id="min_quantity"
                type="number"
                {...register('min_quantity')}
                className={errors.min_quantity ? 'border-destructive' : ''}
              />
              {errors.min_quantity && (
                <p className="text-xs text-destructive">{errors.min_quantity.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reorder_level">Reorder Level *</Label>
              <Input
                id="reorder_level"
                type="number"
                {...register('reorder_level')}
                className={errors.reorder_level ? 'border-destructive' : ''}
              />
              {errors.reorder_level && (
                <p className="text-xs text-destructive">{errors.reorder_level.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="is_active" className="text-base">Active Status</Label>
              <p className="text-sm text-muted-foreground">
                Enable or disable this medicine for dispensing
              </p>
            </div>
            <Switch
              id="is_active"
              checked={isActive}
              onCheckedChange={(checked) => setValue('is_active', checked)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {medicine ? 'Update' : 'Add'} Medicine
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
