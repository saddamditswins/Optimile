import { Lock, Coffee, Calendar } from 'lucide-react';

interface TimelineBlockData {
  id: string;
  type: 'locked-stop' | 'flexible-window' | 'break' | 'buffer';
  label: string;
  startMinutes: number;
  endMinutes: number;
  status: 'completed' | 'in-progress' | 'pending';
  stopsCount: number;
  capacityUsed: number;
  riskLevel?: 'low' | 'medium' | 'high';
}

interface TimelineBlockProps {
  block: TimelineBlockData;
  startPosition: number;
  endPosition: number;
}

export function TimelineBlock({ block, startPosition, endPosition }: TimelineBlockProps) {
  const width = endPosition - startPosition;

  const getBlockStyle = () => {
    const baseClasses = 'absolute top-2 bottom-2 rounded border-2 transition-all hover:shadow-md cursor-pointer';
    
    // Determine base color based on type
    let colorClasses = '';
    let borderStyle = '';
    
    if (block.status === 'completed') {
      colorClasses = 'bg-slate-300 border-slate-400';
    } else if (block.status === 'in-progress') {
      colorClasses = 'bg-blue-500 border-blue-600';
    } else {
      // Pending blocks
      switch (block.type) {
        case 'locked-stop':
          colorClasses = 'bg-blue-100 border-blue-300';
          break;
        case 'flexible-window':
          colorClasses = 'bg-purple-100 border-purple-300';
          borderStyle = 'border-dashed';
          break;
        case 'break':
          colorClasses = 'bg-green-100 border-green-300';
          break;
        case 'buffer':
          colorClasses = 'bg-slate-100 border-slate-300';
          break;
      }
    }

    // Add risk indicator for flexible windows
    if (block.type === 'flexible-window' && block.riskLevel === 'high') {
      colorClasses = 'bg-amber-100 border-amber-400';
    }

    return `${baseClasses} ${colorClasses} ${borderStyle}`;
  };

  const getIcon = () => {
    switch (block.type) {
      case 'locked-stop':
        return <Lock className="w-3 h-3" />;
      case 'break':
        return <Coffee className="w-3 h-3" />;
      case 'flexible-window':
        return <Calendar className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getTextColor = () => {
    if (block.status === 'completed') return 'text-slate-700';
    if (block.status === 'in-progress') return 'text-white';
    
    switch (block.type) {
      case 'locked-stop':
        return 'text-blue-700';
      case 'flexible-window':
        return block.riskLevel === 'high' ? 'text-amber-800' : 'text-purple-700';
      case 'break':
        return 'text-green-700';
      case 'buffer':
        return 'text-slate-600';
      default:
        return 'text-slate-700';
    }
  };

  // Don't show text if block is too narrow
  const showText = width > 8;

  return (
    <div
      className={getBlockStyle()}
      style={{
        left: `${startPosition}%`,
        width: `${width}%`
      }}
      title={`${block.label} - ${block.stopsCount} stops, ${block.capacityUsed} packages`}
    >
      {showText && (
        <div className="h-full flex items-center justify-center px-2">
          <div className={`flex items-center gap-1 text-xs ${getTextColor()}`}>
            {getIcon()}
            <span className="truncate">{block.label}</span>
          </div>
        </div>
      )}

      {/* Risk indicator for high-risk flexible windows */}
      {block.type === 'flexible-window' && block.riskLevel === 'high' && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
      )}
    </div>
  );
}
