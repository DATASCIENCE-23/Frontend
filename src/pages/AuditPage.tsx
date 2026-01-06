import { useState } from 'react';
import { Search, Download, Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AuditLogTable } from '@/components/audit/AuditLogTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PharmacyAuditLog } from '@/types/pharmacy';

// Note: Audit logs require entity-specific queries based on your API
// You'll need to implement a general audit log listing endpoint or
// aggregate from multiple entity queries

const AuditPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [entityFilter, setEntityFilter] = useState<string>('all');

  // Placeholder - replace with actual API hook when endpoint is available
  const auditLogs: PharmacyAuditLog[] = [];
  const isLoading = false;
  const error = null;

  const filteredLogs = auditLogs.filter((log) => {
    const matchesAction = actionFilter === 'all' || log.action_type === actionFilter;
    const matchesEntity = entityFilter === 'all' || log.entity_name === entityFilter;
    return matchesAction && matchesEntity;
  });

  return (
    <MainLayout title="Audit Logs" subtitle="Track all system activities and changes">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={entityFilter} onValueChange={setEntityFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-card">
            <SelectValue placeholder="All Entities" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Entities</SelectItem>
            <SelectItem value="Medicine">Medicine</SelectItem>
            <SelectItem value="MedicineBatch">Batch</SelectItem>
            <SelectItem value="Prescription">Prescription</SelectItem>
            <SelectItem value="Dispense">Dispense</SelectItem>
            <SelectItem value="Pharmacist">Pharmacist</SelectItem>
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-40 bg-card">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent className="bg-popover">
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="CREATE">Create</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
            <SelectItem value="DISPENSE">Dispense</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading audit logs...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-12 text-destructive">
          <p>Failed to load audit logs. Please try again.</p>
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && <AuditLogTable logs={filteredLogs} />}
    </MainLayout>
  );
};

export default AuditPage;
