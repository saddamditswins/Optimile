import { useState } from 'react';
import { 
  Radio, 
  MapPin, 
  Clock, 
  TrendingUp, 
  ChevronLeft,
  Filter,
  Target,
  RefreshCw
} from 'lucide-react';
import { RiskFilterPanel } from './RiskFilterPanel';
import { RiskDistribution } from './RiskDistribution';
import { HighRiskEntityRow } from './HighRiskEntityRow';

export interface RiskFilters {
  riskTypes: string[];
  depots: string[];
  timeToBreachWindow: string;
}

export interface HighRiskEntity {
  id: string;
  entityId: string;
  entityType: 'Route' | 'Delivery';
  riskCount: number;
  worstSlaCountdown: number; // minutes
  status: string;
  severity: 'critical' | 'high' | 'medium';
}

interface RiskFocusViewProps {
  onBack: () => void;
}

export function RiskFocusView({ onBack }: RiskFocusViewProps) {
  const [filters, setFilters] = useState<RiskFilters>({
    riskTypes: [],
    depots: [],
    timeToBreachWindow: 'all'
  });

  const [lastUpdated] = useState<Date>(new Date());

  // Mock data for high-risk entities
  const highRiskEntities: HighRiskEntity[] = [
    {
      id: '1',
      entityId: 'RT-2847',
      entityType: 'Route',
      riskCount: 4,
      worstSlaCountdown: 12,
      status: 'In Transit',
      severity: 'critical'
    },
    {
      id: '2',
      entityId: 'RT-3901',
      entityType: 'Route',
      riskCount: 3,
      worstSlaCountdown: 25,
      status: 'In Transit',
      severity: 'high'
    },
    {
      id: '3',
      entityId: 'DL-9234',
      entityType: 'Delivery',
      riskCount: 2,
      worstSlaCountdown: 18,
      status: 'Attempted',
      severity: 'critical'
    },
    {
      id: '4',
      entityId: 'RT-4523',
      entityType: 'Route',
      riskCount: 2,
      worstSlaCountdown: 45,
      status: 'In Transit',
      severity: 'high'
    },
    {
      id: '5',
      entityId: 'DL-7612',
      entityType: 'Delivery',
      riskCount: 2,
      worstSlaCountdown: 31,
      status: 'Delayed',
      severity: 'high'
    },
    {
      id: '6',
      entityId: 'RT-5891',
      entityType: 'Route',
      riskCount: 1,
      worstSlaCountdown: 52,
      status: 'In Transit',
      severity: 'medium'
    },
    {
      id: '7',
      entityId: 'DL-5698',
      entityType: 'Delivery',
      riskCount: 1,
      worstSlaCountdown: 58,
      status: 'Pending',
      severity: 'medium'
    },
    {
      id: '8',
      entityId: 'RT-6734',
      entityType: 'Route',
      riskCount: 1,
      worstSlaCountdown: 67,
      status: 'In Transit',
      severity: 'medium'
    }
  ];

  // Filter entities based on selected filters
  const filteredEntities = highRiskEntities.filter(entity => {
    // Time to breach filter
    if (filters.timeToBreachWindow !== 'all') {
      if (filters.timeToBreachWindow === '<30' && entity.worstSlaCountdown >= 30) return false;
      if (filters.timeToBreachWindow === '30-60' && (entity.worstSlaCountdown < 30 || entity.worstSlaCountdown > 60)) return false;
      if (filters.timeToBreachWindow === '>60' && entity.worstSlaCountdown <= 60) return false;
    }
    return true;
  });

  const handleEntityClick = (entity: HighRiskEntity) => {
    console.log(`Navigate to ${entity.entityType} detail: ${entity.entityId}`);
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) return '1 min ago';
    return `${minutes} min ago`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Global Context Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-slate-900">Risk Focus View</h1>
                <p className="text-slate-600 text-xs">Analyze risk patterns and distribution</p>
              </div>
            </div>

            {/* Data Freshness */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                <span className="text-sm">Live</span>
              </div>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600">Updated {formatTimeAgo(lastUpdated)}</span>
              <button
                className="ml-2 p-1.5 hover:bg-slate-100 rounded-md transition-colors"
                title="Refresh data"
              >
                <RefreshCw className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Context Row */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Wednesday, Dec 31, 2025</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Morning Shift (6:00 AM - 2:00 PM)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Central Depot · Northeast Region</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Page Title */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-6 h-6 text-amber-600" />
              <h2 className="text-slate-900">Risk Analysis & Distribution</h2>
            </div>
            <p className="text-slate-600">
              Filter and analyze risk patterns across routes, drivers, and depots to identify priority areas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Filters */}
            <div className="lg:col-span-3">
              <RiskFilterPanel filters={filters} onFiltersChange={setFilters} />
            </div>

            {/* Right Column: Distribution and List */}
            <div className="lg:col-span-9 space-y-6">
              {/* Risk Distribution */}
              <RiskDistribution filters={filters} />

              {/* High-Risk Entities List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
                <div className="border-b border-slate-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-slate-900">High-Risk Entities</h3>
                      <p className="text-slate-600 text-sm mt-0.5">
                        Ranked by number of associated risks and SLA urgency
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {filteredEntities.length} of {highRiskEntities.length} entities
                      </span>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredEntities.map((entity, index) => (
                    <HighRiskEntityRow
                      key={entity.id}
                      entity={entity}
                      rank={index + 1}
                      onClick={() => handleEntityClick(entity)}
                    />
                  ))}
                </div>

                {filteredEntities.length === 0 && (
                  <div className="px-6 py-12 text-center">
                    <Target className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600">No entities match the selected filters</p>
                    <button
                      onClick={() => setFilters({ riskTypes: [], depots: [], timeToBreachWindow: 'all' })}
                      className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}