import { useQuery } from '@tanstack/react-query';
import { auditApi } from '@/services/api';

// Query Keys
export const auditKeys = {
  all: ['audit'] as const,
  forEntity: (entityName: string, entityId: number) => [...auditKeys.all, entityName, entityId] as const,
};

// =============================================
// GET AUDIT LOGS FOR ENTITY
// =============================================
export function useAuditLogs(entityName: string, entityId: number) {
  return useQuery({
    queryKey: auditKeys.forEntity(entityName, entityId),
    queryFn: () => auditApi.getForEntity(entityName, entityId),
    enabled: !!entityName && !!entityId,
  });
}
