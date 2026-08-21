import { Clock, ChevronRight, TrendingDown, AlertTriangle, AlertCircle, PackageX } from 'lucide-react';

interface PriorityIssue {
  id: string;
  type: 'Route Risk' | 'Delivery Risk' | 'Exception';
  entityId: string;
  riskDriver: string;
  slaCountdown: number; // minutes remaining
  severity: 'critical' | 'high' | 'medium';
}

interface PriorityIssueRowProps {
  issue: PriorityIssue;
  rank: number;
  onClick: () => void;
}

export function PriorityIssueRow({ issue, rank, onClick }: PriorityIssueRowProps) {
  const formatTimeRemaining = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getSeverityStyles = () => {
    switch (issue.severity) {
      case 'critical':
        return {
          badge: 'bg-red-100 text-red-700 border-red-200',
          rankBg: 'bg-red-100 text-red-700',
          timerBg: 'bg-red-50 border-red-200 text-red-700',
          pulse: 'animate-pulse'
        };
      case 'high':
        return {
          badge: 'bg-amber-100 text-amber-700 border-amber-200',
          rankBg: 'bg-amber-100 text-amber-700',
          timerBg: 'bg-amber-50 border-amber-200 text-amber-700',
          pulse: ''
        };
      case 'medium':
        return {
          badge: 'bg-yellow-100 text-yellow-700 border-yellow-200',
          rankBg: 'bg-yellow-100 text-yellow-700',
          timerBg: 'bg-yellow-50 border-yellow-200 text-yellow-700',
          pulse: ''
        };
    }
  };

  const getTypeIcon = () => {
    switch (issue.type) {
      case 'Route Risk':
        return <TrendingDown className="w-4 h-4" />;
      case 'Delivery Risk':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Exception':
        return <PackageX className="w-4 h-4" />;
    }
  };

  const styles = getSeverityStyles();

  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-4 hover:bg-accent transition-colors duration-150 flex items-center gap-4 group"
    >
      {/* Rank */}
      <div className={`${styles.rankBg} w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <span className="text-sm">{rank}</span>
      </div>

      {/* Issue Type Badge */}
      <div className={`${styles.badge} border px-3 py-1.5 rounded-lg flex items-center gap-2 flex-shrink-0`}>
        {getTypeIcon()}
        <span className="text-sm">{issue.type}</span>
      </div>

      {/* Entity ID */}
      <div className="flex-shrink-0">
        <span className="text-foreground">{issue.entityId}</span>
      </div>

      {/* Risk Driver - Takes remaining space */}
      <div className="flex-1 text-left">
        <p className="text-muted-foreground text-sm">{issue.riskDriver}</p>
      </div>

      {/* SLA Countdown Timer */}
      <div className={`${styles.timerBg} ${styles.pulse} border px-4 py-2 rounded-lg flex items-center gap-2 flex-shrink-0`}>
        <Clock className="w-4 h-4" />
        <span className="text-sm">{formatTimeRemaining(issue.slaCountdown)}</span>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
    </button>
  );
}