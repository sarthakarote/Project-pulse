import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { DependencyGraph } from '../components/features/DependencyGraph';
import { activities } from '../data/mockData';
import { runSimulation } from '../lib/riskEngine';
import { Play, Minus, Plus, IndianRupee, CalendarClock, Workflow, AlertTriangle } from 'lucide-react';

// Daily cost (₹/day) per team, used to compute realistic cost impact
const teamDailyCost = {
  'Earthworks': 45000,
  'Concrete': 62000,
  'Superstructure': 78000,
  'Plumbing': 35000,
  'Electrical': 41000,
};

function formatRupees(value) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

function computeCostImpact(activity, delayDays, affectedCount) {
  // Base cost = team daily cost × delay days
  const daily = teamDailyCost[activity?.team] || 40000;
  // Direct impact from the delayed activity
  let total = daily * delayDays;
  // Add cost for cascade: each affected downstream activity adds its own daily cost
  total += affectedCount * 25000 * delayDays;
  return total;
}

export default function Simulator() {
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [delayDays, setDelayDays] = useState(5);
  const [simulationResult, setSimulationResult] = useState(null);
  const [impactedNodes, setImpactedNodes] = useState([]);

  const handleSimulate = () => {
    if (!selectedActivityId) return;
    const results = runSimulation(selectedActivityId, delayDays);
    setSimulationResult(results);

    // Animate cascade (simple staggered timeout approach for prototype)
    setImpactedNodes([]);
    results.forEach((res, idx) => {
      setTimeout(() => {
        setImpactedNodes(prev => [...prev, res]);
      }, (idx + 1) * 300); // 300ms stagger
    });
  };

  const selectedActivity = activities.find(a => a.id === selectedActivityId);
  const costImpact = simulationResult !== null
    ? computeCostImpact(selectedActivity, delayDays, simulationResult.length)
    : 0;

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="What-If Simulator" />
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {/* Top Controls & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left - Controls */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="section-title mb-1">Simulation Controls</h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Pick an activity and a hypothetical delay to see the ripple effect on your project.</p>
            
            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="sim-activity">Select Activity</label>
                <select
                  id="sim-activity"
                  className="mt-1 block w-full rounded-lg border border-slate-300 bg-slate-50 py-2 px-3 text-sm text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                >
                  <option value="">-- Select an activity --</option>
                  {activities.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.id})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="label" htmlFor="sim-days">Hypothetical Delay (Days)</label>
                <div className="mt-1 flex items-center">
                  <button
                    onClick={() => setDelayDays(Math.max(1, delayDays - 1))}
                    className="inline-flex h-10 items-center justify-center rounded-l-lg border border-slate-300 bg-slate-50 px-3 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    aria-label="Decrease delay"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    id="sim-days"
                    type="number"
                    min={1}
                    value={delayDays}
                    onChange={(e) => setDelayDays(Math.max(1, parseInt(e.target.value) || 1))}
                    className="block h-10 w-24 border-y border-l-0 border-r-0 border-slate-300 bg-white py-2 text-center text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  />
                  <button
                    onClick={() => setDelayDays(delayDays + 1)}
                    className="inline-flex h-10 items-center justify-center rounded-r-lg border border-slate-300 bg-slate-50 px-3 text-slate-600 transition-colors hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                    aria-label="Increase delay"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {selectedActivity && (
                <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Selected Activity</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{selectedActivity.name}</p>
                  <p className="text-xs text-slate-400">Team: {selectedActivity.team} · Health: {selectedActivity.status}</p>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleSimulate}
                  disabled={!selectedActivityId}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-primary-700 hover:to-accent-700 hover:shadow-md disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed dark:disabled:from-slate-700 dark:disabled:to-slate-700"
                >
                  <Play className="h-4 w-4" />
                  Run Simulation
                </button>
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h3 className="section-title mb-1">Simulation Result</h3>
            <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">Projected impact of a +{delayDays} day delay on {selectedActivity?.name || 'selected activity'}.</p>
            
            {!simulationResult ? (
              <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-center text-sm text-slate-500 dark:text-slate-400">
                <div>
                  <Workflow className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
                  Enter a delay to see the projected impact.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50/50 p-3 dark:border-red-900/40 dark:bg-red-950/20">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400">
                      <AlertTriangle className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">{selectedActivity?.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{selectedActivity?.id} · {selectedActivity?.team}</p>
                    </div>
                  </div>
                  <span className="ml-3 flex-shrink-0 rounded-full bg-red-600 px-3 py-1 text-sm font-bold text-white">
                    +{delayDays} days
                  </span>
                </div>
                
                <div>
                  <p className="kicker mb-2">Affected Downstream Activities</p>
                  {simulationResult.length === 0 ? (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No downstream impact. This activity has no active successors.</p>
                  ) : (
                    <ul className="space-y-2">
                      {simulationResult.map(res => (
                        <li key={res.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5 text-sm ring-1 ring-slate-100 dark:bg-slate-800 dark:ring-slate-700">
                          <span className="font-medium text-slate-700 dark:text-slate-200">{res.name}</span>
                          <span className="font-bold text-red-600 dark:text-red-400">+{res.delay} days</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-900 dark:from-amber-950/30 dark:to-orange-950/30">
                  <div className="flex items-center gap-2 mb-2">
                    <CalendarClock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Schedule & Cost Impact</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-md bg-white/70 p-3 dark:bg-slate-900/40">
                      <p className="text-xs text-amber-700 dark:text-amber-400">Schedule Impact</p>
                      <p className="text-base font-bold text-amber-900 dark:text-amber-200">+{delayDays} days</p>
                    </div>
                    <div className="rounded-md bg-white/70 p-3 dark:bg-slate-900/40">
                      <p className="text-xs text-amber-700 dark:text-amber-400">Est. Cost Impact</p>
                      <p className="text-base font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1">
                        <IndianRupee className="h-4 w-4" />
                        {formatRupees(costImpact)}
                      </p>
                    </div>
                    <div className="rounded-md bg-white/70 p-3 dark:bg-slate-900/40 col-span-2">
                      <p className="text-xs text-amber-700 dark:text-amber-400">Activities Affected</p>
                      <p className="text-base font-bold text-amber-900 dark:text-amber-200">{simulationResult.length ? `${simulationResult.length} downstream` : 'None'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Graph */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="section-title">Dependency Impact Map</h3>
            {impactedNodes.length > 0 && (
              <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                {impactedNodes.length} impacted
              </span>
            )}
          </div>
          <div className="min-h-[380px]">
            <DependencyGraph simulatedImpact={impactedNodes} />
          </div>
        </div>
      </div>
    </div>
  );
}
