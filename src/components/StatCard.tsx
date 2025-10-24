import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'primary' | 'open' | 'in-progress' | 'closed';
}

const colorClasses = {
  primary: 'text-primary bg-primary/10',
  open: 'text-status-open bg-status-open/10',
  'in-progress': 'text-status-in-progress bg-status-in-progress/10',
  closed: 'text-status-closed bg-status-closed/10',
};

const StatCard = ({ title, value, icon: Icon, color }: StatCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
