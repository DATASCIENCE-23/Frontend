import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MainLayout } from '@/components/layout/MainLayout';
import { PrescriptionCard } from '@/components/prescriptions/PrescriptionCard';
import { DispenseDialog } from '@/components/prescriptions/DispenseDialog';
import { usePrescriptions, useCreateDispense } from '@/hooks/useDispense';
import { Prescription, CreateDispenseData } from '@/types/pharmacy';
import { useToast } from '@/hooks/use-toast';

const PrescriptionsPage = () => {
  const { toast } = useToast();
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [showDispenseDialog, setShowDispenseDialog] = useState(false);

  const { data: prescriptions = [], isLoading, error } = usePrescriptions();
  const createDispense = useCreateDispense();

  const pendingPrescriptions = prescriptions.filter((p) => p.status === 'pending');
  const completedPrescriptions = prescriptions.filter(
    (p) => p.status === 'completed' || p.status === 'partially_completed'
  );

  const handleDispense = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
    setShowDispenseDialog(true);
  };

  const handleDispenseSubmit = async (prescription: Prescription, data: any) => {
    try {
      const dispenseData: CreateDispenseData = {
        prescription_id: prescription.prescription_id,
        notes: data.notes,
        dispense_items: data.items.map((item: any) => ({
          prescription_item_id: item.prescription_item_id,
          batch_id: item.batch_id,
          dispensed_quantity: item.dispensed_quantity,
          unit_price: item.unit_price || 0,
        })),
      };

      await createDispense.mutateAsync(dispenseData);
      
      toast({
        title: 'Dispensed successfully',
        description: `Prescription #${prescription.prescription_id} has been dispensed`,
      });
      
      setShowDispenseDialog(false);
      setSelectedPrescription(null);
    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to dispense prescription',
        variant: 'destructive',
      });
    }
  };

  return (
    <MainLayout title="Prescriptions" subtitle="View and process patient prescriptions">
      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading prescriptions...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-destructive">
          <p>Failed to load prescriptions. Please try again.</p>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="pending" className="data-[state=active]:bg-card">
              Pending ({pendingPrescriptions.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-card">
              Completed ({completedPrescriptions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            {pendingPrescriptions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No pending prescriptions</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {pendingPrescriptions.map((prescription) => (
                  <PrescriptionCard
                    key={prescription.prescription_id}
                    prescription={prescription}
                    onDispense={handleDispense}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed">
            {completedPrescriptions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No completed prescriptions</p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {completedPrescriptions.map((prescription) => (
                  <PrescriptionCard
                    key={prescription.prescription_id}
                    prescription={prescription}
                    onDispense={handleDispense}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      <DispenseDialog
        open={showDispenseDialog}
        onClose={() => {
          setShowDispenseDialog(false);
          setSelectedPrescription(null);
        }}
        prescription={selectedPrescription}
        onDispense={handleDispenseSubmit}
      />
    </MainLayout>
  );
};

export default PrescriptionsPage;
