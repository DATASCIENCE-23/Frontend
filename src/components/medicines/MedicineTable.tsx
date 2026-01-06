import { Edit2, Trash2, MoreHorizontal, Package } from 'lucide-react';
import { Medicine } from '@/types/pharmacy';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MedicineTableProps {
  medicines: Medicine[];
  onEdit: (medicine: Medicine) => void;
  onDelete: (medicine: Medicine) => void;
  onViewBatches: (medicine: Medicine) => void;
}

export function MedicineTable({ medicines, onEdit, onDelete, onViewBatches }: MedicineTableProps) {
  const getStockStatus = (medicine: Medicine) => {
    if (medicine.total_stock < medicine.min_quantity) return 'low';
    if (medicine.total_stock < medicine.reorder_level) return 'warning';
    return 'ok';
  };

  const getStockBadge = (medicine: Medicine) => {
    const status = getStockStatus(medicine);
    
    const variants = {
      low: 'bg-destructive/15 text-destructive border-destructive/30',
      warning: 'bg-warning/15 text-warning border-warning/30',
      ok: 'bg-success/15 text-success border-success/30',
    };

    return (
      <Badge variant="outline" className={cn(variants[status])}>
        {medicine.total_stock} units
      </Badge>
    );
  };

  return (
    <div className="rounded-xl border bg-card overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="font-semibold">Medicine Name</TableHead>
            <TableHead className="font-semibold">Generic Name</TableHead>
            <TableHead className="font-semibold">Form</TableHead>
            <TableHead className="font-semibold">Strength</TableHead>
            <TableHead className="font-semibold">Unit Price</TableHead>
            <TableHead className="font-semibold">Stock</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.map((medicine, index) => (
            <TableRow
              key={medicine.medicine_id}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <TableCell className="font-medium">{medicine.medicine_name}</TableCell>
              <TableCell className="text-muted-foreground">{medicine.generic_name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{medicine.form}</Badge>
              </TableCell>
              <TableCell>{medicine.strength}</TableCell>
              <TableCell>${medicine.unit_price.toFixed(2)}</TableCell>
              <TableCell>{getStockBadge(medicine)}</TableCell>
              <TableCell>
                <Badge variant={medicine.is_active ? 'default' : 'secondary'}>
                  {medicine.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem onClick={() => onViewBatches(medicine)} className="cursor-pointer">
                      <Package className="mr-2 h-4 w-4" />
                      View Batches
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(medicine)} className="cursor-pointer">
                      <Edit2 className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(medicine)}
                      className="text-destructive cursor-pointer focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
