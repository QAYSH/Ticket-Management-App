import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export type TicketStatus = 'open' | 'in_progress' | 'closed';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

interface TicketContextType {
  tickets: Ticket[];
  loading: boolean;
  createTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTicket: (id: string, updates: Partial<Ticket>) => void;
  deleteTicket: (id: string) => void;
  getTicketById: (id: string) => Ticket | undefined;
  getTicketsByStatus: (status: TicketStatus) => Ticket[];
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

const TICKETS_KEY = 'ticketapp_tickets';

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    try {
      const storedTickets = localStorage.getItem(TICKETS_KEY);
      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
    } catch (error) {
      console.error('Failed to load tickets:', error);
      toast.error('Failed to load tickets. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  const saveTickets = (newTickets: Ticket[]) => {
    try {
      localStorage.setItem(TICKETS_KEY, JSON.stringify(newTickets));
      setTickets(newTickets);
    } catch (error) {
      console.error('Failed to save tickets:', error);
      toast.error('Failed to save changes. Please try again.');
    }
  };

  const createTicket = (ticketData: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTickets = [...tickets, newTicket];
    saveTickets(updatedTickets);
    toast.success('Ticket created successfully.');
  };

  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    const updatedTickets = tickets.map(ticket =>
      ticket.id === id
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    );
    saveTickets(updatedTickets);
    toast.success('Ticket updated successfully.');
  };

  const deleteTicket = (id: string) => {
    const updatedTickets = tickets.filter(ticket => ticket.id !== id);
    saveTickets(updatedTickets);
    toast.success('Ticket deleted successfully.');
  };

  const getTicketById = (id: string) => {
    return tickets.find(ticket => ticket.id === id);
  };

  const getTicketsByStatus = (status: TicketStatus) => {
    return tickets.filter(ticket => ticket.status === status);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        loading,
        createTicket,
        updateTicket,
        deleteTicket,
        getTicketById,
        getTicketsByStatus,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};
