import { Filter, X } from 'lucide-react';
import { RiskFilters } from './RiskFocusView';

interface RiskFilterPanelProps {
  filters: RiskFilters;
  onFiltersChange: (filters: RiskFilters) => void;
}

export function RiskFilterPanel({ filters, onFiltersChange }: RiskFilterPanelProps) {
  const riskTypeOptions = [
    { id: 'sla', label: 'SLA Risk' },
    { id: 'capacity', label: 'Capacity Issue' },
    { id: 'driver-delay', label: 'Driver Delay' },
    { id: 'exception', label: 'Exception' }
  ];

  const depotOptions = [
    { id: 'central', label: 'Central Depot' },
    { id: 'north', label: 'North Hub' },
    { id: 'south', label: 'South Hub' },
    { id: 'east', label: 'East Station' }
  ];

  const timeWindows = [
    { id: 'all', label: 'All Time Windows' },
    { id: '<30', label: 'Critical (<30 min)' },
    { id: '30-60', label: 'High (30-60 min)' },
    { id: '>60', label: 'Medium (>60 min)' }
  ];

  const toggleRiskType = (typeId: string) => {
    const newTypes = filters.riskTypes.includes(typeId)
      ? filters.riskTypes.filter(t => t !== typeId)
      : [...filters.riskTypes, typeId];
    onFiltersChange({ ...filters, riskTypes: newTypes });
  };

  const toggleDepot = (depotId: string) => {
    const newDepots = filters.depots.includes(depotId)
      ? filters.depots.filter(d => d !== depotId)
      : [...filters.depots, depotId];
    onFiltersChange({ ...filters, depots: newDepots });
  };

  const setTimeWindow = (windowId: string) => {
    onFiltersChange({ ...filters, timeToBreachWindow: windowId });
  };

  const clearAllFilters = () => {
    onFiltersChange({ riskTypes: [], depots: [], timeToBreachWindow: 'all' });
  };

  const activeFilterCount = 
    filters.riskTypes.length + 
    filters.depots.length + 
    (filters.timeToBreachWindow !== 'all' ? 1 : 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-6 sticky top-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-600" />
          <h3 className="text-slate-900">Filters</h3>
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Risk Type Filter */}
      <div>
        <label className="block text-slate-700 text-sm mb-3">Risk Type</label>
        <div className="space-y-2">
          {riskTypeOptions.map(option => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.riskTypes.includes(option.id)}
                onChange={() => toggleRiskType(option.id)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <span className="text-slate-700 text-sm group-hover:text-slate-900">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Depot/Region Filter */}
      <div className="pt-4 border-t border-slate-200">
        <label className="block text-slate-700 text-sm mb-3">Depot / Region</label>
        <div className="space-y-2">
          {depotOptions.map(option => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.depots.includes(option.id)}
                onChange={() => toggleDepot(option.id)}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <span className="text-slate-700 text-sm group-hover:text-slate-900">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Time to Breach Window */}
      <div className="pt-4 border-t border-slate-200">
        <label className="block text-slate-700 text-sm mb-3">Time to Breach</label>
        <div className="space-y-2">
          {timeWindows.map(window => (
            <label
              key={window.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="timeWindow"
                checked={filters.timeToBreachWindow === window.id}
                onChange={() => setTimeWindow(window.id)}
                className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-100"
              />
              <span className="text-slate-700 text-sm group-hover:text-slate-900">
                {window.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Applied Filters Summary */}
      {activeFilterCount > 0 && (
        <div className="pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-600 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.riskTypes.map(typeId => {
              const option = riskTypeOptions.find(o => o.id === typeId);
              return (
                <span
                  key={typeId}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  {option?.label}
                  <button
                    onClick={() => toggleRiskType(typeId)}
                    className="hover:bg-blue-200 rounded p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            {filters.depots.map(depotId => {
              const option = depotOptions.find(o => o.id === depotId);
              return (
                <span
                  key={depotId}
                  className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  {option?.label}
                  <button
                    onClick={() => toggleDepot(depotId)}
                    className="hover:bg-blue-200 rounded p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
            {filters.timeToBreachWindow !== 'all' && (
              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                {timeWindows.find(w => w.id === filters.timeToBreachWindow)?.label}
                <button
                  onClick={() => setTimeWindow('all')}
                  className="hover:bg-blue-200 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
