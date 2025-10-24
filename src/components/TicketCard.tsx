import { Ticket } from '@/context/TicketContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface TicketCardProps {
  ticket: Ticket;
  onEdit: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

const statusConfig = {
  open: {
    label: 'Open',
    className: 'bg-status-open text-status-open-foreground hover:bg-status-open/90',
  },
  in_progress: {
    label: 'In Progress',
    className: 'bg-status-in-progress text-status-in-progress-foreground hover:bg-status-in-progress/90',
  },
  closed: {
    label: 'Closed',
    className: 'bg-status-closed text-status-closed-foreground hover:bg-status-closed/90',
  },
};

const TicketCard = ({ ticket, onEdit, onDelete }: TicketCardProps) => {
  const statusInfo = statusConfig[ticket.status];

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-2">{ticket.title}</CardTitle>
          <Badge className={statusInfo.className}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
          {ticket.description || 'No description provided'}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <p>Created: {format(new Date(ticket.createdAt), 'MMM d, yyyy')}</p>
            {ticket.updatedAt !== ticket.createdAt && (
              <p>Updated: {format(new Date(ticket.updatedAt), 'MMM d, yyyy')}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(ticket)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Edit ticket"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(ticket.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive hover:text-destructive-foreground"
              aria-label="Delete ticket"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketCard;
