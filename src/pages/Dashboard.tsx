import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTickets } from '@/context/TicketContext';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import StatCard from '@/components/StatCard';
import { TicketIcon, CircleDot, CheckCircle2, Clock, LogOut } from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tickets, getTicketsByStatus } = useTickets();
  const navigate = useNavigate();

  const totalTickets = tickets.length;
  const openTickets = getTicketsByStatus('open').length;
  const inProgressTickets = getTicketsByStatus('in_progress').length;
  const closedTickets = getTicketsByStatus('closed').length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-secondary/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container-constrained py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground hidden sm:block">
                Welcome, <span className="font-medium text-foreground">{user?.name}</span>
              </p>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container-constrained">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h2>
            <p className="text-muted-foreground">
              Here's an overview of your tickets and their current status
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Tickets"
              value={totalTickets}
              icon={TicketIcon}
              color="primary"
            />
            <StatCard
              title="Open Tickets"
              value={openTickets}
              icon={CircleDot}
              color="open"
            />
            <StatCard
              title="In Progress"
              value={inProgressTickets}
              icon={Clock}
              color="in-progress"
            />
            <StatCard
              title="Resolved"
              value={closedTickets}
              icon={CheckCircle2}
              color="closed"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-xl p-8 shadow-md border border-border">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="sm:w-auto">
                <Link to="/tickets">
                  <TicketIcon className="h-4 w-4 mr-2" />
                  Manage Tickets
                </Link>
              </Button>
              <Button asChild variant="outline" className="sm:w-auto">
                <Link to="/tickets?create=true">
                  Create New Ticket
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
