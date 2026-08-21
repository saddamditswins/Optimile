import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import { SuperAdminSubscriptionOverview } from './SuperAdminSubscriptionOverview';
import { SuperAdminPlanManagement } from './SuperAdminPlanManagement';
import { SuperAdminCreateEditPlan } from './SuperAdminCreateEditPlan';

export function SuperAdminSubscriptions() {
  const [currentView, setCurrentView] = useState<'overview' | 'plans'>('overview');
  const [showCreateEditPlan, setShowCreateEditPlan] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const handleViewPlans = () => {
    setCurrentView('plans');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
  };

  const handleCreatePlan = () => {
    setSelectedPlanId(null);
    setShowCreateEditPlan(true);
  };

  const handleViewPlan = (planId: string) => {
    setSelectedPlanId(planId);
    setShowCreateEditPlan(true);
  };

  const handleClosePlan = () => {
    setShowCreateEditPlan(false);
    setSelectedPlanId(null);
  };

  const handleSavePlan = () => {
    setShowCreateEditPlan(false);
    setSelectedPlanId(null);
    // In real app, would refresh plan list
    alert(selectedPlanId ? 'Plan updated successfully! New version created.' : 'Plan created successfully!');
  };

  return (
    <>
      {currentView === 'overview' && (
        <SuperAdminSubscriptionOverview onViewPlans={handleViewPlans} />
      )}
      
      {currentView === 'plans' && (
        <SuperAdminPlanManagement 
          onBack={handleBackToOverview}
          onViewPlan={handleViewPlan}
          onCreatePlan={handleCreatePlan}
        />
      )}
      
      {showCreateEditPlan && (
        <SuperAdminCreateEditPlan 
          planId={selectedPlanId || undefined}
          onClose={handleClosePlan}
          onSave={handleSavePlan}
        />
      )}
    </>
  );
}