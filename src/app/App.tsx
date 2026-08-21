import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Homepage } from './components/Homepage';
import { RoleSelection } from './components/RoleSelection';
import { LoginScreen } from './components/LoginScreen';
import { OperationsDashboard } from './components/OperationsDashboard';
import { RiskFocusView } from './components/RiskFocusView';
import { RoutesListScreen } from './components/RoutesListScreen';
import { RouteDetailScreen } from './components/RouteDetailScreen';
import { RouteMapView } from './components/RouteMapView';
import { DriversOverviewScreen } from './components/DriversOverviewScreen';
import { DriverDetailScreen } from './components/DriverDetailScreen';
import { DriverAvailabilityTimeline } from './components/DriverAvailabilityTimeline';
import { DriverImpactPreview } from './components/DriverImpactPreview';
import { DeliveriesListScreen } from './components/DeliveriesListScreen';
import { DeliveryDetailScreen } from './components/DeliveryDetailScreen';
import { VIPDeliveriesView } from './components/VIPDeliveriesView';
import { VIPDeliveryDetail } from './components/VIPDeliveryDetail';
import { AlertsQueueScreen } from './components/AlertsQueueScreen';
import { AlertDetailScreen } from './components/AlertDetailScreen';
import { AlertHistoryScreen } from './components/AlertHistoryScreen';
import { RecoveryEntryContext } from './components/RecoveryEntryContext';
import { RecoveryOptionBuilder } from './components/RecoveryOptionBuilder';
import { ImpactReview } from './components/ImpactReview';
import { CommitReview } from './components/CommitReview';
import { PostCommitConfirmation } from './components/PostCommitConfirmation';
import { EscalationRequest } from './components/EscalationRequest';
import { EscalationStatus } from './components/EscalationStatus';
import { ExecutionMonitor } from './components/ExecutionMonitor';
import { ExecutionDetail } from './components/ExecutionDetail';
import { ExecutionOutcome } from './components/ExecutionOutcome';
import { NavigationSidebar } from './components/NavigationSidebar';
import { OperationsManagerSidebar } from './components/OperationsManagerSidebar';
import { OperationsManagerDashboard } from './components/OperationsManagerDashboard';
import { EscalationQueue } from './components/EscalationQueue';
import { EscalationReview } from './components/EscalationReview';
import { SLARiskOversight } from './components/SLARiskOversight';
import { ExecutionOversight } from './components/ExecutionOversight';
import { OperationsOutcomes } from './components/OperationsOutcomes';
import { OperationsAudit } from './components/OperationsAudit';
import { FleetSupervisorDashboard } from './components/FleetSupervisorDashboard';
import { FleetSupervisorSidebar } from './components/FleetSupervisorSidebar';
import { FleetDriversManagement } from './components/FleetDriversManagement';
import { FleetVehiclesManagement } from './components/FleetVehiclesManagement';
import { FleetCapacitySignals } from './components/FleetCapacitySignals';
import { FleetExceptions } from './components/FleetExceptions';
import { FleetActivityLog } from './components/FleetActivityLog';
// Driver imports
import { DriverMobileApp } from './components/DriverMobileApp';
import { DriverTodaysWork } from './components/DriverTodaysWork';
import { DriverIssueReporting } from './components/DriverIssueReporting';
import { DriverProfile } from './components/DriverProfile';
// Tenant Admin imports
import { TenantAdminSidebar } from './components/TenantAdminSidebar';
import { TenantAdminFirstLogin } from './components/TenantAdminFirstLogin';
import { TenantCompanySettings } from './components/TenantCompanySettings';
import { TenantRolesModule } from './components/TenantRolesModule';
import { TenantSettings } from './components/TenantSettings';
import { TenantDashboard } from './components/TenantDashboard';
import { TenantUsersModule } from './components/TenantUsersModule';
import { TenantSupportModule } from './components/TenantSupportModule';
import { TenantActivityLog } from './components/TenantActivityLog';
// Super Admin imports
import { SuperAdminSidebar } from './components/SuperAdminSidebar';
import { SuperAdminDashboard } from './components/SuperAdminDashboard';
import { SuperAdminTenants } from './components/SuperAdminTenants';
import { SuperAdminSubscriptions } from './components/SuperAdminSubscriptions';
import { SuperAdminSupport } from './components/SuperAdminSupport';
import { SuperAdminSettings } from './components/SuperAdminSettings';

