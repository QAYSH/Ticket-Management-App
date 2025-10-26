import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTickets, Ticket } from '@/context/TicketContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Footer from '@/components/Footer';
import TicketCard from '@/components/TicketCard';
import TicketForm from '@/components/TicketForm';
import { Plus, ArrowLeft, LogOut, Menu } from 'lucide-react';

const Tickets = () => {
  const { logout } = useAuth();
  const { tickets, loading, createTicket, updateTicket, deleteTicket, getTicketsByStatus } = useTickets();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('create') === 'true') {
      setIsFormOpen(true);
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const handleCreateTicket = (data: { title: string; description: string; status: any }) => {
    createTicket(data);
    setIsFormOpen(false);
  };

  const handleUpdateTicket = (data: { title: string; description: string; status: any }) => {
    if (editingTicket) {
      updateTicket(editingTicket.id, data);
      setEditingTicket(undefined);
      setIsFormOpen(false);
    }
  };

  const handleEditClick = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setTicketToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (ticketToDelete) {
      deleteTicket(ticketToDelete);
      setTicketToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTicket(undefined);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getFilteredTickets = () => {
    switch (activeTab) {
      case 'open':
        return getTicketsByStatus('open');
      case 'in_progress':
        return getTicketsByStatus('in_progress');
      case 'closed':
        return getTicketsByStatus('closed');
      default:
        return tickets;
    }
  };

  const filteredTickets = getFilteredTickets();

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="container-constrained py-4 px-4 sm:px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <h1 className="text-xl sm:text-2xl font-bold truncate">Ticket Management</h1>
            </div>

            {/* Right Section (Desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 flex flex-col gap-3 sm:hidden">
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Ticket
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8 sm:py-12">
        <div className="container-constrained">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="all">
                All ({tickets.length})
              </TabsTrigger>
              <TabsTrigger value="open">
                Open ({getTicketsByStatus('open').length})
              </TabsTrigger>
              <TabsTrigger value="in_progress">
                In Progress ({getTicketsByStatus('in_progress').length})
              </TabsTrigger>
              <TabsTrigger value="closed">
                Closed ({getTicketsByStatus('closed').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6">
              {loading ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Loading tickets...</p>
                </div>
              ) : filteredTickets.length === 0 ? (
                <div className="text-center py-12 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground mb-4">
                    {activeTab === 'all'
                      ? 'No tickets yet. Create your first ticket to get started!'
                      : `No ${activeTab.replace('_', ' ')} tickets.`}
                  </p>
                  {activeTab === 'all' && (
                    <Button onClick={() => setIsFormOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Ticket
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTickets.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      onEdit={handleEditClick}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Ticket Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={handleCloseForm}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
            </DialogTitle>
          </DialogHeader>
          <TicketForm
            ticket={editingTicket}
            onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
            onCancel={handleCloseForm}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Tickets;
