import { useState } from 'react';
import { Plus, Search, Filter, Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { MedicineTable } from '@/components/medicines/MedicineTable';
import { MedicineForm } from '@/components/medicines/MedicineForm';
import { BatchDialog } from '@/components/medicines/BatchDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMedicines, useCreateMedicine, useUpdateMedicine } from '@/hooks/useMedicines';
import { Medicine, MedicineFormData } from '@/types/pharmacy';
import { useToast } from '@/hooks/use-toast';

const MedicinesPage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [formFilter, setFormFilter] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [batchMedicine, setBatchMedicine] = useState<Medicine | null>(null);

  // API hooks
  const { data: medicines = [], isLoading, error } = useMedicines();
  const createMedicine = useCreateMedicine();
  const updateMedicine = useUpdateMedicine();

  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.medicine_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      medicine.generic_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesForm = formFilter === 'all' || medicine.form === formFilter;
    return matchesSearch && matchesForm;
  });

  const handleAddMedicine = async (data: MedicineFormData) => {
    try {
      await createMedicine.mutateAsync(data);
      setShowForm(false);
      toast({
        title: 'Medicine added',
        description: `${data.medicine_name} has been added successfully`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to add medicine',
        variant: 'destructive',
      });
    }
  };

  const handleEditMedicine = async (data: MedicineFormData) => {
    if (!editingMedicine) return;
    try {
      await updateMedicine.mutateAsync({
        medicineId: editingMedicine.medicine_id,
        data,
      });
      setEditingMedicine(null);
      setShowForm(false);
      toast({
        title: 'Medicine updated',
        description: `${data.medicine_name} has been updated successfully`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update medicine',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteMedicine = async (medicine: Medicine) => {
    try {
      await updateMedicine.mutateAsync({
        medicineId: medicine.medicine_id,
        data: { is_active: false },
      });
      toast({
        title: 'Medicine deleted',
        description: `${medicine.medicine_name} has been removed`,
        variant: 'destructive',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to delete medicine',
        variant: 'destructive',
      });
    }
  };

  return (
    <MainLayout title="Medicines" subtitle="Manage medicine catalog and inventory">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name or generic name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={formFilter} onValueChange={setFormFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-card">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="All Forms" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Forms</SelectItem>
            <SelectItem value="Tablet">Tablet</SelectItem>
            <SelectItem value="Capsule">Capsule</SelectItem>
            <SelectItem value="Syrup">Syrup</SelectItem>
            <SelectItem value="Injection">Injection</SelectItem>
            <SelectItem value="Cream">Cream</SelectItem>
            <SelectItem value="Ointment">Ointment</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Medicine
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading medicines...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-destructive">
          <p>Failed to load medicines. Please try again.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && (
        <MedicineTable
          medicines={filteredMedicines}
          onEdit={(medicine) => {
            setEditingMedicine(medicine);
            setShowForm(true);
          }}
          onDelete={handleDeleteMedicine}
          onViewBatches={setBatchMedicine}
        />
      )}

      {/* Medicine Form Dialog */}
      <MedicineForm
        open={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingMedicine(null);
        }}
        onSubmit={editingMedicine ? handleEditMedicine : handleAddMedicine}
        medicine={editingMedicine}
      />

      {/* Batch Dialog */}
      <BatchDialog
        open={!!batchMedicine}
        onClose={() => setBatchMedicine(null)}
        medicine={batchMedicine}
      />
    </MainLayout>
  );
};

export default MedicinesPage;
