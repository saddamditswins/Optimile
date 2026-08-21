import { Building2, Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { SuperAdminTenantManagement } from './SuperAdminTenantManagement';
import { SuperAdminAddTenant } from './SuperAdminAddTenant';
import { SuperAdminTenantProfile } from './SuperAdminTenantProfile';

export function SuperAdminTenants() {
  const [showAddTenant, setShowAddTenant] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);

  const handleViewTenant = (tenantId: string) => {
    setSelectedTenantId(tenantId);
  };

  const handleAddTenant = () => {
    setShowAddTenant(true);
  };

  const handleCloseAddTenant = () => {
    setShowAddTenant(false);
  };

  const handleSubmitTenant = () => {
    setShowAddTenant(false);
    // In real app, would refresh tenant list
    alert('Tenant created successfully! Invitation sent to Tenant Admin.');
  };

  const handleCloseTenantProfile = () => {
    setSelectedTenantId(null);
  };

  return (
    <>
      <SuperAdminTenantManagement 
        onViewTenant={handleViewTenant}
        onAddTenant={handleAddTenant}
      />
      
      {showAddTenant && (
        <SuperAdminAddTenant 
          onClose={handleCloseAddTenant}
          onSubmit={handleSubmitTenant}
        />
      )}
      
      {selectedTenantId && (
        <SuperAdminTenantProfile 
          tenantId={selectedTenantId}
          onClose={handleCloseTenantProfile}
        />
      )}
    </>
  );
}