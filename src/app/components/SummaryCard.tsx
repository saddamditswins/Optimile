interface SummaryCardProps {
  title: string;
  count: number;
  severity: 'neutral' | 'warning' | 'critical';
  icon: React.ReactNode;
  onClick: () => void;
}

export function SummaryCard({ title, count, severity, icon, onClick }: SummaryCardProps) {
  const getSeverityStyles = () => {
    switch (severity) {
      case 'critical':
        return {
          bg: 'bg-red-50 hover:bg-red-100',
          border: 'border-red-200',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          countColor: 'text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 hover:bg-amber-100',
          border: 'border-amber-200',
          iconBg: 'bg-amber-100',
          iconColor: 'text-amber-600',
          countColor: 'text-amber-700'
        };
      case 'neutral':
        return {
          bg: 'bg-blue-50 hover:bg-blue-100',
          border: 'border-blue-200',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          countColor: 'text-blue-700'
        };
    }
  };

  const styles = getSeverityStyles();

  return (
    <button
      onClick={onClick}
      className={`${styles.bg} ${styles.border} border rounded-lg p-5 text-left transition-all duration-200 hover:shadow-md cursor-pointer group`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${styles.iconBg} p-3 rounded-lg ${styles.iconColor}`}>
          {icon}
        </div>
      </div>
      
      <div className="mb-1">
        <div className={`text-3xl ${styles.countColor}`}>
          {count}
        </div>
      </div>
      
      <div className="text-foreground text-sm">
        {title}
      </div>

      <div className="mt-3 flex items-center gap-1 text-muted-foreground text-xs opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View details</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}