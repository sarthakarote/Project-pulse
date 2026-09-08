import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { DependencyGraph } from '../components/features/DependencyGraph';
import { StatusBadge } from '../components/ui/StatusBadge';
import { GitMerge, Play, Calendar, Users, CloudRain, Star } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function Dependencies() {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      <Header title="Project Dependencies" />
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-7xl flex flex-col gap-6">

          {/* Info Banner */}
          <div className="rounded-xl bg-gradient-to-r from-accent-600 via-primary-500 to-primary-600 p-5 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <GitMerge className="h-6 w-6" />
              <h2 className="text-lg font-bold">Dependency Network</h2>
            </div>
            <p className="text-sm text-white/80 max-w-2xl">
              Visualize how construction activities are connected. Click any node to inspect its details and simulate the impact of a delay.
            </p>
          </div>

          {/* Graph + Detail Panel */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Graph container */}
            <div className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="section-title">Activity Flow</h3>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  Click a node to inspect
                </span>
              </div>
              <div className="h-[520px]">
                <DependencyGraph onNodeClick={(data) => setSelectedActivity(data)} />
              </div>
            </div>

            {/* Detail panel */}
            <div className="w-full lg:w-80 shrink-0">
              {selectedActivity ? (
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-50">{selectedActivity.name}</span>
                  </div>
                  <p className="mb-4 text-sm text-slate-400">ID: {selectedActivity.id}</p>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <span className="kicker">Status</span>
                      <StatusBadge status={selectedActivity.status} />
                    </div>

                    <div>
                      <span className="kicker mb-2">Progress</span>
                      <div className="flex items-center">
                        <div className="mr-3 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700 h-2.5">
                          <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2.5 rounded-full" style={{ width: `${selectedActivity.progress}%` }} />
                        </div>
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{selectedActivity.progress}%</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          <Users className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs text-slate-400">Team</p>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{selectedActivity.team}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-xs text-slate-400">Dates</p>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {format(parseISO(selectedActivity.start), 'MMM dd')} — {format(parseISO(selectedActivity.end), 'MMM dd')}
                            <span className="text-xs text-slate-400"> · {selectedActivity.duration}d</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                          {selectedActivity.weatherRisk ? <CloudRain className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                        </span>
                        <div>
                          <p className="text-xs text-slate-400">{selectedActivity.weatherRisk ? 'Weather Risk' : 'Critical Path'}</p>
                          <p className="font-medium text-slate-900 dark:text-slate-100">
                            {selectedActivity.weatherRisk ? 'Weather sensitive' : selectedActivity.criticalPath ? 'On critical path' : 'Non-critical'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => navigate('/simulator')}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-accent-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:from-primary-700 hover:to-accent-700 hover:shadow-md"
                    >
                      <Play className="h-4 w-4" />
                      Simulate Delay
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-6 text-center text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-500">
                  <div>
                    <GitMerge className="mx-auto h-8 w-8 text-slate-300 dark:text-slate-600 mb-2" />
                    Select a node to inspect its details.
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
