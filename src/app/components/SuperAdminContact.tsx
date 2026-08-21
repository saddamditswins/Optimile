import { useState } from 'react';
import { SuperAdminContactOverview } from './SuperAdminContactOverview';
import { SuperAdminTicketList } from './SuperAdminTicketList';
import { SuperAdminTicketDetail } from './SuperAdminTicketDetail';

export function SuperAdminContact() {
  const [currentView, setCurrentView] = useState<'overview' | 'tickets'>('overview');
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleViewTickets = () => {
    setCurrentView('tickets');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
  };

  const handleViewTicket = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setShowTicketDetail(true);
  };

  const handleCloseTicket = () => {
    setShowTicketDetail(false);
    setSelectedTicketId(null);
  };

  const handleNavigateToTenant = () => {
    // In real app, would navigate to Tenant Management module
    alert('Navigating to Tenant Management...');
    setShowTicketDetail(false);
  };

  return (
    <>
      {currentView === 'overview' && (
        <SuperAdminContactOverview onViewTickets={handleViewTickets} />
      )}
      
      {currentView === 'tickets' && (
        <SuperAdminTicketList 
          onBack={handleBackToOverview}
          onViewTicket={handleViewTicket}
        />
      )}
      
      {showTicketDetail && selectedTicketId && (
        <SuperAdminTicketDetail 
          ticketId={selectedTicketId}
          onClose={handleCloseTicket}
          onNavigateToTenant={handleNavigateToTenant}
        />
      )}
    </>
  );
}