type Screen = 'home' | 'role-selection' | 'login' | 'dashboard' | 'risk-focus' | 'routes' | 'route-detail' | 'route-map' | 'drivers' | 'driver-detail' | 'driver-timeline' | 'driver-impact' | 'deliveries' | 'delivery-detail' | 'vip-deliveries' | 'vip-delivery-detail' | 'alerts' | 'alert-detail' | 'alert-history' | 'recovery-entry' | 'recovery-builder' | 'impact-review' | 'commit-review' | 'post-commit' | 'escalation-request' | 'escalation-status' | 'execution-monitor' | 'execution-detail' | 'execution-outcome' | 'ops-dashboard' | 'ops-escalations' | 'ops-escalation-review' | 'ops-sla-risk' | 'ops-execution' | 'ops-outcomes' | 'ops-audit' | 'fleet-dashboard' | 'fleet-drivers' | 'fleet-vehicles' | 'fleet-capacity' | 'fleet-exceptions' | 'fleet-activity' | 'tenant-first-login' | 'tenant-setup-tracker' | 'tenant-blocked-dashboard' | 'tenant-dashboard' | 'tenant-settings' | 'tenant-roles' | 'tenant-users' | 'tenant-activity' | 'tenant-operations' | 'tenant-integrations' | 'tenant-notifications' | 'tenant-privacy' | 'tenant-audit' | 'tenant-support' | 'superadmin-dashboard' | 'superadmin-tenants' | 'superadmin-subscriptions' | 'superadmin-support' | 'superadmin-settings';

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  // State management
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [tenantSetupComplete, setTenantSetupComplete] = useState(false);

  // Screen-specific state
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<string | null>(null);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [selectedRecoveryId, setSelectedRecoveryId] = useState<string | null>(null);
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | null>(null);
  const [selectedEscalationId, setSelectedEscalationId] = useState<string | null>(null);

  const handleGetStarted = () => {
    setCurrentScreen('role-selection');
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    setCurrentScreen('login');
  };

  const handleBackToRoleSelection = () => {
    setCurrentScreen('role-selection');
    setSelectedRole(null);
  };

  const handleLoginSuccess = (authenticatedRoleId: string) => {
    // Set the authenticated role - this overrides the initially selected role
    setSelectedRole(authenticatedRoleId);
    
    // Route to appropriate dashboard based on authenticated role
    if (authenticatedRoleId === 'operations-manager') {
      setCurrentScreen('ops-dashboard');
    } else if (authenticatedRoleId === 'fleet-supervisor') {
      setCurrentScreen('fleet-dashboard');
    } else if (authenticatedRoleId === 'driver') {
      setCurrentScreen('driver-mobile');
    } else if (authenticatedRoleId === 'tenant-admin') {
      if (tenantSetupComplete) {
        setCurrentScreen('tenant-dashboard');
      } else {
        setCurrentScreen('tenant-first-login');
      }
    } else if (authenticatedRoleId === 'super-admin') {
      setCurrentScreen('superadmin-dashboard');
    } else {
      setCurrentScreen('dashboard');
    }
  };

  const handleLogout = () => {
    // Reset all state
    setCurrentScreen('role-selection');
    setSelectedRole(null);
    setTenantSetupComplete(false);
  };

  const handleNavigateToRiskFocus = () => {
    setCurrentScreen('risk-focus');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleRouteClick = (routeId: string) => {
    setSelectedRouteId(routeId);
    setCurrentScreen('route-detail');
  };

  const handleBackToRoutes = () => {
    setCurrentScreen('routes');
    setSelectedRouteId(null);
  };

  const handleOpenRouteMap = () => {
    setCurrentScreen('route-map');
  };

  const handleBackToRouteDetail = () => {
    setCurrentScreen('route-detail');
  };

  const handleDriverClick = (driverId: string) => {
    setSelectedDriverId(driverId);
    setCurrentScreen('driver-detail');
  };

  const handleBackToDrivers = () => {
    setCurrentScreen('drivers');
    setSelectedDriverId(null);
  };

  const handleOpenDriverTimeline = () => {
    setCurrentScreen('driver-timeline');
  };

  const handleBackToDriverDetail = () => {
    setCurrentScreen('driver-detail');
  };

  const handleOpenDriverImpactPreview = () => {
    setCurrentScreen('driver-impact');
  };

  const handleBackToDriverTimeline = () => {
    setCurrentScreen('driver-timeline');
  };

  const handleSelectDelivery = (deliveryId: string) => {
    setSelectedDeliveryId(deliveryId);
    setCurrentScreen('delivery-detail');
  };

  const handleSelectVIPDelivery = (deliveryId: string) => {
    setSelectedDeliveryId(deliveryId);
    setCurrentScreen('vip-delivery-detail');
  };

  const handleBackToDeliveries = () => {
    setCurrentScreen('deliveries');
    setSelectedDeliveryId(null);
  };

  const handleBackToVIPDeliveries = () => {
    setCurrentScreen('vip-deliveries');
    setSelectedDeliveryId(null);
  };

  const handleNavigateToVIPDeliveries = () => {
    setCurrentScreen('vip-deliveries');
  };

  const handleNavigateToAlerts = () => {
    setCurrentScreen('alerts');
  };

  const handleSelectAlert = (alertId: string) => {
    setSelectedAlertId(alertId);
    setCurrentScreen('alert-detail');
  };

  const handleBackToAlerts = () => {
    setCurrentScreen('alerts');
    setSelectedAlertId(null);
  };

  const handleNavigateToAlertHistory = () => {
    setCurrentScreen('alert-history');
  };

  const handleNavigateToRecoveryEntry = () => {
    setCurrentScreen('recovery-entry');
  };

  const handleNavigateToRecoveryBuilder = () => {
    setCurrentScreen('recovery-builder');
  };

  const handleNavigateToImpactReview = () => {
    setCurrentScreen('impact-review');
  };

  const handleNavigateToCommitReview = () => {
    setCurrentScreen('commit-review');
  };

  const handleNavigateToEscalationRequest = () => {
    setCurrentScreen('escalation-request');
  };

  const handleNavigateToEscalationStatus = () => {
    setCurrentScreen('escalation-status');
  };

  const handleNavigateToExecutionMonitor = () => {
    setCurrentScreen('execution-monitor');
  };

  const handleNavigateToExecutionDetail = () => {
    setCurrentScreen('execution-detail');
  };

  const handleNavigateToExecutionOutcome = () => {
    setCurrentScreen('execution-outcome');
  };

  // Authenticated screens with navigation
  if (selectedRole === 'dispatch-manager' && ['dashboard', 'risk-focus', 'routes', 'route-detail', 'route-map', 'drivers', 'driver-detail', 'driver-timeline', 'driver-impact', 'deliveries', 'delivery-detail', 'vip-deliveries', 'vip-delivery-detail', 'alerts', 'alert-detail', 'alert-history', 'recovery-entry', 'recovery-builder', 'impact-review', 'commit-review', 'post-commit', 'escalation-request', 'escalation-status', 'execution-monitor', 'execution-detail', 'execution-outcome'].includes(currentScreen)) {
    return (
      <div className="flex h-screen overflow-hidden">
        <NavigationSidebar 
          activeScreen={currentScreen === 'risk-focus' ? 'dashboard' : (currentScreen === 'route-detail' || currentScreen === 'route-map') ? 'routes' : (currentScreen === 'driver-detail' || currentScreen === 'driver-timeline' || currentScreen === 'driver-impact') ? 'drivers' : (currentScreen === 'delivery-detail') ? 'deliveries' : (currentScreen === 'vip-deliveries') ? 'vip-deliveries' : (currentScreen === 'alerts' || currentScreen === 'alert-detail' || currentScreen === 'alert-history') ? 'alerts' : (currentScreen === 'recovery-entry' || currentScreen === 'recovery-builder' || currentScreen === 'impact-review' || currentScreen === 'commit-review' || currentScreen === 'post-commit') ? 'recovery-entry' : (currentScreen === 'escalation-request' || currentScreen === 'escalation-status') ? 'escalation-request' : (currentScreen === 'execution-monitor' || currentScreen === 'execution-detail' || currentScreen === 'execution-outcome') ? 'execution-monitor' : currentScreen}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-auto">
          {currentScreen === 'risk-focus' && (
            <RiskFocusView onBack={handleBackToDashboard} />
          )}
          {currentScreen === 'dashboard' && (
            <OperationsDashboard onNavigateToRiskFocus={handleNavigateToRiskFocus} />
          )}
          {currentScreen === 'routes' && (
            <RoutesListScreen onRouteClick={handleRouteClick} />
          )}
          {currentScreen === 'route-detail' && selectedRouteId && (
            <RouteDetailScreen 
              routeId={selectedRouteId} 
              onBack={handleBackToRoutes}
              onOpenMap={handleOpenRouteMap}
            />
          )}
          {currentScreen === 'route-map' && selectedRouteId && (
            <RouteMapView 
              routeId={selectedRouteId} 
              onBack={handleBackToRouteDetail}
              onStopClick={(stopId) => {
                console.log(`Navigate to stop ${stopId} detail`);
                handleBackToRouteDetail();
              }}
            />
          )}
          {currentScreen === 'drivers' && (
            <DriversOverviewScreen onDriverClick={handleDriverClick} />
          )}
          {currentScreen === 'driver-detail' && selectedDriverId && (
            <DriverDetailScreen 
              driverId={selectedDriverId} 
              onBack={handleBackToDrivers}
              onOpenTimeline={handleOpenDriverTimeline}
              onOpenImpactPreview={handleOpenDriverImpactPreview}
            />
          )}
          {currentScreen === 'driver-timeline' && selectedDriverId && (
            <DriverAvailabilityTimeline 
              driverId={selectedDriverId} 
              onBack={handleBackToDriverDetail}
            />
          )}
          {currentScreen === 'driver-impact' && selectedDriverId && (
            <DriverImpactPreview 
              driverId={selectedDriverId} 
              onBack={handleBackToDriverTimeline}
            />
          )}
          {currentScreen === 'deliveries' && (
            <DeliveriesListScreen onSelectDelivery={handleSelectDelivery} />
          )}
          {currentScreen === 'delivery-detail' && selectedDeliveryId && (
            <DeliveryDetailScreen 
              deliveryId={selectedDeliveryId} 
              onBack={handleBackToDeliveries}
            />
          )}
          {currentScreen === 'vip-deliveries' && (
            <VIPDeliveriesView onSelectDelivery={handleSelectVIPDelivery} />
          )}
          {currentScreen === 'vip-delivery-detail' && selectedDeliveryId && (
            <VIPDeliveryDetail 
              deliveryId={selectedDeliveryId} 
              onBack={handleBackToVIPDeliveries}
            />
          )}
          {currentScreen === 'alerts' && (
            <AlertsQueueScreen onSelectAlert={handleSelectAlert} />
          )}
          {currentScreen === 'alert-detail' && selectedAlertId && (
            <AlertDetailScreen 
              alertId={selectedAlertId} 
              onBack={handleBackToAlerts}
              onOpenRecovery={handleNavigateToRecoveryEntry}
            />
          )}
          {currentScreen === 'alert-history' && (
            <AlertHistoryScreen onBack={handleBackToAlerts} />
          )}
          {currentScreen === 'recovery-entry' && (
            <RecoveryEntryContext 
              recoveryId="REC-2847-001"
              triggerSource="alert"
              onBack={handleBackToAlerts}
              onDraftRecoveryPlan={handleNavigateToRecoveryBuilder}
            />
          )}
          {currentScreen === 'recovery-builder' && (
            <RecoveryOptionBuilder 
              recoveryId="REC-2847-001"
              onBack={() => setCurrentScreen('recovery-entry')}
              onProceedToImpactReview={handleNavigateToImpactReview}
            />
          )}
          {currentScreen === 'impact-review' && (
            <ImpactReview 
              recoveryId="REC-2847-001"
              onBack={() => setCurrentScreen('recovery-builder')}
              onProceedToCommitReview={handleNavigateToCommitReview}
              onRequestEscalation={handleNavigateToEscalationRequest}
            />
          )}
          {currentScreen === 'commit-review' && (
            <CommitReview 
              recoveryId="REC-2847-001"
              onBack={() => setCurrentScreen('impact-review')}
              onCommit={(justification) => {
                console.log('Recovery committed with justification:', justification);
                alert('Recovery plan committed successfully!');
                setCurrentScreen('post-commit');
              }}
            />
          )}
          {currentScreen === 'post-commit' && (
            <PostCommitConfirmation 
              recoveryId="REC-2847-001"
              onViewExecutionMonitor={() => {
                console.log('Navigate to execution monitor');
                setCurrentScreen('dashboard');
              }}
              onViewDecisionHistory={() => {
                console.log('Navigate to decision history');
                setCurrentScreen('alert-history');
              }}
              onReturnToDashboard={() => setCurrentScreen('dashboard')}
            />
          )}
          {currentScreen === 'escalation-request' && (
            <EscalationRequest 
              recoveryId="REC-2847-001"
              onCancel={() => setCurrentScreen('impact-review')}
              onSubmitEscalation={(justification) => {
                console.log('Escalation submitted with justification:', justification);
                alert('Escalation request submitted!');
                setCurrentScreen('escalation-status');
              }}
            />
          )}
          {currentScreen === 'escalation-status' && (
            <EscalationStatus 
              escalationId="ESC-2847-001"
              onBack={() => setCurrentScreen('impact-review')}
              onProceedToCommitReview={handleNavigateToCommitReview}
              onReviseRecoveryPlan={() => setCurrentScreen('recovery-builder')}
              onViewDecisionHistory={() => setCurrentScreen('alert-history')}
            />
          )}
          {currentScreen === 'execution-monitor' && (
            <ExecutionMonitor 
              onViewExecutionDetail={handleNavigateToExecutionDetail}
            />
          )}
          {currentScreen === 'execution-detail' && (
            <ExecutionDetail 
              commitId="CMT-2847-001"
              onBack={() => setCurrentScreen('execution-monitor')}
              onViewRoute={(routeId) => {
                setSelectedRouteId(routeId);
                setCurrentScreen('route-detail');
              }}
              onViewDriver={(driverId) => {
                setSelectedDriverId(driverId);
                setCurrentScreen('driver-detail');
              }}
              onViewDelivery={(deliveryId) => {
                setSelectedDeliveryId(deliveryId);
                setCurrentScreen('delivery-detail');
              }}
              onCreateException={() => setCurrentScreen('alerts')}
            />
          )}
          {currentScreen === 'execution-outcome' && (
            <ExecutionOutcome 
              commitId="CMT-2847-001"
              recoveryId="REC-2847-001"
              onBack={() => setCurrentScreen('execution-detail')}
              onCloseRecovery={(closureReason, notes) => {
                console.log('Recovery closed:', closureReason, notes);
                alert('Recovery closed successfully!');
                setCurrentScreen('dashboard');
              }}
              onViewDecisionHistory={() => setCurrentScreen('alert-history')}
              onViewEvidenceSnapshot={() => console.log('View evidence snapshot')}
              onViewEscalationRecord={() => setCurrentScreen('escalation-status')}
            />
          )}
        </div>
      </div>
    );
  }

  if (selectedRole === 'operations-manager' && ['ops-dashboard', 'ops-escalations', 'ops-escalation-review', 'ops-sla-risk', 'ops-execution', 'ops-outcomes', 'ops-audit'].includes(currentScreen)) {
    return (
      <div className="flex h-screen overflow-hidden">
        <OperationsManagerSidebar 
          activeScreen={currentScreen}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-auto">
          {currentScreen === 'ops-dashboard' && (
            <OperationsManagerDashboard 
              onNavigateToEscalations={() => setCurrentScreen('ops-escalations')}
              onNavigateToExecutionOversight={() => setCurrentScreen('ops-execution')}
              onNavigateToOutcomes={() => setCurrentScreen('ops-outcomes')}
            />
          )}
          {currentScreen === 'ops-escalations' && (
            <EscalationQueue 
              onSelectEscalation={(escalationId) => setCurrentScreen('ops-escalation-review')}
            />
          )}
          {currentScreen === 'ops-escalation-review' && (
            <EscalationReview 
              escalationId="ESC-2847-001"
              onBack={() => setCurrentScreen('ops-escalations')}
              onApprove={(justification, constraints) => {
                console.log('Escalation approved:', justification, constraints);
                alert('Escalation approved!');
                setCurrentScreen('ops-escalations');
              }}
              onReject={(justification) => {
                console.log('Escalation rejected:', justification);
                alert('Escalation rejected!');
                setCurrentScreen('ops-escalations');
              }}
            />
          )}
          {currentScreen === 'ops-sla-risk' && (
            <SLARiskOversight 
              onBack={() => setCurrentScreen('ops-dashboard')}
            />
          )}
          {currentScreen === 'ops-execution' && (
            <ExecutionOversight 
              onBack={() => setCurrentScreen('ops-dashboard')}
            />
          )}
          {currentScreen === 'ops-outcomes' && (
            <OperationsOutcomes />
          )}
          {currentScreen === 'ops-audit' && (
            <OperationsAudit />
          )}
        </div>
      </div>
    );
  }

  if (selectedRole === 'fleet-supervisor' && ['fleet-dashboard', 'fleet-drivers', 'fleet-vehicles', 'fleet-capacity', 'fleet-exceptions', 'fleet-activity'].includes(currentScreen)) {
    return (
      <div className="flex h-screen overflow-hidden">
        <FleetSupervisorSidebar 
          activeScreen={currentScreen}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-auto">
          {currentScreen === 'fleet-dashboard' && (
            <FleetSupervisorDashboard onNavigate={handleNavigate} />
          )}
          {currentScreen === 'fleet-drivers' && (
            <FleetDriversManagement />
          )}
          {currentScreen === 'fleet-vehicles' && (
            <FleetVehiclesManagement />
          )}
          {currentScreen === 'fleet-capacity' && (
            <FleetCapacitySignals />
          )}
          {currentScreen === 'fleet-exceptions' && (
            <FleetExceptions />
          )}
          {currentScreen === 'fleet-activity' && (
            <FleetActivityLog />
          )}
        </div>
      </div>
    );
  }

  if (selectedRole === 'tenant-admin' && ['tenant-first-login', 'tenant-dashboard', 'tenant-settings', 'tenant-roles', 'tenant-users', 'tenant-activity', 'tenant-support'].includes(currentScreen)) {
    // Determine if workspace is ready (at least one non-admin user has a role assigned)
    const workspaceReady = false;

    return (
      <div className="flex h-screen overflow-hidden">
        <TenantAdminSidebar 
          activeScreen={currentScreen}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          workspaceReady={workspaceReady}
        />
        <div className="flex-1 overflow-auto">
          {!workspaceReady && currentScreen === 'tenant-first-login' && (
            <TenantAdminFirstLogin 
              onAddUser={() => setCurrentScreen('tenant-users')}
            />
          )}
          {currentScreen === 'tenant-dashboard' && workspaceReady && (
            <TenantDashboard onNavigate={handleNavigate} />
          )}
          {currentScreen === 'tenant-settings' && (
            <TenantSettings />
          )}
          {currentScreen === 'tenant-roles' && (
            <TenantRolesModule />
          )}
          {currentScreen === 'tenant-users' && (
            <TenantUsersModule 
              setupMode={!workspaceReady}
              onFirstUserAdded={() => {
                // Stay on users screen after first user is added in Draft status
              }}
              onFirstRoleAssigned={() => {
                // Mark that first role has been assigned (workspace becomes ready)
                setTenantSetupComplete(true);
              }}
            />
          )}
          {currentScreen === 'tenant-activity' && (
            <TenantActivityLog />
          )}
          {currentScreen === 'tenant-support' && (
            <TenantSupportModule />
          )}
        </div>
      </div>
    );
  }

  if (selectedRole === 'super-admin' && ['superadmin-dashboard', 'superadmin-tenants', 'superadmin-subscriptions', 'superadmin-support', 'superadmin-settings'].includes(currentScreen)) {
    return (
      <div className="flex h-screen overflow-hidden">
        <SuperAdminSidebar 
          activeScreen={currentScreen}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
        <div className="flex-1 overflow-auto">
          {currentScreen === 'superadmin-dashboard' && (
            <SuperAdminDashboard />
          )}
          {currentScreen === 'superadmin-tenants' && (
            <SuperAdminTenants />
          )}
          {currentScreen === 'superadmin-subscriptions' && (
            <SuperAdminSubscriptions />
          )}
          {currentScreen === 'superadmin-support' && (
            <SuperAdminSupport />
          )}
          {currentScreen === 'superadmin-settings' && (
            <SuperAdminSettings />
          )}
        </div>
      </div>
    );
  }

  // Driver Mobile App (no sidebar, mobile-first)
  if (selectedRole === 'driver' && currentScreen === 'driver-mobile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
        {/* Mobile Phone Frame */}
        <div className="relative w-full max-w-md">
          {/* Phone Bezel */}
          <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
            {/* Phone Screen */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden relative">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50"></div>
              
              {/* Screen Content */}
              <div className="relative h-[812px] overflow-hidden">
                <DriverMobileApp />
              </div>
            </div>
          </div>
          
          {/* Logout Button (Outside Phone) */}
          <button
            onClick={handleLogout}
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white text-gray-700 px-6 py-3 rounded-xl shadow-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Exit Demo
          </button>
        </div>
      </div>
    );
  }

  if (currentScreen === 'login' && selectedRole) {
    return (
      <LoginScreen 
        roleId={selectedRole}
        onBack={handleBackToRoleSelection}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentScreen === 'role-selection') {
    return <RoleSelection onRoleSelect={handleRoleSelect} onBackToHome={() => setCurrentScreen('home')} />;
  }

  return <Homepage onGetStarted={handleGetStarted} />;
}